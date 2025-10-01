import { apiClient, ApiResponse } from './client';
import { Movement, CreateMovementInput, UpdateMovementInput } from '@/lib/types/core';

// Endpoints para movimentações
export const movementsApi = {
  // Listar movimentações por simulação
  getMovements: async (simulationId: string): Promise<Movement[]> => {
    const response = await apiClient.get<ApiResponse<Movement[]>>(
      `/simulations/${simulationId}/movements`
    );
    return response.data.data;
  },

  // Obter movimentação por ID
  getMovement: async (id: string): Promise<Movement> => {
    const response = await apiClient.get<ApiResponse<Movement>>(`/movements/${id}`);
    return response.data.data;
  },

  // Criar movimentação
  createMovement: async (data: CreateMovementInput): Promise<Movement> => {
    const response = await apiClient.post<ApiResponse<Movement>>('/movements', data);
    return response.data.data;
  },

  // Atualizar movimentação
  updateMovement: async (id: string, data: UpdateMovementInput): Promise<Movement> => {
    const response = await apiClient.put<ApiResponse<Movement>>(`/movements/${id}`, data);
    return response.data.data;
  },

  // Deletar movimentação
  deleteMovement: async (id: string): Promise<void> => {
    await apiClient.delete(`/movements/${id}`);
  },
};
