/**
 * @fileoverview Serviço de API para Simulações
 * @description Funções para gerenciar simulações via API
 */

import { apiClient } from '../client';
import type {
    Simulation,
    SimulationHistoryItem,
    SimulationStatus,
    CreateSimulationRequest,
    UpdateSimulationRequest,
    SimulationFilters,
} from '../../types/api';

export class SimulationsApiService {
    /**
     * Lista todas as simulações
     */
    async getSimulations(): Promise<Simulation[]> {
        try {
            return await apiClient.get<Simulation[]>('/simulations');
        } catch (error) {
            console.error('Erro ao buscar simulações:', error);
            throw new Error('Falha ao carregar simulações');
        }
    }

    /**
     * Lista histórico de simulações com versões
     */
    async getSimulationsHistory(filters?: SimulationFilters): Promise<SimulationHistoryItem[]> {
        try {
            const queryParams = new URLSearchParams();

            if (filters?.clientId) {
                queryParams.append('clientId', filters.clientId.toString());
            }
            if (filters?.includeVersions !== undefined) {
                queryParams.append('includeVersions', filters.includeVersions.toString());
            }

            const queryString = queryParams.toString();
            const endpoint = queryString ? `/simulations/history?${queryString}` : '/simulations/history';

            return await apiClient.get<SimulationHistoryItem[]>(endpoint);
        } catch (error) {
            console.error('Erro ao buscar histórico de simulações:', error);
            throw new Error('Falha ao carregar histórico de simulações');
        }
    }

    /**
     * Busca uma simulação por ID
     */
    async getSimulation(id: number): Promise<Simulation> {
        try {
            return await apiClient.get<Simulation>(`/simulations/${id}`);
        } catch (error) {
            console.error(`Erro ao buscar simulação ${id}:`, error);
            throw new Error('Simulação não encontrada');
        }
    }

    /**
     * Cria uma nova simulação
     */
    async createSimulation(data: CreateSimulationRequest): Promise<Simulation> {
        try {
            return await apiClient.post<Simulation>('/simulations', data);
        } catch (error) {
            console.error('Erro ao criar simulação:', error);
            throw new Error('Falha ao criar simulação');
        }
    }

    /**
     * Atualiza uma simulação existente
     */
    async updateSimulation(id: number, data: UpdateSimulationRequest): Promise<Simulation> {
        try {
            return await apiClient.put<Simulation>(`/simulations/${id}`, data);
        } catch (error) {
            console.error(`Erro ao atualizar simulação ${id}:`, error);
            throw new Error('Falha ao atualizar simulação');
        }
    }

    /**
     * Remove uma simulação
     */
    async deleteSimulation(id: number): Promise<{ status: string; message: string }> {
        try {
            return await apiClient.delete<{ status: string; message: string }>(`/simulations/${id}`);
        } catch (error) {
            console.error(`Erro ao deletar simulação ${id}:`, error);
            throw new Error('Falha ao remover simulação');
        }
    }

    /**
     * Cria uma Situação Atual baseada na simulação
     */
    async createCurrentSituation(id: number): Promise<Simulation> {
        try {
            return await apiClient.post<Simulation>(`/simulations/${id}/current-situation`);
        } catch (error) {
            console.error(`Erro ao criar situação atual ${id}:`, error);
            throw new Error('Falha ao criar situação atual');
        }
    }

    /**
     * Verifica o status e permissões de uma simulação
     */
    async getSimulationStatus(id: number): Promise<SimulationStatus> {
        try {
            return await apiClient.get<SimulationStatus>(`/simulations/${id}/status`);
        } catch (error) {
            console.error(`Erro ao verificar status da simulação ${id}:`, error);
            throw new Error('Falha ao verificar status da simulação');
        }
    }

    /**
     * Duplica uma simulação
     */
    async duplicateSimulation(id: number, name?: string): Promise<Simulation> {
        try {
            return await apiClient.post<Simulation>(`/simulations/${id}/duplicate`, { name });
        } catch (error) {
            console.error(`Erro ao duplicar simulação ${id}:`, error);
            throw new Error('Falha ao duplicar simulação');
        }
    }

    /**
     * Cria uma nova versão de uma simulação
     */
    async createSimulationVersion(id: number, newName: string): Promise<Simulation> {
        try {
            return await apiClient.post<Simulation>(`/simulations/${id}/create-version`, { newName });
        } catch (error) {
            console.error(`Erro ao criar nova versão da simulação ${id}:`, error);
            throw new Error('Falha ao criar nova versão da simulação');
        }
    }
}

export const simulationsApiService = new SimulationsApiService();
export default simulationsApiService;
