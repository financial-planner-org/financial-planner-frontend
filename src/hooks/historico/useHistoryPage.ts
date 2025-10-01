'use client';

import { useState } from 'react';
import { useHistoryData, HistorySimulation } from './data/useHistoryData';
import { useSimulations } from '../common/data/useSimulations';
import { useUtils } from '../common/utils/useUtils';

/**
 * Interface para item de histórico
 */
interface HistoryItem {
  clientName: string;
  [key: string]: unknown;
}

/**
 * Interface para cliente
 */
interface Client {
  id: string;
  name: string;
  simulationsCount: number;
}

/**
 * Hook principal da página de histórico
 * Combina todos os hooks necessários para a página
 */
export function useHistoryPage() {
  const [selectedClient, setSelectedClient] = useState<string>('');

  // Hooks de dados
  const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
  const { data: history = [], isLoading: isLoadingHistory } = useHistoryData();
  const { formatCurrency } = useUtils();

  // Agrupar por cliente
  const clients: Client[] = Array.from(
    new Set(history.map((item: HistorySimulation) => item.clientName))
  ).map((clientName: string) => ({
    id: clientName,
    name: clientName,
    simulationsCount: history.filter((item: HistorySimulation) => item.clientName === clientName)
      .length,
  }));

  // Handlers
  const handleViewSimulation = (id: string) => {
    console.log('Ver simulação:', id);
  };

  const handleReopenSimulation = (id: string) => {
    console.log('Reabrir simulação:', id);
  };

  const handleCreateFromLegacy = (id: string) => {
    console.log('Criar nova simulação a partir de versão legada:', id);
  };

  const handleEditSimulation = (id: string) => {
    console.log('Editar simulação:', id);
  };

  const handleDeleteSimulation = (id: string) => {
    console.log('Deletar simulação:', id);
  };

  return {
    // Dados
    simulations,
    history,
    clients,
    selectedClient,
    setSelectedClient,

    // Estados de loading
    isLoadingSimulations,
    isLoadingHistory,

    // Formatação
    formatCurrency,

    // Handlers
    handleViewSimulation,
    handleReopenSimulation,
    handleCreateFromLegacy,
    handleEditSimulation,
    handleDeleteSimulation,
  };
}
