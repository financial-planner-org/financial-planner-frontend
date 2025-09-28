import { z } from 'zod';

// Schema para criação de alocação
export const CreateAllocationSchema = z.object({
    simulationId: z.number().positive('ID da simulação é obrigatório'),
    type: z.enum(['FINANCIAL', 'IMMOVABLE'], {
        errorMap: () => ({ message: 'Tipo deve ser FINANCIAL ou IMMOVABLE' })
    }),
    name: z.string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    value: z.number()
        .min(0, 'Valor deve ser positivo'),
    startDate: z.string()
        .optional(),
    installments: z.number()
        .min(1, 'Número de parcelas deve ser pelo menos 1')
        .max(1000, 'Número de parcelas deve ser no máximo 1000')
        .optional(),
    interestRate: z.number()
        .min(0, 'Taxa de juros deve ser positiva')
        .max(1, 'Taxa de juros deve ser menor que 100%')
        .optional(),
}).refine((data) => {
    // Se for imóvel com financiamento, startDate e installments são obrigatórios
    if (data.type === 'IMMOVABLE' && data.installments) {
        return data.startDate && data.installments > 0;
    }
    return true;
}, {
    message: 'Para imóveis financiados, data de início e número de parcelas são obrigatórios',
});

// Schema para atualização de alocação
export const UpdateAllocationSchema = CreateAllocationSchema.partial().extend({
    id: z.number().positive('ID deve ser um número positivo'),
});

// Schema para registro de ativo
export const CreateAssetRecordSchema = z.object({
    allocationId: z.number().positive('ID da alocação é obrigatório'),
    date: z.string().min(1, 'Data é obrigatória'),
    value: z.number().min(0, 'Valor deve ser positivo'),
});

// Schema para resposta de alocação
export const AllocationSchema = z.object({
    id: z.number(),
    simulationId: z.number(),
    type: z.string(),
    name: z.string(),
    value: z.number(),
    startDate: z.string().nullable(),
    installments: z.number().nullable(),
    interestRate: z.number().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    records: z.array(z.object({
        id: z.number(),
        allocationId: z.number(),
        date: z.string(),
        value: z.number(),
        createdAt: z.string(),
    })).optional(),
});

// Tipos derivados dos schemas
export type CreateAllocationInput = z.infer<typeof CreateAllocationSchema>;
export type UpdateAllocationInput = z.infer<typeof UpdateAllocationSchema>;
export type CreateAssetRecordInput = z.infer<typeof CreateAssetRecordSchema>;
export type Allocation = z.infer<typeof AllocationSchema>;
