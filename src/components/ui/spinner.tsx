/**
 * @fileoverview Spinner padrão do design system
 * @description Componente de carregamento para estados de loading
 */

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SpinnerProps {
  /**
   * Tamanho do spinner
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Texto de carregamento opcional
   */
  text?: string;
}

/**
 * Spinner de carregamento padrão do sistema.
 * Usado principalmente com TanStack Query para estados de loading.
 *
 * @param {SpinnerProps} props - Props do spinner
 * @param {string} [props.size="default"] - Tamanho do spinner
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {string} [props.text] - Texto de carregamento opcional
 * @returns {JSX.Element} Spinner renderizado
 *
 * @example
 * ```tsx
 * // Spinner básico
 * {isLoading && <Spinner />}
 *
 * // Spinner com tamanho personalizado
 * <Spinner size="lg" />
 *
 * // Spinner com texto
 * <Spinner text="Carregando dados..." />
 *
 * // Spinner em uma página completa
 * {isLoading ? (
 *   <div className="flex items-center justify-center min-h-[400px]">
 *     <Spinner size="lg" text="Carregando simulações..." />
 *   </div>
 * ) : (
 *   <Table>
 *     Conteúdo da tabela
 *   </Table>
 * )}
 *
 * // Spinner em um card
 * <Card>
 *   <CardContent>
 *     {isLoading ? (
 *       <Spinner text="Carregando alocações..." />
 *     ) : (
 *       <div>Conteúdo carregado</div>
 *     )}
 *   </CardContent>
 * </Card>
 * ```
 */
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'default', className, text, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      default: 'h-6 w-6',
      lg: 'h-8 w-8',
    };

    return (
      <div ref={ref} className={cn('flex items-center justify-center', className)} {...props}>
        <div className='flex flex-col items-center space-y-2'>
          <div
            className={cn(
              'animate-spin rounded-full border-2 border-t-transparent border-primary',
              sizeClasses[size]
            )}
          />
          {text && <p className='text-sm text-muted-foreground animate-pulse'>{text}</p>}
        </div>
      </div>
    );
  }
);
Spinner.displayName = 'Spinner';

export { Spinner };
