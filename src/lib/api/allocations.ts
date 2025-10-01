import { apiClient, ApiResponse } from './client';
import {
  Allocation,
  AllocationRecord,
  CreateAllocationInput,
  UpdateAllocationInput,
  CreateAllocationRecordInput,
} from '@/lib/types/core';

// Endpoints para alocações
export const allocationsApi = {
  // Listar alocações por simulação
  getAllocations: async (simulationId: string): Promise<Allocation[]> => {
    const response = await apiClient.get<ApiResponse<Allocation[]>>(
      `/simulations/${simulationId}/allocations`
    );
    return response.data.data;
  },

  // Obter alocação por ID
  getAllocation: async (id: string): Promise<Allocation> => {
    const response = await apiClient.get<ApiResponse<Allocation>>(`/allocations/${id}`);
    return response.data.data;
  },

  // Criar alocação
  createAllocation: async (data: CreateAllocationInput): Promise<Allocation> => {
    const response = await apiClient.post<ApiResponse<Allocation>>('/allocations', data);
    return response.data.data;
  },

  // Atualizar alocação
  updateAllocation: async (id: string, data: UpdateAllocationInput): Promise<Allocation> => {
    const response = await apiClient.put<ApiResponse<Allocation>>(`/allocations/${id}`, data);
    return response.data.data;
  },

  // Deletar alocação
  deleteAllocation: async (id: string): Promise<void> => {
    await apiClient.delete(`/allocations/${id}`);
  },

  // Obter histórico de alocação
  getAllocationHistory: async (allocationId: string): Promise<AllocationRecord[]> => {
    const response = await apiClient.get<ApiResponse<AllocationRecord[]>>(
      `/allocations/${allocationId}/history`
    );
    return response.data.data;
  },

  // Criar registro de alocação
  createAllocationRecord: async (data: CreateAllocationRecordInput): Promise<AllocationRecord> => {
    const response = await apiClient.post<ApiResponse<AllocationRecord>>(
      '/allocations/records',
      data
    );
    return response.data.data;
  },

  // Atualizar registro de alocação
  updateAllocationRecord: async (
    id: string,
    data: Partial<CreateAllocationRecordInput>
  ): Promise<AllocationRecord> => {
    const response = await apiClient.put<ApiResponse<AllocationRecord>>(
      `/allocations/records/${id}`,
      data
    );
    return response.data.data;
  },

  // Deletar registro de alocação
  deleteAllocationRecord: async (id: string): Promise<void> => {
    await apiClient.delete(`/allocations/records/${id}`);
  },

  // Atualizar alocação (criar novo registro na data atual)
  updateAllocationValue: async (id: string, value: number): Promise<AllocationRecord> => {
    const response = await apiClient.post<ApiResponse<AllocationRecord>>(
      `/allocations/${id}/update`,
      { value }
    );
    return response.data.data;
  },
};
