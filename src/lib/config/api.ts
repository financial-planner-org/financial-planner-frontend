/**
 * @fileoverview Configuração da API
 * @description Configurações centralizadas para integração com o backend
 */

export const API_CONFIG = {
    // URL base da API
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',

    // Timeouts
    TIMEOUT: 10000, // 10 segundos

    // Headers padrão
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

    // Endpoints
    ENDPOINTS: {
        // Clientes
        CLIENTS: '/clients',
        CLIENT_BY_ID: (id: number) => `/clients/${id}`,

        // Simulações
        SIMULATIONS: '/simulations',
        SIMULATION_BY_ID: (id: number) => `/simulations/${id}`,
        SIMULATIONS_HISTORY: '/simulations/history',
        SIMULATION_STATUS: (id: number) => `/simulations/${id}/status`,
        SIMULATION_CURRENT_SITUATION: (id: number) => `/simulations/${id}/current-situation`,
        SIMULATION_DUPLICATE: (id: number) => `/simulations/${id}/duplicate`,
        SIMULATION_CREATE_VERSION: (id: number) => `/simulations/${id}/create-version`,

        // Alocações
        ALLOCATIONS: '/allocations',
        ALLOCATION_BY_ID: (id: number) => `/allocations/${id}`,
        ALLOCATION_RECORDS: (id: number) => `/allocations/${id}/records`,
        SIMULATION_ALLOCATIONS: (simulationId: number) => `/simulations/${simulationId}/allocations`,

        // Movimentações
        MOVEMENTS: '/movements',
        MOVEMENT_BY_ID: (id: number) => `/movements/${id}`,
        SIMULATION_MOVEMENTS: (simulationId: number) => `/simulations/${simulationId}/movements`,

        // Seguros
        INSURANCES: '/insurances',
        INSURANCE_BY_ID: (id: number) => `/insurances/${id}`,
        SIMULATION_INSURANCES: (simulationId: number) => `/simulations/${simulationId}/insurances`,

        // Projeções
        PROJECTIONS: '/projections',
        SIMULATION_PROJECTIONS: (simulationId: number) => `/simulations/${simulationId}/projections`,

        // Health check
        HEALTH: '/health',
    },

    // Configurações de retry
    RETRY: {
        MAX_ATTEMPTS: 3,
        DELAY: 1000, // 1 segundo
    },

    // Configurações de cache
    CACHE: {
        STALE_TIME: 5 * 60 * 1000, // 5 minutos
        GC_TIME: 10 * 60 * 1000, // 10 minutos
    },
} as const;

export type ApiEndpoint = keyof typeof API_CONFIG.ENDPOINTS;
