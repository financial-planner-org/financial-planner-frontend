'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { RefreshCw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';

const refreshButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Variantes específicas para atualizar
        update: 'bg-laranja-escuro-botao text-white hover:bg-orange-600 rounded-[40px]',
        refresh: 'bg-blue-500 text-white hover:bg-blue-600',
        sync: 'bg-green-500 text-white hover:bg-green-600',
        // Nova variante com o estilo fornecido
        custom:
          "inline-flex flex-col items-start gap-[19px] rounded-[40px] bg-[#101010] text-[#2D2D2D] font-['ABeeZee'] text-lg font-normal leading-[30px] underline decoration-solid underline-offset-auto underline-auto",
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        // Tamanhos específicos para atualizar
        update: 'h-9 px-4 sm:px-6 py-3',
        compact: 'h-8 px-3 py-2 text-xs',
        // Tamanho para a variante custom
        custom: 'px-6 py-4',
      },
      loading: {
        true: 'cursor-not-allowed opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  }
);

export interface RefreshButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof refreshButtonVariants> {
  /**
   * Texto do botão
   */
  children?: React.ReactNode;
  /**
   * Estado de carregamento
   */
  isLoading?: boolean;
  /**
   * Texto alternativo quando carregando
   */
  loadingText?: string;
  /**
   * Mostrar ícone de refresh
   */
  showIcon?: boolean;
  /**
   * Tamanho do ícone
   */
  iconSize?: number;
}

/**
 * Botão de atualizar/refresh com animação de loading
 *
 * @example
 * ```tsx
 * // Botão básico de atualizar
 * <RefreshButton onClick={handleRefresh}>
 *   Atualizar
 * </RefreshButton>
 *
 * // Botão com loading
 * <RefreshButton
 *   isLoading={isLoading}
 *   loadingText="Atualizando..."
 * >
 *   Atualizar Dados
 * </RefreshButton>
 *
 * // Botão compacto
 * <RefreshButton
 *   size="compact"
 *   variant="ghost"
 *   showIcon={false}
 * >
 *   Sync
 * </RefreshButton>
 *
 * // Botão de atualizar específico para alocações
 * <RefreshButton
 *   variant="update"
 *   size="update"
 *   onClick={handleUpdateAllocation}
 * >
 *   Atualizar
 * </RefreshButton>
 *
 * // Botão com estilo customizado
 * <RefreshButton
 *   variant="custom"
 *   size="custom"
 *   onClick={handleCustomAction}
 * >
 *   Ação Customizada
 * </RefreshButton>
 * ```
 */
const RefreshButton = React.forwardRef<HTMLButtonElement, RefreshButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      isLoading = false,
      loadingText = 'Atualizando...',
      showIcon = true,
      iconSize = 16,
      children = 'Atualizar',
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading || isLoading;

    return (
      <Button
        className={cn(refreshButtonVariants({ variant, size, loading: isDisabled }), className)}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {showIcon && variant !== 'custom' && (
          <RefreshCw
            className={cn('h-4 w-4', (loading || isLoading) && 'animate-spin')}
            size={iconSize}
          />
        )}
        {loading || isLoading ? loadingText : children}
      </Button>
    );
  }
);
RefreshButton.displayName = 'RefreshButton';

export { RefreshButton, refreshButtonVariants };
