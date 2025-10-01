/**
 * Status de vida do cliente para a simulação
 */
export type LifeStatus = 'alive' | 'deceased' | 'invalid';

/**
 * Status da simulação
 */
export type SimulationStatus = 'draft' | 'active' | 'archived';

/**
 * Tipo para representar uma simulação
 */
export interface Simulation {
  id: string;
  name: string;
  startDate: Date | string;
  realRate: number;
  status: SimulationStatus;
  lifeStatus: LifeStatus;
  isCurrentSituation: boolean;
  version: number;
  previousVersionId: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  clientId: string;
  metadata?: Record<string, unknown>;
}

/**
 * Dados necessários para criar uma nova simulação
 */
export interface CreateSimulationDto {
  name: string;
  startDate: Date | string;
  realRate?: number;
  clientId: string;
  isCurrentSituation?: boolean;
}

/**
 * Dados necessários para atualizar uma simulação existente
 */
export interface UpdateSimulationDto extends Partial<CreateSimulationDto> {
  status?: SimulationStatus;
  lifeStatus?: LifeStatus;
}

/**
 * Dados necessários para criar uma nova versão de uma simulação
 */
export interface CreateSimulationVersionDto {
  name: string;
  startDate: Date | string;
  realRate?: number;
}

/**
 * Dados de projeção financeira retornados pela API
 */
export interface FinancialProjection {
  year: number;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  breakdown: {
    assetType: string;
    value: number;
  }[];
}

/**
 * Parâmetros para solicitar uma projeção
 */
export interface ProjectionParams {
  simulationId: string;
  lifeStatus: LifeStatus;
  realRate?: number;
}

/**
 * Resposta da API contendo a projeção financeira
 */
export interface ProjectionResponse {
  simulationId: string;
  lifeStatus: LifeStatus;
  realRate: number;
  projections: FinancialProjection[];
  generatedAt: string;
}
