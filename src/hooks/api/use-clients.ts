import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Tipos para cliente
export interface Client {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateClientInput {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    isActive?: boolean;
}

export interface UpdateClientInput extends Partial<CreateClientInput> {
    id: number;
}

// Hook para listar clientes
export function useClients() {
    return useQuery<Client[]>({
        queryKey: ['clients'],
        queryFn: async () => {
            const response = await api.get('/clients');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}

// Hook para obter um cliente específico
export function useClient(id: number) {
    return useQuery<Client>({
        queryKey: ['clients', id],
        queryFn: async () => {
            const response = await api.get(`/clients/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
}

// Hook para criar cliente
export function useCreateClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateClientInput) => {
            const response = await api.post('/clients', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });
}

// Hook para atualizar cliente
export function useUpdateClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateClientInput) => {
            const { id, ...updateData } = data;
            const response = await api.put(`/clients/${id}`, updateData);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            queryClient.invalidateQueries({ queryKey: ['clients', data.id] });
        },
    });
}

// Hook para deletar cliente
export function useDeleteClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/clients/${id}`);
            return id;
        },
        onSuccess: (id) => {
            queryClient.removeQueries({ queryKey: ['clients', id] });
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });
}
