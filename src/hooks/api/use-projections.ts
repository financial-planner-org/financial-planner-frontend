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

// Hook para calcular projeção
export function useProjection(request: ProjectionRequest) {
    return useQuery<ProjectionResult>({
        queryKey: ['projection', request],
        queryFn: async () => {
            const response = await api.post('/projections', request);
            return response.data;
        },
        enabled: !!request.simulationId,
        staleTime: 10 * 60 * 1000, // 10 minutos
    });
}

// Hook para calcular projeção via mutação (para casos onde queremos controlar quando executar)
export function useCalculateProjection() {
    return useMutation({
        mutationFn: async (request: ProjectionRequest) => {
            const response = await api.post('/projections', request);
            return response.data;
        },
    });
}
