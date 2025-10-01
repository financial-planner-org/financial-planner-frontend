/**
 * @fileoverview Tipos TypeScript para integração com a API
 * @description Tipos baseados no schema do Prisma do backend
 */

// ============================================================================
// TIPOS BASE
// ============================================================================

export interface Client {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Simulation {
    id: number;
    name: string;
    startDate: string;
    realRate: number;
    status: 'ATIVO' | 'INATIVO' | 'SITUACAO_ATUAL';
    baseId?: number | null;
    clientId: number;
    createdAt: string;
    updatedAt: string;
    description?: string | null;
    client?: Client;
    base?: Simulation;
    versions?: Simulation[];
    allocations?: Allocation[];
    insurances?: Insurance[];
    movements?: Movement[];
    isCurrentSituation?: boolean;
    isLegacy?: boolean;
}

export interface Allocation {
    id: number;
    simulationId: number;
    type: 'FINANCEIRA' | 'IMOBILIZADA';
    name: string;
    value: number;
    startDate?: string | null;
    installments?: number | null;
    interestRate?: number | null;
    createdAt: string;
    updatedAt: string;
    simulation?: Simulation;
    records?: AssetRecord[];
}

export interface AssetRecord {
    id: number;
    allocationId: number;
    date: string;
    value: number;
    notes?: string | null;
    createdAt: string;
    updatedAt: string;
    allocation?: Allocation;
}

export interface Movement {
    id: number;
    simulationId: number;
    type: 'ENTRADA' | 'SAIDA';
    value: number;
    description: string;
    frequency: 'UNICA' | 'MENSAL' | 'ANUAL';
    startDate: string;
    endDate?: string | null;
    category?: string | null;
    createdAt: string;
    updatedAt: string;
    simulation?: Simulation;
}

export interface Insurance {
    id: number;
    simulationId: number;
    name: string;
    type: 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO';
    startDate: string;
    durationMonths: number;
    premium: number;
    insuredValue: number;
    createdAt: string;
    updatedAt: string;
    simulation?: Simulation;
}

// ============================================================================
// TIPOS DE REQUISIÇÃO
// ============================================================================

export interface CreateClientRequest {
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    isActive?: boolean;
}

export interface UpdateClientRequest {
    name?: string;
    email?: string;
    phone?: string | null;
    address?: string | null;
    isActive?: boolean;
}

export interface CreateSimulationRequest {
    name: string;
    description?: string;
    status?: 'ATIVO' | 'INATIVO' | 'SITUACAO_ATUAL';
    baseId?: number | null;
    clientId: number;
    realRate: number;
    startDate?: string;
    allocations?: Array<{
        assetId: string;
        initialValue: number;
        targetAllocation: number;
    }>;
    insurances?: Array<{
        type: 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO';
        value: number;
        description?: string;
    }>;
    movements?: Array<{
        type: 'ENTRADA' | 'SAIDA';
        value: number;
        description: string;
        date: string;
    }>;
}

export interface UpdateSimulationRequest {
    name?: string;
    description?: string;
    status?: 'ATIVO' | 'INATIVO' | 'SITUACAO_ATUAL';
    realRate?: number;
    startDate?: string;
}

export interface CreateAllocationRequest {
    simulationId: number;
    type: 'FINANCEIRA' | 'IMOBILIZADA';
    name: string;
    value: number;
    startDate?: string;
    installments?: number;
    interestRate?: number;
    financing?: {
        startDate: string;
        installments: number;
        interestRate: number;
        downPayment: number;
    };
}

export interface UpdateAllocationRequest {
    name?: string;
    value?: number;
    startDate?: string;
    installments?: number;
    interestRate?: number;
}

export interface CreateAllocationRecordRequest {
    value: number;
    notes?: string;
}

export interface CreateMovementRequest {
    simulationId: number;
    type: 'ENTRADA' | 'SAIDA';
    value: number;
    description: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    category?: string;
}

export interface CreateInsuranceRequest {
    simulationId: number;
    name: string;
    type: 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO';
    startDate: string;
    durationMonths: number;
    premium: number;
    insuredValue: number;
}

export interface CreateMovementRequest {
    simulationId: number;
    type: 'ENTRADA' | 'SAIDA';
    value: number;
    description: string;
    frequency: 'UNICA' | 'MENSAL' | 'ANUAL';
    startDate: string;
    endDate?: string;
    category?: string;
}

export interface UpdateMovementRequest {
    type?: 'ENTRADA' | 'SAIDA';
    value?: number;
    description?: string;
    frequency?: 'UNICA' | 'MENSAL' | 'ANUAL';
    startDate?: string;
    endDate?: string;
    category?: string;
}

export interface UpdateInsuranceRequest {
    name?: string;
    type?: 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO';
    startDate?: string;
    durationMonths?: number;
    premium?: number;
    insuredValue?: number;
}

// ============================================================================
// TIPOS DE RESPOSTA
// ============================================================================

export interface ApiErrorResponse {
    status: 'error';
    message: string;
    errors?: any[];
}

export interface SimulationHistoryItem extends Omit<Simulation, 'versions'> {
    isLegacy: boolean;
    isCurrentVersion: boolean;
    versions: number[];
}

export interface SimulationStatus {
    simulationId: number;
    isCurrentSituation: boolean;
    canEdit: boolean;
    canDelete: boolean;
    isLegacy: boolean;
    restrictions: {
        cannotEdit: boolean;
        cannotDelete: boolean;
        isLegacyVersion: boolean;
        isCurrentSituation: boolean;
    };
}

// ============================================================================
// TIPOS PARA FORMULÁRIOS
// ============================================================================

export interface AllocationFormData {
    name: string;
    type: 'FINANCEIRA' | 'IMOBILIZADA';
    value: number;
    startDate?: string;
    installments?: number;
    interestRate?: number;
}

export interface SimulationFormData {
    name: string;
    description?: string;
    clientId: number;
    realRate: number;
    startDate: string;
}

export interface ClientFormData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    isActive: boolean;
}

// ============================================================================
// TIPOS PARA FILTROS E PAGINAÇÃO
// ============================================================================

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface SimulationFilters {
    clientId?: number;
    status?: 'ATIVO' | 'INATIVO' | 'SITUACAO_ATUAL';
    includeVersions?: boolean;
}

export interface AllocationFilters {
    simulationId?: number;
    type?: 'FINANCEIRA' | 'IMOBILIZADA';
}

// ============================================================================
// TIPOS PARA PROJEÇÕES
// ============================================================================

export interface ProjectionData {
    year: number;
    totalPatrimony: number;
    financialPatrimony: number;
    immovablePatrimony: number;
    totalPatrimonyWithoutInsurance: number;
}

export interface ProjectionRequest {
    simulationId: number;
    lifeStatus: 'VIVO' | 'MORTO' | 'INVALIDO';
    realRate?: number;
}

export interface ProjectionComparisonRequest {
    simulationIds: number[];
    lifeStatus: 'VIVO' | 'MORTO' | 'INVALIDO';
}

export interface DetailedProjectionData {
    projection: ProjectionData[];
    breakdown: {
        year: number;
        categories: {
            name: string;
            value: number;
            percentage: number;
        }[];
    }[];
}