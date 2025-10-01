/**
 * @fileoverview Hook para utilitários
 * @description Hook com funções utilitárias para formatação e manipulação de dados
 */

'use client';

import { formatCurrency, formatPercentage, formatDate } from '@/lib/utils';

/**
 * Hook com funções utilitárias
 */
export function useUtils() {
  return {
    formatCurrency,
    formatPercentage,
    formatDate,

    /**
     * Obtém cor baseada no tipo
     */
    getTypeColor: (type: string) => {
      const colors: Record<string, string> = {
        financial: 'blue',
        real_estate: 'green',
        income: 'green',
        expense: 'red',
        life: 'blue',
        death: 'red',
        disability: 'yellow',
      };
      return colors[type] || 'gray';
    },

    /**
     * Obtém label baseado no tipo
     */
    getTypeLabel: (type: string) => {
      const labels: Record<string, string> = {
        financial: 'Financeira',
        real_estate: 'Imobiliária',
        income: 'Entrada',
        expense: 'Saída',
        life: 'Vida',
        death: 'Morte',
        disability: 'Invalidez',
      };
      return labels[type] || type;
    },

    /**
     * Obtém ícone baseado no tipo de movimento
     */
    getMovementIcon: (type: string) => {
      // Implementação simplificada - retorna string do ícone
      const icons: Record<string, string> = {
        income: 'TrendingUp',
        expense: 'TrendingDown',
        salary: 'DollarSign',
        cost: 'CreditCard',
      };
      return icons[type] || 'Circle';
    },

    /**
     * Obtém cor baseada no tipo de movimento
     */
    getMovementColor: (type: string) => {
      const colors: Record<string, string> = {
        income: 'green',
        expense: 'red',
        salary: 'blue',
        cost: 'orange',
      };
      return colors[type] || 'gray';
    },

    /**
     * Obtém label do tipo de seguro
     */
    getInsuranceTypeLabel: (type: string) => {
      const labels: Record<string, string> = {
        life: 'Vida',
        death: 'Morte',
        disability: 'Invalidez',
        health: 'Saúde',
      };
      return labels[type] || type;
    },

    /**
     * Obtém label da frequência
     */
    getFrequencyLabel: (frequency: string) => {
      const labels: Record<string, string> = {
        monthly: 'Mensal',
        quarterly: 'Trimestral',
        annually: 'Anual',
        one_time: 'Única',
      };
      return labels[frequency] || frequency;
    },
  };
}
