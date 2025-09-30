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
            <div className="h-96 flex items-center justify-center bg-[#0d0d0d] rounded-lg">
                <p className="text-gray-400">Nenhum dado de projeção disponível</p>
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
        <div className="w-full h-[500px] bg-[#0d0d0d] rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    {/* Gradientes para as áreas */}
                    <defs>
                        <linearGradient id="colorFinancial" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
                        </linearGradient>
                        <linearGradient id="colorRealEstate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ffc658" stopOpacity={0.2} />
                        </linearGradient>
                        <linearGradient id="colorInsurance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>

                    {/* Grid de fundo */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />

                    {/* Eixo X (Anos) */}
                    <XAxis
                        dataKey="year"
                        stroke="#999"
                        style={{ fontSize: '12px' }}
                        tick={{ fill: '#999' }}
                    />

                    {/* Eixo Y (Valores em Milhões) */}
                    <YAxis
                        stroke="#999"
                        style={{ fontSize: '12px' }}
                        tick={{ fill: '#999' }}
                        tickFormatter={formatYAxis}
                    />

                    {/* Tooltip customizado */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            padding: '12px'
                        }}
                        labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
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
                        stroke="#82ca9d"
                        fill="url(#colorFinancial)"
                        name="Patrimônio Financeiro"
                    />
                    <Area
                        type="monotone"
                        dataKey="immovablePatrimony"
                        stackId="1"
                        stroke="#ffc658"
                        fill="url(#colorRealEstate)"
                        name="Patrimônio Imobilizado"
                    />
                    <Area
                        type="monotone"
                        dataKey="insurances"
                        stackId="1"
                        stroke="#8884d8"
                        fill="url(#colorInsurance)"
                        name="Seguros"
                    />

                    {/* LINHA SEM SEGUROS - Requisito do Case */}
                    {showWithoutInsurances && (
                        <Line
                            type="monotone"
                            dataKey="totalWithoutInsurances"
                            stroke="#ff7c7c"
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