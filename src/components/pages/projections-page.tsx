'use client';

import { ReactNode, useState } from 'react';
import { PageLayout, PageHeader, PageCard, DataCard, StatusBadge, LoadingState, ErrorState, EmptyState } from '@/components/common/page-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectionChart } from '@/components/projections/projection-chart';
import { ProjectionTable } from '@/components/projections/projection-table';
import { SimulationTabs } from '@/components/projections/simulation-tabs';
import { Plus, Eye, BarChart3, Table, Calendar } from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

interface Simulation {
    id: string;
    name: string;
    isCurrentSituation?: boolean;
    isRealized?: boolean;
}

interface ProjectionData {
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
}

interface ProjectionsPageProps {
    simulations: Simulation[];
    selectedSimulation: string;
    projectionData: ProjectionData;
    lifeStatus: 'vivo' | 'morto' | 'invalido';
    isLoading: boolean;
    error?: string;
    onSelectSimulation: (id: string) => void;
    onEditSimulation: (id: string) => void;
    onDeleteSimulation: (id: string) => void;
    onCreateVersion: (id: string) => void;
    onAddSimulation: () => void;
    onViewDetails: (id: string) => void;
    onDuplicateSimulation: (id: string) => void;
    formatCurrency: (value: number) => string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function ProjectionsPage({
    simulations,
    selectedSimulation,
    projectionData,
    lifeStatus,
    isLoading,
    error,
    onSelectSimulation,
    onEditSimulation,
    onDeleteSimulation,
    onCreateVersion,
    onAddSimulation,
    onViewDetails,
    onDuplicateSimulation,
    formatCurrency
}: ProjectionsPageProps) {
    const [showWithoutInsurances, setShowWithoutInsurances] = useState(false);
    const [selectedYears, setSelectedYears] = useState<number[]>([]);

    if (isLoading) {
        return (
            <PageLayout>
                <PageHeader title="Projeções" />
                <LoadingState message="Carregando projeções..." />
            </PageLayout>
        );
    }

    if (error) {
        return (
            <PageLayout>
                <PageHeader title="Projeções" />
                <ErrorState message={error} />
            </PageLayout>
        );
    }

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
        <PageLayout>
            <PageHeader
                title="Projeções Patrimoniais"
                description="Visualize e gerencie suas projeções financeiras"
                actions={
                    <div className="flex items-center gap-2">
                        <StatusBadge
                            status={statusConfig[lifeStatus].label}
                            type="default"
                        />
                        <Button onClick={onAddSimulation} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Adicionar Simulação
                        </Button>
                    </div>
                }
            />

            <div className="space-y-6">
                {/* Controles de simulação */}
                <PageCard title="Simulações">
                    <SimulationTabs
                        simulations={simulations}
                        selectedSimulation={selectedSimulation}
                        onSelectSimulation={onSelectSimulation}
                        onEditSimulation={onEditSimulation}
                        onDeleteSimulation={onDeleteSimulation}
                        onCreateVersion={onCreateVersion}
                        onViewDetails={onViewDetails}
                        onDuplicateSimulation={onDuplicateSimulation}
                    />
                </PageCard>

                {/* Resumo das projeções */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <DataCard
                        title="Patrimônio Total"
                        value={formatCurrency(projectionData.projections.total[projectionData.projections.total.length - 1] || 0)}
                        description="Valor final projetado"
                    />
                    <DataCard
                        title="Patrimônio Financeiro"
                        value={formatCurrency(projectionData.projections.financial[projectionData.projections.financial.length - 1] || 0)}
                        description="Investimentos financeiros"
                    />
                    <DataCard
                        title="Patrimônio Imobilizado"
                        value={formatCurrency(projectionData.projections.realEstate[projectionData.projections.realEstate.length - 1] || 0)}
                        description="Imóveis e bens"
                    />
                    <DataCard
                        title="Seguros"
                        value={formatCurrency(projectionData.projections.insurance[projectionData.projections.insurance.length - 1] || 0)}
                        description="Valor segurado"
                    />
                </div>

                {/* Visualização das projeções */}
                <PageCard
                    title="Visualização das Projeções"
                    actions={
                        <div className="flex items-center gap-2">
                            <Button
                                variant={showWithoutInsurances ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowWithoutInsurances(!showWithoutInsurances)}
                            >
                                {showWithoutInsurances ? 'Com Seguros' : 'Sem Seguros'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onViewDetails(selectedSimulation)}
                                className="flex items-center gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                Ver Detalhes
                            </Button>
                        </div>
                    }
                >
                    <Tabs defaultValue="chart" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="chart" className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Gráfico
                            </TabsTrigger>
                            <TabsTrigger value="table" className="flex items-center gap-2">
                                <Table className="h-4 w-4" />
                                Tabela
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="chart" className="mt-6">
                            <div className="h-[500px]">
                                <ProjectionChart
                                    data={chartData}
                                    showWithoutInsurances={showWithoutInsurances}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="table" className="mt-6">
                            <div className="h-[500px] overflow-auto">
                                <ProjectionTable
                                    data={projectionData}
                                    showWithoutInsurances={showWithoutInsurances}
                                    selectedYears={selectedYears.length > 0 ? selectedYears : undefined}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </PageCard>
            </div>
        </PageLayout>
    );
}

