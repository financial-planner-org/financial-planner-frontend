/**
 * @fileoverview Componente de controles de alocações
 * @description Controles para adicionar e filtrar alocações
 * @author Financial Planner Team
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
// import { cn } from '@/lib/utils';

interface AllocationsControlsProps {
  onAddAllocation: () => void;
  className?: string;
}

/**
 * Componente de controles para a página de alocações
 * Inclui filtros e botão de adicionar
 */
export const AllocationsControls: React.FC<AllocationsControlsProps> = ({
  onAddAllocation,
  className,
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8 ${className || ''}`}
    >
      <div className='flex items-center gap-4 sm:gap-6'>
        <span className='text-muted-foreground text-sm sm:text-base font-medium'>Alocações:</span>
        <div className='flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-muted rounded-lg border'>
          <span className='text-foreground text-xs sm:text-sm font-medium'>Todas</span>
          <div className='w-4 h-4 sm:w-5 sm:h-5 bg-muted-foreground rounded-sm flex items-center justify-center'>
            <div className='w-2 h-1 sm:w-3 sm:h-1.5 bg-background rounded-sm'></div>
          </div>
        </div>
      </div>

      <Button
        onClick={onAddAllocation}
        className='bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto'
      >
        <Plus className='w-4 h-4 sm:w-5 sm:h-5' />
        <span>Adicionar</span>
      </Button>
    </div>
  );
};
