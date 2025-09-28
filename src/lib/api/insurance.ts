import { apiClient, ApiResponse } from './client';
import { Insurance, CreateInsuranceInput, UpdateInsuranceInput } from '@/lib/types/core';

// Endpoints para seguros
export const insuranceApi = {
    // Listar seguros por simulação
    getInsurances: async (simulationId: string): Promise<Insurance[]> => {
        const response = await apiClient.get<ApiResponse<Insurance[]>>(`/simulations/${simulationId}/insurance`);
        return response.data.data;
    },

    // Obter seguro por ID
    getInsurance: async (id: string): Promise<Insurance> => {
        const response = await apiClient.get<ApiResponse<Insurance>>(`/insurance/${id}`);
        return response.data.data;
    },

    // Criar seguro
    createInsurance: async (data: CreateInsuranceInput): Promise<Insurance> => {
        const response = await apiClient.post<ApiResponse<Insurance>>('/insurance', data);
        return response.data.data;
    },

    // Atualizar seguro
    updateInsurance: async (id: string, data: UpdateInsuranceInput): Promise<Insurance> => {
        const response = await apiClient.put<ApiResponse<Insurance>>(`/insurance/${id}`, data);
        return response.data.data;
    },

    // Deletar seguro
    deleteInsurance: async (id: string): Promise<void> => {
        await apiClient.delete(`/insurance/${id}`);
    }
};
