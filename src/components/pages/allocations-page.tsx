'use client';

import { ReactNode } from 'react';
import { PageLayout, PageHeader, PageCard, DataCard, StatusBadge, LoadingState, ErrorState, EmptyState } from '@/components/common/page-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, MoreHorizontal, AlertTriangle } from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

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

interface AllocationsPageProps {
    allocations: AllocationData[];
    isLoading: boolean;
    error?: string;
    onAddAllocation: () => void;
    onUpdateAllocation: (id: string) => void;
    onEditAllocation: (id: string) => void;
    onViewAllocation: (id: string) => void;
    onDeleteAllocation: (id: string) => void;
    formatCurrency: (value: number) => string;
    getTypeColor: (type: string) => string;
    getTypeLabel: (type: string) => string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function AllocationsPage({
    allocations,
    isLoading,
    error,
    onAddAllocation,
    onUpdateAllocation,
    onEditAllocation,
    onViewAllocation,
    onDeleteAllocation,
    formatCurrency,
    getTypeColor,
    getTypeLabel
}: AllocationsPageProps) {
    if (isLoading) {
        return (
            <PageLayout>
                <PageHeader title="Alocações" />
                <LoadingState message="Carregando alocações..." />
            </PageLayout>
        );
    }

    if (error) {
        return (
            <PageLayout>
                <PageHeader title="Alocações" />
                <ErrorState message={error} />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <PageHeader
                title="Alocações"
                description="Gerencie suas alocações financeiras e imobilizadas"
                actions={
                    <Button onClick={onAddAllocation} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Adicionar Alocação
                    </Button>
                }
            />

            {allocations.length === 0 ? (
                <EmptyState
                    message="Nenhuma alocação encontrada"
                    action={
                        <Button onClick={onAddAllocation}>
                            Criar primeira alocação
                        </Button>
                    }
                />
            ) : (
                <div className="space-y-6">
                    {/* Resumo das alocações */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <DataCard
                            title="Total de Alocações"
                            value={allocations.length.toString()}
                            description="Alocações ativas"
                        />
                        <DataCard
                            title="Valor Total"
                            value={formatCurrency(allocations.reduce((sum, alloc) => sum + alloc.value, 0))}
                            description="Soma de todas as alocações"
                        />
                        <DataCard
                            title="Financiadas"
                            value={allocations.filter(alloc => alloc.isFinanced).length.toString()}
                            description="Alocações com financiamento"
                        />
                    </div>

                    {/* Lista de alocações */}
                    <PageCard title="Lista de Alocações">
                        <div className="space-y-4">
                            {allocations.map((allocation) => (
                                <AllocationCard
                                    key={allocation.id}
                                    allocation={allocation}
                                    onUpdate={onUpdateAllocation}
                                    onEdit={onEditAllocation}
                                    onView={onViewAllocation}
                                    onDelete={onDeleteAllocation}
                                    formatCurrency={formatCurrency}
                                    getTypeColor={getTypeColor}
                                    getTypeLabel={getTypeLabel}
                                />
                            ))}
                        </div>
                    </PageCard>
                </div>
            )}
        </PageLayout>
    );
}

// ============================================================================
// COMPONENTE DE CARD DE ALOCAÇÃO
// ============================================================================

interface AllocationCardProps {
    allocation: AllocationData;
    onUpdate: (id: string) => void;
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    onDelete: (id: string) => void;
    formatCurrency: (value: number) => string;
    getTypeColor: (type: string) => string;
    getTypeLabel: (type: string) => string;
}

function AllocationCard({
    allocation,
    onUpdate,
    onEdit,
    onView,
    onDelete,
    formatCurrency,
    getTypeColor,
    getTypeLabel
}: AllocationCardProps) {
    return (
        <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
            {/* Ícone de status */}
            <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>

            {/* Conteúdo principal */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {/* Título e badges */}
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-foreground truncate">
                                {allocation.title}
                            </h3>
                            <div className="flex gap-2">
                                <StatusBadge
                                    status={getTypeLabel(allocation.type)}
                                    type={allocation.type === 'FINANCIAL' ? 'financial' : 'immobilized'}
                                />
                                {allocation.isFinanced && (
                                    <StatusBadge status="Financiado" type="financed" />
                                )}
                            </div>
                        </div>

                        {/* Informações da alocação */}
                        <div className="space-y-1 text-sm text-muted-foreground">
                            {allocation.startDate && (
                                <p>Início: {allocation.startDate}</p>
                            )}
                            {allocation.period && (
                                <p>{allocation.period}</p>
                            )}
                            {allocation.progress && (
                                <div>
                                    <p>Progresso: {allocation.progress}</p>
                                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${((allocation.progressValue || 0) / (allocation.progressTotal || 1)) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Valor */}
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xl font-bold text-foreground">
                                {formatCurrency(allocation.value)}
                            </span>
                            {allocation.totalValue && (
                                <span className="text-sm text-muted-foreground">
                                    de {formatCurrency(allocation.totalValue)}
                                </span>
                            )}
                        </div>

                        {/* Última atualização */}
                        <div className="flex items-center gap-2 mt-2">
                            {allocation.hasWarning && (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="text-xs text-muted-foreground">
                                Última atualização: {allocation.lastUpdate}
                            </span>
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2 ml-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdate(allocation.id)}
                        >
                            <Edit className="w-4 h-4 mr-1" />
                            Atualizar
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(allocation.id)}
                        >
                            Ver
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(allocation.id)}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(allocation.id)}
                            className="text-destructive hover:text-destructive"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

