'use client';

import { useState } from 'react';
import { useProjection } from './data/useProjections';
import { useMovements } from './data/useMovements';
import { useSimulations } from '../common/data/useSimulations';
import { useUtils } from '../common/utils/useUtils';
import { formatDate } from '@/lib/constants';

/**
 * Interface para movimentação
 */
interface Movement {
  id: number;
  name: string;
  type: string;
  value: number;
  date: string;
  [key: string]: unknown;
}

/**
 * Interface para movimentação formatada
 */
interface FormattedMovement {
  id: string;
  title: string;
  type: string;
  value: number;
  date: string;
  [key: string]: unknown;
}

/**
 * Hook principal da página de projeção
 * Combina todos os hooks necessários para a página
 */
export function useProjectionsPage() {
  const [selectedSimulation, setSelectedSimulation] = useState<string>('1');
  const [lifeStatus, setLifeStatus] = useState<'VIVO' | 'MORTO' | 'INVALIDO'>('VIVO');
  const [realReturnRate, setRealReturnRate] = useState<number>(4.0);
  const simulationId = parseInt(selectedSimulation);

  // Hooks de dados
  const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
  const { data: movements = [], isLoading: isLoadingMovements } = useMovements(simulationId);

  // Hook de projeção
  const { data: projectionResult, isLoading: isLoadingProjection } = useProjection({
    simulationId,
    status: lifeStatus,
    realReturnRate,
    projectionYears: 40,
    includeInsurances: true,
  });

  const { formatCurrency, getMovementIcon, getMovementColor, getFrequencyLabel } = useUtils();

  // Formatar movimentações para exibição
  const formattedMovements: FormattedMovement[] = movements.map((movement: Movement) => ({
    id: movement.id.toString(),
    title: movement.name,
    type: movement.type,
    value: movement.value,
    frequency: movement.frequency,
    startDate: formatDate(movement.startDate),
    endDate: movement.endDate ? formatDate(movement.endDate) : undefined,
    isCredit: movement.type === 'INCOME',
    isDebit: movement.type === 'EXPENSE',
    isDependent: movement.type === 'DEPENDENT',
  }));

  // Handlers
  const handleCreateSimulation = () => {
    console.log('Criar nova simulação');
  };

  const handleEditSimulation = (id: string) => {
    console.log('Editar simulação:', id);
  };

  const handleDeleteSimulation = (id: string) => {
    console.log('Deletar simulação:', id);
  };

  const handleCreateVersion = (id: string) => {
    console.log('Criar nova versão:', id);
  };

  const handleViewDetails = (id: string) => {
    console.log('Ver detalhes:', id);
  };

  const handleDuplicateSimulation = (id: string) => {
    console.log('Duplicar simulação:', id);
  };

  return {
    // Dados
    simulations,
    selectedSimulation,
    setSelectedSimulation,
    lifeStatus,
    setLifeStatus,
    realReturnRate,
    setRealReturnRate,
    movements: formattedMovements,
    projectionResult,

    // Estados de loading
    isLoadingSimulations,
    isLoadingMovements,
    isLoadingProjection,

    // Formatação
    formatCurrency,
    getMovementIcon,
    getMovementColor,
    getFrequencyLabel,

    // Handlers
    handleCreateSimulation,
    handleEditSimulation,
    handleDeleteSimulation,
    handleCreateVersion,
    handleViewDetails,
    handleDuplicateSimulation,
  };
}
