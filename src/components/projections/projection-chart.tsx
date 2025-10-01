/**
 * Componente de Gráfico de Projeção Patrimonial
 * 
 * Implementa requisito do case:
 * - "Gráficos de áreas empilhadas para patrimônio imobilizado e financeiro"
 * - "Linha adicional de Patrimônio Total sem Seguros"
 * 
 * Mostra evolução patrimonial ano a ano com:
 * - Áreas empilhadas (Financeiro, Imobilizado, Seguros)
 * - Linha tracejada (Total sem Seguros)
 */
'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Tipo de dados esperado
interface ProjectionDataPoint {
    year: number;
    totalPatrimony: number;
    financialPatrimony: number;
    immovablePatrimony: number;
    insurances: number;
    totalWithoutInsurances: number;
}

interface ProjectionChartProps {
    data: ProjectionDataPoint[];
    showWithoutInsurances?: boolean;
}

export function ProjectionChart({ data, showWithoutInsurances = true }: ProjectionChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-muted-foreground">Nenhum dado de projeção disponível</p>
            </div>
        );
    }

    // Formatador de valores para tooltip
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Formatador para eixo Y (valores em milhões)
    const formatYAxis = (value: number) => {
        return `R$ ${(value / 1000000).toFixed(1)}M`;
    };

    return (
        <div className="w-full h-[500px] bg-card rounded-lg p-4 border border-border">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    {/* Gradientes para as áreas - usando cores do tema */}
                    <defs>
                        <linearGradient id="colorFinancial" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorRealEstate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorInsurance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>

                    {/* Grid de fundo */}
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />

                    {/* Eixo X (Anos) */}
                    <XAxis
                        dataKey="year"
                        className="stroke-muted-foreground"
                        style={{ fontSize: '12px' }}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />

                    {/* Eixo Y (Valores em Milhões) */}
                    <YAxis
                        className="stroke-muted-foreground"
                        style={{ fontSize: '12px' }}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={formatYAxis}
                    />

                    {/* Tooltip customizado */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            padding: '12px'
                        }}
                        labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 'bold', marginBottom: '8px' }}
                        formatter={(value: any) => [formatCurrency(Number(value)), '']}
                    />

                    {/* Legenda */}
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="square"
                    />

                    {/* ÁREAS EMPILHADAS - Requisito do Case */}
                    <Area
                        type="monotone"
                        dataKey="financialPatrimony"
                        stackId="1"
                        stroke="hsl(var(--chart-1))"
                        fill="url(#colorFinancial)"
                        name="Patrimônio Financeiro"
                    />
                    <Area
                        type="monotone"
                        dataKey="immovablePatrimony"
                        stackId="1"
                        stroke="hsl(var(--chart-2))"
                        fill="url(#colorRealEstate)"
                        name="Patrimônio Imobilizado"
                    />
                    <Area
                        type="monotone"
                        dataKey="insurances"
                        stackId="1"
                        stroke="hsl(var(--chart-3))"
                        fill="url(#colorInsurance)"
                        name="Seguros"
                    />

                    {/* LINHA SEM SEGUROS - Requisito do Case */}
                    {showWithoutInsurances && (
                        <Line
                            type="monotone"
                            dataKey="totalWithoutInsurances"
                            stroke="hsl(var(--destructive))"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            dot={false}
                            name="Total sem Seguros"
                        />
                    )}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}