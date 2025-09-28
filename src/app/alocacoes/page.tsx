'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSimulations } from '@/hooks/api/use-simulations';
import { useAllocations, useDeleteAllocation } from '@/hooks/api/use-allocations';
import { Plus, Loader2 } from 'lucide-react';
import { ALLOCATIONS_CONFIG } from '@/lib/constants/pages';
import { AllocationCard } from '@/components/allocations/allocation-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AlocacoesPage() {
  const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
  const [selectedSimulation, setSelectedSimulation] = useState<string>('');

  const {
    data: allocations = [],
    isLoading: isLoadingAllocations
  } = useAllocations(Number(selectedSimulation));

  const deleteAllocation = useDeleteAllocation();

  const handleEditAllocation = (id: string) => {
    console.log('Editar alocação:', id);
  };

  const handleViewAllocation = (id: string) => {
    console.log('Ver detalhes da alocação:', id);
  };

  const handleDeleteAllocation = async (id: string) => {
    try {
      await deleteAllocation.mutateAsync(Number(id));
      toast.success('Alocação deletada com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar alocação. Tente novamente.');
    }
  };

  const handleUpdateAllocation = (id: string) => {
    console.log('Atualizar alocação:', id);
  };

  // Converter dados da API para o formato esperado pelo componente
  const formattedAllocations = allocations.map((allocation) => ({
    id: allocation.id.toString(),
    title: allocation.name,
    value: `R$ ${allocation.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    date: allocation.startDate ? new Date(allocation.startDate).toLocaleDateString('pt-BR') : 'N/A',
    lastUpdate: new Date(allocation.updatedAt).toLocaleDateString('pt-BR'),
    hasWarning: false,
    badges: [
      {
        type: allocation.type === 'FINANCIAL' ? 'financial' as const : 'immobilized' as const,
        label: allocation.type === 'FINANCIAL' ? 'Financeira' : 'Imobilizada'
      },
      ...(allocation.installments ? [{ type: 'financed' as const, label: '$ Financiado' }] : [])
    ],
    ...(allocation.installments && {
      progress: `Progresso: ${allocation.records?.length || 0}/${allocation.installments} parcelas`,
      progressValue: allocation.records?.length || 0,
      progressTotal: allocation.installments,
    })
  }));

  return (
    <div className="min-h-screen bg-stone-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navegação superior */}
        <div className="mb-8">
          <div className={ALLOCATIONS_CONFIG.navigation.container}>
            <div className={ALLOCATIONS_CONFIG.navigation.activeItem}>
              Alocações
            </div>
            <div className={ALLOCATIONS_CONFIG.navigation.inactiveItem}>
              Projeção
            </div>
            <div className={ALLOCATIONS_CONFIG.navigation.inactiveItem}>
              Histórico
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className={ALLOCATIONS_CONFIG.controls.container}>
          <div className={ALLOCATIONS_CONFIG.controls.filterContainer}>
            <span className={ALLOCATIONS_CONFIG.controls.filterLabel}>
              Simulação:
            </span>
            <Select value={selectedSimulation} onValueChange={setSelectedSimulation}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selecione uma simulação" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingSimulations ? (
                  <SelectItem value="" disabled>
                    Carregando...
                  </SelectItem>
                ) : (
                  simulations.map((simulation) => (
                    <SelectItem key={simulation.id} value={simulation.id.toString()}>
                      {simulation.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <Button className={ALLOCATIONS_CONFIG.controls.addButton}>
            <Plus className="w-4 h-4" />
            <span className={ALLOCATIONS_CONFIG.controls.addButtonText}>
              Adicionar Alocação
            </span>
          </Button>
        </div>

        {/* Timeline de alocações */}
        <div className={ALLOCATIONS_CONFIG.timeline.container}>
          <h2 className={ALLOCATIONS_CONFIG.timeline.title}>
            {ALLOCATIONS_CONFIG.timelineTitle}
          </h2>

          {/* Linha da timeline */}
          <div className={ALLOCATIONS_CONFIG.timeline.line}></div>

          {/* Labels da timeline */}
          <div className={ALLOCATIONS_CONFIG.timeline.oldDataLabel}>
            Dados antigos
          </div>

          <div className={ALLOCATIONS_CONFIG.timeline.updatedLabel}>
            Atualizado
          </div>

          {/* Cards de alocação */}
          <div className={ALLOCATIONS_CONFIG.timeline.itemsContainer}>
            {isLoadingAllocations ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-400">Carregando alocações...</span>
              </div>
            ) : selectedSimulation ? (
              formattedAllocations.length > 0 ? (
                formattedAllocations.map((allocation) => (
                  <AllocationCard
                    key={allocation.id}
                    {...allocation}
                    onEdit={handleEditAllocation}
                    onView={handleViewAllocation}
                    onDelete={handleDeleteAllocation}
                    onUpdate={handleUpdateAllocation}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  Nenhuma alocação encontrada para esta simulação.
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-400">
                Selecione uma simulação para visualizar as alocações.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
