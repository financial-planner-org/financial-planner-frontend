'use client';

import { useState } from 'react';

export interface ProjectionFormState {
  selectedSimulation: string;
  lifeStatus: 'VIVO' | 'MORTO' | 'INVALIDO';
  realReturnRate: number;
  includeInsurances: boolean;
  showDetails: boolean;
}

/**
 * Hook para gerenciar o estado do formulário de projeção
 */
export function useProjectionForm() {
  const [formState, setFormState] = useState<ProjectionFormState>({
    selectedSimulation: '1',
    lifeStatus: 'VIVO',
    realReturnRate: 4.0,
    includeInsurances: true,
    showDetails: false,
  });

  const updateFormState = (updates: Partial<ProjectionFormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setFormState({
      selectedSimulation: '1',
      lifeStatus: 'VIVO',
      realReturnRate: 4.0,
      includeInsurances: true,
      showDetails: false,
    });
  };

  return {
    formState,
    updateFormState,
    resetForm,
  };
}
