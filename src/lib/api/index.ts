// ============================================================================
// API CENTRALIZADA - FINANCIAL PLANNER
// ============================================================================
// Centraliza todas as chamadas de API e configurações

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, API_ENDPOINTS, HTTP_STATUS, API_ERROR_MESSAGES } from '../constants/api';

// ============================================================================
// CONFIGURAÇÃO DO AXIOS
// ============================================================================

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_CONFIG.baseURL,
            timeout: API_CONFIG.timeout,
            headers: API_CONFIG.headers,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Interceptor de request
        this.client.interceptors.request.use(
            (config) => {
                // Adicionar token de autenticação se disponível
                const token = localStorage.getItem('auth_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Interceptor de response
        this.client.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                this.handleError(error);
                return Promise.reject(error);
            }
        );
    }

    private handleError(error: AxiosError) {
        const status = error.response?.status;
        const message = status ? API_ERROR_MESSAGES[status as keyof typeof API_ERROR_MESSAGES] : API_ERROR_MESSAGES.UNKNOWN_ERROR;
        
        console.error('API Error:', {
            status,
            message,
            data: error.response?.data,
            url: error.config?.url
        });
    }

    // ============================================================================
    // MÉTODOS HTTP GENÉRICOS
    // ============================================================================

    async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        const response = await this.client.get<T>(url, { params });
        return response.data;
    }

    async post<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.post<T>(url, data);
        return response.data;
    }

    async put<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.put<T>(url, data);
        return response.data;
    }

    async patch<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.patch<T>(url, data);
        return response.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.client.delete<T>(url);
        return response.data;
    }

    // ============================================================================
    // MÉTODOS ESPECÍFICOS DA API
    // ============================================================================

    // Simulações
    async getSimulations() {
        return this.get(API_ENDPOINTS.simulations.list);
    }

    async getSimulation(id: string) {
        return this.get(API_ENDPOINTS.simulations.get(id));
    }

    async createSimulation(data: any) {
        return this.post(API_ENDPOINTS.simulations.create, data);
    }

    async updateSimulation(id: string, data: any) {
        return this.put(API_ENDPOINTS.simulations.update(id), data);
    }

    async deleteSimulation(id: string) {
        return this.delete(API_ENDPOINTS.simulations.delete(id));
    }

    async duplicateSimulation(id: string) {
        return this.post(API_ENDPOINTS.simulations.duplicate(id));
    }

    async createSimulationVersion(id: string) {
        return this.post(API_ENDPOINTS.simulations.createVersion(id));
    }

    async getProjections(id: string) {
        return this.get(API_ENDPOINTS.simulations.projections(id));
    }

    // Alocações
    async getAllocations() {
        return this.get(API_ENDPOINTS.allocations.list);
    }

    async getAllocation(id: string) {
        return this.get(API_ENDPOINTS.allocations.get(id));
    }

    async createAllocation(data: any) {
        return this.post(API_ENDPOINTS.allocations.create, data);
    }

    async updateAllocation(id: string, data: any) {
        return this.put(API_ENDPOINTS.allocations.update(id), data);
    }

    async deleteAllocation(id: string) {
        return this.delete(API_ENDPOINTS.allocations.delete(id));
    }

    async getAllocationRecords(id: string) {
        return this.get(API_ENDPOINTS.allocations.records(id));
    }

    async updateAllocationRecord(id: string, recordId: string, data: any) {
        return this.put(API_ENDPOINTS.allocations.updateRecord(id, recordId), data);
    }

    // Movimentações
    async getMovements() {
        return this.get(API_ENDPOINTS.movements.list);
    }

    async getMovement(id: string) {
        return this.get(API_ENDPOINTS.movements.get(id));
    }

    async createMovement(data: any) {
        return this.post(API_ENDPOINTS.movements.create, data);
    }

    async updateMovement(id: string, data: any) {
        return this.put(API_ENDPOINTS.movements.update(id), data);
    }

    async deleteMovement(id: string) {
        return this.delete(API_ENDPOINTS.movements.delete(id));
    }

    async getMovementsBySimulation(simulationId: string) {
        return this.get(API_ENDPOINTS.movements.bySimulation(simulationId));
    }

    // Seguros
    async getInsurances() {
        return this.get(API_ENDPOINTS.insurances.list);
    }

    async getInsurance(id: string) {
        return this.get(API_ENDPOINTS.insurances.get(id));
    }

    async createInsurance(data: any) {
        return this.post(API_ENDPOINTS.insurances.create, data);
    }

    async updateInsurance(id: string, data: any) {
        return this.put(API_ENDPOINTS.insurances.update(id), data);
    }

    async deleteInsurance(id: string) {
        return this.delete(API_ENDPOINTS.insurances.delete(id));
    }

    async getInsurancesBySimulation(simulationId: string) {
        return this.get(API_ENDPOINTS.insurances.bySimulation(simulationId));
    }

    // Histórico
    async getHistory() {
        return this.get(API_ENDPOINTS.history.list);
    }

    async getHistoryItem(id: string) {
        return this.get(API_ENDPOINTS.history.get(id));
    }

    async reopenHistoryItem(id: string) {
        return this.post(API_ENDPOINTS.history.reopen(id));
    }

    // Clientes
    async getClients() {
        return this.get(API_ENDPOINTS.clients.list);
    }

    async getClient(id: string) {
        return this.get(API_ENDPOINTS.clients.get(id));
    }

    async createClient(data: any) {
        return this.post(API_ENDPOINTS.clients.create, data);
    }

    async updateClient(id: string, data: any) {
        return this.put(API_ENDPOINTS.clients.update(id), data);
    }

    async deleteClient(id: string) {
        return this.delete(API_ENDPOINTS.clients.delete(id));
    }
}

// ============================================================================
// INSTÂNCIA SINGLETON
// ============================================================================

export const apiClient = new ApiClient();

// ============================================================================
// EXPORTAÇÕES
// ============================================================================

export { API_ENDPOINTS, HTTP_STATUS, API_ERROR_MESSAGES };
export default apiClient;
