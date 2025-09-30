import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Tipos para histórico de simulações (baseado no backend real)
export interface SimulationHistoryItem {
    id: number;
    name: string;
    description?: string;
    status: string;
    baseId?: number;
    startDate: string;
    realRate: number;
    createdAt: string;
    updatedAt: string;
    clientId: number;
    isLegacy: boolean;
    isCurrentVersion: boolean;
    versions: number[];
    client?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface CreateVersionInput {
    simulationId: number;
    newName: string;
}

// Hook para buscar histórico de simulações usando a rota real do backend
export function useSimulationHistory(clientId?: number, includeVersions: boolean = true) {
    return useQuery<SimulationHistoryItem[]>({
        queryKey: ['simulations', 'history', clientId, includeVersions],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (clientId) params.append('clientId', clientId.toString());
            params.append('includeVersions', includeVersions.toString());

            // Usar a rota real do backend: /api/simulations/history
            const response = await api.get(`/simulations/history?${params.toString()}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}

// Hook para criar nova versão de simulação
export function useCreateSimulationVersion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateVersionInput) => {
            const response = await api.post(`/simulations/${data.simulationId}/create-version`, {
                newName: data.newName
            });
            return response.data;
        },
        onSuccess: () => {
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['simulations'] });
            queryClient.invalidateQueries({ queryKey: ['simulations', 'history'] });
        },
    });
}

// Hook para duplicar simulação
export function useDuplicateSimulation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ simulationId, newName }: { simulationId: number; newName: string }) => {
            const response = await api.post(`/simulations/${simulationId}/duplicate`, {
                name: newName
            });
            return response.data;
        },
        onSuccess: () => {
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['simulations'] });
            queryClient.invalidateQueries({ queryKey: ['simulations', 'history'] });
        },
    });
}

// Hook para verificar se uma simulação é legada
export function useSimulationLegacyStatus(simulationId: number) {
    return useQuery({
        queryKey: ['simulations', simulationId, 'legacy-status'],
        queryFn: async () => {
            const response = await api.get(`/simulations/${simulationId}/status`);
            return response.data;
        },
        enabled: !!simulationId,
    });
}
