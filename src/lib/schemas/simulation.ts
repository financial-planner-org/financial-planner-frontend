import { z } from 'zod';

// Schema para criação de simulação
export const CreateSimulationSchema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    description: z.string()
        .max(500, 'Descrição deve ter no máximo 500 caracteres')
        .optional(),
    realRate: z.number()
        .min(0, 'Taxa real deve ser positiva')
        .max(1, 'Taxa real deve ser menor que 100%'),
    status: z.enum(['ATIVO', 'INATIVO'], {
        errorMap: () => ({ message: 'Status deve ser ATIVO ou INATIVO' })
    }),
    startDate: z.string()
        .min(1, 'Data de início é obrigatória'),
});

// Schema para atualização de simulação
export const UpdateSimulationSchema = CreateSimulationSchema.partial().extend({
    id: z.number().positive('ID deve ser um número positivo'),
});

// Schema para resposta de simulação
export const SimulationSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    realRate: z.number(),
    status: z.string(),
    baseId: z.number().nullable(),
    startDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Tipos derivados dos schemas
export type CreateSimulationInput = z.infer<typeof CreateSimulationSchema>;
export type UpdateSimulationInput = z.infer<typeof UpdateSimulationSchema>;
export type Simulation = z.infer<typeof SimulationSchema>;
