/**
 * @fileoverview Hook para dados de simulações
 * @description Hook para buscar e gerenciar dados de simulações
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

/**
 * Interface para simulação
 */
interface Simulation {
  id: number;
  name: string;
  description?: string;
  lifeStatus: 'VIVO' | 'MORTO' | 'INVALIDO';
  realReturnRate: number;
  inflationRate: number;
  startDate: string;
  endDate: string;
  includeMovements: boolean;
  includeInsurances: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Hook para buscar simulações
 */
export function useSimulations() {
  return useQuery<Simulation[]>({
    queryKey: ['simulations'],
    queryFn: async () => {
      const response = await api.get('/simulations');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

/**
 * Hook para buscar uma simulação específica
 */
export function useSimulation(id: number) {
  return useQuery<Simulation>({
    queryKey: ['simulation', id],
    queryFn: async () => {
      const response = await api.get(`/simulations/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}
