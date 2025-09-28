// Constantes para API e hooks
export const API_CONFIG = {
    // URLs base
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',

    // Endpoints
    endpoints: {
        simulations: '/simulations',
        allocations: '/allocations',
        movements: '/movements',
        insurance: '/insurance',
        currentSituation: '/simulations/current-situation'
    },

    // Timeouts
    timeout: 10000,

    // Retry config
    retry: {
        attempts: 3,
        delay: 1000
    }
} as const;

// Constantes para cache
export const CACHE_CONFIG = {
    // Tempos de cache (em ms)
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos

    // Keys de cache
    keys: {
        simulations: 'simulations',
        allocations: 'allocations',
        movements: 'movements',
        insurance: 'insurance',
        currentSituation: 'current-situation'
    }
} as const;

// Constantes para paginação
export const PAGINATION_CONFIG = {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    maxPageSize: 100
} as const;

// Constantes para validação
export const VALIDATION_CONFIG = {
    // Limites de caracteres
    maxNameLength: 100,
    maxDescriptionLength: 500,

    // Limites numéricos
    minAmount: 0,
    maxAmount: 999999999.99,
    minRate: -100,
    maxRate: 1000,

    // Formatos
    dateFormat: 'dd/MM/yyyy',
    currencyFormat: 'pt-BR',
    numberFormat: 'pt-BR'
} as const;
