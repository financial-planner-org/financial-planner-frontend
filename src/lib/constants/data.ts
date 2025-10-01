// ============================================================================
// CONSTANTES DE DADOS - FINANCIAL PLANNER
// ============================================================================
// Centraliza configurações de dados, formatos e transformações

export const DATA_FORMATS = {
    // Formatos de data
    date: {
        display: 'DD/MM/YYYY',
        api: 'YYYY-MM-DD',
        input: 'YYYY-MM-DD',
        timestamp: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    },

    // Formatos de moeda
    currency: {
        locale: 'pt-BR',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        display: 'R$ 0,00',
        input: '0.00'
    },

    // Formatos de percentual
    percentage: {
        locale: 'pt-BR',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
        display: '0,0%',
        input: '0.0'
    },

    // Formatos de número
    number: {
        locale: 'pt-BR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        display: '0,00',
        input: '0.00'
    }
} as const;

// Configurações de validação de dados
export const DATA_VALIDATION = {
    // Validação de campos obrigatórios
    required: {
        simulation: ['name', 'startDate', 'realRate'],
        allocation: ['name', 'type', 'value', 'date'],
        movement: ['type', 'title', 'value', 'frequency', 'startDate'],
        insurance: ['name', 'type', 'startDate', 'durationMonths', 'premium', 'insuredValue']
    },

    // Validação de tamanhos
    lengths: {
        name: { min: 1, max: 255 },
        description: { min: 0, max: 1000 },
        title: { min: 1, max: 255 },
        email: { min: 5, max: 255 },
        phone: { min: 10, max: 15 }
    },

    // Validação de valores numéricos
    numeric: {
        value: { min: 0, max: 999999999.99 },
        percentage: { min: 0, max: 100 },
        rate: { min: 0, max: 100 },
        months: { min: 1, max: 1200 },
        installments: { min: 1, max: 1000 }
    },

    // Validação de datas
    dates: {
        min: '1900-01-01',
        max: '2100-12-31',
        future: new Date().toISOString().split('T')[0]
    }
} as const;

// Configurações de transformação de dados
export const DATA_TRANSFORMATIONS = {
    // Transformações de moeda
    currency: {
        toDisplay: (value: number) => new Intl.NumberFormat(DATA_FORMATS.currency.locale, {
            style: 'currency',
            currency: DATA_FORMATS.currency.currency,
            minimumFractionDigits: DATA_FORMATS.currency.minimumFractionDigits,
            maximumFractionDigits: DATA_FORMATS.currency.maximumFractionDigits
        }).format(value),

        fromInput: (value: string) => parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.')),

        toInput: (value: number) => value.toFixed(2)
    },

    // Transformações de percentual
    percentage: {
        toDisplay: (value: number) => new Intl.NumberFormat(DATA_FORMATS.percentage.locale, {
            style: 'percent',
            minimumFractionDigits: DATA_FORMATS.percentage.minimumFractionDigits,
            maximumFractionDigits: DATA_FORMATS.percentage.maximumFractionDigits
        }).format(value / 100),

        fromInput: (value: string) => parseFloat(value.replace('%', '').replace(',', '.')),

        toInput: (value: number) => value.toFixed(1)
    },

    // Transformações de data
    date: {
        toDisplay: (date: string | Date) => new Intl.DateTimeFormat(DATA_FORMATS.date.display, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(date)),

        toAPI: (date: string | Date) => new Date(date).toISOString().split('T')[0],

        fromAPI: (date: string) => new Date(date)
    }
} as const;

// Configurações de ordenação
export const SORT_CONFIG = {
    directions: {
        ASC: 'asc',
        DESC: 'desc'
    },

    fields: {
        simulation: ['name', 'startDate', 'createdAt', 'updatedAt'],
        allocation: ['name', 'value', 'date', 'createdAt'],
        movement: ['title', 'value', 'startDate', 'createdAt'],
        insurance: ['name', 'premium', 'insuredValue', 'startDate'],
        projection: ['year', 'age', 'totalAssets']
    }
} as const;

// Configurações de filtros
export const FILTER_CONFIG = {
    types: {
        text: 'text',
        number: 'number',
        date: 'date',
        select: 'select',
        boolean: 'boolean'
    },

    operators: {
        equals: 'equals',
        contains: 'contains',
        startsWith: 'startsWith',
        endsWith: 'endsWith',
        greaterThan: 'greaterThan',
        lessThan: 'lessThan',
        between: 'between',
        in: 'in',
        notIn: 'notIn'
    }
} as const;

// Configurações de cache
export const CACHE_CONFIG = {
    keys: {
        simulations: 'simulations',
        allocations: 'allocations',
        movements: 'movements',
        insurances: 'insurances',
        projections: 'projections',
        history: 'history',
        clients: 'clients'
    },

    ttl: {
        short: 5 * 60 * 1000, // 5 minutos
        medium: 15 * 60 * 1000, // 15 minutos
        long: 60 * 60 * 1000, // 1 hora
        veryLong: 24 * 60 * 60 * 1000 // 24 horas
    }
} as const;

// Configurações de exportação
export const EXPORT_CONFIG = {
    formats: {
        csv: 'csv',
        excel: 'xlsx',
        pdf: 'pdf',
        json: 'json'
    },

    filename: {
        simulations: 'simulacoes',
        allocations: 'alocacoes',
        movements: 'movimentacoes',
        insurances: 'seguros',
        projections: 'projecoes',
        history: 'historico'
    }
} as const;
