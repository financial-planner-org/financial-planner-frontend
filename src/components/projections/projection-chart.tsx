'use client';

import { Card } from '@/components/ui/card';
import { Simulation } from '@/lib/validations/simulation';

interface ProjectionChartProps {
    simulations: Simulation[];
    selectedSimulation?: string;
}

export function ProjectionChart({ simulations, selectedSimulation }: ProjectionChartProps) {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Projeção Patrimonial</h3>
            {/* Gráfico será implementado com biblioteca de charts */}
            <div className="h-64 bg-muted rounded flex items-center justify-center">
                Gráfico de Projeção
            </div>
        </Card>
    );
}
