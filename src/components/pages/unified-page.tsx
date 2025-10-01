'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ALLOCATIONS_STYLES,
  PROJECTIONS_STYLES,
  HISTORY_STYLES,
  COMMON_STYLES
} from '@/lib/constants';
import { cn } from '@/lib/utils';

// ============================================================================
// TIPOS
// ============================================================================

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

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

// ============================================================================
// COMPONENTES
// ============================================================================

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn(COMMON_STYLES.pageContainer, className)}>
      {children}
    </div>
  );
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={cn(COMMON_STYLES.sectionContainer, className)}>
      {children}
    </div>
  );
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center space-x-4">
          {actions}
        </div>
      )}
    </div>
  );
}

export function PageCard({ title, description, children, actions, className }: PageCardProps) {
  return (
    <Card className={cn(COMMON_STYLES.card, className)}>
      <CardHeader>
        <div className={cn(COMMON_STYLES.cardHeader)}>
          <div>
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
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
// COMPONENTES ESPECÍFICOS
// ============================================================================

export function AllocationsPage({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <PageContent>
        <div className={ALLOCATIONS_STYLES.mainContainer}>
          {children}
        </div>
      </PageContent>
    </PageContainer>
  );
}

export function ProjectionsPage({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <PageContent>
        <div className={PROJECTIONS_STYLES.mainContainer}>
          {children}
        </div>
      </PageContent>
    </PageContainer>
  );
}

export function HistoryPage({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <PageContent>
        <div className={HISTORY_STYLES.mainContainer}>
          {children}
        </div>
      </PageContent>
    </PageContainer>
  );
}

// ============================================================================
// COMPONENTES DE DADOS
// ============================================================================

export function DataCard({
  title,
  value,
  description,
  trend,
  className
}: {
  title: string;
  value: string;
  description?: string;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}) {
  return (
    <Card className={cn(COMMON_STYLES.card, className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className={cn(
            'flex items-center text-xs',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatusBadge({
  status,
  type = 'default'
}: {
  status: string;
  type?: 'default' | 'financial' | 'immobilized' | 'financed';
}) {
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
    <Badge className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', getBadgeVariant())}>
      {status}
    </Badge>
  );
}

// ============================================================================
// COMPONENTES DE ESTADO
// ============================================================================

export function LoadingState({ message = "Carregando..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export function ErrorState({
  message = "Ocorreu um erro inesperado",
  onRetry
}: {
  message?: string;
  onRetry?: () => void;
}) {
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

export function EmptyState({
  message = "Nenhum dado encontrado",
  action
}: {
  message?: string;
  action?: ReactNode;
}) {
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
