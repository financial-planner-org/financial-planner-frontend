import { z } from 'zod';
import {
  dateSchema,
  currencySchema,
  rateSchema,
  requiredStringSchema,
  optionalStringSchema,
} from './base';

/**
 * Validação para o tipo de seguro
 */
const insuranceTypeSchema = z.enum(['life', 'disability', 'property', 'health', 'other'], {
  errorMap: () => ({ message: 'Tipo de seguro inválido' }),
});

/**
 * Validação para o status do seguro
 */
const insuranceStatusSchema = z.enum(['active', 'inactive', 'expired', 'canceled'], {
  errorMap: () => ({ message: 'Status de seguro inválido' }),
});

/**
 * Schema para criar um novo seguro
 */
export const createInsuranceSchema = z.object({
  simulationId: requiredStringSchema('ID da simulação'),
  name: requiredStringSchema('Nome do seguro').max(255, 'Nome muito longo'),
  type: insuranceTypeSchema,
  status: insuranceStatusSchema.default('active'),
  startDate: dateSchema,
  durationMonths: z.number().int().positive('Duração deve ser um número positivo'),
  monthlyPremium: currencySchema,
  insuredAmount: currencySchema,
  beneficiary: optionalStringSchema,
  policyNumber: optionalStringSchema,
  insuranceCompany: optionalStringSchema,
  notes: optionalStringSchema,
});

export type CreateInsuranceInput = z.infer<typeof createInsuranceSchema>;

/**
 * Schema para atualizar um seguro existente
 */
export const updateInsuranceSchema = createInsuranceSchema.omit({ simulationId: true }).partial();

export type UpdateInsuranceInput = z.infer<typeof updateInsuranceSchema>;

/**
 * Schema para filtros de busca de seguros
 */
export const insuranceFiltersSchema = z.object({
  simulationId: optionalStringSchema,
  type: insuranceTypeSchema.optional(),
  status: insuranceStatusSchema.optional(),
  includeExpired: z.boolean().default(false),
  search: optionalStringSchema,
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export type InsuranceFiltersInput = z.infer<typeof insuranceFiltersSchema>;
