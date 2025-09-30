'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LegacyWarning } from '@/components/ui/legacy-warning';
import { MoreHorizontal, Eye, Edit, Trash2, Copy } from 'lucide-react';

interface HistoryItem {
    id: string;
    clientName: string;
    simulationName: string;
    version: number;
    createdAt: string;
    totalPatrimony: number;
    retirementYear: number;
    isLegacy: boolean;
    canEdit: boolean;
}

interface HistoryTableProps {
    history: HistoryItem[];
    isLoading: boolean;
    formatCurrency: (value: number) => string;
    onViewSimulation: (id: string) => void;
    onReopenSimulation: (id: string) => void;
    onCreateFromLegacy: (id: string) => void;
    onEditSimulation: (id: string) => void;
    onDeleteSimulation: (id: string) => void;
}

export function HistoryTable({
    history,
    isLoading,
    formatCurrency,
    onViewSimulation,
    onReopenSimulation,
    onCreateFromLegacy,
    onEditSimulation,
    onDeleteSimulation
}: HistoryTableProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-32">
                <div className="text-gray-400">Carregando histórico...</div>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">Nenhum histórico encontrado</div>
                <div className="text-gray-500 text-sm">Nenhuma simulação foi salva ainda.</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {history.map((item) => (
                <div
                    key={item.id}
                    className="w-full bg-transparent rounded-[20px] border border-neutral-600 relative p-6"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Ícone da simulação */}
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-600 rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-orange-500 font-bold text-sm">
                                        {item.version}
                                    </span>
                                </div>
                            </div>

                            {/* Informações da simulação */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-gray-200 text-2xl font-normal font-['Neuton'] leading-loose">
                                        {item.simulationName}
                                    </h3>
                                    {item.isLegacy && (
                                        <LegacyWarning tooltip="Versão legada – não editável" />
                                    )}
                                </div>

                                <div className="text-gray-400 text-sm mb-2">
                                    Cliente: {item.clientName} • Versão {item.version} • {item.createdAt}
                                </div>

                                <div className="flex items-center gap-6 text-sm text-gray-300">
                                    <span>Patrimônio: {formatCurrency(item.totalPatrimony)}</span>
                                    <span>Aposentadoria: {item.retirementYear}</span>
                                </div>
                            </div>
                        </div>

                        {/* Botões de ação */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onViewSimulation(item.id)}
                                className="bg-neutral-700 hover:bg-neutral-600 text-gray-300 border-neutral-600"
                            >
                                <Eye className="w-4 h-4 mr-1" />
                                Ver
                            </Button>

                            {item.canEdit && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEditSimulation(item.id)}
                                        className="bg-neutral-700 hover:bg-neutral-600 text-gray-300 border-neutral-600"
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Editar
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDeleteSimulation(item.id)}
                                        className="bg-red-700 hover:bg-red-600 text-white border-red-600"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Deletar
                                    </Button>
                                </>
                            )}

                            {item.isLegacy && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onCreateFromLegacy(item.id)}
                                    className="bg-orange-700 hover:bg-orange-600 text-white border-orange-600"
                                >
                                    <Copy className="w-4 h-4 mr-1" />
                                    Criar Nova
                                </Button>
                            )}

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
