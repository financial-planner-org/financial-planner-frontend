/**
 * @fileoverview Hook para projeções patrimoniais
 * @description Hook usando TanStack Query para operações de projeção
 */

import { useQuery } from '@tanstack/react-query';
import { projectionApiService } from '@/lib/api/services';

// Tipos para projeção
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

// Chaves de query
export const projectionKeys = {
    all: ['projections'] as const,
    lists: () => [...projectionKeys.all, 'list'] as const,
    projection: (simulationId: number, lifeStatus: string) =>
        [...projectionKeys.lists(), simulationId, lifeStatus] as const,
};

/**
 * Hook para calcular projeção patrimonial
 */
export function useProjection(simulationId?: number, lifeStatus: 'VIVO' | 'MORTO' | 'INVALIDO' = 'VIVO') {
    return useQuery({
        queryKey: projectionKeys.projection(simulationId || 0, lifeStatus),
        queryFn: () => projectionApiService.calculateProjection({
            simulationId: simulationId!,
            lifeStatus,
        }),
        enabled: !!simulationId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
}

/**
 * Hook para calcular projeção com taxa personalizada
 */
export function useProjectionWithRate(
    simulationId?: number,
    lifeStatus: 'VIVO' | 'MORTO' | 'INVALIDO' = 'VIVO',
    realRate?: number
) {
    return useQuery({
        queryKey: projectionKeys.projection(simulationId || 0, `${lifeStatus}-${realRate}`),
        queryFn: () => projectionApiService.calculateProjection({
            simulationId: simulationId!,
            lifeStatus,
            realRate,
        }),
        enabled: !!simulationId,
        staleTime: 2 * 60 * 1000, // 2 minutos
    });
}
