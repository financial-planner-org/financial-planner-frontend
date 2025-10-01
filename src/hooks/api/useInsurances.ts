/**
 * @fileoverview Hook para seguros
 * @description Hook usando TanStack Query para operações de seguros
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { insurancesApiService } from '@/lib/api/services';
import type {
    Insurance,
    CreateInsuranceRequest,
    UpdateInsuranceRequest
} from '@/lib/types/api';

// Chaves de query
export const insurancesKeys = {
    all: ['insurances'] as const,
    lists: () => [...insurancesKeys.all, 'list'] as const,
    list: (simulationId: number) => [...insurancesKeys.lists(), simulationId] as const,
    details: () => [...insurancesKeys.all, 'detail'] as const,
    detail: (id: number) => [...insurancesKeys.details(), id] as const,
};

/**
 * Hook para listar seguros de uma simulação
 */
export function useInsurances(simulationId?: number) {
    return useQuery({
        queryKey: insurancesKeys.list(simulationId || 0),
        queryFn: () => insurancesApiService.getSimulationInsurances(simulationId!),
        enabled: !!simulationId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
}

/**
 * Hook para buscar um seguro específico
 */
export function useInsurance(id: number) {
    return useQuery({
        queryKey: insurancesKeys.detail(id),
        queryFn: () => insurancesApiService.getInsurance(id),
        enabled: !!id,
    });
}

/**
 * Hook para criar um novo seguro
 */
export function useCreateInsurance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateInsuranceRequest) => insurancesApiService.createInsurance(data),
        onSuccess: (_, variables) => {
            // Invalidar cache de seguros da simulação
            queryClient.invalidateQueries({
                queryKey: insurancesKeys.list(variables.simulationId),
            });
            // Invalidar cache geral de seguros
            queryClient.invalidateQueries({ queryKey: insurancesKeys.lists() });
        },
    });
}

/**
 * Hook para atualizar um seguro
 */
export function useUpdateInsurance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateInsuranceRequest }) =>
            insurancesApiService.updateInsurance(id, data),
        onSuccess: (updatedInsurance) => {
            // Invalidar cache específico do seguro
            queryClient.invalidateQueries({
                queryKey: insurancesKeys.detail(updatedInsurance.id),
            });
            // Invalidar cache de seguros da simulação
            queryClient.invalidateQueries({
                queryKey: insurancesKeys.list(updatedInsurance.simulationId),
            });
            // Invalidar cache geral de seguros
            queryClient.invalidateQueries({ queryKey: insurancesKeys.lists() });
        },
    });
}

/**
 * Hook para deletar um seguro
 */
export function useDeleteInsurance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => insurancesApiService.deleteInsurance(id),
        onSuccess: (_, id) => {
            // Invalidar cache específico do seguro
            queryClient.invalidateQueries({ queryKey: insurancesKeys.detail(id) });
            // Invalidar cache geral de seguros
            queryClient.invalidateQueries({ queryKey: insurancesKeys.lists() });
        },
    });
}
