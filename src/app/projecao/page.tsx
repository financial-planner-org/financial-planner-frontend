'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSimulations } from '@/hooks/api/useSimulations';
import { useProjection } from '@/hooks/api/useProjection';
import { SimulationEditModal } from '@/components/modals/simulation-edit-modal';
import { SimulationAddModal } from '@/components/modals/simulation-add-modal';
import { SimulationVersionModal } from '@/components/modals/simulation-version-modal';
import { ProjectionDetailsModal } from '@/components/modals/projection-details-modal';
import { SimulationComparisonModal } from '@/components/modals/simulation-comparison-modal';
import { SuggestionsPanel } from '@/components/suggestions/suggestions-panel';
import {
  MoreVertical,
  Plus,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Copy,
  AlertTriangle,
  BarChart3,
  Table
} from 'lucide-react';
import { toast } from 'sonner';

// Tipos para projeção
interface ProjectionData {
  year: number;
  totalPatrimony: number;
  financialPatrimony: number;
  immovablePatrimony: number;
  totalPatrimonyWithoutInsurance: number;
}

// Usar o tipo da API
import type { Simulation } from '@/lib/types/api';

// Componente de gráfico de projeção
function ProjectionChart({ data, selectedSimulation }: { data: ProjectionData[], selectedSimulation: Simulation | null }) {
  if (!data.length || !selectedSimulation) {
    return (
      <div className="flex items-center justify-center h-96 bg-[#101010] rounded-lg border border-[#434343]">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
          <p className="text-[#9F9F9F] text-lg">Selecione uma simulação para ver a projeção</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.totalPatrimony));
  const minValue = Math.min(...data.map(d => d.totalPatrimony));
  const range = maxValue - minValue;

  return (
    <div className="bg-[#101010] rounded-lg border border-[#434343] p-6">
      <div className="mb-6">
        <h3 className="text-[#9F9F9F] text-xl font-semibold mb-2">
          Projeção Patrimonial - {selectedSimulation.name}
        </h3>
        <div className="flex items-center gap-4 text-sm text-[#B1B1B1]">
          <span>Taxa Real: {selectedSimulation.realRate}% a.a.</span>
          <span>Período: {selectedSimulation.startDate} - 2060</span>
        </div>
      </div>

      <div className="h-96 relative">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <line
              key={i}
              x1="0"
              y1={`${ratio * 100}%`}
              x2="100%"
              y2={`${ratio * 100}%`}
              stroke="#434343"
              strokeWidth="1"
            />
          ))}

          {/* Area chart for total patrimony */}
          <path
            d={`M 0,${100 - ((data[0]?.totalPatrimony - minValue) / range) * 100} ${data.map((d, i) =>
              `L ${(i / (data.length - 1)) * 100},${100 - ((d.totalPatrimony - minValue) / range) * 100}`
            ).join(' ')} L 100,100 L 0,100 Z`}
            fill="url(#gradientTotal)"
            opacity="0.8"
          />

          {/* Line for total patrimony without insurance */}
          <path
            d={`M 0,${100 - ((data[0]?.totalPatrimonyWithoutInsurance - minValue) / range) * 100} ${data.map((d, i) =>
              `L ${(i / (data.length - 1)) * 100},${100 - ((d.totalPatrimonyWithoutInsurance - minValue) / range) * 100}`
            ).join(' ')}`}
            fill="none"
            stroke="#9F9F9F"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* Data points */}
          {data.map((d) => (
            <circle
              key={d.year}
              cx={`${(data.indexOf(d) / (data.length - 1)) * 100}%`}
              cy={`${100 - ((d.totalPatrimony - minValue) / range) * 100}%`}
              r="3"
              fill="#B1B1B1"
            />
          ))}
        </svg>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradientTotal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9F9F9F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#434343" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#9F9F9F] rounded"></div>
          <span className="text-[#B1B1B1]">Patrimônio Total</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-[#9F9F9F] border-dashed border-t-2"></div>
          <span className="text-[#B1B1B1]">Sem Seguros</span>
        </div>
      </div>
    </div>
  );
}

// Componente de tabela de projeção
function ProjectionTable({ data, selectedSimulation }: { data: ProjectionData[], selectedSimulation: Simulation | null }) {
  if (!data.length || !selectedSimulation) {
    return (
      <div className="flex items-center justify-center h-96 bg-[#101010] rounded-lg border border-[#434343]">
        <div className="text-center">
          <Table className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
          <p className="text-[#9F9F9F] text-lg">Selecione uma simulação para ver os dados</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-[#101010] rounded-lg border border-[#434343] p-6">
      <h3 className="text-[#9F9F9F] text-xl font-semibold mb-4">
        Dados Tabulares - {selectedSimulation.name}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#434343]">
              <th className="text-left py-3 px-4 text-[#9F9F9F] font-medium">Ano</th>
              <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Patrimônio Total</th>
              <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Financeiro</th>
              <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Imobilizado</th>
              <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Sem Seguros</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.year} className="border-b border-[#434343]/50 hover:bg-[#434343]/20">
                <td className="py-3 px-4 text-[#B1B1B1]">{row.year}</td>
                <td className="py-3 px-4 text-right text-[#B1B1B1] font-medium">
                  {formatCurrency(row.totalPatrimony)}
                </td>
                <td className="py-3 px-4 text-right text-[#B1B1B1]">
                  {formatCurrency(row.financialPatrimony)}
                </td>
                <td className="py-3 px-4 text-right text-[#B1B1B1]">
                  {formatCurrency(row.immovablePatrimony)}
                </td>
                <td className="py-3 px-4 text-right text-[#9F9F9F]">
                  {formatCurrency(row.totalPatrimonyWithoutInsurance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ProjecaoPage() {
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
  const [lifeStatus, setLifeStatus] = useState<'VIVO' | 'MORTO' | 'INVALIDO'>('VIVO');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Estados dos modais
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [simulationToEdit, setSimulationToEdit] = useState<Simulation | null>(null);
  const [simulationToVersion, setSimulationToVersion] = useState<Simulation | null>(null);

  const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
  const { data: projectionData = [], isLoading: isLoadingProjection } = useProjection(
    selectedSimulation?.id,
    lifeStatus
  );

  // Filtrar apenas simulações ativas e não legadas
  const activeSimulations = simulations.filter(sim =>
    sim.status === 'ATIVO' && !sim.isLegacy
  );

  const handleSimulationSelect = (simulationId: string) => {
    const selectedSim = activeSimulations.find(sim => sim.id === Number(simulationId));
    setSelectedSimulation(selectedSim || null);
  };

  const handleAddSimulation = () => {
    setIsAddModalOpen(true);
  };

  const handleEditSimulation = (simulation: Simulation) => {
    setSimulationToEdit(simulation);
    setIsEditModalOpen(true);
  };

  const handleDeleteSimulation = () => {
    // TODO: Implementar confirmação e deletar simulação
    toast.info('Funcionalidade em desenvolvimento');
  };

  const handleCreateVersion = (simulation: Simulation) => {
    setSimulationToVersion(simulation);
    setIsVersionModalOpen(true);
  };

  const handleViewDetails = (simulation: Simulation) => {
    setSelectedSimulation(simulation);
    setIsDetailsModalOpen(true);
  };

  const handleCompareSimulations = () => {
    setIsComparisonModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#101010] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header da página */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-[#9F9F9F] text-xl sm:text-2xl md:text-3xl font-semibold font-['Inter'] leading-tight mb-2">
            Projeção Patrimonial
          </h1>
          <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
            Acompanhe a evolução patrimonial até 2060 com base nas simulações
          </p>
        </div>

        {/* Controles */}
        <Card className="bg-[#101010] border-[#434343] shadow-xl mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl md:text-2xl font-semibold font-['Inter'] leading-tight mb-2">
                  Configurações da Projeção
                </CardTitle>
                <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
                  Selecione a simulação e configure os parâmetros
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full xl:w-auto">
                <Button
                  onClick={handleCompareSimulations}
                  variant="outline"
                  className="w-full sm:w-auto h-10 px-4 sm:px-6 py-3 bg-[#434343] border-[#454545] hover:bg-[#454545] text-[#B1B1B1] rounded-[40px] inline-flex justify-center items-center gap-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-medium font-['ABeeZee'] leading-loose">
                    Comparar Simulações
                  </span>
                </Button>
                <Button
                  onClick={handleAddSimulation}
                  className="w-full sm:w-auto h-10 px-4 sm:px-6 py-3 bg-[#434343] hover:bg-[#454545] text-[#B1B1B1] rounded-[40px] inline-flex justify-center items-center gap-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-medium font-['ABeeZee'] leading-loose">
                    Adicionar Simulação
                  </span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Seleção de Simulação */}
              <div className="space-y-2">
                <label className="text-[#9F9F9F] text-sm font-medium">Simulação</label>
                <Select onValueChange={handleSimulationSelect}>
                  <SelectTrigger className="bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors">
                    <SelectValue placeholder="Selecione uma simulação" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#434343] border-[#454545]">
                    {activeSimulations.map((simulation) => (
                      <SelectItem
                        key={simulation.id}
                        value={simulation.id.toString()}
                        className="text-[#9F9F9F] hover:bg-[#454545]"
                      >
                        <div className="flex items-center gap-2">
                          {simulation.isCurrentSituation && (
                            <Badge variant="secondary" className="text-xs">
                              Situação Atual
                            </Badge>
                          )}
                          {simulation.isLegacy && (
                            <AlertTriangle className="w-4 h-4 text-orange-400" />
                          )}
                          <span>{simulation.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status de Vida */}
              <div className="space-y-2">
                <label className="text-[#9F9F9F] text-sm font-medium">Status de Vida</label>
                <Select value={lifeStatus} onValueChange={(value: 'VIVO' | 'MORTO' | 'INVALIDO') => setLifeStatus(value)}>
                  <SelectTrigger className="bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#434343] border-[#454545]">
                    <SelectItem value="VIVO" className="text-[#9F9F9F] hover:bg-[#454545]">Vivo</SelectItem>
                    <SelectItem value="MORTO" className="text-[#9F9F9F] hover:bg-[#454545]">Morto</SelectItem>
                    <SelectItem value="INVALIDO" className="text-[#9F9F9F] hover:bg-[#454545]">Inválido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Modo de Visualização */}
              <div className="space-y-2">
                <label className="text-[#9F9F9F] text-sm font-medium">Visualização</label>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'chart' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('chart')}
                    className="flex-1"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Gráfico
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="flex-1"
                  >
                    <Table className="w-4 h-4 mr-2" />
                    Tabela
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Simulações */}
        <Card className="bg-[#101010] border-[#434343] shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl font-semibold font-['Inter'] leading-tight">
              Simulações Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingSimulations ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#434343] border-t-[#9F9F9F] rounded-full animate-spin"></div>
                  <div className="text-[#9F9F9F] text-sm font-medium">Carregando simulações...</div>
                </div>
              </div>
            ) : activeSimulations.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
                  <p className="text-[#9F9F9F] text-lg font-medium">Nenhuma simulação encontrada</p>
                  <p className="text-[#B1B1B1] text-sm">Crie sua primeira simulação para começar</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                {activeSimulations.map((simulation) => (
                  <div
                    key={simulation.id}
                    className="flex items-center justify-between p-4 bg-[#434343] rounded-lg hover:bg-[#454545] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[#9F9F9F] font-medium">{simulation.name}</h3>
                          {simulation.isCurrentSituation && (
                            <Badge variant="secondary" className="text-xs">
                              Situação Atual
                            </Badge>
                          )}
                          {simulation.isLegacy && (
                            <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Legado
                            </Badge>
                          )}
                        </div>
                        <div className="text-[#B1B1B1] text-sm">
                          Taxa: {simulation.realRate}% a.a. • Início: {new Date(simulation.startDate).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(simulation)}
                        className="text-[#9F9F9F] hover:text-[#B1B1B1] hover:bg-[#454545]"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#9F9F9F] hover:text-[#B1B1B1] hover:bg-[#454545]"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#434343] border-[#454545] text-[#9F9F9F]">
                          {!simulation.isCurrentSituation && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleEditSimulation(simulation)}
                                className="hover:bg-[#454545]"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar Simulação
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteSimulation()}
                                className="text-red-400 hover:bg-[#454545]"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Deletar Simulação
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleCreateVersion(simulation)}
                            className="hover:bg-[#454545]"
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Criar Nova Versão
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Visualização da Projeção */}
        {selectedSimulation && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico ou Tabela */}
            <div className="lg:col-span-2">
              <Card className="bg-[#101010] border-[#434343] shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl font-semibold font-['Inter'] leading-tight">
                      Projeção Patrimonial
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === 'chart' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('chart')}
                        className="bg-[#434343] hover:bg-[#454545] text-[#B1B1B1]"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Gráfico
                      </Button>
                      <Button
                        variant={viewMode === 'table' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                        className="bg-[#434343] hover:bg-[#454545] text-[#B1B1B1]"
                      >
                        <Table className="w-4 h-4 mr-2" />
                        Tabela
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoadingProjection ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-[#434343] border-t-[#9F9F9F] rounded-full animate-spin"></div>
                        <div className="text-[#9F9F9F] text-sm font-medium">Calculando projeção...</div>
                      </div>
                    </div>
                  ) : viewMode === 'chart' ? (
                    <ProjectionChart data={projectionData} selectedSimulation={selectedSimulation} />
                  ) : (
                    <ProjectionTable data={projectionData} selectedSimulation={selectedSimulation} />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Painel de Sugestões */}
            <div className="lg:col-span-1">
              <SuggestionsPanel
                simulation={selectedSimulation}
                projectionData={projectionData}
                onAcceptSuggestion={(suggestion) => {
                  // TODO: Implementar lógica de aceitar sugestão
                  console.log('Sugestão aceita:', suggestion);
                }}
                onDismissSuggestion={(suggestion) => {
                  // TODO: Implementar lógica de dispensar sugestão
                  console.log('Sugestão dispensada:', suggestion);
                }}
              />
            </div>
          </div>
        )}

        {/* Modais */}
        <SimulationEditModal
          simulation={simulationToEdit}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSimulationToEdit(null);
          }}
        />

        <SimulationAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          simulations={activeSimulations}
        />

        <SimulationVersionModal
          simulation={simulationToVersion}
          isOpen={isVersionModalOpen}
          onClose={() => {
            setIsVersionModalOpen(false);
            setSimulationToVersion(null);
          }}
        />

        <ProjectionDetailsModal
          simulation={selectedSimulation}
          projectionData={projectionData}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />

        <SimulationComparisonModal
          simulations={activeSimulations}
          projectionData={{}} // TODO: Implementar carregamento de dados de múltiplas simulações
          isOpen={isComparisonModalOpen}
          onClose={() => setIsComparisonModalOpen(false)}
        />
      </div>
    </div>
  );
}