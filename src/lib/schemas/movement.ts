import { z } from 'zod';

// Schema para criação de movimentação
export const CreateMovementSchema = z
  .object({
    simulationId: z.number().positive('ID da simulação é obrigatório'),
    type: z.enum(['INCOME', 'EXPENSE'], {
      errorMap: () => ({ message: 'Tipo deve ser INCOME ou EXPENSE' }),
    }),
    value: z.number().min(0.01, 'Valor deve ser positivo'),
    frequency: z.enum(['UNIQUE', 'MONTHLY', 'YEARLY'], {
      errorMap: () => ({ message: 'Frequência deve ser UNIQUE, MONTHLY ou YEARLY' }),
    }),
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    endDate: z.string().optional(),
  })
  .refine(
    data => {
      // Se não for única, endDate deve ser fornecida
      if (data.frequency !== 'UNIQUE') {
        return data.endDate && data.endDate > data.startDate;
      }
      return true;
    },
    {
      message:
        'Para movimentações recorrentes, data de fim é obrigatória e deve ser posterior à data de início',
    }
  );

// Schema para atualização de movimentação
export const UpdateMovementSchema = CreateMovementSchema.partial().extend({
  id: z.number().positive('ID deve ser um número positivo'),
});

// Schema para resposta de movimentação
export const MovementSchema = z.object({
  id: z.number(),
  simulationId: z.number(),
  type: z.string(),
  value: z.number(),
  frequency: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Tipos derivados dos schemas
export type CreateMovementInput = z.infer<typeof CreateMovementSchema>;
export type UpdateMovementInput = z.infer<typeof UpdateMovementSchema>;
export type Movement = z.infer<typeof MovementSchema>;
