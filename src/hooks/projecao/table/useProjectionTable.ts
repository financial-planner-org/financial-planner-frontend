'use client';

import { useState, useMemo } from 'react';
import { useUtils } from '../../common/utils/useUtils';

export interface ProjectionTableRow {
  year: number;
  totalPatrimony: number;
  financialPatrimony: number;
  realEstatePatrimony: number;
  totalPatrimonyWithoutInsurances: number;
}

/**
 * Hook para gerenciar dados da tabela de projeção
 */
export function useProjectionTable(projectionData: ProjectionTableRow[] | null) {
  const [sortField, setSortField] = useState<keyof ProjectionTableRow>('year');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { formatCurrency } = useUtils();

  const sortedData = useMemo(() => {
    if (!projectionData) return [];

    return [...projectionData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [projectionData, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, page, itemsPerPage]);

  const totalPages = Math.ceil((projectionData?.length || 0) / itemsPerPage);

  const handleSort = (field: keyof ProjectionTableRow) => {
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

  return {
    data: paginatedData,
    sortField,
    sortDirection,
    page,
    itemsPerPage,
    totalPages,
    totalItems: projectionData?.length || 0,
    formatCurrency,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
  };
}
