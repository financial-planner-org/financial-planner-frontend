import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Tipos para movimentação
export interface Movement {
    id: number;
    simulationId: number;
    type: string;
    value: number;
    frequency: string;
    startDate: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateMovementInput {
    simulationId: number;
    type: string;
    value: number;
    frequency: string;
    startDate: string;
    endDate?: string;
}

export interface UpdateMovementInput extends Partial<CreateMovementInput> {
    id: number;
}

// Hook para listar movimentações de uma simulação
export function useMovements(simulationId: number) {
    return useQuery<Movement[]>({
        queryKey: ['movements', simulationId],
        queryFn: async () => {
            const response = await api.get(`/simulations/${simulationId}/movements`);
            return response.data;
        },
        enabled: !!simulationId,
        staleTime: 5 * 60 * 1000,
    });
}

// Hook para obter uma movimentação específica
export function useMovement(id: number) {
    return useQuery<Movement>({
        queryKey: ['movement', id],
        queryFn: async () => {
            const response = await api.get(`/movements/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
}

// Hook para criar movimentação
export function useCreateMovement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateMovementInput) => {
            const response = await api.post('/movements', data);
            return response.data;
        },
        onSuccess: (data) => {
            // Invalidar queries de movimentações da simulação
            queryClient.invalidateQueries({
                queryKey: ['movements', data.simulationId]
            });
        },
    });
}

// Hook para atualizar movimentação
export function useUpdateMovement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateMovementInput) => {
            const { id, ...updateData } = data;
            const response = await api.put(`/movements/${id}`, updateData);
            return response.data;
        },
        onSuccess: (data) => {
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['movement', data.id] });
            queryClient.invalidateQueries({
                queryKey: ['movements', data.simulationId]
            });
        },
    });
}

// Hook para deletar movimentação
export function useDeleteMovement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/movements/${id}`);
            return id;
        },
        onSuccess: (id) => {
            // Remover movimentação do cache
            queryClient.removeQueries({ queryKey: ['movement', id] });
            // Invalidar todas as listas de movimentações
            queryClient.invalidateQueries({ queryKey: ['movements'] });
        },
    });
}
