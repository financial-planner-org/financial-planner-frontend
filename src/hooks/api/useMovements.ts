/**
 * @fileoverview Hook para movimentações
 * @description Hook usando TanStack Query para operações de movimentações
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { movementsApiService } from '@/lib/api/services';
import type {
    CreateMovementRequest,
    UpdateMovementRequest
} from '@/lib/types/api';

// Chaves de query
export const movementsKeys = {
    all: ['movements'] as const,
    lists: () => [...movementsKeys.all, 'list'] as const,
    list: (simulationId: number) => [...movementsKeys.lists(), simulationId] as const,
    details: () => [...movementsKeys.all, 'detail'] as const,
    detail: (id: number) => [...movementsKeys.details(), id] as const,
};

/**
 * Hook para listar movimentações de uma simulação
 */
export function useMovements(simulationId?: number) {
    return useQuery({
        queryKey: movementsKeys.list(simulationId || 0),
        queryFn: () => movementsApiService.getSimulationMovements(simulationId!),
        enabled: !!simulationId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
}

/**
 * Hook para buscar uma movimentação específica
 */
export function useMovement(id: number) {
    return useQuery({
        queryKey: movementsKeys.detail(id),
        queryFn: () => movementsApiService.getMovement(id),
        enabled: !!id,
    });
}

/**
 * Hook para criar uma nova movimentação
 */
export function useCreateMovement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateMovementRequest) => movementsApiService.createMovement(data),
        onSuccess: (_, variables) => {
            // Invalidar cache de movimentações da simulação
            queryClient.invalidateQueries({
                queryKey: movementsKeys.list(variables.simulationId),
            });
            // Invalidar cache geral de movimentações
            queryClient.invalidateQueries({ queryKey: movementsKeys.lists() });
        },
    });
}

/**
 * Hook para atualizar uma movimentação
 */
export function useUpdateMovement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateMovementRequest }) =>
            movementsApiService.updateMovement(id, data),
        onSuccess: (updatedMovement) => {
            // Invalidar cache específico da movimentação
            queryClient.invalidateQueries({
                queryKey: movementsKeys.detail(updatedMovement.id),
            });
            // Invalidar cache de movimentações da simulação
            queryClient.invalidateQueries({
                queryKey: movementsKeys.list(updatedMovement.simulationId),
            });
            // Invalidar cache geral de movimentações
            queryClient.invalidateQueries({ queryKey: movementsKeys.lists() });
        },
    });
}

/**
 * Hook para deletar uma movimentação
 */
export function useDeleteMovement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => movementsApiService.deleteMovement(id),
        onSuccess: (_, id) => {
            // Invalidar cache específico da movimentação
            queryClient.invalidateQueries({ queryKey: movementsKeys.detail(id) });
            // Invalidar cache geral de movimentações
            queryClient.invalidateQueries({ queryKey: movementsKeys.lists() });
        },
    });
}
