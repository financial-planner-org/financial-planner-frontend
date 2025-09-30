'use client';

import React, { useState } from 'react';
import { useSimulationStatus } from '@/hooks/api/use-simulations';
import { useProjection, useProjectionWithoutInsurances, ProjectionResult } from '@/hooks/api/use-projections';
import { useMovements } from '@/hooks/api/use-movements';
import { useInsurances } from '@/hooks/api/use-insurances';
import { useClient } from '@/contexts/ClientContext';
import { useSimulationsByClient } from '@/hooks/api/use-simulations';
import { ClientSelector } from '@/components/layout/client-selector';
import { PageContainer } from '@/components/pages/page-container';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/page-states';
import { PROJECTIONS_STYLES, getStatusLabel, formatMovementData, formatInsuranceData, COMMON_STYLES } from '@/lib/constants';
import { PROJECTIONS_STYLES as RESPONSIVE_PROJECTIONS_STYLES } from '@/lib/constants/responsive-pages-styles';
import { Plus } from 'lucide-react';

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
    const { selectedClientId } = useClient();
    const { data: simulations = [], isLoading: simulationsLoading, error: simulationsError } = useSimulationsByClient(selectedClientId!);
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
        return <LoadingState message="Carregando simulações..." />;
    }

    // Error state
    if (simulationsError) {
        return <ErrorState message={`Erro ao carregar simulações: ${simulationsError.message}`} />;
    }

    // No simulations state
    if (simulations.length === 0) {
        return <EmptyState title="Nenhuma simulação encontrada" />;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'VIVO': return 'bg-green-500';
            case 'MORTO': return 'bg-red-500';
            case 'INVALIDO': return 'bg-yellow-500';
            default: return 'bg-gray-500';
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
    const formattedMovements = movements.slice(0, 3).map(formatMovementData);

    // Converter dados reais dos seguros para o formato da UI
    const formattedInsurances = insurances.slice(0, 2).map(formatInsuranceData);

    return (
        <PageContainer>
            <div className={PROJECTIONS_STYLES.mainContainer}>
                {/* Seletor de Cliente */}
                <div className={PROJECTIONS_STYLES.clientSelector}>
                    <ClientSelector />
                </div>

                {/* Patrimônio Líquido Total */}
                <div className={PROJECTIONS_STYLES.netWorth.container}>
                    <div className={PROJECTIONS_STYLES.netWorth.label}>
                        Patrimônio Líquido Total
                    </div>
                    <div className={PROJECTIONS_STYLES.netWorth.value}>
                        R$ 2.679.930,00
                    </div>
                    <div className={PROJECTIONS_STYLES.netWorth.percentage}>
                        +52,37%
                    </div>
                </div>

                {/* Projeções de patrimônio */}
                <div className={PROJECTIONS_STYLES.projections.container}>
                    {/* Projeção 2025 (Atual) */}
                    <div className={PROJECTIONS_STYLES.projections.current.container}>
                        <div className={PROJECTIONS_STYLES.projections.current.year}>2025</div>
                        <div className={PROJECTIONS_STYLES.projections.current.value}>Hoje</div>
                        <div className={PROJECTIONS_STYLES.projections.current.age}>45 anos</div>
                        <div className={PROJECTIONS_STYLES.projections.current.value}>
                            R$ 2.679.930,00
                        </div>
                        <div className={PROJECTIONS_STYLES.projections.current.bar}>
                            <div className={PROJECTIONS_STYLES.projections.current.barFill}></div>
                        </div>
                    </div>

                    {/* Projeção 2035 */}
                    <div className={PROJECTIONS_STYLES.projections.future.container}>
                        <div className={PROJECTIONS_STYLES.projections.future.year}>2035</div>
                        <div className={PROJECTIONS_STYLES.projections.future.age}>55 anos</div>
                        <div className={PROJECTIONS_STYLES.projections.future.value}>
                            R$ 3.173.960,00
                        </div>
                        <div className={PROJECTIONS_STYLES.projections.future.percentage}>
                            +18,37%
                        </div>
                        <div className={PROJECTIONS_STYLES.projections.future.bar}></div>
                    </div>

                    {/* Projeção 2045 (Aposentadoria) */}
                    <div className={PROJECTIONS_STYLES.projections.retirement.container}>
                        <div className={PROJECTIONS_STYLES.projections.retirement.year}>2045</div>
                        <div className={PROJECTIONS_STYLES.projections.retirement.age}>65 anos</div>
                        <div className={PROJECTIONS_STYLES.projections.retirement.value}>
                            R$ 2.173.960
                        </div>
                        <div className={PROJECTIONS_STYLES.projections.retirement.percentage}>
                            +10,3%
                        </div>
                        <div className={PROJECTIONS_STYLES.projections.retirement.bar}></div>
                    </div>
                </div>

                {/* Status de cenário */}
                <div className={PROJECTIONS_STYLES.scenarioStatus.container}>
                    <div className={COMMON_STYLES.flexCenter}>
                        <div className={PROJECTIONS_STYLES.scenarioStatus.radio}></div>
                        <div className={PROJECTIONS_STYLES.scenarioStatus.label}>Morto</div>
                    </div>
                    <div className={COMMON_STYLES.flexCenter}>
                        <div className={PROJECTIONS_STYLES.scenarioStatus.radio}></div>
                        <div className={PROJECTIONS_STYLES.scenarioStatus.label}>Inválido</div>
                    </div>
                </div>

                {/* Gráfico de projeção patrimonial */}
                <div className={PROJECTIONS_STYLES.chart.container}>
                    <div className={PROJECTIONS_STYLES.chart.title} data-testid="page-title">
                        Projeção Patrimonial
                    </div>
                    <div className={PROJECTIONS_STYLES.chart.controls.container}>
                        <div className={PROJECTIONS_STYLES.chart.controls.link}>
                            Ver com detalhes
                        </div>
                        <div className={PROJECTIONS_STYLES.chart.controls.link}>
                            Ver como Tabela
                        </div>
                    </div>

                    {/* Eixo Y */}
                    <div className={PROJECTIONS_STYLES.chart.yAxis.container}>
                        <div className={PROJECTIONS_STYLES.chart.yAxis.label}>R$ 3,5 M</div>
                        <div className={PROJECTIONS_STYLES.chart.yAxis.label}>R$ 3,0 M</div>
                        <div className={PROJECTIONS_STYLES.chart.yAxis.label}>R$ 2,5 M</div>
                        <div className={PROJECTIONS_STYLES.chart.yAxis.label}>R$ 2,0 M</div>
                        <div className={PROJECTIONS_STYLES.chart.yAxis.label}>R$ 1,5 M</div>
                        <div className={PROJECTIONS_STYLES.chart.yAxis.label}>R$ 1,0 M</div>
                        <div className={PROJECTIONS_STYLES.chart.yAxis.label}>R$ 500K</div>
                        <div className={PROJECTIONS_STYLES.chart.yAxis.label}>R$ 0</div>
                    </div>

                    {/* Linhas do gráfico */}
                    <div className={PROJECTIONS_STYLES.chart.lines.original}></div>
                    <div className={PROJECTIONS_STYLES.chart.lines.current}></div>
                    <div className={PROJECTIONS_STYLES.chart.lines.realized}></div>

                    {/* Dots */}
                    <div className={`${PROJECTIONS_STYLES.chart.dots.amber} left-[317px] top-[163px]`}></div>
                </div>

                {/* Controles de simulação */}
                <div className={PROJECTIONS_STYLES.simulationControls.container}>
                    {latestSimulations.map((simulation) => (
                        <div
                            key={simulation.id}
                            className={selectedSimulation === simulation.id.toString() ? PROJECTIONS_STYLES.simulationControls.button.selected : PROJECTIONS_STYLES.simulationControls.button.container}
                            onClick={() => setSelectedSimulation(simulation.id.toString())}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={selectedSimulation === simulation.id.toString() ? PROJECTIONS_STYLES.simulationControls.button.radioSelected : PROJECTIONS_STYLES.simulationControls.button.radio}>
                                <div className={selectedSimulation === simulation.id.toString() ? PROJECTIONS_STYLES.simulationControls.button.radioFillSelected : PROJECTIONS_STYLES.simulationControls.button.radioFill}></div>
                            </div>
                            <div className={PROJECTIONS_STYLES.simulationControls.button.text}>
                                {simulation.name}
                            </div>
                            {simulation.name !== 'Realizado' && (
                                <div className={COMMON_STYLES.flexGap1}>
                                    <div className={PROJECTIONS_STYLES.simulationControls.button.dots}></div>
                                    <div className={PROJECTIONS_STYLES.simulationControls.button.dots}></div>
                                    <div className={PROJECTIONS_STYLES.simulationControls.button.dots}></div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className={PROJECTIONS_STYLES.simulationControls.addButton.container}>
                        <Plus className={COMMON_STYLES.iconLarge} />
                        <div className={PROJECTIONS_STYLES.simulationControls.addButton.text}>
                            Adicionar Simulação
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className={PROJECTIONS_STYLES.timeline.container}>
                    <div className={PROJECTIONS_STYLES.timeline.title}>
                        Timeline
                    </div>

                    {/* Salários */}
                    <div className={PROJECTIONS_STYLES.timeline.salary.container}>
                        <div className={COMMON_STYLES.absoluteLeft0}>
                            <div className={PROJECTIONS_STYLES.timeline.salary.label}>CLT: R$ 15.000</div>
                            <div className={PROJECTIONS_STYLES.timeline.salary.dot}></div>
                        </div>
                        <div className={COMMON_STYLES.absoluteLeft200}>
                            <div className={PROJECTIONS_STYLES.timeline.salary.label}>Autônomo: R$ 5.000</div>
                            <div className={PROJECTIONS_STYLES.timeline.salary.dot}></div>
                        </div>
                        <div className={COMMON_STYLES.absoluteLeft400}>
                            <div className={PROJECTIONS_STYLES.timeline.salary.label}>Autônomo: R$ 35.000</div>
                            <div className={PROJECTIONS_STYLES.timeline.salary.dot}></div>
                        </div>
                        <div className={COMMON_STYLES.absoluteLeft800}>
                            <div className={PROJECTIONS_STYLES.timeline.salary.label}>Aposentadoria</div>
                            <div className={PROJECTIONS_STYLES.timeline.salary.dot}></div>
                        </div>
                    </div>

                    {/* Anos e idades */}
                    <div className={PROJECTIONS_STYLES.timeline.years.container}>
                        <div className={COMMON_STYLES.textCenter}>
                            <div className={PROJECTIONS_STYLES.timeline.years.year}>2025</div>
                            <div className={PROJECTIONS_STYLES.timeline.years.age}>45</div>
                        </div>
                        <div className={COMMON_STYLES.textCenter}>
                            <div className={PROJECTIONS_STYLES.timeline.years.year}>2030</div>
                            <div className={PROJECTIONS_STYLES.timeline.years.age}>50</div>
                        </div>
                        <div className={COMMON_STYLES.textCenter}>
                            <div className={PROJECTIONS_STYLES.timeline.years.year}>2035</div>
                            <div className={PROJECTIONS_STYLES.timeline.years.age}>55</div>
                        </div>
                        <div className={COMMON_STYLES.textCenter}>
                            <div className={PROJECTIONS_STYLES.timeline.years.year}>2040</div>
                            <div className={PROJECTIONS_STYLES.timeline.years.age}>60</div>
                        </div>
                        <div className={COMMON_STYLES.textCenter}>
                            <div className={PROJECTIONS_STYLES.timeline.years.year}>2045</div>
                            <div className={PROJECTIONS_STYLES.timeline.years.age}>65</div>
                        </div>
                        <div className={COMMON_STYLES.textCenter}>
                            <div className={PROJECTIONS_STYLES.timeline.years.year}>2050</div>
                            <div className={PROJECTIONS_STYLES.timeline.years.age}>70</div>
                        </div>
                        <div className={COMMON_STYLES.textCenter}>
                            <div className={PROJECTIONS_STYLES.timeline.years.year}>2055</div>
                            <div className={PROJECTIONS_STYLES.timeline.years.age}>75</div>
                        </div>
                        <div className={COMMON_STYLES.textCenter}>
                            <div className={PROJECTIONS_STYLES.timeline.years.year}>2060</div>
                            <div className={PROJECTIONS_STYLES.timeline.years.age}>80</div>
                        </div>
                    </div>

                    {/* Custo de vida */}
                    <div className={PROJECTIONS_STYLES.timeline.costOfLiving.container}>
                        <div className={COMMON_STYLES.absoluteLeft0}>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.label}>R$ 8.000</div>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.dot}></div>
                        </div>
                        <div className={COMMON_STYLES.absoluteLeft200}>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.label}>R$ 12.000</div>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.dot}></div>
                        </div>
                        <div className={COMMON_STYLES.absoluteLeft400}>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.label}>R$ 20.000</div>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.dot}></div>
                        </div>
                        <div className={COMMON_STYLES.absoluteLeft600}>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.label}>R$ 10.000</div>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.dot}></div>
                        </div>
                        <div className={COMMON_STYLES.absoluteLeft800}>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.label}>R$ 15.000</div>
                            <div className={PROJECTIONS_STYLES.timeline.costOfLiving.dot}></div>
                        </div>
                    </div>

                    {/* Linha principal */}
                    <div className={PROJECTIONS_STYLES.timeline.mainLine}></div>
                </div>

                {/* Movimentações */}
                <div className={PROJECTIONS_STYLES.movements.container}>
                    <div className={PROJECTIONS_STYLES.movements.title}>
                        Movimentações
                    </div>

                    {/* Tabs */}
                    <div className={PROJECTIONS_STYLES.movements.tabs.container}>
                        <div className={PROJECTIONS_STYLES.movements.tabs.active}>
                            <div className={PROJECTIONS_STYLES.movements.tabs.text}>Financeiras</div>
                        </div>
                        <div className={PROJECTIONS_STYLES.movements.tabs.inactive}>
                            <div className={PROJECTIONS_STYLES.movements.tabs.textInactive}>Imobilizadas</div>
                        </div>
                    </div>

                    {/* Cards de movimentação */}
                    <div className={PROJECTIONS_STYLES.movements.cards.container}>
                        {formattedMovements.map((movement) => (
                            <div key={movement.id} className={PROJECTIONS_STYLES.movements.cards.card}>
                                <div className={PROJECTIONS_STYLES.movements.cards.title}>
                                    {movement.title}
                                </div>
                                <div className={PROJECTIONS_STYLES.movements.cards.date}>
                                    {movement.date}
                                </div>
                                <div className={PROJECTIONS_STYLES.movements.cards.frequency}>
                                    {movement.frequency}
                                </div>
                                <div className={PROJECTIONS_STYLES.movements.cards.type}>
                                    {movement.type}
                                </div>
                                <div className={movement.isCredit ? PROJECTIONS_STYLES.movements.cards.value.credit : PROJECTIONS_STYLES.movements.cards.value.debit}>
                                    {movement.isCredit ? '↑' : '↓'} R$ {movement.value.toLocaleString('pt-BR')}
                                </div>
                                {movement.isCredit ? (
                                    <div className={PROJECTIONS_STYLES.movements.cards.icon.credit}></div>
                                ) : (
                                    <div className={PROJECTIONS_STYLES.movements.cards.icon.debit}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seguros */}
                <div className={PROJECTIONS_STYLES.insurances.container}>
                    <div className={PROJECTIONS_STYLES.insurances.title}>
                        Seguros
                    </div>

                    {/* Cards de seguro */}
                    <div className={PROJECTIONS_STYLES.insurances.cards.container}>
                        {formattedInsurances.map((insurance) => (
                            <div key={insurance.id} className={PROJECTIONS_STYLES.insurances.cards.card}>
                                <div className={PROJECTIONS_STYLES.insurances.cards.title}>
                                    {insurance.title}
                                </div>
                                <div className={PROJECTIONS_STYLES.insurances.cards.type}>
                                    {insurance.type}
                                </div>
                                <div className={PROJECTIONS_STYLES.insurances.cards.duration}>
                                    {insurance.duration}
                                </div>
                                <div className={PROJECTIONS_STYLES.insurances.cards.premium}>
                                    {insurance.premium}
                                </div>
                                <div className={PROJECTIONS_STYLES.insurances.cards.value}>
                                    R$ {insurance.value.toLocaleString('pt-BR')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}