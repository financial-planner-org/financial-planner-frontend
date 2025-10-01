'use client';

import React from 'react';
import {
  AllocationsPage,
  PageHeader,
  LoadingState,
  ErrorState
} from '@/components/pages/unified-page';
import { AllocationsTimeline } from '@/components/allocations/allocations-timeline';
import { useAllocationsPage } from '@/hooks/use-allocations-page';
import { ROUTES } from '@/lib/constants';
import {
  AddFinancialAllocationDialog,
  AddImmovableAllocationDialog
} from '@/components/modals/allocation-modals';

export default function AlocacoesPage() {
  const {
    formattedAllocations,
    isLoadingAllocations,
    formatCurrency,
    getTypeColor,
    getTypeLabel,
    handleEditAllocation,
    handleViewAllocation,
    handleDeleteAllocation,
    handleUpdateAllocation
  } = useAllocationsPage();

  const handleAddFinancialAllocation = async (data: any) => {
    console.log('Adicionando alocação financeira:', data);
    // Implementar lógica de adição
  };

  const handleAddImmovableAllocation = async (data: any) => {
    console.log('Adicionando alocação imobilizada:', data);
    // Implementar lógica de adição
  };

  if (isLoadingAllocations) {
    return (
      <AllocationsPage>
        <LoadingState message="Carregando alocações..." />
      </AllocationsPage>
    );
  }

  return (
    <AllocationsPage>
      <PageHeader
        title="Alocações"
        description="Gerencie suas alocações financeiras e imobiliárias"
        actions={
          <div className="flex gap-2">
            <AddFinancialAllocationDialog onAddFinancial={handleAddFinancialAllocation} />
            <AddImmovableAllocationDialog onAddImmovable={handleAddImmovableAllocation} />
          </div>
        }
      />

      {/* Timeline de alocações */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Timeline de alocações manuais</h2>

        <div className="relative">
          {/* Linha da timeline vertical */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Labels da timeline */}
          <div className="absolute left-0 top-0 text-xs text-muted-foreground">
            Dados antigos
          </div>
          <div className="absolute left-0 bottom-0 text-xs text-muted-foreground">
            Atualizado
          </div>

          {/* Cards de alocação */}
          <div className="space-y-4 pl-8">
            <AllocationsTimeline
              allocations={formattedAllocations}
              isLoading={isLoadingAllocations}
              formatCurrency={formatCurrency}
              getTypeColor={getTypeColor}
              getTypeLabel={getTypeLabel}
              onUpdateAllocation={handleUpdateAllocation}
              onEditAllocation={handleEditAllocation}
              onViewAllocation={handleViewAllocation}
              onDeleteAllocation={handleDeleteAllocation}
            />
          </div>
        </div>
      </div>
    </AllocationsPage>
  );
}
