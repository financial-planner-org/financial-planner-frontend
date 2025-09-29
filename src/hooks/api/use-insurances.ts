import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Tipos para seguro
export interface Insurance {
    id: number;
    simulationId: number;
    name: string;
    type: string;
    startDate: string;
    durationMonths: number;
    premium: number;
    insuredValue: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateInsuranceInput {
    simulationId: number;
    name: string;
    startDate: string;
    durationMonths: number;
    premium: number;
    insuredValue: number;
}

export interface UpdateInsuranceInput extends Partial<CreateInsuranceInput> {
    id: number;
}

// Hook para listar seguros de uma simulação
export function useInsurances(simulationId: number) {
    return useQuery<Insurance[]>({
        queryKey: ['insurances', simulationId],
        queryFn: async () => {
            const response = await api.get(`/insurances/${simulationId}`);
            return response.data;
        },
        enabled: !!simulationId,
        staleTime: 5 * 60 * 1000,
    });
}

// Hook para obter um seguro específico
export function useInsurance(id: number) {
    return useQuery<Insurance>({
        queryKey: ['insurance', id],
        queryFn: async () => {
            const response = await api.get(`/insurances/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
}

// Hook para criar seguro
export function useCreateInsurance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateInsuranceInput) => {
            const response = await api.post('/insurances', data);
            return response.data;
        },
        onSuccess: (data) => {
            // Invalidar queries de seguros da simulação
            queryClient.invalidateQueries({
                queryKey: ['insurances', data.simulationId]
            });
        },
    });
}

// Hook para atualizar seguro
export function useUpdateInsurance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateInsuranceInput) => {
            const { id, ...updateData } = data;
            const response = await api.put(`/insurances/${id}`, updateData);
            return response.data;
        },
        onSuccess: (data) => {
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['insurance', data.id] });
            queryClient.invalidateQueries({
                queryKey: ['insurances', data.simulationId]
            });
        },
    });
}

// Hook para deletar seguro
export function useDeleteInsurance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/insurances/${id}`);
            return id;
        },
        onSuccess: (id) => {
            // Remover seguro do cache
            queryClient.removeQueries({ queryKey: ['insurance', id] });
            // Invalidar todas as listas de seguros
            queryClient.invalidateQueries({ queryKey: ['insurances'] });
        },
    });
}
