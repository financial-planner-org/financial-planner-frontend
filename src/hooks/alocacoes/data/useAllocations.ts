'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Allocation {
  id: number;
  name: string;
  value: number;
  startDate?: string;
  type: 'FINANCIAL' | 'IMMOVABLE';
  installments?: number;
  interestRate?: number;
  simulationId: number;
  createdAt: string;
  updatedAt: string;
  records?: AssetRecord[];
}

export interface AssetRecord {
  id: number;
  allocationId: number;
  date: string;
  value: number;
  createdAt: string;
}

export function useAllocations(simulationId: number) {
  return useQuery<Allocation[]>({
    queryKey: ['allocations', simulationId],
    queryFn: async (): Promise<Allocation[]> => {
      const response = await api.get(`/allocations/${simulationId}`);
      return response.data;
    },
    enabled: !!simulationId,
    staleTime: 5 * 60 * 1000,
  });
}
