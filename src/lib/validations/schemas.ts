import * as z from 'zod';

// Schema para alocações
export const allocationSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    value: z.string().min(1, 'Valor é obrigatório'),
    date: z.string().min(1, 'Data é obrigatória'),
    type: z.enum(['financial', 'real_estate'], {
        required_error: 'Tipo é obrigatório',
    }),
});

// Schema para movimentações
export const movementSchema = z.object({
    type: z.string().min(1, 'Tipo é obrigatório'),
    value: z.string().min(1, 'Valor é obrigatório'),
    frequency: z.enum(['unique', 'monthly', 'yearly'], {
        required_error: 'Frequência é obrigatória',
    }),
    startDate: z.string().min(1, 'Data inicial é obrigatória'),
    endDate: z.string().optional(),
});

// Schema para seguros
export const insuranceSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    type: z.enum(['life', 'disability'], {
        required_error: 'Tipo é obrigatório',
    }),
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    duration: z.string().min(1, 'Duração é obrigatória'),
    premium: z.string().min(1, 'Prêmio é obrigatório'),
    insuredValue: z.string().min(1, 'Valor segurado é obrigatório'),
});

// Schema para simulações
export const simulationSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().optional(),
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    realRate: z.number().min(0, 'Taxa deve ser positiva').max(1, 'Taxa deve ser menor que 100%'),
});

// Schema para clientes
export const clientSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    phone: z.string().optional(),
    address: z.string().optional(),
});

// Tipos inferidos dos schemas
export type AllocationFormData = z.infer<typeof allocationSchema>;
export type MovementFormData = z.infer<typeof movementSchema>;
export type InsuranceFormData = z.infer<typeof insuranceSchema>;
export type SimulationFormData = z.infer<typeof simulationSchema>;
export type ClientFormData = z.infer<typeof clientSchema>;

// Configurações de campos para formulários
export const FORM_FIELD_CONFIGS = {
    allocation: [
        {
            name: 'type',
            label: 'Tipo',
            type: 'select' as const,
            options: [
                { value: 'financial', label: 'Financeira' },
                { value: 'real_estate', label: 'Imobilizada' },
            ],
        },
        {
            name: 'name',
            label: 'Nome',
            type: 'text' as const,
            placeholder: 'Nome da alocação',
        },
        {
            name: 'value',
            label: 'Valor',
            type: 'text' as const,
            placeholder: 'R$ 0,00',
        },
        {
            name: 'date',
            label: 'Data',
            type: 'date' as const,
        },
    ],
    movement: [
        {
            name: 'type',
            label: 'Tipo',
            type: 'text' as const,
            placeholder: 'Ex: Salário, Aluguel, etc.',
        },
        {
            name: 'value',
            label: 'Valor',
            type: 'text' as const,
            placeholder: 'R$ 0,00',
        },
        {
            name: 'frequency',
            label: 'Frequência',
            type: 'select' as const,
            options: [
                { value: 'unique', label: 'Única' },
                { value: 'monthly', label: 'Mensal' },
                { value: 'yearly', label: 'Anual' },
            ],
        },
        {
            name: 'startDate',
            label: 'Data Inicial',
            type: 'date' as const,
        },
        {
            name: 'endDate',
            label: 'Data Final (opcional)',
            type: 'date' as const,
        },
    ],
    insurance: [
        {
            name: 'name',
            label: 'Nome',
            type: 'text' as const,
            placeholder: 'Nome do seguro',
        },
        {
            name: 'type',
            label: 'Tipo',
            type: 'select' as const,
            options: [
                { value: 'life', label: 'Vida' },
                { value: 'disability', label: 'Invalidez' },
            ],
        },
        {
            name: 'startDate',
            label: 'Data de Início',
            type: 'date' as const,
        },
        {
            name: 'duration',
            label: 'Duração (meses)',
            type: 'number' as const,
            placeholder: '12',
        },
        {
            name: 'premium',
            label: 'Prêmio (mensal)',
            type: 'text' as const,
            placeholder: 'R$ 0,00',
        },
        {
            name: 'insuredValue',
            label: 'Valor Segurado',
            type: 'text' as const,
            placeholder: 'R$ 0,00',
        },
    ],
    simulation: [
        {
            name: 'name',
            label: 'Nome',
            type: 'text' as const,
            placeholder: 'Nome da simulação',
        },
        {
            name: 'description',
            label: 'Descrição',
            type: 'text' as const,
            placeholder: 'Descrição da simulação',
        },
        {
            name: 'startDate',
            label: 'Data de Início',
            type: 'date' as const,
        },
        {
            name: 'realRate',
            label: 'Taxa Real (%)',
            type: 'number' as const,
            placeholder: '4.0',
        },
    ],
    client: [
        {
            name: 'name',
            label: 'Nome',
            type: 'text' as const,
            placeholder: 'Nome do cliente',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email' as const,
            placeholder: 'email@exemplo.com',
        },
        {
            name: 'phone',
            label: 'Telefone',
            type: 'text' as const,
            placeholder: '(11) 99999-9999',
        },
        {
            name: 'address',
            label: 'Endereço',
            type: 'text' as const,
            placeholder: 'Endereço do cliente',
        },
    ],
} as const;