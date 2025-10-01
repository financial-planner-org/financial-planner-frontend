/**
 * @fileoverview Hook simples para simulações
 * @description Hook usando TanStack Query para operações de simulações
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { simulationsApiService } from '@/lib/api/services';
import type { CreateSimulationRequest, UpdateSimulationRequest } from '@/lib/types/api';

// Chaves de query
export const simulationsKeys = {
    all: ['simulations'] as const,
    lists: () => [...simulationsKeys.all, 'list'] as const,
    details: () => [...simulationsKeys.all, 'detail'] as const,
    detail: (id: number) => [...simulationsKeys.details(), id] as const,
};

/**
 * Hook para listar todas as simulações
 */
export function useSimulations() {
    return useQuery({
        queryKey: simulationsKeys.lists(),
        queryFn: () => simulationsApiService.getSimulations(),
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}

/**
 * Hook para buscar uma simulação específica
 */
export function useSimulation(id: number) {
    return useQuery({
        queryKey: simulationsKeys.detail(id),
        queryFn: () => simulationsApiService.getSimulation(id),
        enabled: !!id,
    });
}

/**
 * Hook para criar uma nova simulação
 */
export function useCreateSimulation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateSimulationRequest) => simulationsApiService.createSimulation(data),
        onSuccess: () => {
            // Invalidar cache de simulações
            queryClient.invalidateQueries({ queryKey: simulationsKeys.lists() });
            queryClient.invalidateQueries({ queryKey: simulationsKeys.all });
        },
    });
}

/**
 * Hook para atualizar uma simulação
 */
export function useUpdateSimulation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateSimulationRequest }) =>
            simulationsApiService.updateSimulation(id, data),
        onSuccess: (_, { id }) => {
            // Invalidar cache específico da simulação e lista
            queryClient.invalidateQueries({ queryKey: simulationsKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: simulationsKeys.lists() });
            queryClient.invalidateQueries({ queryKey: simulationsKeys.all });
        },
    });
}

/**
 * Hook para deletar uma simulação
 */
export function useDeleteSimulation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => simulationsApiService.deleteSimulation(id),
        onSuccess: () => {
            // Invalidar cache de simulações
            queryClient.invalidateQueries({ queryKey: simulationsKeys.lists() });
            queryClient.invalidateQueries({ queryKey: simulationsKeys.all });
        },
    });
}