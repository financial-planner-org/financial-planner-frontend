import { apiClient, ApiResponse, PaginatedResponse } from './client';
import {
  Simulation,
  Projection,
  CreateSimulationInput,
  UpdateSimulationInput,
} from '@/lib/types/core';

// Endpoints para simulações
export const simulationsApi = {
  // Listar simulações
  getSimulations: async (): Promise<Simulation[]> => {
    const response = await apiClient.get<ApiResponse<Simulation[]>>('/simulations');
    return response.data.data;
  },

  // Obter simulação por ID
  getSimulation: async (id: string): Promise<Simulation> => {
    const response = await apiClient.get<ApiResponse<Simulation>>(`/simulations/${id}`);
    return response.data.data;
  },

  // Criar simulação
  createSimulation: async (data: CreateSimulationInput): Promise<Simulation> => {
    const response = await apiClient.post<ApiResponse<Simulation>>('/simulations', data);
    return response.data.data;
  },

  // Atualizar simulação
  updateSimulation: async (id: string, data: UpdateSimulationInput): Promise<Simulation> => {
    const response = await apiClient.put<ApiResponse<Simulation>>(`/simulations/${id}`, data);
    return response.data.data;
  },

  // Deletar simulação
  deleteSimulation: async (id: string): Promise<void> => {
    await apiClient.delete(`/simulations/${id}`);
  },

  // Duplicar simulação
  duplicateSimulation: async (id: string, name: string): Promise<Simulation> => {
    const response = await apiClient.post<ApiResponse<Simulation>>(`/simulations/${id}/duplicate`, {
      name,
    });
    return response.data.data;
  },

  // Criar nova versão
  createVersion: async (id: string): Promise<Simulation> => {
    const response = await apiClient.post<ApiResponse<Simulation>>(`/simulations/${id}/version`);
    return response.data.data;
  },

  // Obter projeção
  getProjection: async (
    id: string,
    status: 'Vivo' | 'Morto' | 'Inválido'
  ): Promise<Projection[]> => {
    const response = await apiClient.get<ApiResponse<Projection[]>>(
      `/simulations/${id}/projection`,
      {
        params: { status },
      }
    );
    return response.data.data;
  },

  // Obter situação atual
  getCurrentSituation: async (): Promise<Simulation> => {
    const response = await apiClient.get<ApiResponse<Simulation>>('/simulations/current-situation');
    return response.data.data;
  },
};
