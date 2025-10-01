/**
 * Tipo de alocação (financeira ou imobiliária)
 */
export type AllocationType = 'financial' | 'real_estate';

/**
 * Status de financiamento para alocações imobiliárias
 */
export interface FinancingDetails {
  hasFinancing: boolean;
  startDate?: Date | string;
  numberOfInstallments?: number;
  interestRate?: number;
  downPayment?: number;
  monthlyPayment?: number;
}

/**
 * Registro de valor para uma alocação em uma data específica
 */
export interface AllocationRecord {
  id: string;
  allocationId: string;
  date: Date | string;
  value: number;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Representa uma alocação de ativo
 */
export interface Allocation {
  id: string;
  simulationId: string;
  name: string;
  type: AllocationType;
  initialValue: number;
  currentValue?: number;
  notes?: string;
  financing?: FinancingDetails;
  records: AllocationRecord[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * DTO para criar uma nova alocação
 */
export interface CreateAllocationDto {
  simulationId: string;
  name: string;
  type: AllocationType;
  initialValue: number;
  notes?: string;
  financing?: Omit<FinancingDetails, 'hasFinancing'>;
}

/**
 * DTO para atualizar uma alocação existente
 */
export type UpdateAllocationDto = Partial<Omit<CreateAllocationDto, 'simulationId' | 'type'>>;

/**
 * DTO para adicionar um registro de valor a uma alocação
 */
export interface CreateAllocationRecordDto {
  date: Date | string;
  value: number;
  notes?: string;
}

/**
 * DTO para atualizar um registro de valor existente
 */
export type UpdateAllocationRecordDto = Partial<CreateAllocationRecordDto>;
