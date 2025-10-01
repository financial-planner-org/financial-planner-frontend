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
import {
    TrendingUp,
    TrendingDown,
    Building,
    DollarSign,
    Shield,
    Calendar,
    BarChart3,
    Table
} from 'lucide-react';
import type { Simulation, ProjectionData } from '@/lib/types/api';

interface ProjectionDetailsModalProps {
    simulation: Simulation | null;
    projectionData: ProjectionData[];
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectionDetailsModal({
    simulation,
    projectionData,
    isOpen,
    onClose
}: ProjectionDetailsModalProps) {
    const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

    if (!simulation || !projectionData.length) {
        return null;
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    // Calcular estatísticas
    const currentYear = projectionData[0];
    const finalYear = projectionData[projectionData.length - 1];
    const maxPatrimony = Math.max(...projectionData.map(p => p.totalPatrimony));
    const minPatrimony = Math.min(...projectionData.map(p => p.totalPatrimony));
    const growthRate = ((finalYear.totalPatrimony - currentYear.totalPatrimony) / currentYear.totalPatrimony) * 100;

    // Componente do gráfico de área empilhada
    const StackedAreaChart = () => {
        const maxValue = Math.max(...projectionData.map(p => p.totalPatrimony));
        const minValue = Math.min(...projectionData.map(p => p.totalPatrimony));
        const range = maxValue - minValue;
        const padding = range * 0.1;

        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 40, left: 60 };

        const xScale = (year: number) =>
            margin.left + ((year - projectionData[0].year) / (projectionData[projectionData.length - 1].year - projectionData[0].year)) * (width - margin.left - margin.right);

        const yScale = (value: number) =>
            height - margin.bottom - ((value - minValue + padding) / (range + padding * 2)) * (height - margin.top - margin.bottom);

        return (
            <div className="w-full overflow-x-auto">
                <svg width={width} height={height} className="w-full h-auto">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map(percent => {
                        const value = minValue + (range * percent / 100);
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
                    {projectionData.filter((_, i) => i % 5 === 0).map(data => (
                        <text
                            key={data.year}
                            x={xScale(data.year)}
                            y={height - margin.bottom + 20}
                            textAnchor="middle"
                            className="text-xs fill-[#9F9F9F]"
                        >
                            {data.year}
                        </text>
                    ))}

                    {/* Financial Patrimony Area */}
                    <path
                        d={`M ${xScale(projectionData[0].year)} ${yScale(projectionData[0].financialPatrimony)}
                 ${projectionData.map(data => `L ${xScale(data.year)} ${yScale(data.financialPatrimony)}`).join(' ')}
                 L ${xScale(projectionData[projectionData.length - 1].year)} ${yScale(0)}
                 L ${xScale(projectionData[0].year)} ${yScale(0)}
                 Z`}
                        fill="#10B981"
                        fillOpacity={0.6}
                    />

                    {/* Immovable Patrimony Area */}
                    <path
                        d={`M ${xScale(projectionData[0].year)} ${yScale(projectionData[0].financialPatrimony)}
                 ${projectionData.map(data => `L ${xScale(data.year)} ${yScale(data.financialPatrimony + data.immovablePatrimony)}`).join(' ')}
                 L ${xScale(projectionData[projectionData.length - 1].year)} ${yScale(projectionData[projectionData.length - 1].financialPatrimony)}
                 L ${xScale(projectionData[0].year)} ${yScale(projectionData[0].financialPatrimony)}
                 Z`}
                        fill="#3B82F6"
                        fillOpacity={0.6}
                    />

                    {/* Total Patrimony Line */}
                    <path
                        d={`M ${xScale(projectionData[0].year)} ${yScale(projectionData[0].totalPatrimony)}
                 ${projectionData.map(data => `L ${xScale(data.year)} ${yScale(data.totalPatrimony)}`).join(' ')}`}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth={3}
                    />

                    {/* Total Patrimony Without Insurance Line */}
                    <path
                        d={`M ${xScale(projectionData[0].year)} ${yScale(projectionData[0].totalPatrimonyWithoutInsurance)}
                 ${projectionData.map(data => `L ${xScale(data.year)} ${yScale(data.totalPatrimonyWithoutInsurance)}`).join(' ')}`}
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth={2}
                        strokeDasharray="5,5"
                    />

                    {/* Data points */}
                    {projectionData.filter((_, i) => i % 5 === 0).map(data => (
                        <g key={data.year}>
                            <circle
                                cx={xScale(data.year)}
                                cy={yScale(data.totalPatrimony)}
                                r={4}
                                fill="#F59E0B"
                                stroke="#101010"
                                strokeWidth={2}
                            />
                        </g>
                    ))}
                </svg>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm text-[#9F9F9F]">Patrimônio Financeiro</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm text-[#9F9F9F]">Patrimônio Imobilizado</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-yellow-500"></div>
                        <span className="text-sm text-[#9F9F9F]">Patrimônio Total</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-red-500 border-dashed border-t-2"></div>
                        <span className="text-sm text-[#9F9F9F]">Sem Seguros</span>
                    </div>
                </div>
            </div>
        );
    };

    // Componente da tabela
    const ProjectionTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[#434343]">
                        <th className="text-left py-3 px-4 text-[#9F9F9F] font-medium">Ano</th>
                        <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Patrimônio Total</th>
                        <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Financeiro</th>
                        <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Imobilizado</th>
                        <th className="text-right py-3 px-4 text-[#9F9F9F] font-medium">Sem Seguros</th>
                    </tr>
                </thead>
                <tbody>
                    {projectionData.map((data, index) => (
                        <tr key={data.year} className={index % 2 === 0 ? 'bg-[#434343]/20' : ''}>
                            <td className="py-3 px-4 text-[#B1B1B1]">{data.year}</td>
                            <td className="py-3 px-4 text-right text-[#B1B1B1] font-medium">
                                {formatCurrency(data.totalPatrimony)}
                            </td>
                            <td className="py-3 px-4 text-right text-[#B1B1B1]">
                                {formatCurrency(data.financialPatrimony)}
                            </td>
                            <td className="py-3 px-4 text-right text-[#B1B1B1]">
                                {formatCurrency(data.immovablePatrimony)}
                            </td>
                            <td className="py-3 px-4 text-right text-[#B1B1B1]">
                                {formatCurrency(data.totalPatrimonyWithoutInsurance)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-[#101010] border-[#434343] text-[#9F9F9F]">
                <DialogHeader>
                    <DialogTitle className="text-[#9F9F9F] text-xl font-semibold">
                        Detalhes da Projeção - {simulation.name}
                    </DialogTitle>
                    <DialogDescription className="text-[#B1B1B1]">
                        Visualização detalhada da evolução patrimonial com gráficos de áreas empilhadas.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Informações da simulação */}
                    <Card className="bg-[#434343] border-[#454545]">
                        <CardHeader>
                            <CardTitle className="text-[#9F9F9F] text-lg">Informações da Simulação</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#B1B1B1]" />
                                    <span className="text-[#B1B1B1] text-sm">
                                        <strong>Início:</strong> {formatDate(simulation.startDate)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-[#B1B1B1]" />
                                    <span className="text-[#B1B1B1] text-sm">
                                        <strong>Taxa Real:</strong> {simulation.realRate}% a.a.
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        className={`text-xs ${simulation.status === 'ATIVO'
                                                ? 'bg-green-400/10 text-green-400 border-green-400/20'
                                                : 'bg-gray-400/10 text-gray-400 border-gray-400/20'
                                            }`}
                                    >
                                        {simulation.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Estatísticas resumidas */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="bg-[#434343] border-[#454545]">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign className="w-4 h-4 text-green-400" />
                                    <span className="text-[#9F9F9F] text-sm font-medium">Patrimônio Atual</span>
                                </div>
                                <p className="text-[#B1B1B1] text-lg font-semibold">
                                    {formatCurrency(currentYear.totalPatrimony)}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#434343] border-[#454545]">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-blue-400" />
                                    <span className="text-[#9F9F9F] text-sm font-medium">Patrimônio Final</span>
                                </div>
                                <p className="text-[#B1B1B1] text-lg font-semibold">
                                    {formatCurrency(finalYear.totalPatrimony)}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#434343] border-[#454545]">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                                    <span className="text-[#9F9F9F] text-sm font-medium">Crescimento</span>
                                </div>
                                <p className={`text-lg font-semibold ${growthRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#434343] border-[#454545]">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Building className="w-4 h-4 text-purple-400" />
                                    <span className="text-[#9F9F9F] text-sm font-medium">Pico Patrimonial</span>
                                </div>
                                <p className="text-[#B1B1B1] text-lg font-semibold">
                                    {formatCurrency(maxPatrimony)}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Controles de visualização */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-[#9F9F9F] text-lg font-semibold">Projeção Patrimonial</h3>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === 'chart' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('chart')}
                                className="bg-[#434343] hover:bg-[#454545] text-[#B1B1B1]"
                            >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Gráfico
                            </Button>
                            <Button
                                variant={viewMode === 'table' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('table')}
                                className="bg-[#434343] hover:bg-[#454545] text-[#B1B1B1]"
                            >
                                <Table className="w-4 h-4 mr-2" />
                                Tabela
                            </Button>
                        </div>
                    </div>

                    {/* Gráfico ou Tabela */}
                    <Card className="bg-[#434343] border-[#454545]">
                        <CardContent className="p-6">
                            {viewMode === 'chart' ? <StackedAreaChart /> : <ProjectionTable />}
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
