/**
 * @fileoverview Componente de timeline de alocações
 * @description Timeline responsiva para exibir alocações em formato de linha do tempo
 * @author Financial Planner Team
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, AlertTriangle, Edit } from 'lucide-react';
import { LoadingState, EmptyState } from '@/components/common/page-states';
// import { cn } from '@/lib/utils';

interface AllocationData {
  id: string;
  title: string;
  type: string;
  value: number;
  startDate?: string;
  lastUpdate: string;
  hasWarning: boolean;
  status: 'old' | 'updated';
  totalValue?: number;
  period?: string;
  progress?: string;
  progressValue?: number;
  progressTotal?: number;
  isFinanced?: boolean;
}

interface AllocationsTimelineProps {
  allocations: AllocationData[];
  isLoading: boolean;
  formatCurrency: (value: number) => string;
  getTypeColor: (type: string) => string;
  getTypeLabel: (type: string) => string;
  onUpdateAllocation: (id: string) => void;
  onEditAllocation: (id: string) => void;
  onViewAllocation: (id: string) => void;
  onDeleteAllocation: (id: string) => void;
  className?: string;
}

/**
 * Componente de timeline responsiva para alocações
 * Exibe alocações em formato de linha do tempo com suporte a zoom
 */
export const AllocationsTimeline: React.FC<AllocationsTimelineProps> = ({
  allocations,
  isLoading,
  formatCurrency,
  getTypeColor,
  getTypeLabel,
  onUpdateAllocation,
  onEditAllocation,
  onViewAllocation,
  onDeleteAllocation,
  className,
}) => {
  if (isLoading) {
    return <LoadingState message='Carregando alocações...' />;
  }

  if (allocations.length === 0) {
    return (
      <EmptyState
        title='Nenhuma alocação encontrada'
        description='Nenhuma alocação encontrada para esta simulação.'
      />
    );
  }

  return (
    <div className={`space-y-4 sm:space-y-6 ${className || ''}`}>
      {allocations.map(allocation => (
        <AllocationTimelineItem
          key={allocation.id}
          allocation={allocation}
          formatCurrency={formatCurrency}
          getTypeColor={getTypeColor}
          getTypeLabel={getTypeLabel}
          onUpdate={onUpdateAllocation}
          onEdit={onEditAllocation}
          onView={onViewAllocation}
          onDelete={onDeleteAllocation}
        />
      ))}
    </div>
  );
};

interface AllocationTimelineItemProps {
  allocation: AllocationData;
  formatCurrency: (value: number) => string;
  getTypeColor: (type: string) => string;
  getTypeLabel: (type: string) => string;
  onUpdate: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Item individual da timeline de alocações
 */
const AllocationTimelineItem: React.FC<AllocationTimelineItemProps> = ({
  allocation,
  formatCurrency,
  getTypeColor,
  getTypeLabel,
  onUpdate,
  onEdit,
  onView,
  onDelete,
}) => {
  return (
    <div className='relative flex items-start gap-3 sm:gap-6'>
      {/* Ponto da timeline - responsivo */}
      <div className='w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full mt-2 sm:mt-3 flex-shrink-0 z-10'></div>

      {/* Card de alocação - responsivo */}
      <div className='flex-1 bg-card rounded-xl p-4 sm:p-6 border shadow-lg'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4'>
          <div className='flex-1'>
            {/* Título e badges - responsivo */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3'>
              <h3 className='text-foreground font-semibold text-lg sm:text-xl'>
                {allocation.title}
              </h3>
              <div className='flex flex-wrap gap-2'>
                <Badge
                  className={`text-xs sm:text-sm px-2 sm:px-3 py-1 ${getTypeColor(allocation.type)}`}
                >
                  {getTypeLabel(allocation.type)}
                </Badge>
                {allocation.isFinanced && (
                  <Badge className='text-xs sm:text-sm px-2 sm:px-3 py-1 bg-muted text-muted-foreground'>
                    $ Financiado
                  </Badge>
                )}
              </div>
            </div>

            {/* Data de início */}
            {allocation.startDate && (
              <p className='text-muted-foreground text-sm mb-2 font-medium'>
                Início: {allocation.startDate}
              </p>
            )}

            {/* Período (para imóveis financiados) */}
            {allocation.period && (
              <p className='text-muted-foreground text-sm mb-2 font-medium'>{allocation.period}</p>
            )}

            {/* Progresso (para imóveis financiados) */}
            {allocation.progress && (
              <div className='mb-3'>
                <p className='text-muted-foreground text-sm mb-2 font-medium'>
                  Progresso: {allocation.progress}
                </p>
                <div className='w-full bg-muted rounded-full h-3'>
                  <div
                    className='bg-primary h-3 rounded-full transition-all duration-300'
                    style={{
                      width: `${((allocation.progressValue || 0) / (allocation.progressTotal || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Valor - responsivo */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3'>
              <span className='text-foreground font-bold text-xl sm:text-2xl'>
                {formatCurrency(allocation.value)}
              </span>
              {allocation.totalValue && (
                <span className='text-muted-foreground text-sm sm:text-base font-medium'>
                  de {formatCurrency(allocation.totalValue)}
                </span>
              )}
            </div>

            {/* Última atualização */}
            <div className='flex items-center gap-2'>
              {allocation.hasWarning && (
                <AlertTriangle className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-500' />
              )}
              <span className='text-muted-foreground text-xs sm:text-sm font-medium'>
                Última atualização: {allocation.lastUpdate}
              </span>
            </div>
          </div>

          {/* Botões de ação - responsivo */}
          <div className='flex items-center gap-2 sm:gap-3'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onUpdate(allocation.id)}
              className='bg-primary hover:bg-primary/90 text-primary-foreground border-primary px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm'
            >
              <Edit className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2' />
              <span className='hidden sm:inline'>Atualizar</span>
              <span className='sm:hidden'>Atualizar</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='text-muted-foreground hover:text-foreground p-2'
            >
              <MoreHorizontal className='w-4 h-4 sm:w-5 sm:h-5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
