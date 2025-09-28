import { z } from 'zod';

// Schemas de validação baseados nos requisitos da vaga

// Simulação
export const simulationStatusSchema = z.enum(['Vivo', 'Morto', 'Inválido']);

export const createSimulationSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    realRate: z.number().min(0, 'Taxa deve ser positiva').max(1, 'Taxa deve ser menor que 100%'),
    status: simulationStatusSchema,
});

export const updateSimulationSchema = createSimulationSchema.partial();

// Alocação
export const allocationTypeSchema = z.enum(['financeira', 'imobilizada']);

export const financingSchema = z.object({
    startDate: z.string().min(1, 'Data de início do financiamento é obrigatória'),
    installments: z.number().min(1, 'Número de parcelas deve ser positivo'),
    interestRate: z.number().min(0, 'Taxa de juros deve ser positiva').max(1, 'Taxa deve ser menor que 100%'),
    downPayment: z.number().min(0, 'Valor de entrada deve ser positivo'),
});

export const createAllocationSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
    type: allocationTypeSchema,
    value: z.number().min(0, 'Valor deve ser positivo'),
    date: z.string().min(1, 'Data é obrigatória'),
    simulationId: z.string().min(1, 'ID da simulação é obrigatório'),
    financing: financingSchema.optional(),
});

export const updateAllocationSchema = createAllocationSchema.partial().omit({ simulationId: true });

// Movimentação
export const movementTypeSchema = z.enum(['income', 'expense']);
export const movementFrequencySchema = z.enum(['única', 'mensal', 'anual']);

export const createMovementSchema = z.object({
    type: movementTypeSchema,
    title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo'),
    description: z.string().max(500, 'Descrição muito longa').optional(),
    value: z.number().min(0, 'Valor deve ser positivo'),
    frequency: movementFrequencySchema,
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    endDate: z.string().optional(),
    simulationId: z.string().min(1, 'ID da simulação é obrigatório'),
});

export const updateMovementSchema = createMovementSchema.partial().omit({ simulationId: true });

// Seguro
export const insuranceTypeSchema = z.enum(['vida', 'invalidez']);

export const createInsuranceSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
    type: insuranceTypeSchema,
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    durationMonths: z.number().min(1, 'Duração deve ser positiva'),
    premium: z.number().min(0, 'Prêmio deve ser positivo'),
    insuredValue: z.number().min(0, 'Valor segurado deve ser positivo'),
    simulationId: z.string().min(1, 'ID da simulação é obrigatório'),
});

export const updateInsuranceSchema = createInsuranceSchema.partial().omit({ simulationId: true });

// Registro de alocação
export const createAllocationRecordSchema = z.object({
    allocationId: z.string().min(1, 'ID da alocação é obrigatório'),
    value: z.number().min(0, 'Valor deve ser positivo'),
    date: z.string().min(1, 'Data é obrigatória'),
    notes: z.string().max(500, 'Notas muito longas').optional(),
});

// Filtros
export const filterSchema = z.object({
    search: z.string().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
});

// Paginação
export const paginationSchema = z.object({
    page: z.number().min(1, 'Página deve ser positiva'),
    limit: z.number().min(1, 'Limite deve ser positivo').max(100, 'Limite muito alto'),
});

// Tipos inferidos
export type CreateSimulationInput = z.infer<typeof createSimulationSchema>;
export type UpdateSimulationInput = z.infer<typeof updateSimulationSchema>;
export type CreateAllocationInput = z.infer<typeof createAllocationSchema>;
export type UpdateAllocationInput = z.infer<typeof updateAllocationSchema>;
export type CreateMovementInput = z.infer<typeof createMovementSchema>;
export type UpdateMovementInput = z.infer<typeof updateMovementSchema>;
export type CreateInsuranceInput = z.infer<typeof createInsuranceSchema>;
export type UpdateInsuranceInput = z.infer<typeof updateInsuranceSchema>;
export type CreateAllocationRecordInput = z.infer<typeof createAllocationRecordSchema>;
export type FilterInput = z.infer<typeof filterSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
