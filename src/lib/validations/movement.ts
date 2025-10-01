import { z } from 'zod';
import { dateSchema, currencySchema, requiredStringSchema, optionalStringSchema } from './base';

/**
 * Validação para o tipo de movimento
 */
const movementTypeSchema = z.enum(['income', 'expense'], {
  errorMap: () => ({ message: 'Tipo de movimento inválido' }),
});

/**
 * Validação para a frequência do movimento
 */
const movementFrequencySchema = z.enum(['one_time', 'monthly', 'yearly'], {
  errorMap: () => ({ message: 'Frequência inválida' }),
});

/**
 * Schema para criar um novo movimento
 */
export const createMovementSchema = z.object({
  simulationId: requiredStringSchema('ID da simulação'),
  type: movementTypeSchema,
  description: requiredStringSchema('Descrição').max(255, 'Descrição muito longa'),
  amount: currencySchema,
  frequency: movementFrequencySchema,
  startDate: dateSchema,
  endDate: dateSchema.optional(),
  isActive: z.boolean().default(true),
  category: optionalStringSchema,
  notes: optionalStringSchema,
});

export type CreateMovementInput = z.infer<typeof createMovementSchema>;

/**
 * Schema para atualizar um movimento existente
 */
export const updateMovementSchema = createMovementSchema
  .omit({ simulationId: true, type: true })
  .partial();

export type UpdateMovementInput = z.infer<typeof updateMovementSchema>;

/**
 * Schema para filtros de busca de movimentos
 */
export const movementFiltersSchema = z.object({
  simulationId: requiredStringSchema('ID da simulação'),
  type: movementTypeSchema.optional(),
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
  isActive: z.boolean().optional(),
  search: optionalStringSchema,
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export type MovementFiltersInput = z.infer<typeof movementFiltersSchema>;
