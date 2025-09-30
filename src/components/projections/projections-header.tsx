'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ChevronDown } from 'lucide-react';

interface ProjectionsHeaderProps {
    clientName: string;
    totalNetWorth: number;
    netWorthChange: number;
    onAddSimulation: () => void;
    formatCurrency: (value: number) => string;
}

export function ProjectionsHeader({
    clientName,
    totalNetWorth,
    netWorthChange,
    onAddSimulation,
    formatCurrency
}: ProjectionsHeaderProps) {
    return (
        <div className="flex justify-between items-start mb-8">
            {/* Informações do cliente */}
            <div className="flex items-center gap-4">
                <div className="w-96 h-16 bg-stone-950 rounded-[32px] border-2 border-gray-300 relative flex items-center px-4">
                    <span className="text-white text-4xl font-medium font-['Work_Sans'] leading-loose">
                        {clientName}
                    </span>
                    <ChevronDown className="w-8 h-4 absolute right-4 text-gray-300" />
                </div>

                <div className="flex flex-col">
                    <span className="text-neutral-500 text-lg font-medium font-['Satoshi'] leading-loose">
                        Patrimônio Líquido Total
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-white text-4xl font-medium font-['Work_Sans'] leading-loose">
                            {formatCurrency(totalNetWorth)}
                        </span>
                        <Badge className="bg-green-100 text-green-800 text-sm">
                            +{netWorthChange.toFixed(2)}%
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Botão adicionar simulação */}
            <Button
                onClick={onAddSimulation}
                className="w-28 h-16 bg-zinc-900 rounded-2xl outline outline-2 outline-amber-300 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
            >
                <Plus className="w-5 h-5 text-amber-300" />
                <span className="text-amber-300 text-lg font-medium font-['Work_Sans'] leading-loose">
                    Adicionar
                </span>
            </Button>
        </div>
    );
}
