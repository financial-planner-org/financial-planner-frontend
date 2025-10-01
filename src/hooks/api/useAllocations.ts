/**
 * @fileoverview Hooks para gerenciar alocações
 * @description Hooks usando TanStack Query para operações de alocações
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { allocationsApiService } from '@/lib/api/services';
import type {
    Allocation,
    AssetRecord,
    CreateAllocationRequest,
    UpdateAllocationRequest,
    CreateAllocationRecordRequest,
} from '@/lib/types/api';

// Chaves de query
export const allocationsKeys = {
    all: ['allocations'] as const,
    lists: () => [...allocationsKeys.all, 'list'] as const,
    list: (simulationId: number) => [...allocationsKeys.lists(), simulationId] as const,
    details: () => [...allocationsKeys.all, 'detail'] as const,
    detail: (id: number) => [...allocationsKeys.details(), id] as const,
    records: (allocationId: number) => [...allocationsKeys.all, 'records', allocationId] as const,
};

/**
 * Hook para listar alocações de uma simulação
 */
export function useSimulationAllocations(simulationId: number) {
    return useQuery({
        queryKey: allocationsKeys.list(simulationId),
        queryFn: () => allocationsApiService.getSimulationAllocations(simulationId),
        enabled: !!simulationId,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}

/**
 * Hook para buscar uma alocação específica
 */
export function useAllocation(id: number) {
    return useQuery({
        queryKey: allocationsKeys.detail(id),
        queryFn: () => allocationsApiService.getAllocation(id),
        enabled: !!id,
    });
}

/**
 * Hook para buscar registros de uma alocação
 */
export function useAllocationRecords(allocationId: number) {
    return useQuery({
        queryKey: allocationsKeys.records(allocationId),
        queryFn: () => allocationsApiService.getAllocationRecords(allocationId),
        enabled: !!allocationId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
}

/**
 * Hook para criar uma nova alocação
 */
export function useCreateAllocation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAllocationRequest) => allocationsApiService.createAllocation(data),
        onSuccess: (_, variables) => {
            // Invalidar cache de alocações da simulação
            queryClient.invalidateQueries({
                queryKey: allocationsKeys.list(variables.simulationId),
            });
            // Invalidar cache geral de alocações
            queryClient.invalidateQueries({ queryKey: allocationsKeys.lists() });
        },
    });
}

/**
 * Hook para atualizar uma alocação
 */
export function useUpdateAllocation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateAllocationRequest }) =>
            allocationsApiService.updateAllocation(id, data),
        onSuccess: updatedAllocation => {
            // Invalidar cache específico da alocação
            queryClient.invalidateQueries({
                queryKey: allocationsKeys.detail(updatedAllocation.id),
            });
            // Invalidar cache de alocações da simulação
            queryClient.invalidateQueries({
                queryKey: allocationsKeys.list(updatedAllocation.simulationId),
            });
            // Invalidar cache geral de alocações
            queryClient.invalidateQueries({ queryKey: allocationsKeys.lists() });
        },
    });
}

/**
 * Hook para deletar uma alocação
 */
export function useDeleteAllocation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => allocationsApiService.deleteAllocation(id),
        onSuccess: (_, id) => {
            // Invalidar cache específico da alocação
            queryClient.invalidateQueries({ queryKey: allocationsKeys.detail(id) });
            // Invalidar cache geral de alocações
            queryClient.invalidateQueries({ queryKey: allocationsKeys.lists() });
        },
    });
}

/**
 * Hook para adicionar registro a uma alocação (botão "Atualizar")
 */
export function useAddAllocationRecord() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            allocationId,
            data,
        }: {
            allocationId: number;
            data: CreateAllocationRecordRequest;
        }) => allocationsApiService.addAllocationRecord(allocationId, data),
        onSuccess: (_, { allocationId }) => {
            // Invalidar cache de registros da alocação
            queryClient.invalidateQueries({
                queryKey: allocationsKeys.records(allocationId),
            });
            // Invalidar cache da alocação
            queryClient.invalidateQueries({
                queryKey: allocationsKeys.detail(allocationId),
            });
        },
    });
}

/**
 * Hook para atualizar valor de uma alocação (conveniência)
 */
export function useUpdateAllocationValue() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            allocationId,
            value,
            notes,
        }: {
            allocationId: number;
            value: number;
            notes?: string;
        }) => allocationsApiService.updateAllocationValue(allocationId, value, notes),
        onSuccess: (_, { allocationId }) => {
            // Invalidar cache de registros da alocação
            queryClient.invalidateQueries({
                queryKey: allocationsKeys.records(allocationId),
            });
            // Invalidar cache da alocação
            queryClient.invalidateQueries({
                queryKey: allocationsKeys.detail(allocationId),
            });
        },
    });
}
