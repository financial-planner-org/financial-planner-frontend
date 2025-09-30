import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Tipos para projeção
export interface ProjectionRequest {
    simulationId: number;
    status: 'VIVO' | 'MORTO' | 'INVALIDO';
    realReturnRate?: number;
    projectionYears?: number;
    includeInsurances?: boolean;
}

export interface ProjectionYear {
    year: number;
    totalPatrimony: number;
    financialPatrimony: number;
    immovablePatrimony: number;
    totalWithoutInsurances: number;
    movements: number;
    insurances: number;
}

export interface ProjectionResult {
    years: number[];
    projections: ProjectionYear[];
    metadata: {
        simulationId: number;
        status: string;
        realReturnRate: number;
        projectionYears: number;
        includeInsurances: boolean;
        calculatedAt: string;
    };
}

// Resposta do backend (estrutura real)
interface BackendProjectionResponse {
    years: number[];
    projections: {
        total: number[];
        financial: number[];
        realEstate: number[];
        insurance: number[];
        withoutInsurances?: {
            total: number[];
            financial: number[];
            realEstate: number[];
        };
    };
    metadata: {
        simulationId: number;
        status: string;
        realReturnRate: number;
        projectionYears: number;
        includeInsurances: boolean;
        calculatedAt: string;
    };
}

// Função para transformar resposta do backend para o formato esperado pelo frontend
function transformProjectionResponse(backendResponse: BackendProjectionResponse): ProjectionResult {
    const { years, projections, metadata } = backendResponse;

    // Transformar arrays em objetos por ano
    const transformedProjections: ProjectionYear[] = years.map((year: number, index: number) => ({
        year,
        totalPatrimony: projections.total[index] || 0,
        financialPatrimony: projections.financial[index] || 0,
        immovablePatrimony: projections.realEstate[index] || 0,
        insurances: projections.insurance[index] || 0,
        totalWithoutInsurances: projections.withoutInsurances?.total[index] || 0,
        movements: 0 // Backend não retorna movements separadamente
    }));

    return {
        years,
        projections: transformedProjections,
        metadata: {
            ...metadata,
            calculatedAt: metadata.calculatedAt || new Date().toISOString()
        }
    };
}

// Hook para calcular projeção
export function useProjection(request: ProjectionRequest) {
    return useQuery<ProjectionResult>({
        queryKey: ['projection', request],
        queryFn: async () => {
            // Usar a rota correta do backend: /simulations/:id/projections
            const response = await api.post<BackendProjectionResponse>(
                `/simulations/${request.simulationId}/projections`,
                {
                    status: request.status,
                    realReturnRate: request.realReturnRate || 0.04,
                    projectionYears: request.projectionYears || 35,
                    includeInsurances: request.includeInsurances ?? true
                }
            );
            return transformProjectionResponse(response.data);
        },
        enabled: !!request.simulationId,
        staleTime: 10 * 60 * 1000, // 10 minutos
    });
}

// Hook para calcular projeção via mutação (para casos onde queremos controlar quando executar)
export function useCalculateProjection() {
    return useMutation({
        mutationFn: async (request: ProjectionRequest) => {
            // Usar a rota correta do backend: /simulations/:id/projections
            const response = await api.post<BackendProjectionResponse>(
                `/simulations/${request.simulationId}/projections`,
                {
                    status: request.status,
                    realReturnRate: request.realReturnRate || 0.04,
                    projectionYears: request.projectionYears || 35,
                    includeInsurances: request.includeInsurances ?? true
                }
            );
            return transformProjectionResponse(response.data);
        },
    });
}

// Hook para projeção sem seguros
export function useProjectionWithoutInsurances(request: ProjectionRequest) {
    return useQuery<ProjectionResult>({
        queryKey: ['projection', 'without-insurances', request],
        queryFn: async () => {
            // Usar a rota correta do backend: /simulations/:id/projections
            const response = await api.post<BackendProjectionResponse>(
                `/simulations/${request.simulationId}/projections`,
                {
                    status: request.status,
                    realReturnRate: request.realReturnRate || 0.04,
                    projectionYears: request.projectionYears || 35,
                    includeInsurances: false
                }
            );
            return transformProjectionResponse(response.data);
        },
        enabled: !!request.simulationId,
        staleTime: 10 * 60 * 1000, // 10 minutos
    });
}
