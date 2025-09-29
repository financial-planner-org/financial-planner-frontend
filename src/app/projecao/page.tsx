'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LegacyWarning } from '@/components/ui/legacy-warning';
import { ProjectionTable } from '@/components/projections/projection-table';
import { useSimulations } from '@/hooks/api/use-simulations';
import { useSimulationStatus } from '@/hooks/api/use-simulations';
import { useProjection, useProjectionWithoutInsurances, ProjectionResult } from '@/hooks/api/use-projections';
import { PROJECTIONS_CONFIG } from '@/lib/constants/pages';
import { Calculator, BarChart3, TrendingUp, TrendingDown, Info } from 'lucide-react';

// Função para transformar ProjectionResult em ProjectionData
function transformProjectionData(result: ProjectionResult | undefined) {
    if (!result) return null;

    return {
        years: result.years,
        projections: {
            total: result.projections.map(p => p.totalPatrimony),
            financial: result.projections.map(p => p.financialPatrimony),
            realEstate: result.projections.map(p => p.immovablePatrimony),
            insurance: result.projections.map(p => p.insurances),
            withoutInsurances: {
                total: result.projections.map(p => p.totalWithoutInsurances),
                financial: result.projections.map(p => p.financialPatrimony),
                realEstate: result.projections.map(p => p.immovablePatrimony),
            }
        }
    };
}

export default function ProjecaoPage() {
    const { data: simulations = [] } = useSimulations();
    const [selectedSimulation, setSelectedSimulation] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<'VIVO' | 'MORTO' | 'INVALIDO'>('VIVO');
    const [showWithoutInsurances, setShowWithoutInsurances] = useState(false);

    const simulationId = Number(selectedSimulation);
    const { data: simulationStatus } = useSimulationStatus(simulationId);

    // Configuração da projeção
    const projectionRequest = {
        simulationId,
        status: selectedStatus,
        realReturnRate: 0.04, // 4% padrão
        projectionYears: 35, // Até 2060
        includeInsurances: !showWithoutInsurances
    };

    const { data: projectionResult, isLoading: isLoadingProjection } = useProjection(projectionRequest);
    const { data: projectionWithoutInsurancesResult } = useProjectionWithoutInsurances({
        ...projectionRequest,
        includeInsurances: false
    });

    // Transformar os dados para o formato esperado pelo componente
    const projection = transformProjectionData(projectionResult);
    const projectionWithoutInsurances = transformProjectionData(projectionWithoutInsurancesResult);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'VIVO': return 'bg-green-500';
            case 'MORTO': return 'bg-red-500';
            case 'INVALIDO': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'VIVO': return 'Vivo';
            case 'MORTO': return 'Morto';
            case 'INVALIDO': return 'Inválido';
            default: return status;
        }
    };

    return (
        <PageContainer
            title={PROJECTIONS_CONFIG.title}
            description={PROJECTIONS_CONFIG.description}
            className="relative bg-stone-950 rounded-3xl overflow-hidden min-h-screen"
        >
            <Section title="Configuração da Projeção">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Simulação</label>
                        <Select value={selectedSimulation} onValueChange={setSelectedSimulation}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma simulação" />
                            </SelectTrigger>
                            <SelectContent>
                                {simulations.map((simulation) => (
                                    <SelectItem key={simulation.id} value={simulation.id.toString()}>
                                        <div className="flex items-center gap-2">
                                            <span>{simulation.name}</span>
                                            {simulationStatus && (
                                                <LegacyWarning
                                                    isLegacy={simulationStatus.isLegacy}
                                                    isCurrentSituation={simulationStatus.isCurrentSituation}
                                                />
                                            )}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Status</label>
                        <Select value={selectedStatus} onValueChange={(value: 'VIVO' | 'MORTO' | 'INVALIDO') => setSelectedStatus(value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="VIVO">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${getStatusColor('VIVO')}`}></div>
                                        Vivo
                                    </div>
                                </SelectItem>
                                <SelectItem value="MORTO">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${getStatusColor('MORTO')}`}></div>
                                        Morto
                                    </div>
                                </SelectItem>
                                <SelectItem value="INVALIDO">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${getStatusColor('INVALIDO')}`}></div>
                                        Inválido
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-end">
                        <Button
                            variant={showWithoutInsurances ? "default" : "outline"}
                            onClick={() => setShowWithoutInsurances(!showWithoutInsurances)}
                            className="w-full"
                        >
                            {showWithoutInsurances ? 'Com Seguros' : 'Sem Seguros'}
                        </Button>
                    </div>

                    <div className="flex items-end">
                        <Button
                            onClick={() => {
                                // Recarregar projeção
                                window.location.reload();
                            }}
                            className="w-full"
                        >
                            <Calculator className="h-4 w-4 mr-2" />
                            Calcular
                        </Button>
                    </div>
                </div>

                {simulationStatus && (
                    <div className="mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <Info className="h-5 w-5 text-blue-500" />
                                    <div>
                                        <h4 className="font-medium">Status da Simulação</h4>
                                        <div className="flex items-center gap-4 mt-2">
                                            <LegacyWarning
                                                isLegacy={simulationStatus.isLegacy}
                                                isCurrentSituation={simulationStatus.isCurrentSituation}
                                            />
                                            <div className="text-sm text-muted-foreground">
                                                {simulationStatus.canEdit ? 'Editável' : 'Não editável'} •
                                                {simulationStatus.canDelete ? ' Deletável' : ' Não deletável'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Section>

            {selectedSimulation && (
                <Section title="Resultados da Projeção">
                    {isLoadingProjection ? (
                        <div className="flex justify-center py-8">
                            <div className="text-muted-foreground">Calculando projeção...</div>
                        </div>
                    ) : projection ? (
                        <Tabs defaultValue="chart" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="chart">
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Gráfico
                                </TabsTrigger>
                                <TabsTrigger value="table">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Tabela
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="chart" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            Gráfico de Projeção Patrimonial
                                            <Badge variant="secondary">
                                                Status: {getStatusLabel(selectedStatus)}
                                            </Badge>
                                            {showWithoutInsurances && (
                                                <Badge variant="outline">Sem Seguros</Badge>
                                            )}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-96 flex items-center justify-center text-muted-foreground">
                                            <div className="text-center">
                                                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                                <p>Gráfico de projeção será implementado aqui</p>
                                                <p className="text-sm">Dados disponíveis: {projection.years.length} anos</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="table" className="mt-6">
                                <div className="space-y-6">
                                    <ProjectionTable
                                        data={projection}
                                        showWithoutInsurances={showWithoutInsurances}
                                    />

                                    {projectionWithoutInsurances && !showWithoutInsurances && (
                                        <ProjectionTable
                                            data={projectionWithoutInsurances}
                                            showWithoutInsurances={true}
                                        />
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    ) : (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center text-muted-foreground">
                                    <TrendingDown className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Selecione uma simulação para ver a projeção</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </Section>
            )}
        </PageContainer>
    );
}