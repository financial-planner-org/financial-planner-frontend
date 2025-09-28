// Tipos base para o sistema de planejamento financeiro
// Baseado nos requisitos da vaga

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

// Simulação - Funcionalidade principal
export interface Simulation extends BaseEntity {
    name: string;
    startDate: Date;
    realRate: number; // Taxa real composta (padrão: 4% a.a.)
    status: SimulationStatus;
    isCurrentSituation: boolean; // Situação Atual
    isOriginalPlan: boolean; // Plano Original
    version: number;
    parentId?: string; // Para versões
}

export type SimulationStatus = 'Vivo' | 'Morto' | 'Inválido';

// Projeção Patrimonial
export interface Projection {
    simulationId: string;
    year: number;
    age: number;
    financialAssets: number;
    realEstateAssets: number;
    totalAssets: number;
    totalAssetsWithoutInsurance: number;
    insuranceValue: number;
    income: number;
    expenses: number;
    netWorth: number;
}

// Alocação - Financeira ou Imobilizada
export interface Allocation extends BaseEntity {
    name: string;
    type: AllocationType;
    value: number;
    date: Date;
    simulationId: string;
    // Para alocações imobilizadas com financiamento
    financing?: Financing;
}

export type AllocationType = 'financeira' | 'imobilizada';

export interface Financing {
    startDate: Date;
    installments: number;
    interestRate: number;
    downPayment: number;
}

// Registro de alocação (histórico)
export interface AllocationRecord extends BaseEntity {
    allocationId: string;
    value: number;
    date: Date;
    notes?: string;
}

// Movimentação - Entradas e saídas
export interface Movement extends BaseEntity {
    type: MovementType;
    title: string;
    description?: string;
    value: number;
    frequency: MovementFrequency;
    startDate: Date;
    endDate?: Date;
    simulationId: string;
}

export type MovementType = 'income' | 'expense';
export type MovementFrequency = 'única' | 'mensal' | 'anual';

// Seguro
export interface Insurance extends BaseEntity {
    name: string;
    type: InsuranceType;
    startDate: Date;
    durationMonths: number;
    premium: number; // Pagamento mensal
    insuredValue: number; // Valor segurado
    simulationId: string;
}

export type InsuranceType = 'vida' | 'invalidez';

// Histórico de simulações
export interface SimulationHistory extends BaseEntity {
    simulationId: string;
    name: string;
    version: number;
    isLegacy: boolean;
    createdAt: Date;
}

// DTOs para API
export interface CreateSimulationDto {
    name: string;
    startDate: string;
    realRate: number;
    status: SimulationStatus;
}

export interface UpdateSimulationDto {
    name?: string;
    startDate?: string;
    realRate?: number;
    status?: SimulationStatus;
}

export interface CreateAllocationDto {
    name: string;
    type: AllocationType;
    value: number;
    date: string;
    simulationId: string;
    financing?: {
        startDate: string;
        installments: number;
        interestRate: number;
        downPayment: number;
    };
}

export interface CreateMovementDto {
    type: MovementType;
    title: string;
    description?: string;
    value: number;
    frequency: MovementFrequency;
    startDate: string;
    endDate?: string;
    simulationId: string;
}

export interface CreateInsuranceDto {
    name: string;
    type: InsuranceType;
    startDate: string;
    durationMonths: number;
    premium: number;
    insuredValue: number;
    simulationId: string;
}

// Respostas da API
export interface ProjectionResponse {
    simulationId: string;
    projections: Projection[];
}

export interface SimulationListResponse {
    simulations: Simulation[];
    currentSituation?: Simulation;
}

// Filtros e paginação
export interface PaginationParams {
    page: number;
    limit: number;
}

export interface FilterParams {
    search?: string;
    type?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
}

// Estados de UI
export interface UIState {
    selectedSimulation?: string;
    selectedAllocation?: string;
    viewMode: 'chart' | 'table' | 'details';
    comparisonMode: boolean;
    selectedYears: number[];
}
