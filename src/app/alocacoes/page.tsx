'use client';

import React from 'react';
import { PageContainer } from '@/components/pages/page-container';
import { PageHeader } from '@/components/pages/page-header';
import { AllocationsControls } from '@/components/allocations/allocations-controls';
import { AllocationsTimeline } from '@/components/allocations/allocations-timeline';
import { useAllocationsPage } from '@/hooks/use-allocations-page';
import { PAGE_NAVIGATION, ROUTES, ALLOCATIONS_STYLES } from '@/lib/constants';
import {
  AddFinancialAllocationModal,
  AddImmovableAllocationModal
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

  const navigationItems = [...PAGE_NAVIGATION[ROUTES.ALLOCATIONS]];

  const handleAddFinancialAllocation = async (data: any) => {
    console.log('Adicionando alocação financeira:', data);
    // Implementar lógica de adição
  };

  const handleAddImmovableAllocation = async (data: any) => {
    console.log('Adicionando alocação imobilizada:', data);
    // Implementar lógica de adição
  };

  return (
    <PageContainer>
      <PageHeader
        title="Alocações"
        navigationItems={navigationItems}
      />

      <div className="flex gap-4 mb-6">
        <AddFinancialAllocationModal onAddFinancial={handleAddFinancialAllocation} />
        <AddImmovableAllocationModal onAddImmovable={handleAddImmovableAllocation} />
      </div>

      {/* Timeline de alocações - Responsivo */}
      <div className={ALLOCATIONS_STYLES.timeline.container}>
        <h2 className={ALLOCATIONS_STYLES.timeline.title}>
          Timeline de alocações manuais
        </h2>

        {/* Linha da timeline vertical - responsiva */}
        <div className={ALLOCATIONS_STYLES.timeline.line}></div>

        {/* Labels da timeline - responsivos */}
        <div className={ALLOCATIONS_STYLES.timeline.oldDataLabel}>
          Dados antigos
        </div>

        <div className={ALLOCATIONS_STYLES.timeline.updatedLabel}>
          Atualizado
        </div>

        {/* Cards de alocação com espaçamento responsivo */}
        <div className={ALLOCATIONS_STYLES.timeline.itemsContainer}>
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
    </PageContainer>
  );
}
