'use client';

import { useState } from 'react';
import { useAllocations } from './data/useAllocations';
import { useSimulations } from '../common/data/useSimulations';
import { useUtils } from '../common/utils/useUtils';
import { formatDate } from '@/lib/constants';

/**
 * Interface para alocação
 */
interface Allocation {
  id: number;
  name: string;
  type: string;
  value: number;
  date: string;
  updatedAt: string;
}

/**
 * Interface para alocação formatada
 */
interface FormattedAllocation {
  id: string;
  title: string;
  type: string;
  value: number;
  startDate: string;
  lastUpdate: string;
  hasWarning: boolean;
  [key: string]: unknown;
}

/**
 * Hook principal da página de alocações
 * Combina todos os hooks necessários para a página
 */
export function useAllocationsPage() {
  const [selectedSimulation, setSelectedSimulation] = useState<string>('1');
  const simulationId = parseInt(selectedSimulation);

  // Hooks de dados
  const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
  const { data: allocations = [], isLoading: isLoadingAllocations } = useAllocations(simulationId);
  const { formatCurrency, getTypeColor, getTypeLabel } = useUtils();

  // Formatar alocações para exibição
  const formattedAllocations: FormattedAllocation[] = allocations.map((allocation: Allocation) => ({
    id: allocation.id.toString(),
    title: allocation.name,
    type: allocation.type,
    value: allocation.value,
    startDate: formatDate(allocation.date),
    lastUpdate: formatDate(allocation.updatedAt),
    hasWarning: false,
    status: 'updated' as 'updated' | 'old',
  }));

  // Handlers
  const handleEditAllocation = (id: string) => {
    console.log('Editar alocação:', id);
  };

  const handleViewAllocation = (id: string) => {
    console.log('Ver detalhes da alocação:', id);
  };

  const handleDeleteAllocation = async (id: string) => {
    try {
      console.log('Deletando alocação:', id);
      // Aqui seria feita a chamada para a API
    } catch (error) {
      console.error('Erro ao deletar alocação:', error);
    }
  };

  const handleUpdateAllocation = (id: string) => {
    console.log('Atualizar alocação:', id);
  };

  return {
    // Dados
    simulations,
    allocations,
    formattedAllocations,
    selectedSimulation,
    setSelectedSimulation,

    // Estados de loading
    isLoadingSimulations,
    isLoadingAllocations,

    // Utilitários
    formatCurrency,
    getTypeColor,
    getTypeLabel,

    // Handlers
    handleEditAllocation,
    handleViewAllocation,
    handleDeleteAllocation,
    handleUpdateAllocation,
  };
}
