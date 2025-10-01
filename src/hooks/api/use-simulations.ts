import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Tipos para simulação
export interface Simulation {
  id: number;
  name: string;
  startDate: string;
  realRate: number;
  status: string;
  baseId?: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

export interface CreateSimulationInput {
  name: string;
  description?: string;
  realRate: number;
  status: string;
  startDate: string;
  clientId: number;
}

export interface UpdateSimulationInput extends Partial<CreateSimulationInput> {
  id: number;
}

// Hook para listar simulações
export function useSimulations() {
  return useQuery<Simulation[]>({
    queryKey: ['simulations'],
    queryFn: async () => {
      const response = await api.get('/simulations');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para obter uma simulação específica
export function useSimulation(id: number) {
  return useQuery<Simulation>({
    queryKey: ['simulations', id],
    queryFn: async () => {
      const response = await api.get(`/simulations/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook para criar simulação
export function useCreateSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSimulationInput) => {
      const response = await api.post('/simulations', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidar queries de simulações para refetch automático
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
}

// Hook para atualizar simulação
export function useUpdateSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateSimulationInput) => {
      const { id, ...updateData } = data;
      const response = await api.put(`/simulations/${id}`, updateData);
      return response.data;
    },
    onSuccess: data => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
      queryClient.invalidateQueries({ queryKey: ['simulations', data.id] });
    },
  });
}

// Hook para deletar simulação
export function useDeleteSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/simulations/${id}`);
      return id;
    },
    onSuccess: id => {
      // Remover simulação do cache
      queryClient.removeQueries({ queryKey: ['simulations', id] });
      // Invalidar lista de simulações
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
}

// Hook para verificar status de uma simulação
export function useSimulationStatus(id: number) {
  return useQuery({
    queryKey: ['simulations', id, 'status'],
    queryFn: async () => {
      const response = await api.get(`/simulations/${id}/status`);
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook para criar Situação Atual
export function useCreateCurrentSituation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (baseSimulationId: number) => {
      const response = await api.post(`/simulations/${baseSimulationId}/current-situation`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
}

export interface SimulationStatus {
  simulationId: number;
  isCurrentSituation: boolean;
  canEdit: boolean;
  canDelete: boolean;
  isLegacy: boolean;
  restrictions: {
    cannotEdit: boolean;
    cannotDelete: boolean;
    isLegacyVersion: boolean;
    isCurrentSituation: boolean;
  };
}
