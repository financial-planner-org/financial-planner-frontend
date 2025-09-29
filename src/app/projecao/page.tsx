'use client';

import React, { useState } from 'react';
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
import { useMovements } from '@/hooks/api/use-movements';
import { useInsurances } from '@/hooks/api/use-insurances';
import { PROJECTIONS_CONFIG } from '@/lib/constants/pages';
import { Calculator, BarChart3, TrendingUp, TrendingDown, Info, MoreHorizontal, Plus } from 'lucide-react';

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
    const { data: simulations = [], isLoading: simulationsLoading, error: simulationsError } = useSimulations();
    const [selectedSimulation, setSelectedSimulation] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<'VIVO' | 'MORTO' | 'INVALIDO'>('VIVO');
    const [showWithoutInsurances, setShowWithoutInsurances] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'chart' | 'table'>('chart');

    // Selecionar a primeira simulação disponível quando os dados carregarem
    React.useEffect(() => {
        if (simulations.length > 0 && !selectedSimulation) {
            setSelectedSimulation(simulations[0].id.toString());
        }
    }, [simulations, selectedSimulation]);

    const simulationId = Number(selectedSimulation);
    const { data: simulationStatus } = useSimulationStatus(simulationId);
    const { data: movements = [] } = useMovements(simulationId);
    const { data: insurances = [] } = useInsurances(simulationId);

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

    // Loading state
    if (simulationsLoading) {
        return (
            <div className="min-h-screen bg-stone-950 p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-white text-lg">Carregando simulações...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (simulationsError) {
        return (
            <div className="min-h-screen bg-stone-950 p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-red-500 text-lg">Erro ao carregar simulações: {simulationsError.message}</div>
                </div>
            </div>
        );
    }

    // No simulations state
    if (simulations.length === 0) {
        return (
            <div className="min-h-screen bg-stone-950 p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-white text-lg">Nenhuma simulação encontrada</div>
                </div>
            </div>
        );
    }

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

    // Filtrar simulações mais recentes de cada nome (evitar duplicidade)
    const latestSimulations = simulations.reduce((acc, simulation) => {
        const existing = acc.find(s => s.name === simulation.name);
        if (!existing || new Date(simulation.createdAt) > new Date(existing.createdAt)) {
            return acc.filter(s => s.name !== simulation.name).concat(simulation);
        }
        return acc;
    }, [] as typeof simulations);

    // Converter dados reais das movimentações para o formato da UI
    const formattedMovements = movements.slice(0, 3).map((movement) => ({
        id: movement.id.toString(),
        title: movement.type, // Usar type como title já que description não existe
        date: `${new Date(movement.startDate).toLocaleDateString('pt-BR')}${movement.endDate ? ` - ${new Date(movement.endDate).toLocaleDateString('pt-BR')}` : ''}`,
        frequency: `Frequência: ${movement.frequency}`,
        type: movement.type,
        value: movement.value,
        isCredit: movement.type === 'CREDIT'
    }));

    // Converter dados reais dos seguros para o formato da UI
    const formattedInsurances = insurances.slice(0, 2).map((insurance) => ({
        id: insurance.id.toString(),
        title: insurance.name,
        type: (insurance as any).type || 'Seguro de Vida', // Asserção de tipo temporária
        duration: `Duração: ${Math.floor(insurance.durationMonths / 12)} anos`,
        premium: `Prêmio: R$ ${insurance.premium.toLocaleString('pt-BR')}/mês`,
        value: insurance.insuredValue
    }));

    return (
        <div className="min-h-screen bg-stone-950 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto relative">
                {/* Header do usuário */}
                <div className="absolute left-[101px] top-[101px]">
                    <div className={PROJECTIONS_CONFIG.userHeader.container}>
                        <div className={PROJECTIONS_CONFIG.userHeader.name}>
                            Matheus Silveira
                        </div>
                        <div className={PROJECTIONS_CONFIG.userHeader.dropdown}></div>
                    </div>
                </div>

                {/* Patrimônio Líquido Total */}
                <div className={PROJECTIONS_CONFIG.netWorth.container}>
                    <div className={PROJECTIONS_CONFIG.netWorth.label}>
                        Patrimônio Líquido Total
                    </div>
                    <div className={PROJECTIONS_CONFIG.netWorth.value}>
                        R$ 2.679.930,00
                    </div>
                    <div className={PROJECTIONS_CONFIG.netWorth.percentage}>
                        +52,37%
                    </div>
                </div>

                {/* Projeções de patrimônio */}
                <div className={PROJECTIONS_CONFIG.projections.container}>
                    {/* Projeção 2025 (Atual) */}
                    <div className={PROJECTIONS_CONFIG.projections.current.container}>
                        <div className={PROJECTIONS_CONFIG.projections.current.year}>2025</div>
                        <div className={PROJECTIONS_CONFIG.projections.current.value}>Hoje</div>
                        <div className={PROJECTIONS_CONFIG.projections.current.age}>45 anos</div>
                        <div className={PROJECTIONS_CONFIG.projections.current.value}>
                            R$ 2.679.930,00
                        </div>
                        <div className={PROJECTIONS_CONFIG.projections.current.bar}>
                            <div className={PROJECTIONS_CONFIG.projections.current.barFill}></div>
                        </div>
                    </div>

                    {/* Projeção 2035 */}
                    <div className={PROJECTIONS_CONFIG.projections.future.container}>
                        <div className={PROJECTIONS_CONFIG.projections.future.year}>2035</div>
                        <div className={PROJECTIONS_CONFIG.projections.future.age}>55 anos</div>
                        <div className={PROJECTIONS_CONFIG.projections.future.value}>
                            R$ 3.173.960,00
                        </div>
                        <div className={PROJECTIONS_CONFIG.projections.future.percentage}>
                            +18,37%
                        </div>
                        <div className={PROJECTIONS_CONFIG.projections.future.bar}></div>
                    </div>

                    {/* Projeção 2045 (Aposentadoria) */}
                    <div className={PROJECTIONS_CONFIG.projections.retirement.container}>
                        <div className={PROJECTIONS_CONFIG.projections.retirement.year}>2045</div>
                        <div className={PROJECTIONS_CONFIG.projections.retirement.age}>65 anos</div>
                        <div className={PROJECTIONS_CONFIG.projections.retirement.value}>
                            R$ 2.173.960
                        </div>
                        <div className={PROJECTIONS_CONFIG.projections.retirement.percentage}>
                            +10,3%
                        </div>
                        <div className={PROJECTIONS_CONFIG.projections.retirement.bar}></div>
                    </div>
                </div>

                {/* Status de cenário */}
                <div className={PROJECTIONS_CONFIG.scenarioStatus.container}>
                    <div className="flex items-center gap-2">
                        <div className={PROJECTIONS_CONFIG.scenarioStatus.radio}></div>
                        <div className={PROJECTIONS_CONFIG.scenarioStatus.label}>Morto</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={PROJECTIONS_CONFIG.scenarioStatus.radio}></div>
                        <div className={PROJECTIONS_CONFIG.scenarioStatus.label}>Inválido</div>
                    </div>
                </div>

                {/* Gráfico de projeção patrimonial */}
                <div className={PROJECTIONS_CONFIG.chart.container}>
                    <div className={PROJECTIONS_CONFIG.chart.title}>
                        Projeção Patrimonial
                    </div>
                    <div className={PROJECTIONS_CONFIG.chart.controls.container}>
                        <div className={PROJECTIONS_CONFIG.chart.controls.link}>
                            Ver com detalhes
                        </div>
                        <div className={PROJECTIONS_CONFIG.chart.controls.link}>
                            Ver como Tabela
                        </div>
                    </div>

                    {/* Eixo Y */}
                    <div className={PROJECTIONS_CONFIG.chart.yAxis.container}>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 3,5 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 3,0 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 2,5 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 2,0 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 1,5 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 1,0 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 500K</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 0</div>
                    </div>

                    {/* Linhas do gráfico */}
                    <div className={PROJECTIONS_CONFIG.chart.lines.original}></div>
                    <div className={PROJECTIONS_CONFIG.chart.lines.current}></div>
                    <div className={PROJECTIONS_CONFIG.chart.lines.realized}></div>

                    {/* Dots */}
                    <div className={`${PROJECTIONS_CONFIG.chart.dots.amber} left-[317px] top-[163px]`}></div>
                </div>

                {/* Controles de simulação */}
                <div className={PROJECTIONS_CONFIG.simulationControls.container}>
                    {latestSimulations.map((simulation) => (
                        <div
                            key={simulation.id}
                            className={selectedSimulation === simulation.id.toString() ? PROJECTIONS_CONFIG.simulationControls.button.selected : PROJECTIONS_CONFIG.simulationControls.button.container}
                            onClick={() => setSelectedSimulation(simulation.id.toString())}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={selectedSimulation === simulation.id.toString() ? PROJECTIONS_CONFIG.simulationControls.button.radioSelected : PROJECTIONS_CONFIG.simulationControls.button.radio}>
                                <div className={selectedSimulation === simulation.id.toString() ? PROJECTIONS_CONFIG.simulationControls.button.radioFillSelected : PROJECTIONS_CONFIG.simulationControls.button.radioFill}></div>
                            </div>
                            <div className={PROJECTIONS_CONFIG.simulationControls.button.text}>
                                {simulation.name}
                            </div>
                            {simulation.name !== 'Realizado' && (
                                <div className="flex gap-1">
                                    <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                                    <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                                    <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className={PROJECTIONS_CONFIG.simulationControls.addButton.container}>
                        <Plus className="w-5 h-5 text-cinza-claro" />
                        <div className={PROJECTIONS_CONFIG.simulationControls.addButton.text}>
                            Adicionar Simulação
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className={PROJECTIONS_CONFIG.timeline.container}>
                    <div className={PROJECTIONS_CONFIG.timeline.title}>
                        Timeline
                    </div>

                    {/* Salários */}
                    <div className={PROJECTIONS_CONFIG.timeline.salary.container}>
                        <div className="absolute left-[0px]">
                            <div className={PROJECTIONS_CONFIG.timeline.salary.label}>CLT: R$ 15.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.dot}></div>
                        </div>
                        <div className="absolute left-[200px]">
                            <div className={PROJECTIONS_CONFIG.timeline.salary.label}>Autônomo: R$ 5.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.dot}></div>
                        </div>
                        <div className="absolute left-[400px]">
                            <div className={PROJECTIONS_CONFIG.timeline.salary.label}>Autônomo: R$ 35.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.dot}></div>
                        </div>
                        <div className="absolute left-[800px]">
                            <div className={PROJECTIONS_CONFIG.timeline.salary.label}>Aposentadoria</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.dot}></div>
                        </div>
                    </div>

                    {/* Anos e idades */}
                    <div className={PROJECTIONS_CONFIG.timeline.years.container}>
                        <div className="text-center">
                            <div className={PROJECTIONS_CONFIG.timeline.years.year}>2025</div>
                            <div className={PROJECTIONS_CONFIG.timeline.years.age}>45</div>
                        </div>
                        <div className="text-center">
                            <div className={PROJECTIONS_CONFIG.timeline.years.year}>2030</div>
                            <div className={PROJECTIONS_CONFIG.timeline.years.age}>50</div>
                        </div>
                        <div className="text-center">
                            <div className={PROJECTIONS_CONFIG.timeline.years.year}>2035</div>
                            <div className={PROJECTIONS_CONFIG.timeline.years.age}>55</div>
                        </div>
                        <div className="text-center">
                            <div className={PROJECTIONS_CONFIG.timeline.years.year}>2040</div>
                            <div className={PROJECTIONS_CONFIG.timeline.years.age}>60</div>
                        </div>
                        <div className="text-center">
                            <div className={PROJECTIONS_CONFIG.timeline.years.year}>2045</div>
                            <div className={PROJECTIONS_CONFIG.timeline.years.age}>65</div>
                        </div>
                        <div className="text-center">
                            <div className={PROJECTIONS_CONFIG.timeline.years.year}>2050</div>
                            <div className={PROJECTIONS_CONFIG.timeline.years.age}>70</div>
                        </div>
                        <div className="text-center">
                            <div className={PROJECTIONS_CONFIG.timeline.years.year}>2055</div>
                            <div className={PROJECTIONS_CONFIG.timeline.years.age}>75</div>
                        </div>
                        <div className="text-center">
                            <div className={PROJECTIONS_CONFIG.timeline.years.year}>2060</div>
                            <div className={PROJECTIONS_CONFIG.timeline.years.age}>80</div>
                        </div>
                    </div>

                    {/* Custo de vida */}
                    <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.container}>
                        <div className="absolute left-[0px]">
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.label}>R$ 8.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.dot}></div>
                        </div>
                        <div className="absolute left-[200px]">
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.label}>R$ 12.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.dot}></div>
                        </div>
                        <div className="absolute left-[400px]">
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.label}>R$ 20.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.dot}></div>
                        </div>
                        <div className="absolute left-[600px]">
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.label}>R$ 10.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.dot}></div>
                        </div>
                        <div className="absolute left-[800px]">
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.label}>R$ 15.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.dot}></div>
                        </div>
                    </div>

                    {/* Linha principal */}
                    <div className={PROJECTIONS_CONFIG.timeline.mainLine}></div>
                </div>

                {/* Movimentações */}
                <div className={PROJECTIONS_CONFIG.movements.container}>
                    <div className={PROJECTIONS_CONFIG.movements.title}>
                        Movimentações
                    </div>

                    {/* Tabs */}
                    <div className={PROJECTIONS_CONFIG.movements.tabs.container}>
                        <div className={PROJECTIONS_CONFIG.movements.tabs.active}>
                            <div className={PROJECTIONS_CONFIG.movements.tabs.text}>Financeiras</div>
                        </div>
                        <div className={PROJECTIONS_CONFIG.movements.tabs.inactive}>
                            <div className={PROJECTIONS_CONFIG.movements.tabs.textInactive}>Imobilizadas</div>
                        </div>
                    </div>

                    {/* Cards de movimentação */}
                    <div className={PROJECTIONS_CONFIG.movements.cards.container}>
                        {formattedMovements.map((movement) => (
                            <div key={movement.id} className={PROJECTIONS_CONFIG.movements.cards.card}>
                                <div className={PROJECTIONS_CONFIG.movements.cards.title}>
                                    {movement.title}
                                </div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.date}>
                                    {movement.date}
                                </div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.frequency}>
                                    {movement.frequency}
                                </div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.type}>
                                    {movement.type}
                                </div>
                                <div className={movement.isCredit ? PROJECTIONS_CONFIG.movements.cards.value.credit : PROJECTIONS_CONFIG.movements.cards.value.debit}>
                                    {movement.isCredit ? '↑' : '↓'} R$ {movement.value.toLocaleString('pt-BR')}
                                </div>
                                {movement.isCredit ? (
                                    <div className={PROJECTIONS_CONFIG.movements.cards.icon.credit}></div>
                                ) : (
                                    <div className={PROJECTIONS_CONFIG.movements.cards.icon.debit}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seguros */}
                <div className={PROJECTIONS_CONFIG.insurances.container}>
                    <div className={PROJECTIONS_CONFIG.insurances.title}>
                        Seguros
                    </div>

                    {/* Cards de seguro */}
                    <div className={PROJECTIONS_CONFIG.insurances.cards.container}>
                        {formattedInsurances.map((insurance) => (
                            <div key={insurance.id} className={PROJECTIONS_CONFIG.insurances.cards.card}>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.title}>
                                    {insurance.title}
                                </div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.type}>
                                    {insurance.type}
                                </div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.duration}>
                                    {insurance.duration}
                                </div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.premium}>
                                    {insurance.premium}
                                </div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.value}>
                                    R$ {insurance.value.toLocaleString('pt-BR')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}