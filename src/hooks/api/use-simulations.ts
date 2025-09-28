import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { simulationsApi } from '@/lib/api/simulations';
import { CreateSimulationDto, UpdateSimulationDto } from '@/lib/types/core';
import { CACHE_CONFIG } from '@/lib/constants/api';

// Query keys centralizadas
export const simulationKeys = {
    all: [CACHE_CONFIG.keys.simulations] as const,
    lists: () => [...simulationKeys.all, 'list'] as const,
    list: (filters: string) => [...simulationKeys.lists(), { filters }] as const,
    details: () => [...simulationKeys.all, 'detail'] as const,
    detail: (id: string) => [...simulationKeys.details(), id] as const,
    projections: () => [...simulationKeys.all, 'projections'] as const,
    projection: (id: string, status: string) => [...simulationKeys.projections(), id, status] as const,
    currentSituation: () => [...simulationKeys.all, CACHE_CONFIG.keys.currentSituation] as const,
};

// Hook para listar simulações
export function useSimulations() {
    return useQuery({
        queryKey: simulationKeys.lists(),
        queryFn: simulationsApi.getSimulations,
        staleTime: CACHE_CONFIG.staleTime,
        gcTime: CACHE_CONFIG.cacheTime,
    });
}

// Hook para obter simulação por ID
export function useSimulation(id: string) {
    return useQuery({
        queryKey: simulationKeys.detail(id),
        queryFn: () => simulationsApi.getSimulation(id),
        enabled: !!id,
        staleTime: CACHE_CONFIG.staleTime,
        gcTime: CACHE_CONFIG.cacheTime,
    });
}

// Hook para obter situação atual
export function useCurrentSituation() {
    return useQuery({
        queryKey: simulationKeys.currentSituation(),
        queryFn: simulationsApi.getCurrentSituation,
        staleTime: CACHE_CONFIG.staleTime,
        gcTime: CACHE_CONFIG.cacheTime,
    });
}

// Hook para obter projeção
export function useProjection(id: string, status: 'Vivo' | 'Morto' | 'Inválido') {
    return useQuery({
        queryKey: simulationKeys.projection(id, status),
        queryFn: () => simulationsApi.getProjection(id, status),
        enabled: !!id && !!status,
        staleTime: CACHE_CONFIG.staleTime,
        gcTime: CACHE_CONFIG.cacheTime,
    });
}

// Hook para criar simulação
export function useCreateSimulation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: simulationsApi.createSimulation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: simulationKeys.lists() });
        },
    });
}

// Hook para atualizar simulação
export function useUpdateSimulation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateSimulationDto }) =>
            simulationsApi.updateSimulation(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: simulationKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: simulationKeys.lists() });
        },
    });
}

// Hook para deletar simulação
export function useDeleteSimulation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: simulationsApi.deleteSimulation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: simulationKeys.lists() });
        },
    });
}

// Hook para duplicar simulação
export function useDuplicateSimulation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) =>
            simulationsApi.duplicateSimulation(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: simulationKeys.lists() });
        },
    });
}

// Hook para criar nova versão
export function useCreateVersion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: simulationsApi.createVersion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: simulationKeys.lists() });
        },
    });
}
