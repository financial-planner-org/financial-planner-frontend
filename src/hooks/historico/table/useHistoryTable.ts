'use client';

import { useState, useMemo } from 'react';
import { useUtils } from '../../common/utils/useUtils';

export interface HistoryTableRow {
  id: string;
  clientName: string;
  simulationName: string;
  version: number;
  createdAt: string;
  totalPatrimony: number;
  retirementYear: number;
  isLegacy: boolean;
  canEdit: boolean;
}

/**
 * Hook para gerenciar dados da tabela de histórico
 */
export function useHistoryTable(history: HistoryTableRow[] | null) {
  const [sortField, setSortField] = useState<keyof HistoryTableRow>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [showLegacyOnly, setShowLegacyOnly] = useState(false);

  const { formatCurrency, formatDate } = useUtils();

  const filteredData = useMemo(() => {
    if (!history) return [];

    let filtered = history;

    // Filtrar por cliente
    if (clientFilter !== 'all') {
      filtered = filtered.filter(item => item.clientName === clientFilter);
    }

    // Filtrar apenas legados
    if (showLegacyOnly) {
      filtered = filtered.filter(item => item.isLegacy);
    }

    return filtered;
  }, [history, clientFilter, showLegacyOnly]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredData, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, page, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const uniqueClients = useMemo(() => {
    if (!history) return [];
    return Array.from(new Set(history.map(item => item.clientName)));
  }, [history]);

  const handleSort = (field: keyof HistoryTableRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  const handleClientFilterChange = (newClientFilter: string) => {
    setClientFilter(newClientFilter);
    setPage(1);
  };

  const handleShowLegacyOnlyChange = (show: boolean) => {
    setShowLegacyOnly(show);
    setPage(1);
  };

  return {
    data: paginatedData,
    sortField,
    sortDirection,
    page,
    itemsPerPage,
    totalPages,
    totalItems: filteredData.length,
    clientFilter,
    showLegacyOnly,
    uniqueClients,
    formatCurrency,
    formatDate,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
    handleClientFilterChange,
    handleShowLegacyOnlyChange,
  };
}
