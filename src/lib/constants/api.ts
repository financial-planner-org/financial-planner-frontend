// ============================================================================
// CONSTANTES DE API - FINANCIAL PLANNER
// ============================================================================
// Centraliza todas as configurações de API, endpoints e tratamento de dados

export const API_CONFIG = {
    // Configurações base da API
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },

    // Configurações de retry
    retry: {
        attempts: 3,
        delay: 1000,
        backoff: 2
    },

    // Configurações de cache
    cache: {
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    }
} as const;

// Endpoints da API
export const API_ENDPOINTS = {
    // Simulações
    simulations: {
        list: '/simulations',
        create: '/simulations',
        get: (id: string) => `/simulations/${id}`,
        update: (id: string) => `/simulations/${id}`,
        delete: (id: string) => `/simulations/${id}`,
        duplicate: (id: string) => `/simulations/${id}/duplicate`,
        createVersion: (id: string) => `/simulations/${id}/version`,
        projections: (id: string) => `/simulations/${id}/projections`
    },

    // Alocações
    allocations: {
        list: '/allocations',
        create: '/allocations',
        get: (id: string) => `/allocations/${id}`,
        update: (id: string) => `/allocations/${id}`,
        delete: (id: string) => `/allocations/${id}`,
        records: (id: string) => `/allocations/${id}/records`,
        updateRecord: (id: string, recordId: string) => `/allocations/${id}/records/${recordId}`
    },

    // Movimentações
    movements: {
        list: '/movements',
        create: '/movements',
        get: (id: string) => `/movements/${id}`,
        update: (id: string) => `/movements/${id}`,
        delete: (id: string) => `/movements/${id}`,
        bySimulation: (simulationId: string) => `/movements?simulationId=${simulationId}`
    },

    // Seguros
    insurances: {
        list: '/insurances',
        create: '/insurances',
        get: (id: string) => `/insurances/${id}`,
        update: (id: string) => `/insurances/${id}`,
        delete: (id: string) => `/insurances/${id}`,
        bySimulation: (simulationId: string) => `/insurances?simulationId=${simulationId}`
    },

    // Histórico
    history: {
        list: '/simulations/history',
        get: (id: string) => `/simulations/history/${id}`,
        reopen: (id: string) => `/simulations/history/${id}/reopen`
    },

    // Clientes
    clients: {
        list: '/clients',
        create: '/clients',
        get: (id: string) => `/clients/${id}`,
        update: (id: string) => `/clients/${id}`,
        delete: (id: string) => `/clients/${id}`
    }
} as const;

// Códigos de status HTTP
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
} as const;

// Mensagens de erro da API
export const API_ERROR_MESSAGES = {
    [HTTP_STATUS.BAD_REQUEST]: 'Dados inválidos enviados',
    [HTTP_STATUS.UNAUTHORIZED]: 'Não autorizado',
    [HTTP_STATUS.FORBIDDEN]: 'Acesso negado',
    [HTTP_STATUS.NOT_FOUND]: 'Recurso não encontrado',
    [HTTP_STATUS.CONFLICT]: 'Conflito de dados',
    [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Dados não processáveis',
    [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Erro interno do servidor',
    [HTTP_STATUS.BAD_GATEWAY]: 'Erro de gateway',
    [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Serviço indisponível',
    NETWORK_ERROR: 'Erro de conexão',
    TIMEOUT_ERROR: 'Tempo limite excedido',
    UNKNOWN_ERROR: 'Erro desconhecido'
} as const;

// Configurações de paginação
export const PAGINATION_CONFIG = {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
    pageSizeOptions: [10, 20, 50, 100]
} as const;

// Configurações de filtros
export const API_FILTER_CONFIG = {
    search: {
        minLength: 2,
        debounceMs: 300
    },
    date: {
        format: 'YYYY-MM-DD',
        timezone: 'America/Sao_Paulo'
    },
    currency: {
        locale: 'pt-BR',
        currency: 'BRL',
        precision: 2
    }
} as const;

// Tipos de dados para API
export const API_DATA_TYPES = {
    SIMULATION: 'simulation',
    ALLOCATION: 'allocation',
    MOVEMENT: 'movement',
    INSURANCE: 'insurance',
    PROJECTION: 'projection',
    CLIENT: 'client'
} as const;

// Estados de carregamento
export const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
} as const;

// Configurações de validação de API
export const API_VALIDATION = {
    simulation: {
        name: { minLength: 1, maxLength: 255 },
        realRate: { min: 0, max: 100 },
        startDate: { required: true }
    },
    allocation: {
        name: { minLength: 1, maxLength: 255 },
        value: { min: 0 },
        date: { required: true }
    },
    movement: {
        title: { minLength: 1, maxLength: 255 },
        value: { min: 0 },
        startDate: { required: true }
    },
    insurance: {
        name: { minLength: 1, maxLength: 255 },
        premium: { min: 0 },
        insuredValue: { min: 0 },
        durationMonths: { min: 1 }
    }
} as const;
