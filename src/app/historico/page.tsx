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
import {
  MoreVertical,
  Eye,
  Copy,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import type { Simulation } from '@/lib/types/api';

// Componente de card de simulação no histórico
function SimulationHistoryCard({
  simulation,
  onViewGraph,
  onCreateFromVersion
}: {
  simulation: Simulation;
  onViewGraph: (simulation: Simulation) => void;
  onCreateFromVersion: (simulation: Simulation) => void;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ATIVO': return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'INATIVO': return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
      case 'SITUACAO_ATUAL': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      default: return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ATIVO': return 'Ativo';
      case 'INATIVO': return 'Inativo';
      case 'SITUACAO_ATUAL': return 'Situação Atual';
      default: return status;
    }
  };

  return (
    <Card className="bg-[#101010] border-[#434343] shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[#9F9F9F] font-semibold text-lg truncate">
                  {simulation.name}
                </h3>
                <Badge
                  className={`text-xs ${getStatusColor(simulation.status)}`}
                >
                  {getStatusLabel(simulation.status)}
                </Badge>
                {simulation.isLegacy && (
                  <Badge
                    variant="outline"
                    className="text-xs text-orange-400 border-orange-400"
                  >
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Legado
                  </Badge>
                )}
              </div>

              <div className="space-y-1 text-sm text-[#B1B1B1]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Início: {formatDate(simulation.startDate)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Taxa Real: {simulation.realRate}% a.a.</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Atualizado: {formatDate(simulation.updatedAt)}</span>
                </div>

                {simulation.description && (
                  <p className="text-[#9F9F9F] mt-2 text-sm">
                    {simulation.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewGraph(simulation)}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] hover:bg-[#454545] hover:text-[#9F9F9F]"
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver no Gráfico
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#9F9F9F] hover:text-[#B1B1B1] hover:bg-[#434343] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#434343] border-[#454545] text-[#9F9F9F]">
                <DropdownMenuItem
                  onClick={() => onViewGraph(simulation)}
                  className="hover:bg-[#454545]"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Gráfico
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onCreateFromVersion(simulation)}
                  className="hover:bg-[#454545]"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Criar Nova Simulação
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HistoricoPage() {
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();

  // Filtrar simulações por cliente
  const filteredSimulations = selectedClient === 'all'
    ? simulations
    : simulations.filter(sim => sim.clientId === Number(selectedClient));

  // Paginação
  const totalPages = Math.ceil(filteredSimulations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSimulations = filteredSimulations.slice(startIndex, endIndex);

  // Agrupar simulações por nome para mostrar versões
  const groupedSimulations = paginatedSimulations.reduce((acc, simulation) => {
    const name = simulation.name;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(simulation);
    return acc;
  }, {} as Record<string, Simulation[]>);

  // Ordenar simulações dentro de cada grupo por data de criação (mais recente primeiro)
  Object.keys(groupedSimulations).forEach(name => {
    groupedSimulations[name].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  });

  const handleClientChange = (clientId: string) => {
    setSelectedClient(clientId);
    setCurrentPage(1);
  };

  const handleViewGraph = () => {
    // TODO: Implementar navegação para gráfico
    toast.info('Funcionalidade em desenvolvimento');
  };

  const handleCreateFromVersion = () => {
    // TODO: Implementar modal de criar nova simulação
    toast.info('Funcionalidade em desenvolvimento');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#101010] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header da página */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-[#9F9F9F] text-xl sm:text-2xl md:text-3xl font-semibold font-['Inter'] leading-tight mb-2">
            Histórico de Simulações
          </h1>
          <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
            Visualize e gerencie todas as versões das simulações
          </p>
        </div>

        {/* Controles */}
        <Card className="bg-[#101010] border-[#434343] shadow-xl mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl md:text-2xl font-semibold font-['Inter'] leading-tight mb-2">
                  Filtros
                </CardTitle>
                <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
                  Filtre as simulações por cliente
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full xl:w-auto">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[#9F9F9F] text-sm sm:text-base font-medium font-['ABeeZee'] leading-loose whitespace-nowrap">
                    Cliente:
                  </span>
                  <Select value={selectedClient} onValueChange={handleClientChange}>
                    <SelectTrigger className="w-48 sm:w-56 bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#434343] border-[#454545]">
                      <SelectItem value="all" className="text-[#9F9F9F] hover:bg-[#454545]">
                        Todos os Clientes
                      </SelectItem>
                      {/* TODO: Adicionar lista de clientes */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Lista de Simulações */}
        <Card className="bg-[#101010] border-[#434343] shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl font-semibold font-['Inter'] leading-tight">
              Simulações ({filteredSimulations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingSimulations ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#434343] border-t-[#9F9F9F] rounded-full animate-spin"></div>
                  <div className="text-[#9F9F9F] text-sm font-medium">Carregando simulações...</div>
                </div>
              </div>
            ) : Object.keys(groupedSimulations).length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
                  <p className="text-[#9F9F9F] text-lg font-medium">Nenhuma simulação encontrada</p>
                  <p className="text-[#B1B1B1] text-sm">Crie sua primeira simulação para começar</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedSimulations).map(([name, versions]) => (
                  <div key={name} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[#9F9F9F] text-lg font-semibold">{name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {versions.length} versão{versions.length > 1 ? 'ões' : ''}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {versions.map((simulation, index) => (
                        <div key={simulation.id} className="relative">
                          {index > 0 && (
                            <div className="absolute left-6 top-0 w-0.5 h-6 bg-[#434343] -translate-y-3"></div>
                          )}
                          <SimulationHistoryCard
                            simulation={simulation}
                            onViewGraph={handleViewGraph}
                            onCreateFromVersion={handleCreateFromVersion}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Paginação */}
        {totalPages > 1 && (
          <Card className="bg-[#101010] border-[#434343] shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-[#434343] border-[#454545] text-[#B1B1B1] hover:bg-[#454545] disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <span className="text-[#9F9F9F] text-sm">
                  Página {currentPage} de {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-[#434343] border-[#454545] text-[#B1B1B1] hover:bg-[#454545] disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}