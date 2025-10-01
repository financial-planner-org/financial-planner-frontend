/**
 * @fileoverview Estado vazio padrão
 * @description Componente para exibir estado vazio quando não há dados
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Componente de estado vazio
 *
 * @param {EmptyStateProps} props - Props do componente
 * @param {string} [props.title] - Título do estado vazio
 * @param {string} [props.description] - Descrição do estado vazio
 * @param {string} [props.className] - Classes CSS adicionais
 * @returns {JSX.Element} Estado vazio renderizado
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="Nenhum item encontrado"
 *   description="Não há dados para exibir no momento."
 * />
 * ```
 */
export function EmptyState({
  title = 'Nenhum dado disponível',
  description = 'Não há informações para exibir no momento.',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4'>
        <svg
          className='w-8 h-8 text-muted-foreground'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
      </div>
      <h3 className='text-lg font-semibold text-foreground mb-2'>{title}</h3>
      <p className='text-muted-foreground text-sm max-w-md'>{description}</p>
    </div>
  );
}
