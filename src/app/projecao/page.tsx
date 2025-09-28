'use client';

import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PROJECTIONS_CONFIG } from '@/lib/constants/pages';

export default function ProjecaoPage() {
    return (
        <PageContainer
            title={PROJECTIONS_CONFIG.title}
            description={PROJECTIONS_CONFIG.description}
            className="relative bg-stone-950 rounded-3xl overflow-hidden min-h-screen"
        >
            {/* Container principal com dimensões fixas do Figma */}
            <div className="w-[1598px] h-[2240px] relative bg-stone-950 rounded-3xl overflow-hidden mx-auto">

                {/* Header com informações do usuário */}
                <div className={PROJECTIONS_CONFIG.userHeader.container}>
                    <div className={PROJECTIONS_CONFIG.userHeader.name}>Paulo Alberto</div>
                    <div className={PROJECTIONS_CONFIG.userHeader.dropdown}></div>
                </div>

                {/* Cards de valores patrimoniais */}
                <div className="absolute left-[111px] top-[291px] flex flex-col gap-4">
                    <div className="flex flex-col">
                        <div className="text-neutral-500 text-lg font-medium font-['Satoshi'] leading-loose">Patrimônio Líquido Total</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-neutral-500 text-4xl font-medium font-['Work_Sans'] leading-loose">R$ </span>
                            <span className="text-white text-4xl font-medium font-['Work_Sans'] leading-loose">2.679.930,00</span>
                        </div>
                        <div className="text-blue-400 text-lg font-medium font-['Work_Sans'] leading-loose">+52,37%</div>
                    </div>
                </div>

                {/* Cards laterais de valores */}
                <div className="absolute left-[665px] top-[140px] flex flex-col gap-4">
                    <div className="text-white text-2xl font-medium font-['Work_Sans'] leading-loose">R$ 2.679.930,00</div>
                    <div className="text-blue-400 text-lg font-medium font-['Work_Sans'] leading-loose">+18,37%</div>
                </div>

                <div className="absolute left-[1061px] top-[140px] flex flex-col gap-4">
                    <div className="text-white text-2xl font-medium font-['Work_Sans'] leading-loose">R$ 3.173.960,00</div>
                    <div className="text-blue-400 text-lg font-medium font-['Work_Sans'] leading-loose">+10,37%</div>
                </div>

                <div className="absolute left-[1473px] top-[140px] flex flex-col gap-4">
                    <div className="text-white text-xl font-semibold font-['Inter'] leading-loose">R$ 2.173.960,00</div>
                    <div className="text-blue-400 text-base font-medium font-['Inter'] leading-loose">+10,37%</div>
                </div>

                {/* Timeline de idades */}
                <div className={PROJECTIONS_CONFIG.timeline.years.container}>
                    <div className={PROJECTIONS_CONFIG.timeline.years.year}>2025</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.year}>2030</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.year}>2035</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.year}>2040</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.year}>2045</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.year}>2050</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.year}>2055</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.year}>2060</div>
                </div>

                <div className="absolute left-[101px] top-[1072px] flex flex-col gap-4">
                    <div className={PROJECTIONS_CONFIG.timeline.years.age}>45</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.age}>50</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.age}>55</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.age}>60</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.age}>65</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.age}>70</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.age}>75</div>
                    <div className={PROJECTIONS_CONFIG.timeline.years.age}>80</div>
                </div>

                {/* Gráfico de projeção patrimonial */}
                <div className={PROJECTIONS_CONFIG.chart.container}>
                    <div className={PROJECTIONS_CONFIG.chart.title}>Projeção Patrimonial</div>
                    <div className={PROJECTIONS_CONFIG.chart.controls.container}>
                        <div className={PROJECTIONS_CONFIG.chart.controls.link}>Ver com detalhes</div>
                        <div className={PROJECTIONS_CONFIG.chart.controls.link}>Ver como Tabela</div>
                    </div>

                    {/* Eixo Y */}
                    <div className={PROJECTIONS_CONFIG.chart.yAxis.container}>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 3,5 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 3 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 2,5 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 2 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 1,5 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 1 M</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 500K</div>
                        <div className={PROJECTIONS_CONFIG.chart.yAxis.label}>R$ 0</div>
                    </div>

                    {/* Linhas do gráfico */}
                    <div className={PROJECTIONS_CONFIG.chart.lines.original}></div>
                    <div className={PROJECTIONS_CONFIG.chart.lines.current}></div>
                    <div className={PROJECTIONS_CONFIG.chart.lines.realized}></div>

                    {/* Pontos do gráfico */}
                    <div className={`${PROJECTIONS_CONFIG.chart.dots.amber} left-[309.85px] top-[285px]`}></div>
                    <div className={`${PROJECTIONS_CONFIG.chart.dots.amber} left-[507.18px] top-[225px]`}></div>
                    <div className={`${PROJECTIONS_CONFIG.chart.dots.amber} left-[620.97px] top-[158px]`}></div>
                </div>

                {/* Controles de simulação */}
                <div className={PROJECTIONS_CONFIG.simulationControls.container}>
                    <div className={PROJECTIONS_CONFIG.simulationControls.button.container}>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.radio}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.text}>Situação atual 05/2025</div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                    </div>

                    <div className={PROJECTIONS_CONFIG.simulationControls.button.selected}>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.radioSelected}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.text}>Plano Original</div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                    </div>

                    <div className={PROJECTIONS_CONFIG.simulationControls.button.container}>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.radio}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.text}>Situação atual 05/2025</div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                        <div className={PROJECTIONS_CONFIG.simulationControls.button.dots}></div>
                    </div>

                    <div className={PROJECTIONS_CONFIG.simulationControls.addButton.container}>
                        <div className={PROJECTIONS_CONFIG.simulationControls.addButton.text}>Realizado</div>
                    </div>

                    <div className={PROJECTIONS_CONFIG.simulationControls.addButton.container}>
                        <div className={PROJECTIONS_CONFIG.simulationControls.addButton.text}>+ Adicionar Simulação</div>
                    </div>
                </div>

                {/* Seção Timeline */}
                <Section
                    title="Timeline"
                    className={PROJECTIONS_CONFIG.timeline.container}
                >
                    <div className="relative">
                        {/* Gráfico de salário */}
                        <div className={PROJECTIONS_CONFIG.timeline.salary.container}>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.label}>Salário</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.value}>CLT: R$ 15.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.value}>CLT: R$ 15.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.value}>Autônomo: R$ 5.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.value}>Autônomo: R$ 35.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.salary.value}>Aposentadoria</div>
                        </div>

                        {/* Gráfico de custo de vida */}
                        <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.container}>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.label}>Custo<br />de vida</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.value}>R$ 8.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.value}>R$ 12.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.value}>R$ 20.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.value}>R$ 10.000</div>
                            <div className={PROJECTIONS_CONFIG.timeline.costOfLiving.value}>R$ 15.000</div>
                        </div>
                    </div>
                </Section>

                {/* Seção Movimentações */}
                <Section
                    title="Movimentações"
                    className={PROJECTIONS_CONFIG.movements.container}
                >
                    <div className={PROJECTIONS_CONFIG.movements.tabs.container}>
                        <div className={PROJECTIONS_CONFIG.movements.tabs.active}>
                            <div className={PROJECTIONS_CONFIG.movements.tabs.text}>Financeiras</div>
                        </div>
                        <div className={PROJECTIONS_CONFIG.movements.tabs.inactive}>
                            <div className={PROJECTIONS_CONFIG.movements.tabs.textInactive}>Imobilizadas</div>
                        </div>
                    </div>

                    <div className={PROJECTIONS_CONFIG.movements.cards.container}>
                        <Card className={PROJECTIONS_CONFIG.movements.cards.card}>
                            <CardContent>
                                <div className={PROJECTIONS_CONFIG.movements.cards.title}>Herança</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.date}>09/07/23 - 22/07/23</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.frequency}>Frequência: Única</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.type}>Crédito</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.value.credit}>R$ 220.000</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.icon.credit}></div>
                            </CardContent>
                        </Card>

                        <Card className={PROJECTIONS_CONFIG.movements.cards.card}>
                            <CardContent>
                                <div className={PROJECTIONS_CONFIG.movements.cards.title}>Comissão</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.date}>09/07/23 - 22/07/23</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.frequency}>Frequência: Anual</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.type}>Crédito</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.value.credit}>R$ 500.000</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.icon.credit}></div>
                            </CardContent>
                        </Card>

                        <Card className={PROJECTIONS_CONFIG.movements.cards.card}>
                            <CardContent>
                                <div className={PROJECTIONS_CONFIG.movements.cards.title}>Custo do filho</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.date}>09/07/23 - 22/07/43</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.frequency}>Frequência: Mensal</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.type}>Dependente</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.value.debit}>R$ 1.500</div>
                                <div className={PROJECTIONS_CONFIG.movements.cards.icon.debit}></div>
                            </CardContent>
                        </Card>
                    </div>
                </Section>

                {/* Seção Seguros */}
                <Section
                    title="Seguros"
                    className={PROJECTIONS_CONFIG.insurances.container}
                >
                    <div className={PROJECTIONS_CONFIG.insurances.subtitle}>Seguros</div>

                    <div className={PROJECTIONS_CONFIG.insurances.cards.container}>
                        <Card className={PROJECTIONS_CONFIG.insurances.cards.card}>
                            <CardContent>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.title}>Seguro de Vida Familiar</div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.type}>Seguro de Vida</div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.duration}>Duração: 15 anos</div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.premium}>Prêmio: R$ 120/mês</div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.value}>R$ 500.000</div>
                            </CardContent>
                        </Card>

                        <Card className={PROJECTIONS_CONFIG.insurances.cards.card}>
                            <CardContent>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.title}>Seguro de Invalidez</div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.type}>Seguro de Invalidez</div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.duration}>Duração: 5 anos</div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.premium}>Prêmio: R$ 300/mês</div>
                                <div className={PROJECTIONS_CONFIG.insurances.cards.value}>R$ 100.000</div>
                            </CardContent>
                        </Card>
                    </div>
                </Section>

                {/* Barras do gráfico (elementos decorativos) */}
                <div className="absolute left-[1663px] top-[182px] flex gap-1.5">
                    {Array.from({ length: 16 }, (_, i) => (
                        <div key={i} className="w-1.5 h-16 bg-blue-950 rounded-lg" />
                    ))}
                </div>

                <div className="absolute left-[1253px] top-[182px] flex gap-1.5">
                    {Array.from({ length: 16 }, (_, i) => (
                        <div key={i} className="w-1.5 h-16 bg-blue-950 rounded-lg" />
                    ))}
                </div>

                {/* Linhas de grade */}
                <div className="w-[2204px] h-0 left-0 top-0 absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-700" />
                <div className="w-52 h-0 left-[638px] top-[164px] absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-700" />
                <div className="w-96 h-0 left-[1046px] top-[268px] absolute origin-top-left rotate-180 outline outline-1 outline-offset-[-0.50px] outline-neutral-700" />
                <div className="w-[552px] h-0 left-[1598px] top-[268px] absolute origin-top-left rotate-180 outline outline-[3px] outline-offset-[-1.50px] outline-neutral-700" />
                <div className="w-52 h-0 left-[1046px] top-[164px] absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-700" />
                <div className="w-52 h-0 left-[1454px] top-[164px] absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-700" />

                {/* Elementos de status */}
                <div className="absolute left-[667px] top-[476px] flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-neutral-400" />
                    <div className="text-neutral-400 text-3xl font-normal font-['Neuton'] leading-loose">Morto</div>
                </div>

                <div className="absolute left-[827px] top-[476px] flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-neutral-400" />
                    <div className="text-neutral-400 text-3xl font-normal font-['Neuton'] leading-loose">Inválido</div>
                </div>

                {/* Gradiente de fade */}
                <div className="w-64 h-80 left-[1344px] top-[113px] absolute bg-gradient-to-l from-stone-950 to-stone-950/0" />
            </div>
        </PageContainer>
    );
}