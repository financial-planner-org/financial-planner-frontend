'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    TrendingUp,
    BarChart3,
    X,
    Plus
} from 'lucide-react';
import type { Simulation, ProjectionData } from '@/lib/types/api';

interface SimulationComparisonModalProps {
    simulations: Simulation[];
    projectionData: Record<number, ProjectionData[]>;
    isOpen: boolean;
    onClose: () => void;
}

export function SimulationComparisonModal({
    simulations,
    projectionData,
    isOpen,
    onClose
}: SimulationComparisonModalProps) {
    const [selectedSimulations, setSelectedSimulations] = useState<number[]>([]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handleSimulationToggle = (simulationId: number) => {
        setSelectedSimulations(prev =>
            prev.includes(simulationId)
                ? prev.filter(id => id !== simulationId)
                : [...prev, simulationId]
        );
    };

    const handleClearSelection = () => {
        setSelectedSimulations([]);
    };

    // Obter dados das simulações selecionadas
    const selectedData = selectedSimulations
        .map(id => {
            const simulation = simulations.find(s => s.id === id);
            const data = projectionData[id];
            return simulation && data ? { simulation, data } : null;
        })
        .filter(Boolean) as Array<{ simulation: Simulation; data: ProjectionData[] }>;

    // Calcular estatísticas comparativas
    const getComparisonStats = () => {
        if (selectedData.length < 2) return null;

        const currentYear = 2025;
        const finalYear = 2060;

        const stats = selectedData.map(({ simulation, data }) => {
            const current = data.find(d => d.year === currentYear);
            const final = data.find(d => d.year === finalYear);

            if (!current || !final) return null;

            return {
                simulation,
                currentPatrimony: current.totalPatrimony,
                finalPatrimony: final.totalPatrimony,
                growth: ((final.totalPatrimony - current.totalPatrimony) / current.totalPatrimony) * 100,
                maxPatrimony: Math.max(...data.map(d => d.totalPatrimony)),
            };
        }).filter(Boolean);

        return stats;
    };

    const comparisonStats = getComparisonStats();

    // Componente do gráfico de comparação
    const ComparisonChart = () => {
        if (selectedData.length === 0) return null;

        const allYears = Array.from(
            new Set(selectedData.flatMap(({ data }) => data.map(d => d.year)))
        ).sort((a, b) => a - b);

        const maxValue = Math.max(
            ...selectedData.flatMap(({ data }) => data.map(d => d.totalPatrimony))
        );

        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 40, left: 60 };

        const xScale = (year: number) =>
            margin.left + ((year - allYears[0]) / (allYears[allYears.length - 1] - allYears[0])) * (width - margin.left - margin.right);

        const yScale = (value: number) =>
            height - margin.bottom - (value / maxValue) * (height - margin.top - margin.bottom);

        const colors = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6'];

        return (
            <div className="w-full overflow-x-auto">
                <svg width={width} height={height} className="w-full h-auto">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map(percent => {
                        const value = (maxValue * percent) / 100;
                        const y = yScale(value);
                        return (
                            <g key={percent}>
                                <line
                                    x1={margin.left}
                                    y1={y}
                                    x2={width - margin.right}
                                    y2={y}
                                    stroke="#434343"
                                    strokeWidth={1}
                                    opacity={0.3}
                                />
                                <text
                                    x={margin.left - 10}
                                    y={y + 4}
                                    textAnchor="end"
                                    className="text-xs fill-[#9F9F9F]"
                                >
                                    {formatCurrency(value)}
                                </text>
                            </g>
                        );
                    })}

                    {/* X-axis labels */}
                    {allYears.filter((_, i) => i % 5 === 0).map(year => (
                        <text
                            key={year}
                            x={xScale(year)}
                            y={height - margin.bottom + 20}
                            textAnchor="middle"
                            className="text-xs fill-[#9F9F9F]"
                        >
                            {year}
                        </text>
                    ))}

                    {/* Lines for each simulation */}
                    {selectedData.map(({ simulation, data }, index) => {
                        const color = colors[index % colors.length];
                        const sortedData = data.sort((a, b) => a.year - b.year);

                        return (
                            <g key={simulation.id}>
                                <path
                                    d={`M ${xScale(sortedData[0].year)} ${yScale(sortedData[0].totalPatrimony)}
                       ${sortedData.map(d => `L ${xScale(d.year)} ${yScale(d.totalPatrimony)}`).join(' ')}`}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth={3}
                                />
                                {sortedData.filter((_, i) => i % 5 === 0).map(d => (
                                    <circle
                                        key={d.year}
                                        cx={xScale(d.year)}
                                        cy={yScale(d.totalPatrimony)}
                                        r={4}
                                        fill={color}
                                        stroke="#101010"
                                        strokeWidth={2}
                                    />
                                ))}
                            </g>
                        );
                    })}
                </svg>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                    {selectedData.map(({ simulation }, index) => (
                        <div key={simulation.id} className="flex items-center gap-2">
                            <div
                                className="w-4 h-1 rounded"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                            <span className="text-sm text-[#9F9F9F]">{simulation.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-[#101010] border-[#434343] text-[#9F9F9F]">
                <DialogHeader>
                    <DialogTitle className="text-[#9F9F9F] text-xl font-semibold">
                        Comparar Simulações
                    </DialogTitle>
                    <DialogDescription className="text-[#B1B1B1]">
                        Selecione até 5 simulações para comparar suas projeções patrimoniais.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Seleção de simulações */}
                    <Card className="bg-[#434343] border-[#454545]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[#9F9F9F] text-lg">
                                    Simulações Disponíveis ({selectedSimulations.length}/5)
                                </CardTitle>
                                {selectedSimulations.length > 0 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleClearSelection}
                                        className="bg-[#454545] border-[#434343] text-[#B1B1B1] hover:bg-[#434343]"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Limpar Seleção
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {simulations
                                    .filter(sim => sim.status === 'ATIVO' && !sim.isLegacy)
                                    .map(simulation => (
                                        <div
                                            key={simulation.id}
                                            className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${selectedSimulations.includes(simulation.id)
                                                    ? 'bg-[#454545] border-[#9F9F9F]'
                                                    : 'bg-[#434343] border-[#454545] hover:bg-[#454545]'
                                                }`}
                                            onClick={() => handleSimulationToggle(simulation.id)}
                                        >
                                            <Checkbox
                                                checked={selectedSimulations.includes(simulation.id)}
                                                onChange={() => handleSimulationToggle(simulation.id)}
                                                className="border-[#454545] data-[state=checked]:bg-[#434343] data-[state=checked]:text-[#9F9F9F]"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[#B1B1B1] font-medium truncate">
                                                    {simulation.name}
                                                </p>
                                                <p className="text-[#9F9F9F] text-sm">
                                                    Taxa: {simulation.realRate}% a.a.
                                                </p>
                                            </div>
                                            <Badge
                                                className="text-xs bg-green-400/10 text-green-400 border-green-400/20"
                                            >
                                                {simulation.status}
                                            </Badge>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gráfico de comparação */}
                    {selectedData.length > 0 && (
                        <Card className="bg-[#434343] border-[#454545]">
                            <CardHeader>
                                <CardTitle className="text-[#9F9F9F] text-lg">
                                    Comparação de Projeções
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ComparisonChart />
                            </CardContent>
                        </Card>
                    )}

                    {/* Estatísticas comparativas */}
                    {comparisonStats && comparisonStats.length >= 2 && (
                        <Card className="bg-[#434343] border-[#454545]">
                            <CardHeader>
                                <CardTitle className="text-[#9F9F9F] text-lg">
                                    Estatísticas Comparativas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-[#454545]">
                                                <th className="text-left py-3 px-4 text-[#9F9F9F] font-medium">Simulação</th>
                                                <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Patrimônio Atual (2025)</th>
                                                <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Patrimônio Final (2060)</th>
                                                <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Crescimento</th>
                                                <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Pico Patrimonial</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comparisonStats.map((stat, index) => (
                                                <tr key={stat.simulation.id} className={index % 2 === 0 ? 'bg-[#434343]/20' : ''}>
                                                    <td className="py-3 px-4 text-[#B1B1B1] font-medium">
                                                        {stat.simulation.name}
                                                    </td>
                                                    <td className="py-3 px-4 text-right text-[#B1B1B1]">
                                                        {formatCurrency(stat.currentPatrimony)}
                                                    </td>
                                                    <td className="py-3 px-4 text-right text-[#B1B1B1]">
                                                        {formatCurrency(stat.finalPatrimony)}
                                                    </td>
                                                    <td className={`py-3 px-4 text-right font-medium ${stat.growth >= 0 ? 'text-green-400' : 'text-red-400'
                                                        }`}>
                                                        {stat.growth >= 0 ? '+' : ''}{stat.growth.toFixed(1)}%
                                                    </td>
                                                    <td className="py-3 px-4 text-right text-[#B1B1B1]">
                                                        {formatCurrency(stat.maxPatrimony)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Instruções */}
                    {selectedData.length === 0 && (
                        <Card className="bg-[#434343] border-[#454545]">
                            <CardContent className="p-6 text-center">
                                <BarChart3 className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
                                <h3 className="text-[#9F9F9F] text-lg font-medium mb-2">
                                    Selecione simulações para comparar
                                </h3>
                                <p className="text-[#B1B1B1] text-sm">
                                    Escolha entre 2 e 5 simulações para visualizar a comparação de suas projeções patrimoniais.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
