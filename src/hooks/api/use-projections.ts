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

export interface ProjectionResult {
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
    status: 'VIVO' | 'MORTO' | 'INVALIDO';
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

// Hook para projeção sem seguros
export function useProjectionWithoutInsurances(request: ProjectionRequest) {
  return useQuery<ProjectionResult>({
    queryKey: ['projection', 'without-insurances', request],
    queryFn: async () => {
      const response = await api.post('/projections', {
        ...request,
        includeInsurances: false,
      });
      return response.data;
    },
    enabled: !!request.simulationId,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}
