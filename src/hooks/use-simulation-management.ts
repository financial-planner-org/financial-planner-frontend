'use client';

import { useState, useCallback } from 'react';
import {
  useSimulations,
  useCreateSimulation,
  useUpdateSimulation,
  useDeleteSimulation,
  useCreateCurrentSituation,
  Simulation,
  CreateSimulationInput,
  UpdateSimulationInput,
} from '@/hooks/api/use-simulations';
import { useAllocations } from '@/hooks/api/use-allocations';
import { useMovements } from '@/hooks/api/use-movements';
import { useProjection } from '@/hooks/api/use-projections';
import { toast } from 'sonner';

export interface SimulationManagementState {
  // Dados
  simulations: Simulation[];
  selectedSimulation: Simulation | null;

  // Estados de loading
  isLoadingSimulations: boolean;
  isCreatingSimulation: boolean;
  isUpdatingSimulation: boolean;
  isDeletingSimulation: boolean;
  isCreatingCurrentSituation: boolean;

  // Estados de erro
  error: string | null;

  // Dados relacionados
  allocations: any[];
  movements: any[];
  projection: any;

  // Estados de loading relacionados
  isLoadingAllocations: boolean;
  isLoadingMovements: boolean;
  isLoadingProjection: boolean;
}

export interface SimulationManagementActions {
  // Ações de simulação
  selectSimulation: (simulation: Simulation) => void;
  createSimulation: (data: CreateSimulationInput) => Promise<void>;
  updateSimulation: (data: UpdateSimulationInput) => Promise<void>;
  deleteSimulation: (id: number) => Promise<void>;
  createCurrentSituation: (baseSimulationId: number) => Promise<void>;

  // Ações de navegação
  clearSelection: () => void;
  refreshData: () => void;
}

export function useSimulationManagement(): SimulationManagementState & SimulationManagementActions {
  // Estados locais
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hooks de simulações
  const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
  const createSimulationMutation = useCreateSimulation();
  const updateSimulationMutation = useUpdateSimulation();
  const deleteSimulationMutation = useDeleteSimulation();
  const createCurrentSituationMutation = useCreateCurrentSituation();

  // Hooks de dados relacionados
  const { data: allocations = [], isLoading: isLoadingAllocations } = useAllocations(
    selectedSimulation?.id || 0
  );
  const { data: movements = [], isLoading: isLoadingMovements } = useMovements(
    selectedSimulation?.id || 0
  );
  const { data: projection, isLoading: isLoadingProjection } = useProjection({
    simulationId: selectedSimulation?.id || 0,
    status: 'VIVO',
    realReturnRate: selectedSimulation?.realRate || 0.04,
    projectionYears: 40,
    includeInsurances: true,
  });

  // Ações de simulação
  const selectSimulation = useCallback((simulation: Simulation) => {
    setSelectedSimulation(simulation);
    setError(null);
  }, []);

  const createSimulation = useCallback(
    async (data: CreateSimulationInput) => {
      try {
        setError(null);
        await createSimulationMutation.mutateAsync(data);
        toast.success('Simulação criada com sucesso!');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao criar simulação';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      }
    },
    [createSimulationMutation]
  );

  const updateSimulation = useCallback(
    async (data: UpdateSimulationInput) => {
      try {
        setError(null);
        await updateSimulationMutation.mutateAsync(data);
        toast.success('Simulação atualizada com sucesso!');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao atualizar simulação';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      }
    },
    [updateSimulationMutation]
  );

  const deleteSimulation = useCallback(
    async (id: number) => {
      try {
        setError(null);
        await deleteSimulationMutation.mutateAsync(id);
        toast.success('Simulação deletada com sucesso!');

        // Se a simulação deletada era a selecionada, limpar seleção
        if (selectedSimulation?.id === id) {
          setSelectedSimulation(null);
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao deletar simulação';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      }
    },
    [deleteSimulationMutation, selectedSimulation]
  );

  const createCurrentSituation = useCallback(
    async (baseSimulationId: number) => {
      try {
        setError(null);
        await createCurrentSituationMutation.mutateAsync(baseSimulationId);
        toast.success('Situação Atual criada com sucesso!');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao criar Situação Atual';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      }
    },
    [createCurrentSituationMutation]
  );

  const clearSelection = useCallback(() => {
    setSelectedSimulation(null);
    setError(null);
  }, []);

  const refreshData = useCallback(() => {
    // Os hooks do React Query já fazem refetch automático
    // Esta função pode ser usada para forçar refresh se necessário
    setError(null);
  }, []);

  return {
    // Estados
    simulations,
    selectedSimulation,
    isLoadingSimulations,
    isCreatingSimulation: createSimulationMutation.isPending,
    isUpdatingSimulation: updateSimulationMutation.isPending,
    isDeletingSimulation: deleteSimulationMutation.isPending,
    isCreatingCurrentSituation: createCurrentSituationMutation.isPending,
    error,
    allocations,
    movements,
    projection,
    isLoadingAllocations,
    isLoadingMovements,
    isLoadingProjection,

    // Ações
    selectSimulation,
    createSimulation,
    updateSimulation,
    deleteSimulation,
    createCurrentSituation,
    clearSelection,
    refreshData,
  };
}
