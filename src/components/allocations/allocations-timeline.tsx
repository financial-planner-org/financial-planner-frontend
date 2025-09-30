'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, AlertTriangle, Edit } from 'lucide-react';
import { LoadingState } from '@/components/pages/loading-state';
import { EmptyState } from '@/components/pages/empty-state';

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

interface AllocationsTimelineProps {
    allocations: AllocationData[];
    isLoading: boolean;
    formatCurrency: (value: number) => string;
    getTypeColor: (type: string) => string;
    getTypeLabel: (type: string) => string;
    onUpdateAllocation: (id: string) => void;
    onEditAllocation: (id: string) => void;
    onViewAllocation: (id: string) => void;
    onDeleteAllocation: (id: string) => void;
}

export function AllocationsTimeline({
    allocations,
    isLoading,
    formatCurrency,
    getTypeColor,
    getTypeLabel,
    onUpdateAllocation,
    onEditAllocation,
    onViewAllocation,
    onDeleteAllocation
}: AllocationsTimelineProps) {
    if (isLoading) {
        return <LoadingState message="Carregando alocações..." />;
    }

    if (allocations.length === 0) {
        return (
            <EmptyState
                title="Nenhuma alocação encontrada"
                description="Nenhuma alocação encontrada para esta simulação."
            />
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {allocations.map((allocation) => (
                <div key={allocation.id} className="relative flex items-start gap-3 sm:gap-6">
                    {/* Ponto da timeline - responsivo */}
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full mt-2 sm:mt-3 flex-shrink-0 z-10"></div>

                    {/* Card de alocação - responsivo */}
                    <div className="flex-1 bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div className="flex-1">
                                {/* Título e badges - responsivo */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                                    <h3 className="text-white font-semibold text-lg sm:text-xl">{allocation.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge className={`text-xs sm:text-sm px-2 sm:px-3 py-1 ${getTypeColor(allocation.type)}`}>
                                            {getTypeLabel(allocation.type)}
                                        </Badge>
                                        {allocation.isFinanced && (
                                            <Badge className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-gray-100 text-gray-800">
                                                $ Financiado
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Data de início */}
                                {allocation.startDate && (
                                    <p className="text-gray-400 text-sm mb-2 font-medium">
                                        Início: {allocation.startDate}
                                    </p>
                                )}

                                {/* Período (para imóveis financiados) */}
                                {allocation.period && (
                                    <p className="text-gray-400 text-sm mb-2 font-medium">
                                        {allocation.period}
                                    </p>
                                )}

                                {/* Progresso (para imóveis financiados) */}
                                {allocation.progress && (
                                    <div className="mb-3">
                                        <p className="text-gray-400 text-sm mb-2 font-medium">
                                            Progresso: {allocation.progress}
                                        </p>
                                        <div className="w-full bg-gray-700 rounded-full h-3">
                                            <div
                                                className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                                                style={{ width: `${((allocation.progressValue || 0) / (allocation.progressTotal || 1)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* Valor - responsivo */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                                    <span className="text-white font-bold text-xl sm:text-2xl">
                                        {formatCurrency(allocation.value)}
                                    </span>
                                    {allocation.totalValue && (
                                        <span className="text-gray-400 text-sm sm:text-base font-medium">
                                            de {formatCurrency(allocation.totalValue)}
                                        </span>
                                    )}
                                </div>

                                {/* Última atualização */}
                                <div className="flex items-center gap-2">
                                    {allocation.hasWarning && (
                                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                                    )}
                                    <span className="text-gray-400 text-xs sm:text-sm font-medium">
                                        Última atualização: {allocation.lastUpdate}
                                    </span>
                                </div>
                            </div>

                            {/* Botões de ação - responsivo */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onUpdateAllocation(allocation.id)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm"
                                >
                                    <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    <span className="hidden sm:inline">Atualizar</span>
                                    <span className="sm:hidden">Atualizar</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-400 hover:text-white p-2"
                                >
                                    <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
