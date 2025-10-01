/**
 * @fileoverview Serviço de API para Seguros
 * @description Funções para gerenciar seguros via API
 */

import { apiClient } from '../client';
import type {
    Insurance,
    CreateInsuranceRequest,
    UpdateInsuranceRequest,
} from '../../types/api';

export class InsurancesApiService {
    /**
     * Lista seguros de uma simulação
     */
    async getSimulationInsurances(simulationId: number): Promise<Insurance[]> {
        try {
            return await apiClient.get<Insurance[]>(`/simulations/${simulationId}/insurances`);
        } catch (error) {
            console.error(`Erro ao buscar seguros da simulação ${simulationId}:`, error);
            throw new Error('Falha ao carregar seguros da simulação');
        }
    }

    /**
     * Busca um seguro por ID
     */
    async getInsurance(id: number): Promise<Insurance> {
        try {
            return await apiClient.get<Insurance>(`/insurances/${id}`);
        } catch (error) {
            console.error(`Erro ao buscar seguro ${id}:`, error);
            throw new Error('Seguro não encontrado');
        }
    }

    /**
     * Cria um novo seguro
     */
    async createInsurance(data: CreateInsuranceRequest): Promise<Insurance> {
        try {
            return await apiClient.post<Insurance>('/insurances', data);
        } catch (error) {
            console.error('Erro ao criar seguro:', error);
            throw new Error('Falha ao criar seguro');
        }
    }

    /**
     * Atualiza um seguro existente
     */
    async updateInsurance(id: number, data: UpdateInsuranceRequest): Promise<Insurance> {
        try {
            return await apiClient.put<Insurance>(`/insurances/${id}`, data);
        } catch (error) {
            console.error(`Erro ao atualizar seguro ${id}:`, error);
            throw new Error('Falha ao atualizar seguro');
        }
    }

    /**
     * Remove um seguro
     */
    async deleteInsurance(id: number): Promise<{ id: number; deleted: boolean }> {
        try {
            return await apiClient.delete<{ id: number; deleted: boolean }>(`/insurances/${id}`);
        } catch (error) {
            console.error(`Erro ao deletar seguro ${id}:`, error);
            throw new Error('Falha ao remover seguro');
        }
    }

    /**
     * Lista seguros por tipo
     */
    async getInsurancesByType(simulationId: number, type: 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO'): Promise<Insurance[]> {
        try {
            return await apiClient.get<Insurance[]>(`/simulations/${simulationId}/insurances?type=${type}`);
        } catch (error) {
            console.error(`Erro ao buscar seguros por tipo ${type}:`, error);
            throw new Error('Falha ao carregar seguros por tipo');
        }
    }

    /**
     * Calcula resumo de seguros de uma simulação
     */
    async getInsuranceSummary(simulationId: number): Promise<{
        totalInsurances: number;
        totalInsuredValue: number;
        totalMonthlyPremium: number;
        byType: {
            type: string;
            count: number;
            totalValue: number;
            totalPremium: number;
        }[];
    }> {
        try {
            return await apiClient.get(`/simulations/${simulationId}/insurances/summary`);
        } catch (error) {
            console.error(`Erro ao buscar resumo de seguros da simulação ${simulationId}:`, error);
            throw new Error('Falha ao carregar resumo de seguros');
        }
    }
}

export const insurancesApiService = new InsurancesApiService();
export default insurancesApiService;
