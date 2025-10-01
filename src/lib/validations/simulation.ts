import { z } from 'zod';

export const simulationSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string(),
  realRate: z.number(),
  status: z.enum(['alive', 'dead', 'disabled']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createSimulationSchema = simulationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateSimulationSchema = createSimulationSchema.partial();

export type Simulation = z.infer<typeof simulationSchema>;
export type CreateSimulation = z.infer<typeof createSimulationSchema>;
export type UpdateSimulation = z.infer<typeof updateSimulationSchema>;
