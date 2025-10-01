/**
 * @fileoverview Botão personalizado do Financial Planner
 * @description Componente de botão com variantes específicas do projeto
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const appButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Variantes padrão do ShadCN
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        // Variantes específicas do Financial Planner
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
        info: 'bg-blue-600 text-white hover:bg-blue-700',

        // Variantes de página (cores específicas)
        allocations: 'bg-blue-500 text-white hover:bg-blue-600',
        projections: 'bg-green-500 text-white hover:bg-green-600',
        history: 'bg-purple-500 text-white hover:bg-purple-600',
        dashboard: 'bg-orange-500 text-white hover:bg-orange-600',
        movements: 'bg-cyan-500 text-white hover:bg-cyan-600',
        insurances: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        xs: 'h-8 px-2 text-xs',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      loading: {
        true: 'cursor-not-allowed opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      loading: false,
    },
  }
);

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Botão personalizado do Financial Planner
 *
 * @param props - Props do botão
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * // Botão básico
 * <AppButton onClick={handleClick}>Salvar</AppButton>
 *
 * // Botão com variante de página
 * <AppButton variant="allocations">Gerenciar Alocações</AppButton>
 *
 * // Botão com ícones
 * <AppButton leftIcon={<Plus />} rightIcon={<ArrowRight />}>
 *   Adicionar Item
 * </AppButton>
 *
 * // Botão de loading
 * <AppButton loading={isLoading}>
 *   {isLoading ? "Salvando..." : "Salvar"}
 * </AppButton>
 *
 * // Botão como link
 * <AppButton asChild variant="link">
 *   <Link href="/dashboard">Dashboard</Link>
 * </AppButton>
 * ```
 */
const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          appButtonVariants({
            variant,
            size,
            fullWidth,
            loading: loading || disabled,
            className,
          })
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className='mr-2 h-4 w-4 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        )}

        {!loading && leftIcon && <span className='mr-2'>{leftIcon}</span>}

        {children}

        {!loading && rightIcon && <span className='ml-2'>{rightIcon}</span>}
      </Comp>
    );
  }
);

AppButton.displayName = 'AppButton';

export { AppButton, appButtonVariants };
