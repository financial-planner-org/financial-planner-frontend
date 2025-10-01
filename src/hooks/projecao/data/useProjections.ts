'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface ProjectionRequest {
  simulationId: number;
  status: 'VIVO' | 'MORTO' | 'INVALIDO';
  realReturnRate: number;
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

export function useProjection(request: ProjectionRequest) {
  return useQuery<ProjectionResult>({
    queryKey: ['projection', request],
    queryFn: async (): Promise<ProjectionResult> => {
      const response = await api.post('/projections', request);
      return response.data;
    },
    enabled: !!request.simulationId,
    staleTime: 5 * 60 * 1000,
  });
}
