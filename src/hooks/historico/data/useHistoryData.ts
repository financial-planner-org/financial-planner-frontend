'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface HistorySimulation {
  id: number;
  clientName: string;
  simulationName: string;
  version: number;
  createdAt: string;
  totalPatrimony: number;
  retirementYear: number;
  isLegacy: boolean;
  canEdit: boolean;
}

export function useHistoryData() {
  return useQuery<HistorySimulation[]>({
    queryKey: ['history'],
    queryFn: async (): Promise<HistorySimulation[]> => {
      const response = await api.get('/simulations/history');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
