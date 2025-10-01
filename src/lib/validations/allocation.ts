import { z } from 'zod';
import {
  dateSchema,
  currencySchema,
  rateSchema,
  requiredStringSchema,
  optionalStringSchema,
  booleanSchema,
} from './base';

/**
 * Validação para o tipo de alocação
 */
const allocationTypeSchema = z.enum(['financial', 'real_estate'], {
  errorMap: () => ({ message: 'Tipo de alocação inválido' }),
});

/**
 * Schema para detalhes de financiamento
 */
const financingDetailsSchema = z
  .object({
    hasFinancing: booleanSchema,
    startDate: dateSchema.optional(),
    numberOfInstallments: z.number().int().positive().optional(),
    interestRate: rateSchema.optional(),
    downPayment: currencySchema.optional(),
    monthlyPayment: currencySchema.optional(),
  })
  .refine(
    data =>
      !data.hasFinancing ||
      (data.startDate && data.numberOfInstallments && data.interestRate !== undefined),
    {
      message: 'Campos de financiamento são obrigatórios quando hasFinancing é verdadeiro',
      path: ['hasFinancing'],
    }
  );

/**
 * Schema para criar uma nova alocação
 */
export const createAllocationSchema = z.object({
  simulationId: requiredStringSchema('ID da simulação'),
  name: requiredStringSchema('Nome da alocação').max(255, 'Nome muito longo'),
  type: allocationTypeSchema,
  initialValue: currencySchema,
  notes: optionalStringSchema,
  financing: financingDetailsSchema.optional(),
});

export type CreateAllocationInput = z.infer<typeof createAllocationSchema>;

/**
 * Schema para atualizar uma alocação existente
 */
export const updateAllocationSchema = createAllocationSchema
  .omit({ simulationId: true, type: true })
  .partial();

export type UpdateAllocationInput = z.infer<typeof updateAllocationSchema>;

/**
 * Schema para adicionar um registro de valor a uma alocação
 */
export const createAllocationRecordSchema = z.object({
  date: dateSchema,
  value: currencySchema,
  notes: optionalStringSchema,
});

export type CreateAllocationRecordInput = z.infer<typeof createAllocationRecordSchema>;

/**
 * Schema para atualizar um registro de valor existente
 */
export const updateAllocationRecordSchema = createAllocationRecordSchema.partial();

export type UpdateAllocationRecordInput = z.infer<typeof updateAllocationRecordSchema>;

/**
 * Schema para filtros de busca de alocações
 */
export const allocationFiltersSchema = z.object({
  simulationId: requiredStringSchema('ID da simulação'),
  type: allocationTypeSchema.optional(),
  search: optionalStringSchema,
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export type AllocationFiltersInput = z.infer<typeof allocationFiltersSchema>;
