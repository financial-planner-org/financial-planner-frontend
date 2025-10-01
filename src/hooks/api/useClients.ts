/**
 * @fileoverview Hooks para gerenciar clientes
 * @description Hooks usando TanStack Query para operações de clientes
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsApiService } from '@/lib/api/services';
import type { Client, CreateClientRequest, UpdateClientRequest } from '@/lib/types/api';

// Chaves de query
export const clientsKeys = {
    all: ['clients'] as const,
    lists: () => [...clientsKeys.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...clientsKeys.lists(), { filters }] as const,
    details: () => [...clientsKeys.all, 'detail'] as const,
    detail: (id: number) => [...clientsKeys.details(), id] as const,
};

/**
 * Hook para listar todos os clientes
 */
export function useClients() {
    return useQuery({
        queryKey: clientsKeys.lists(),
        queryFn: () => clientsApiService.getClients(),
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}

/**
 * Hook para buscar um cliente específico
 */
export function useClient(id: number) {
    return useQuery({
        queryKey: clientsKeys.detail(id),
        queryFn: () => clientsApiService.getClient(id),
        enabled: !!id,
    });
}

/**
 * Hook para criar um novo cliente
 */
export function useCreateClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateClientRequest) => clientsApiService.createClient(data),
        onSuccess: () => {
            // Invalidar cache de clientes
            queryClient.invalidateQueries({ queryKey: clientsKeys.lists() });
        },
    });
}

/**
 * Hook para atualizar um cliente
 */
export function useUpdateClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateClientRequest }) =>
            clientsApiService.updateClient(id, data),
        onSuccess: (_, { id }) => {
            // Invalidar cache específico do cliente e lista
            queryClient.invalidateQueries({ queryKey: clientsKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: clientsKeys.lists() });
        },
    });
}

/**
 * Hook para deletar um cliente
 */
export function useDeleteClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => clientsApiService.deleteClient(id),
        onSuccess: () => {
            // Invalidar cache de clientes
            queryClient.invalidateQueries({ queryKey: clientsKeys.lists() });
        },
    });
}
