import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Tipos para alocação
export interface Allocation {
    id: number;
    simulationId: number;
    type: string;
    name: string;
    value: number;
    startDate?: string;
    installments?: number;
    interestRate?: number;
    createdAt: string;
    updatedAt: string;
    records?: AssetRecord[];
}

export interface AssetRecord {
    id: number;
    allocationId: number;
    date: string;
    value: number;
    createdAt: string;
}

export interface CreateAllocationInput {
    simulationId: number;
    type: string;
    name: string;
    value: number;
    startDate?: string;
    installments?: number;
    interestRate?: number;
}

export interface UpdateAllocationInput extends Partial<CreateAllocationInput> {
    id: number;
}

export interface CreateAssetRecordInput {
    allocationId: number;
    date: string;
    value: number;
}

// Hook para listar alocações de uma simulação
export function useAllocations(simulationId: number) {
    return useQuery<Allocation[]>({
        queryKey: ['allocations', simulationId],
        queryFn: async () => {
            const response = await api.get(`/allocations/${simulationId}`);
            return response.data;
        },
        enabled: !!simulationId,
        staleTime: 5 * 60 * 1000,
    });
}

// Hook para obter uma alocação específica
export function useAllocation(id: number) {
    return useQuery<Allocation>({
        queryKey: ['allocation', id],
        queryFn: async () => {
            const response = await api.get(`/allocations/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
}

// Hook para criar alocação
export function useCreateAllocation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateAllocationInput) => {
            const response = await api.post('/allocations', data);
            return response.data;
        },
        onSuccess: (data) => {
            // Invalidar queries de alocações da simulação
            queryClient.invalidateQueries({
                queryKey: ['allocations', data.simulationId]
            });
        },
    });
}

// Hook para atualizar alocação
export function useUpdateAllocation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateAllocationInput) => {
            const { id, ...updateData } = data;
            const response = await api.put(`/allocations/${id}`, updateData);
            return response.data;
        },
        onSuccess: (data) => {
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['allocation', data.id] });
            queryClient.invalidateQueries({
                queryKey: ['allocations', data.simulationId]
            });
        },
    });
}

// Hook para deletar alocação
export function useDeleteAllocation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/allocations/${id}`);
            return id;
        },
        onSuccess: (id) => {
            // Remover alocação do cache
            queryClient.removeQueries({ queryKey: ['allocation', id] });
            // Invalidar todas as listas de alocações
            queryClient.invalidateQueries({ queryKey: ['allocations'] });
        },
    });
}

// Hook para criar registro de ativo
export function useCreateAssetRecord() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateAssetRecordInput) => {
            const response = await api.post(`/allocations/${data.allocationId}/records`, data);
            return response.data;
        },
        onSuccess: (data) => {
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({
                queryKey: ['allocation', data.allocationId]
            });
            queryClient.invalidateQueries({ queryKey: ['allocations'] });
        },
    });
}
