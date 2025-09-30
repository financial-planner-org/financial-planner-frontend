'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Movement {
    id: string;
    title: string;
    type: string;
    value: number;
    frequency: string;
    startDate?: string;
    endDate?: string;
    isCredit: boolean;
    isDebit: boolean;
    isDependent: boolean;
}

interface MovementsSectionProps {
    movements: Movement[];
    isLoading: boolean;
    formatCurrency: (value: number) => string;
    getMovementIcon: (type: string) => string;
    getMovementColor: (type: string) => string;
    getFrequencyLabel: (frequency: string) => string;
}

export function MovementsSection({
    movements,
    isLoading,
    formatCurrency,
    getMovementIcon,
    getMovementColor,
    getFrequencyLabel
}: MovementsSectionProps) {
    const [activeTab, setActiveTab] = useState<'financial' | 'immobilized'>('financial');

    // Filtrar movimentações por tipo
    const financialMovements = movements.filter(m => m.type === 'INCOME' || m.type === 'EXPENSE');
    const immobilizedMovements = movements.filter(m => m.type === 'IMMOBILIZED');

    const renderMovementCard = (movement: Movement) => (
        <Card key={movement.id} className="w-[697.82px] h-44 bg-zinc-900 rounded-2xl border-2 border-orange-500 p-6 relative">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-stone-300 text-2xl font-medium font-['Work_Sans'] leading-loose">
                    {movement.title}
                </h3>
                <div className={`w-5 h-5 ${getMovementColor(movement.type)}`}>
                    {getMovementIcon(movement.type)}
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose">
                    {movement.startDate} - {movement.endDate || 'Contínuo'}
                </p>
                <p className="text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose">
                    Frequência: {getFrequencyLabel(movement.frequency)}
                </p>
                <p className="text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose">
                    {movement.isCredit ? 'Crédito' : movement.isDebit ? 'Débito' : 'Dependente'}
                </p>
                <p className={`text-2xl font-bold font-['Work_Sans'] leading-loose ${getMovementColor(movement.type)}`}>
                    {getMovementIcon(movement.type)} {formatCurrency(movement.value)}
                </p>
            </div>
        </Card>
    );

    if (isLoading) {
        return (
            <div className="mb-8">
                <h2 className="text-orange-500 text-3xl font-normal font-['Neuton'] leading-loose mb-4">
                    Movimentações
                </h2>
                <div className="flex items-center justify-center h-32">
                    <div className="text-gray-400">Carregando movimentações...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <h2 className="text-orange-500 text-3xl font-normal font-['Neuton'] leading-loose mb-4">
                Movimentações
            </h2>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'financial' | 'immobilized')}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-800 p-1 rounded-md mb-6">
                    <TabsTrigger
                        value="financial"
                        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300"
                    >
                        Financeiras
                    </TabsTrigger>
                    <TabsTrigger
                        value="immobilized"
                        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300"
                    >
                        Imobilizadas
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="financial">
                    <div className="grid grid-cols-2 gap-4">
                        {financialMovements.length > 0 ? (
                            financialMovements.map(renderMovementCard)
                        ) : (
                            <div className="col-span-2 text-center text-gray-400 py-8">
                                Nenhuma movimentação financeira encontrada
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="immobilized">
                    <div className="grid grid-cols-2 gap-4">
                        {immobilizedMovements.length > 0 ? (
                            immobilizedMovements.map(renderMovementCard)
                        ) : (
                            <div className="col-span-2 text-center text-gray-400 py-8">
                                Nenhuma movimentação imobilizada encontrada
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
