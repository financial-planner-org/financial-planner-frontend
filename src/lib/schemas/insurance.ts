import { z } from 'zod';

// Schema para criação de seguro
export const CreateInsuranceSchema = z.object({
    simulationId: z.number().positive('ID da simulação é obrigatório'),
    name: z.string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    durationMonths: z.number()
        .min(1, 'Duração deve ser pelo menos 1 mês')
        .max(1200, 'Duração deve ser no máximo 1200 meses (100 anos)'),
    premium: z.number()
        .min(0, 'Prêmio deve ser positivo'),
    insuredValue: z.number()
        .min(0, 'Valor segurado deve ser positivo'),
});

// Schema para atualização de seguro
export const UpdateInsuranceSchema = CreateInsuranceSchema.partial().extend({
    id: z.number().positive('ID deve ser um número positivo'),
});

// Schema para resposta de seguro
export const InsuranceSchema = z.object({
    id: z.number(),
    simulationId: z.number(),
    name: z.string(),
    startDate: z.string(),
    durationMonths: z.number(),
    premium: z.number(),
    insuredValue: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Tipos derivados dos schemas
export type CreateInsuranceInput = z.infer<typeof CreateInsuranceSchema>;
export type UpdateInsuranceInput = z.infer<typeof UpdateInsuranceSchema>;
export type Insurance = z.infer<typeof InsuranceSchema>;
