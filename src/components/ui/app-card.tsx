/**
 * @fileoverview Card personalizado do Financial Planner
 * @description Componente de card com variantes específicas do projeto
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const appCardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
  variants: {
    variant: {
      default: 'bg-card/50 backdrop-blur-sm border-border/50',
      solid: 'bg-card border-border',
      ghost: 'bg-transparent border-transparent',
      outline: 'bg-transparent border-border',

      // Variantes específicas do Financial Planner
      page: 'bg-card/50 backdrop-blur-sm border-border/50',
      stat: 'bg-card/50 backdrop-blur-sm border-border/50',
      form: 'bg-card/50 backdrop-blur-sm border-border/50',
      list: 'bg-card/50 backdrop-blur-sm border-border/50',
      table: 'bg-card/50 backdrop-blur-sm border-border/50',
    },
    size: {
      default: 'p-6',
      sm: 'p-4',
      lg: 'p-8',
      none: 'p-0',
    },
    hover: {
      true: 'hover:shadow-md transition-shadow duration-200',
      false: '',
    },
    clickable: {
      true: 'cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    hover: false,
    clickable: false,
  },
});

export interface AppCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appCardVariants> {
  asChild?: boolean;
}

/**
 * Card personalizado do Financial Planner
 *
 * @param props - Props do card
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * // Card básico
 * <AppCard>
 *   <h3>Título do Card</h3>
 *   <p>Conteúdo do card</p>
 * </AppCard>
 *
 * // Card de estatística
 * <AppCard variant="stat" size="sm">
 *   <div className="flex items-center justify-between">
 *     <div>
 *       <p className="text-sm font-medium text-muted-foreground">Total</p>
 *       <p className="text-2xl font-bold">R$ 1.234.567</p>
 *     </div>
 *     <TrendingUp className="h-4 w-4 text-green-500" />
 *   </div>
 * </AppCard>
 *
 * // Card clicável
 * <AppCard clickable onClick={handleClick}>
 *   <h3>Card Clicável</h3>
 *   <p>Clique para interagir</p>
 * </AppCard>
 *
 * // Card de formulário
 * <AppCard variant="form">
 *   <form>
 *     <FormField label="Nome" />
 *     <FormField label="Email" type="email" />
 *   </form>
 * </AppCard>
 * ```
 */
const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  ({ className, variant, size, hover, clickable, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'div' : 'div';

    return (
      <Comp
        className={cn(appCardVariants({ variant, size, hover, clickable }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

AppCard.displayName = 'AppCard';

// Componentes auxiliares para estrutura do card
const AppCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
AppCardHeader.displayName = 'AppCardHeader';

const AppCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
AppCardTitle.displayName = 'AppCardTitle';

const AppCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
AppCardDescription.displayName = 'AppCardDescription';

const AppCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
AppCardContent.displayName = 'AppCardContent';

const AppCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
AppCardFooter.displayName = 'AppCardFooter';

export {
  AppCard,
  AppCardHeader,
  AppCardTitle,
  AppCardDescription,
  AppCardContent,
  AppCardFooter,
  appCardVariants,
};
