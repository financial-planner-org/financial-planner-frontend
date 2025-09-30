'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectionChart } from './projection-chart';
import { ProjectionTable } from './projection-table';
import { Eye, BarChart3, Table } from 'lucide-react';

interface DetailedViewProps {
    simulation: {
        id: number;
        name: string;
        startDate: string;
        realRate: number;
    };
    projectionData: {
        years: number[];
        projections: {
            total: number[];
            financial: number[];
            realEstate: number[];
            insurance: number[];
            withoutInsurances?: {
                total: number[];
                financial: number[];
                realEstate: number[];
            };
        };
    };
    lifeStatus: 'vivo' | 'morto' | 'invalido';
    onClose: () => void;
}

export function DetailedView({
    simulation,
    projectionData,
    lifeStatus,
    onClose
}: DetailedViewProps) {
    const [showWithoutInsurances, setShowWithoutInsurances] = useState(false);
    const [selectedYears, setSelectedYears] = useState<number[]>([]);

    // Converter dados para formato do gráfico
    const chartData = projectionData.years.map((year, index) => ({
        year,
        totalPatrimony: projectionData.projections.total[index],
        financialPatrimony: projectionData.projections.financial[index],
        immovablePatrimony: projectionData.projections.realEstate[index],
        insurances: projectionData.projections.insurance[index],
        totalWithoutInsurances: projectionData.projections.withoutInsurances?.total[index] || 0
    }));

    const statusConfig = {
        vivo: { label: 'Vivo', color: 'bg-green-500' },
        morto: { label: 'Morto', color: 'bg-red-500' },
        invalido: { label: 'Inválido', color: 'bg-yellow-500' }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-7xl h-[90vh] bg-[#1a1a1a] border-gray-800 text-white overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                            <Eye className="h-6 w-6" />
                            Visualização Detalhada
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Simulação: <strong className="text-white">{simulation.name}</strong></span>
                            <Badge variant="outline" className={statusConfig[lifeStatus].color}>
                                {statusConfig[lifeStatus].label}
                            </Badge>
                            <span>Taxa Real: <strong className="text-white">{simulation.realRate}% a.a.</strong></span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </Button>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden">
                    <Tabs defaultValue="chart" className="h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="chart" className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Gráfico
                            </TabsTrigger>
                            <TabsTrigger value="table" className="flex items-center gap-2">
                                <Table className="h-4 w-4" />
                                Tabela
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant={showWithoutInsurances ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowWithoutInsurances(!showWithoutInsurances)}
                                className={showWithoutInsurances
                                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                                    : 'bg-[#0d0d0d] border-gray-700 text-gray-300'
                                }
                            >
                                {showWithoutInsurances ? 'Com Seguros' : 'Sem Seguros'}
                            </Button>
                        </div>

                        <TabsContent value="chart" className="flex-1 overflow-hidden">
                            <div className="h-full">
                                <ProjectionChart
                                    data={chartData}
                                    showWithoutInsurances={showWithoutInsurances}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="table" className="flex-1 overflow-hidden">
                            <div className="h-full overflow-auto">
                                <ProjectionTable
                                    data={projectionData}
                                    showWithoutInsurances={showWithoutInsurances}
                                    selectedYears={selectedYears.length > 0 ? selectedYears : undefined}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
