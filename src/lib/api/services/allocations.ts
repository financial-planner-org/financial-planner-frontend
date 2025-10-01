/**
 * @fileoverview Serviço de API para Alocações
 * @description Funções para gerenciar alocações via API
 */

import { apiClient } from '../client';
import type {
    Allocation,
    AssetRecord,
    CreateAllocationRequest,
    UpdateAllocationRequest,
    CreateAllocationRecordRequest,
    AllocationFilters,
} from '../../types/api';

export class AllocationsApiService {
    /**
     * Lista alocações de uma simulação
     */
    async getSimulationAllocations(simulationId: number): Promise<Allocation[]> {
        try {
            return await apiClient.get<Allocation[]>(`/simulations/${simulationId}/allocations`);
        } catch (error) {
            console.error(`Erro ao buscar alocações da simulação ${simulationId}:`, error);
            throw new Error('Falha ao carregar alocações da simulação');
        }
    }

    /**
     * Busca uma alocação por ID
     */
    async getAllocation(id: number): Promise<Allocation> {
        try {
            return await apiClient.get<Allocation>(`/allocations/${id}`);
        } catch (error) {
            console.error(`Erro ao buscar alocação ${id}:`, error);
            throw new Error('Alocação não encontrada');
        }
    }

    /**
     * Cria uma nova alocação
     */
    async createAllocation(data: CreateAllocationRequest): Promise<Allocation> {
        try {
            return await apiClient.post<Allocation>('/allocations', data);
        } catch (error) {
            console.error('Erro ao criar alocação:', error);
            throw new Error('Falha ao criar alocação');
        }
    }

    /**
     * Atualiza uma alocação existente
     */
    async updateAllocation(id: number, data: UpdateAllocationRequest): Promise<Allocation> {
        try {
            return await apiClient.put<Allocation>(`/allocations/${id}`, data);
        } catch (error) {
            console.error(`Erro ao atualizar alocação ${id}:`, error);
            throw new Error('Falha ao atualizar alocação');
        }
    }

    /**
     * Remove uma alocação
     */
    async deleteAllocation(id: number): Promise<{ id: number; deleted: boolean }> {
        try {
            return await apiClient.delete<{ id: number; deleted: boolean }>(`/allocations/${id}`);
        } catch (error) {
            console.error(`Erro ao deletar alocação ${id}:`, error);
            throw new Error('Falha ao remover alocação');
        }
    }

    /**
     * Adiciona um registro de valor a uma alocação (botão "Atualizar")
     */
    async addAllocationRecord(
        allocationId: number,
        data: CreateAllocationRecordRequest
    ): Promise<AssetRecord> {
        try {
            return await apiClient.post<AssetRecord>(`/allocations/${allocationId}/records`, data);
        } catch (error) {
            console.error(`Erro ao adicionar registro à alocação ${allocationId}:`, error);
            throw new Error('Falha ao atualizar valor da alocação');
        }
    }

    /**
     * Lista registros históricos de uma alocação
     */
    async getAllocationRecords(allocationId: number): Promise<AssetRecord[]> {
        try {
            return await apiClient.get<AssetRecord[]>(`/allocations/${allocationId}/records`);
        } catch (error) {
            console.error(`Erro ao buscar registros da alocação ${allocationId}:`, error);
            throw new Error('Falha ao carregar histórico da alocação');
        }
    }

    /**
     * Atualiza o valor atual de uma alocação (conveniência)
     */
    async updateAllocationValue(
        allocationId: number,
        value: number,
        notes?: string
    ): Promise<AssetRecord> {
        return this.addAllocationRecord(allocationId, { value, notes });
    }
}

export const allocationsApiService = new AllocationsApiService();
export default allocationsApiService;
