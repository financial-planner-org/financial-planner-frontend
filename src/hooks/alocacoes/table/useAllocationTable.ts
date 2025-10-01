'use client';

import { useState, useMemo } from 'react';
import { useUtils } from '../../common/utils/useUtils';

export interface AllocationTableRow {
  id: string;
  title: string;
  type: 'FINANCIAL' | 'REAL_ESTATE';
  value: number;
  startDate: string;
  lastUpdate: string;
  hasWarning: boolean;
  status: 'updated' | 'old';
}

/**
 * Hook para gerenciar dados da tabela de alocações
 */
export function useAllocationTable(allocations: AllocationTableRow[] | null) {
  const [sortField, setSortField] = useState<keyof AllocationTableRow>('lastUpdate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filter, setFilter] = useState<string>('all'); // all, financial, real_estate

  const { formatCurrency, getTypeColor, getTypeLabel } = useUtils();

  const filteredData = useMemo(() => {
    if (!allocations) return [];

    if (filter === 'all') return allocations;
    if (filter === 'financial') return allocations.filter(item => item.type === 'FINANCIAL');
    if (filter === 'real_estate') return allocations.filter(item => item.type === 'REAL_ESTATE');

    return allocations;
  }, [allocations, filter]);

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

  const handleSort = (field: keyof AllocationTableRow) => {
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

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
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
    filter,
    formatCurrency,
    getTypeColor,
    getTypeLabel,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
    handleFilterChange,
  };
}
