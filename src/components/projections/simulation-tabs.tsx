'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface Simulation {
    id: string;
    name: string;
    isCurrentSituation?: boolean;
    isRealized?: boolean;
}

interface SimulationTabsProps {
    simulations: Simulation[];
    selectedSimulation: string;
    onSelectSimulation: (id: string) => void;
    onEditSimulation: (id: string) => void;
    onDeleteSimulation: (id: string) => void;
    onCreateVersion: (id: string) => void;
    onViewDetails: (id: string) => void;
    onDuplicateSimulation: (id: string) => void;
}

export function SimulationTabs({
    simulations,
    selectedSimulation,
    onSelectSimulation,
    onEditSimulation,
    onDeleteSimulation,
    onCreateVersion,
    onViewDetails,
    onDuplicateSimulation
}: SimulationTabsProps) {
    return (
        <div className="flex gap-4 mb-8">
            {simulations.map((simulation) => (
                <div
                    key={simulation.id}
                    className={`w-72 h-16 rounded-2xl flex items-center gap-4 px-4 cursor-pointer transition-colors ${selectedSimulation === simulation.id
                            ? 'bg-zinc-900 outline outline-2 outline-blue-400'
                            : 'bg-zinc-900 hover:bg-zinc-800'
                        }`}
                    onClick={() => onSelectSimulation(simulation.id)}
                >
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-800 flex items-center justify-center">
                        <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
                    </div>

                    <div className="flex-1">
                        <span className="text-gray-300 text-lg font-medium font-['Work_Sans'] leading-loose">
                            {simulation.name}
                        </span>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Aqui você pode abrir um menu dropdown
                            console.log('Menu para simulação:', simulation.id);
                        }}
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
