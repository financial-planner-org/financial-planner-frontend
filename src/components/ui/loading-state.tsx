/**
 * @fileoverview Estado de carregamento padrão
 * @description Componente para exibir estado de loading
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

/**
 * Componente de estado de carregamento
 *
 * @param {LoadingStateProps} props - Props do componente
 * @param {string} [props.message] - Mensagem de carregamento
 * @param {string} [props.className] - Classes CSS adicionais
 * @returns {JSX.Element} Estado de carregamento renderizado
 *
 * @example
 * ```tsx
 * <LoadingState message="Carregando dados..." />
 * ```
 */
export function LoadingState({ message = 'Carregando...', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8', className)}>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4'></div>
      <p className='text-muted-foreground text-sm'>{message}</p>
    </div>
  );
}
