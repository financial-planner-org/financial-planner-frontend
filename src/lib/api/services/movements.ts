/**
 * @fileoverview Serviço de API para Movimentações
 * @description Funções para gerenciar movimentações via API
 */

import { apiClient } from '../client';
import type {
    Movement,
    CreateMovementRequest,
    UpdateMovementRequest,
} from '../../types/api';

export class MovementsApiService {
    /**
     * Lista movimentações de uma simulação
     */
    async getSimulationMovements(simulationId: number): Promise<Movement[]> {
        try {
            return await apiClient.get<Movement[]>(`/simulations/${simulationId}/movements`);
        } catch (error) {
            console.error(`Erro ao buscar movimentações da simulação ${simulationId}:`, error);
            throw new Error('Falha ao carregar movimentações da simulação');
        }
    }

    /**
     * Busca uma movimentação por ID
     */
    async getMovement(id: number): Promise<Movement> {
        try {
            return await apiClient.get<Movement>(`/movements/${id}`);
        } catch (error) {
            console.error(`Erro ao buscar movimentação ${id}:`, error);
            throw new Error('Movimentação não encontrada');
        }
    }

    /**
     * Cria uma nova movimentação
     */
    async createMovement(data: CreateMovementRequest): Promise<Movement> {
        try {
            return await apiClient.post<Movement>('/movements', data);
        } catch (error) {
            console.error('Erro ao criar movimentação:', error);
            throw new Error('Falha ao criar movimentação');
        }
    }

    /**
     * Atualiza uma movimentação existente
     */
    async updateMovement(id: number, data: UpdateMovementRequest): Promise<Movement> {
        try {
            return await apiClient.put<Movement>(`/movements/${id}`, data);
        } catch (error) {
            console.error(`Erro ao atualizar movimentação ${id}:`, error);
            throw new Error('Falha ao atualizar movimentação');
        }
    }

    /**
     * Remove uma movimentação
     */
    async deleteMovement(id: number): Promise<{ id: number; deleted: boolean }> {
        try {
            return await apiClient.delete<{ id: number; deleted: boolean }>(`/movements/${id}`);
        } catch (error) {
            console.error(`Erro ao deletar movimentação ${id}:`, error);
            throw new Error('Falha ao remover movimentação');
        }
    }

    /**
     * Lista movimentações por categoria
     */
    async getMovementsByCategory(simulationId: number, category: string): Promise<Movement[]> {
        try {
            return await apiClient.get<Movement[]>(`/simulations/${simulationId}/movements?category=${category}`);
        } catch (error) {
            console.error(`Erro ao buscar movimentações por categoria ${category}:`, error);
            throw new Error('Falha ao carregar movimentações por categoria');
        }
    }

    /**
     * Lista movimentações por tipo
     */
    async getMovementsByType(simulationId: number, type: 'ENTRADA' | 'SAIDA'): Promise<Movement[]> {
        try {
            return await apiClient.get<Movement[]>(`/simulations/${simulationId}/movements?type=${type}`);
        } catch (error) {
            console.error(`Erro ao buscar movimentações por tipo ${type}:`, error);
            throw new Error('Falha ao carregar movimentações por tipo');
        }
    }

    /**
     * Lista movimentações por frequência
     */
    async getMovementsByFrequency(simulationId: number, frequency: 'UNICA' | 'MENSAL' | 'ANUAL'): Promise<Movement[]> {
        try {
            return await apiClient.get<Movement[]>(`/simulations/${simulationId}/movements?frequency=${frequency}`);
        } catch (error) {
            console.error(`Erro ao buscar movimentações por frequência ${frequency}:`, error);
            throw new Error('Falha ao carregar movimentações por frequência');
        }
    }
}

export const movementsApiService = new MovementsApiService();
export default movementsApiService;
