import { z } from 'zod';
import { rateSchema, requiredStringSchema } from './base';

/**
 * Schema para parâmetros de projeção
 */
export const projectionParamsSchema = z.object({
  simulationId: requiredStringSchema('ID da simulação'),
  lifeStatus: z.enum(['alive', 'deceased', 'invalid']).optional(),
  realRate: rateSchema.optional(),
  includeScenarios: z.boolean().default(false),
  includeRecommendations: z.boolean().default(true),
});

export type ProjectionParamsInput = z.infer<typeof projectionParamsSchema>;

/**
 * Schema para filtros de histórico de projeções
 */
export const projectionHistoryFiltersSchema = z.object({
  simulationId: requiredStringSchema('ID da simulação'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export type ProjectionHistoryFiltersInput = z.infer<typeof projectionHistoryFiltersSchema>;

/**
 * Schema para salvar uma projeção
 */
export const saveProjectionSchema = z.object({
  simulationId: requiredStringSchema('ID da simulação'),
  name: requiredStringSchema('Nome da projeção').max(255, 'Nome muito longo'),
  description: z.string().optional(),
  parameters: z.record(z.unknown()),
});

export type SaveProjectionInput = z.infer<typeof saveProjectionSchema>;
