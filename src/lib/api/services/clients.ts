/**
 * @fileoverview Serviço de API para Clientes
 * @description Funções para gerenciar clientes via API
 */

import { apiClient } from '../client';
import type {
    Client,
    CreateClientRequest,
    UpdateClientRequest,
    ApiErrorResponse,
} from '../../types/api';

export class ClientsApiService {
    /**
     * Lista todos os clientes
     */
    async getClients(): Promise<Client[]> {
        try {
            return await apiClient.get<Client[]>('/clients');
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            throw new Error('Falha ao carregar clientes');
        }
    }

    /**
     * Busca um cliente por ID
     */
    async getClient(id: number): Promise<Client> {
        try {
            return await apiClient.get<Client>(`/clients/${id}`);
        } catch (error) {
            console.error(`Erro ao buscar cliente ${id}:`, error);
            throw new Error('Cliente não encontrado');
        }
    }

    /**
     * Cria um novo cliente
     */
    async createClient(data: CreateClientRequest): Promise<Client> {
        try {
            return await apiClient.post<Client>('/clients', data);
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            throw new Error('Falha ao criar cliente');
        }
    }

    /**
     * Atualiza um cliente existente
     */
    async updateClient(id: number, data: UpdateClientRequest): Promise<Client> {
        try {
            return await apiClient.put<Client>(`/clients/${id}`, data);
        } catch (error) {
            console.error(`Erro ao atualizar cliente ${id}:`, error);
            throw new Error('Falha ao atualizar cliente');
        }
    }

    /**
     * Remove um cliente
     */
    async deleteClient(id: number): Promise<{ id: number; deleted: boolean }> {
        try {
            return await apiClient.delete<{ id: number; deleted: boolean }>(`/clients/${id}`);
        } catch (error) {
            console.error(`Erro ao deletar cliente ${id}:`, error);
            throw new Error('Falha ao remover cliente');
        }
    }
}

export const clientsApiService = new ClientsApiService();
export default clientsApiService;
