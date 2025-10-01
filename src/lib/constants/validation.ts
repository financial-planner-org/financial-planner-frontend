// ============================================================================
// CONSTANTES DE VALIDAÇÃO - FINANCIAL PLANNER
// ============================================================================
// Centraliza regras de validação e configurações de formulários

export const VALIDATION_RULES = {
    // Regras de validação para campos de texto
    text: {
        minLength: 1,
        maxLength: 255,
        required: true
    },

    // Regras de validação para campos de email
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Email inválido'
    },

    // Regras de validação para campos de telefone
    phone: {
        pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
        message: 'Telefone inválido'
    },

    // Regras de validação para campos de CPF
    cpf: {
        pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        message: 'CPF inválido'
    },

    // Regras de validação para campos de valor monetário
    currency: {
        min: 0,
        max: 999999999.99,
        precision: 2,
        message: 'Valor inválido'
    },

    // Regras de validação para campos de percentual
    percentage: {
        min: 0,
        max: 100,
        precision: 2,
        message: 'Percentual inválido'
    },

    // Regras de validação para campos de data
    date: {
        min: '1900-01-01',
        max: '2100-12-31',
        message: 'Data inválida'
    }
} as const;

export const FORM_CONFIGS = {
    // Configurações para formulários de alocação
    allocation: {
        fields: [
            {
                name: 'type',
                label: 'Tipo',
                type: 'select',
                required: true,
                options: [
                    { value: 'FINANCIAL', label: 'Financeira' },
                    { value: 'IMMOVABLE', label: 'Imobilizada' }
                ]
            },
            {
                name: 'name',
                label: 'Nome',
                type: 'text',
                required: true,
                placeholder: 'Nome da alocação'
            },
            {
                name: 'value',
                label: 'Valor (R$)',
                type: 'number',
                required: true,
                placeholder: '0.00',
                min: 0
            },
            {
                name: 'date',
                label: 'Data',
                type: 'date',
                required: true
            }
        ]
    },

    // Configurações para formulários de movimentação
    movement: {
        fields: [
            {
                name: 'type',
                label: 'Tipo',
                type: 'select',
                required: true,
                options: [
                    { value: 'income', label: 'Entrada' },
                    { value: 'expense', label: 'Saída' }
                ]
            },
            {
                name: 'title',
                label: 'Título',
                type: 'text',
                required: true,
                placeholder: 'Ex: Salário, Aluguel, etc.'
            },
            {
                name: 'value',
                label: 'Valor (R$)',
                type: 'number',
                required: true,
                placeholder: '0.00',
                min: 0
            },
            {
                name: 'frequency',
                label: 'Frequência',
                type: 'select',
                required: true,
                options: [
                    { value: 'unique', label: 'Única' },
                    { value: 'monthly', label: 'Mensal' },
                    { value: 'yearly', label: 'Anual' }
                ]
            },
            {
                name: 'startDate',
                label: 'Data Inicial',
                type: 'date',
                required: true
            },
            {
                name: 'endDate',
                label: 'Data Final (opcional)',
                type: 'date',
                required: false
            }
        ]
    },

    // Configurações para formulários de seguro
    insurance: {
        fields: [
            {
                name: 'name',
                label: 'Nome',
                type: 'text',
                required: true,
                placeholder: 'Nome do seguro'
            },
            {
                name: 'type',
                label: 'Tipo',
                type: 'select',
                required: true,
                options: [
                    { value: 'life', label: 'Vida' },
                    { value: 'disability', label: 'Invalidez' }
                ]
            },
            {
                name: 'startDate',
                label: 'Data de Início',
                type: 'date',
                required: true
            },
            {
                name: 'durationMonths',
                label: 'Duração (meses)',
                type: 'number',
                required: true,
                placeholder: '12',
                min: 1
            },
            {
                name: 'premium',
                label: 'Prêmio (mensal)',
                type: 'number',
                required: true,
                placeholder: '0.00',
                min: 0
            },
            {
                name: 'insuredValue',
                label: 'Valor Segurado',
                type: 'number',
                required: true,
                placeholder: '0.00',
                min: 0
            }
        ]
    },

    // Configurações para formulários de simulação
    simulation: {
        fields: [
            {
                name: 'name',
                label: 'Nome',
                type: 'text',
                required: true,
                placeholder: 'Nome da simulação'
            },
            {
                name: 'startDate',
                label: 'Data de Início',
                type: 'date',
                required: true
            },
            {
                name: 'realRate',
                label: 'Taxa Real (%)',
                type: 'number',
                required: true,
                placeholder: '4.0',
                min: 0,
                max: 100,
                step: 0.1
            }
        ]
    }
} as const;
