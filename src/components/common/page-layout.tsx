'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// ============================================================================
// TIPOS
// ============================================================================

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

interface PageCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

interface PageTabsProps {
  tabs: Array<{
    value: string;
    label: string;
    content: ReactNode;
  }>;
  defaultValue?: string;
  className?: string;
}

interface DataCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

interface StatusBadgeProps {
  status: string;
  type?: 'default' | 'financial' | 'immobilized' | 'financed';
}

interface StateProps {
  message?: string;
  onRetry?: () => void;
  action?: ReactNode;
}

// ============================================================================
// COMPONENTE BASE
// ============================================================================

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={cn('min-h-screen bg-background', className)}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </div>
    </main>
  );
}

// ============================================================================
// COMPONENTES DE LAYOUT
// ============================================================================

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <header className={cn('flex items-center justify-between mb-8', className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center space-x-4">
          {actions}
        </div>
      )}
    </header>
  );
}

export function PageCard({ title, description, children, actions, className }: PageCardProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export function PageTabs({ tabs, defaultValue, className }: PageTabsProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className={cn('w-full', className)}>
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

// ============================================================================
// COMPONENTES DE DADOS
// ============================================================================

export function DataCard({ title, value, description, trend, className }: DataCardProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={cn(
            'flex items-center text-xs mt-2',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatusBadge({ status, type = 'default' }: StatusBadgeProps) {
  const getBadgeVariant = () => {
    switch (type) {
      case 'financial':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20';
      case 'immobilized':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20';
      case 'financed':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  return (
    <Badge className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      getBadgeVariant()
    )}>
      {status}
    </Badge>
  );
}

// ============================================================================
// COMPONENTES DE ESTADO
// ============================================================================

export function LoadingState({ message = "Carregando..." }: StateProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message = "Ocorreu um erro inesperado", onRetry }: StateProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-destructive text-4xl mb-4">⚠️</div>
        <p className="text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ message = "Nenhum dado encontrado", action }: StateProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-muted-foreground text-4xl mb-4">📭</div>
        <p className="text-muted-foreground mb-4">{message}</p>
        {action}
      </div>
    </div>
  );
}
