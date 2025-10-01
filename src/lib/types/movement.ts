/**
 * Tipo de movimento (entrada ou saída)
 */
export type MovementType = 'income' | 'expense';

/**
 * Frequência de um movimento recorrente
 */
export type MovementFrequency = 'one_time' | 'monthly' | 'yearly';

/**
 * Representa um movimento financeiro
 */
export interface Movement {
  id: string;
  simulationId: string;
  type: MovementType;
  description: string;
  amount: number;
  frequency: MovementFrequency;
  startDate: Date | string;
  endDate?: Date | string;
  isActive: boolean;
  category?: string;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * DTO para criar um novo movimento
 */
export interface CreateMovementDto {
  simulationId: string;
  type: MovementType;
  description: string;
  amount: number;
  frequency: MovementFrequency;
  startDate: Date | string;
  endDate?: Date | string;
  isActive?: boolean;
  category?: string;
  notes?: string;
}

/**
 * DTO para atualizar um movimento existente
 */
export type UpdateMovementDto = Partial<Omit<CreateMovementDto, 'simulationId' | 'type'>>;

/**
 * Parâmetros para buscar movimentos
 */
export interface FindMovementsParams {
  simulationId: string;
  type?: MovementType;
  startDate?: Date | string;
  endDate?: Date | string;
  isActive?: boolean;
}
