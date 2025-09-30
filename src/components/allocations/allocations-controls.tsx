'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AllocationsControlsProps {
    onAddAllocation: () => void;
}

export function AllocationsControls({ onAddAllocation }: AllocationsControlsProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-gray-400 text-sm sm:text-base font-medium">
                    Alocações:
                </span>
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
                    <span className="text-gray-800 text-xs sm:text-sm font-medium">
                        Todas
                    </span>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-zinc-300 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-1 sm:w-3 sm:h-1.5 bg-gray-800 rounded-sm"></div>
                    </div>
                </div>
            </div>

            <Button
                onClick={onAddAllocation}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
            >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Adicionar</span>
            </Button>
        </div>
    );
}
