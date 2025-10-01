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
import { useMovements } from '@/hooks/api/useMovements';
import { MovementAddModal } from '@/components/modals/movement-add-modal';
import {
  MoreVertical,
  Plus,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Repeat
} from 'lucide-react';
import { toast } from 'sonner';

// Usar o tipo da API
import type { Movement } from '@/lib/types/api';

// Usar o tipo da API
import type { Simulation } from '@/lib/types/api';

// Componente de card de movimentação
function MovementCard({
  movement,
  onEdit,
  onDelete
}: {
  movement: Movement;
  onEdit: (movement: Movement) => void;
  onDelete: (movement: Movement) => void;
}) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'UNICA': return 'Única';
      case 'MENSAL': return 'Mensal';
      case 'ANUAL': return 'Anual';
      default: return frequency;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'ENTRADA' ?
      <TrendingUp className="w-4 h-4 text-green-400" /> :
      <TrendingDown className="w-4 h-4 text-red-400" />;
  };

  const getTypeColor = (type: string) => {
    return type === 'ENTRADA' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <Card className="bg-[#101010] border-[#434343] shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              {getTypeIcon(movement.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[#9F9F9F] font-medium text-lg truncate">
                  {movement.description}
                </h3>
                <Badge
                  variant={movement.type === 'ENTRADA' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {movement.type === 'ENTRADA' ? 'Entrada' : 'Saída'}
                </Badge>
              </div>

              <div className="space-y-1 text-sm text-[#B1B1B1]">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className={`font-semibold text-lg ${getTypeColor(movement.type)}`}>
                    {formatCurrency(movement.value)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4" />
                  <span>{getFrequencyLabel(movement.frequency)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(movement.startDate)}
                    {movement.endDate && ` - ${formatDate(movement.endDate)}`}
                  </span>
                </div>

                {movement.category && (
                  <div className="text-[#9F9F9F]">
                    Categoria: {movement.category}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 ml-4">
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
                  onClick={() => onEdit(movement)}
                  className="hover:bg-[#454545]"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(movement)}
                  className="text-red-400 hover:bg-[#454545]"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MovimentacoesPage() {
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
  const [filterType, setFilterType] = useState<'TODAS' | 'ENTRADA' | 'SAIDA'>('TODAS');
  const [filterFrequency, setFilterFrequency] = useState<'TODAS' | 'UNICA' | 'MENSAL' | 'ANUAL'>('TODAS');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: simulations = [] } = useSimulations();
  const { data: movements = [], isLoading: isLoadingMovements } = useMovements(selectedSimulation?.id);

  // Filtrar apenas simulações ativas
  const activeSimulations = simulations.filter(sim =>
    sim.status === 'ATIVO' && !sim.isLegacy
  );

  // Filtrar movimentações
  const filteredMovements = movements.filter(movement => {
    if (filterType !== 'TODAS' && movement.type !== filterType) return false;
    if (filterFrequency !== 'TODAS' && movement.frequency !== filterFrequency) return false;
    return true;
  });

  const handleSimulationSelect = (simulationId: string) => {
    const simulation = activeSimulations.find(sim => sim.id === Number(simulationId));
    setSelectedSimulation(simulation || null);
  };

  const handleAddMovement = () => {
    if (!selectedSimulation) {
      toast.error('Selecione uma simulação primeiro');
      return;
    }
    setIsAddModalOpen(true);
  };

  const handleEditMovement = () => {
    // TODO: Implementar modal de editar movimentação
    toast.info('Funcionalidade em desenvolvimento');
  };

  const handleDeleteMovement = () => {
    // TODO: Implementar confirmação e deletar movimentação
    toast.info('Funcionalidade em desenvolvimento');
  };

  // Calcular totais
  const totalEntradas = filteredMovements
    .filter(m => m.type === 'ENTRADA')
    .reduce((sum, m) => sum + m.value, 0);

  const totalSaidas = filteredMovements
    .filter(m => m.type === 'SAIDA')
    .reduce((sum, m) => sum + m.value, 0);

  const saldo = totalEntradas - totalSaidas;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#101010] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header da página */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-[#9F9F9F] text-xl sm:text-2xl md:text-3xl font-semibold font-['Inter'] leading-tight mb-2">
            Movimentações
          </h1>
          <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
            Gerencie entradas e saídas financeiras das simulações
          </p>
        </div>

        {/* Controles */}
        <Card className="bg-[#101010] border-[#434343] shadow-xl mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl md:text-2xl font-semibold font-['Inter'] leading-tight mb-2">
                  Configurações
                </CardTitle>
                <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
                  Selecione a simulação e configure os filtros
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full xl:w-auto">
                <Button
                  onClick={handleAddMovement}
                  className="w-full sm:w-auto h-10 px-4 sm:px-6 py-3 bg-[#434343] hover:bg-[#454545] text-[#B1B1B1] rounded-[40px] inline-flex justify-center items-center gap-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-medium font-['ABeeZee'] leading-loose">
                    Adicionar Movimentação
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
                          <span>{simulation.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro por Tipo */}
              <div className="space-y-2">
                <label className="text-[#9F9F9F] text-sm font-medium">Tipo</label>
                <Select value={filterType} onValueChange={(value: 'TODAS' | 'ENTRADA' | 'SAIDA') => setFilterType(value)}>
                  <SelectTrigger className="bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#434343] border-[#454545]">
                    <SelectItem value="TODAS" className="text-[#9F9F9F] hover:bg-[#454545]">Todas</SelectItem>
                    <SelectItem value="ENTRADA" className="text-[#9F9F9F] hover:bg-[#454545]">Entradas</SelectItem>
                    <SelectItem value="SAIDA" className="text-[#9F9F9F] hover:bg-[#454545]">Saídas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro por Frequência */}
              <div className="space-y-2">
                <label className="text-[#9F9F9F] text-sm font-medium">Frequência</label>
                <Select value={filterFrequency} onValueChange={(value: 'TODAS' | 'UNICA' | 'MENSAL' | 'ANUAL') => setFilterFrequency(value)}>
                  <SelectTrigger className="bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#434343] border-[#454545]">
                    <SelectItem value="TODAS" className="text-[#9F9F9F] hover:bg-[#454545]">Todas</SelectItem>
                    <SelectItem value="UNICA" className="text-[#9F9F9F] hover:bg-[#454545]">Única</SelectItem>
                    <SelectItem value="MENSAL" className="text-[#9F9F9F] hover:bg-[#454545]">Mensal</SelectItem>
                    <SelectItem value="ANUAL" className="text-[#9F9F9F] hover:bg-[#454545]">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Financeiro */}
        {selectedSimulation && (
          <Card className="bg-[#101010] border-[#434343] shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl font-semibold font-['Inter'] leading-tight">
                Resumo Financeiro - {selectedSimulation.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-400/10 rounded-lg border border-green-400/20">
                  <div className="text-green-400 text-2xl font-bold">
                    {formatCurrency(totalEntradas)}
                  </div>
                  <div className="text-[#9F9F9F] text-sm">Total de Entradas</div>
                </div>

                <div className="text-center p-4 bg-red-400/10 rounded-lg border border-red-400/20">
                  <div className="text-red-400 text-2xl font-bold">
                    {formatCurrency(totalSaidas)}
                  </div>
                  <div className="text-[#9F9F9F] text-sm">Total de Saídas</div>
                </div>

                <div className={`text-center p-4 rounded-lg border ${saldo >= 0
                  ? 'bg-green-400/10 border-green-400/20'
                  : 'bg-red-400/10 border-red-400/20'
                  }`}>
                  <div className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                    {formatCurrency(saldo)}
                  </div>
                  <div className="text-[#9F9F9F] text-sm">Saldo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Movimentações */}
        <Card className="bg-[#101010] border-[#434343] shadow-xl">
          <CardHeader>
            <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl font-semibold font-['Inter'] leading-tight">
              Movimentações
              {selectedSimulation && ` - ${selectedSimulation.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedSimulation ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <DollarSign className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
                  <p className="text-[#9F9F9F] text-lg font-medium">Selecione uma simulação</p>
                  <p className="text-[#B1B1B1] text-sm">Escolha uma simulação para ver as movimentações</p>
                </div>
              </div>
            ) : isLoadingMovements ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#434343] border-t-[#9F9F9F] rounded-full animate-spin"></div>
                  <div className="text-[#9F9F9F] text-sm font-medium">Carregando movimentações...</div>
                </div>
              </div>
            ) : filteredMovements.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <DollarSign className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
                  <p className="text-[#9F9F9F] text-lg font-medium">Nenhuma movimentação encontrada</p>
                  <p className="text-[#B1B1B1] text-sm">Adicione sua primeira movimentação</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMovements.map((movement) => (
                  <MovementCard
                    key={movement.id}
                    movement={movement}
                    onEdit={handleEditMovement}
                    onDelete={handleDeleteMovement}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal */}
        {selectedSimulation && (
          <MovementAddModal
            simulationId={selectedSimulation.id}
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}