'use client';

import { useState, useCallback } from 'react';
import {
  useAllocations,
  useCreateAllocation,
  useUpdateAllocation,
  useDeleteAllocation,
  useCreateAssetRecord,
  Allocation,
  CreateAllocationInput,
  UpdateAllocationInput,
  CreateAssetRecordInput,
} from '@/hooks/api/use-allocations';
import { toast } from 'sonner';

export interface AllocationManagementState {
  // Dados
  allocations: Allocation[];
  selectedAllocation: Allocation | null;

  // Estados de loading
  isLoadingAllocations: boolean;
  isCreatingAllocation: boolean;
  isUpdatingAllocation: boolean;
  isDeletingAllocation: boolean;
  isCreatingAssetRecord: boolean;

  // Estados de erro
  error: string | null;
}

export interface AllocationManagementActions {
  // Ações de alocação
  selectAllocation: (allocation: Allocation) => void;
  createAllocation: (data: CreateAllocationInput) => Promise<void>;
  updateAllocation: (data: UpdateAllocationInput) => Promise<void>;
  deleteAllocation: (id: number) => Promise<void>;
  createAssetRecord: (data: CreateAssetRecordInput) => Promise<void>;

  // Ações de navegação
  clearSelection: () => void;
  refreshData: () => void;
}

export function useAllocationManagement(
  simulationId: number
): AllocationManagementState & AllocationManagementActions {
  // Estados locais
  const [selectedAllocation, setSelectedAllocation] = useState<Allocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hooks de alocações
  const { data: allocations = [], isLoading: isLoadingAllocations } = useAllocations(simulationId);
  const createAllocationMutation = useCreateAllocation();
  const updateAllocationMutation = useUpdateAllocation();
  const deleteAllocationMutation = useDeleteAllocation();
  const createAssetRecordMutation = useCreateAssetRecord();

  // Ações de alocação
  const selectAllocation = useCallback((allocation: Allocation) => {
    setSelectedAllocation(allocation);
    setError(null);
  }, []);

  const createAllocation = useCallback(
    async (data: CreateAllocationInput) => {
      try {
        setError(null);
        await createAllocationMutation.mutateAsync(data);
        toast.success('Alocação criada com sucesso!');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao criar alocação';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      }
    },
    [createAllocationMutation]
  );

  const updateAllocation = useCallback(
    async (data: UpdateAllocationInput) => {
      try {
        setError(null);
        await updateAllocationMutation.mutateAsync(data);
        toast.success('Alocação atualizada com sucesso!');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao atualizar alocação';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      }
    },
    [updateAllocationMutation]
  );

  const deleteAllocation = useCallback(
    async (id: number) => {
      try {
        setError(null);
        await deleteAllocationMutation.mutateAsync(id);
        toast.success('Alocação deletada com sucesso!');

        // Se a alocação deletada era a selecionada, limpar seleção
        if (selectedAllocation?.id === id) {
          setSelectedAllocation(null);
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao deletar alocação';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      }
    },
    [deleteAllocationMutation, selectedAllocation]
  );

  const createAssetRecord = useCallback(
    async (data: CreateAssetRecordInput) => {
      try {
        setError(null);
        await createAssetRecordMutation.mutateAsync(data);
        toast.success('Registro de ativo criado com sucesso!');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao criar registro de ativo';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      }
    },
    [createAssetRecordMutation]
  );

  const clearSelection = useCallback(() => {
    setSelectedAllocation(null);
    setError(null);
  }, []);

  const refreshData = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Estados
    allocations,
    selectedAllocation,
    isLoadingAllocations,
    isCreatingAllocation: createAllocationMutation.isPending,
    isUpdatingAllocation: updateAllocationMutation.isPending,
    isDeletingAllocation: deleteAllocationMutation.isPending,
    isCreatingAssetRecord: createAssetRecordMutation.isPending,
    error,

    // Ações
    selectAllocation,
    createAllocation,
    updateAllocation,
    deleteAllocation,
    createAssetRecord,
    clearSelection,
    refreshData,
  };
}
