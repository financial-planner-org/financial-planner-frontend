/**
 * Tipo de seguro
 */
export type InsuranceType = 'life' | 'disability' | 'property' | 'health' | 'other';

/**
 * Status do seguro
 */
export type InsuranceStatus = 'active' | 'inactive' | 'expired' | 'canceled';

/**
 * Representa um contrato de seguro
 */
export interface Insurance {
  id: string;
  simulationId: string;
  name: string;
  type: InsuranceType;
  status: InsuranceStatus;
  startDate: Date | string;
  durationMonths: number;
  monthlyPremium: number;
  insuredAmount: number;
  beneficiary?: string;
  policyNumber?: string;
  insuranceCompany?: string;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * DTO para criar um novo seguro
 */
export interface CreateInsuranceDto {
  simulationId: string;
  name: string;
  type: InsuranceType;
  startDate: Date | string;
  durationMonths: number;
  monthlyPremium: number;
  insuredAmount: number;
  beneficiary?: string;
  policyNumber?: string;
  insuranceCompany?: string;
  notes?: string;
}

/**
 * DTO para atualizar um seguro existente
 */
export type UpdateInsuranceDto = Partial<Omit<CreateInsuranceDto, 'simulationId'>>;

/**
 * Parâmetros para buscar seguros
 */
export interface FindInsurancesParams {
  simulationId?: string;
  type?: InsuranceType;
  status?: InsuranceStatus;
  includeExpired?: boolean;
}
