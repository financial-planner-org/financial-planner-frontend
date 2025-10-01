'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Movement {
  id: number;
  simulationId: number;
  type: 'INCOME' | 'EXPENSE' | 'DEPENDENT';
  value: number;
  frequency: 'UNIQUE' | 'MONTHLY' | 'YEARLY';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export function useMovements(simulationId: number) {
  return useQuery<Movement[]>({
    queryKey: ['movements', simulationId],
    queryFn: async (): Promise<Movement[]> => {
      const response = await api.get(`/movements/${simulationId}`);
      return response.data;
    },
    enabled: !!simulationId,
    staleTime: 5 * 60 * 1000,
  });
}
