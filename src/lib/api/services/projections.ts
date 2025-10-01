/**
 * @fileoverview Serviço de API para Projeções
 * @description Funções para calcular projeções patrimoniais via API
 */

import { apiClient } from '../client';
import type { ProjectionData, ProjectionRequest } from '../../types/api';

export class ProjectionsApiService {
    /**
     * Calcula projeção patrimonial até 2060
     */
    async calculateProjection(request: ProjectionRequest): Promise<ProjectionData[]> {
        try {
            return await apiClient.post<ProjectionData[]>('/projections', request);
        } catch (error) {
            console.error('Erro ao calcular projeção:', error);
            throw new Error('Falha ao calcular projeção patrimonial');
        }
    }

    /**
     * Calcula projeção com comparação entre simulações
     */
    async calculateProjectionComparison(simulationIds: number[], lifeStatus: 'VIVO' | 'MORTO' | 'INVALIDO' = 'VIVO'): Promise<Record<number, ProjectionData[]>> {
        try {
            const projections = await Promise.all(
                simulationIds.map(id =>
                    this.calculateProjection({ simulationId: id, lifeStatus })
                )
            );

            const result: Record<number, ProjectionData[]> = {};
            simulationIds.forEach((id, index) => {
                result[id] = projections[index];
            });

            return result;
        } catch (error) {
            console.error('Erro ao calcular comparação de projeções:', error);
            throw new Error('Falha ao calcular comparação de projeções');
        }
    }

    /**
     * Calcula projeção detalhada com breakdown por categoria
     */
    async calculateDetailedProjection(
        simulationId: number,
        lifeStatus: 'VIVO' | 'MORTO' | 'INVALIDO' = 'VIVO'
    ): Promise<{
        projection: ProjectionData[];
        breakdown: {
            year: number;
            categories: {
                name: string;
                value: number;
                percentage: number;
            }[];
        }[];
    }> {
        try {
            return await apiClient.post(`/projections/detailed`, {
                simulationId,
                lifeStatus,
            });
        } catch (error) {
            console.error('Erro ao calcular projeção detalhada:', error);
            throw new Error('Falha ao calcular projeção detalhada');
        }
    }
}

export const projectionApiService = new ProjectionsApiService();
export default projectionApiService;
