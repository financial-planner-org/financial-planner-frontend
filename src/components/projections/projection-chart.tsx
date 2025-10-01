'use client';

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3 } from 'lucide-react';

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

interface ProjectionChartProps {
  data: ProjectionData;
  showWithoutInsurances?: boolean;
  selectedYears?: number[];
}

export function ProjectionChart({
  data,
  showWithoutInsurances = false,
  selectedYears,
}: ProjectionChartProps) {
  const { years, projections } = data;

  // Filtrar anos se selecionados
  const displayYears = selectedYears ? years.filter(year => selectedYears.includes(year)) : years;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getYearIndex = (year: number) => years.indexOf(year);

  // Calcular valores máximos para escala
  const allValues = displayYears.map(year => {
    const yearIndex = getYearIndex(year);
    return showWithoutInsurances && projections.withoutInsurances
      ? projections.withoutInsurances.total[yearIndex]
      : projections.total[yearIndex];
  });

  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BarChart3 className='h-5 w-5' />
          Gráfico de Projeção Patrimonial
          {showWithoutInsurances && <Badge variant='secondary'>Sem Seguros</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* Gráfico de Barras Simples */}
          <div className='space-y-2'>
            <h4 className='text-sm font-medium text-gray-700'>Evolução do Patrimônio Total</h4>
            <div className='flex items-end gap-1 h-64 border-b border-l border-gray-200'>
              {displayYears.map((year, index) => {
                const yearIndex = getYearIndex(year);
                const value =
                  showWithoutInsurances && projections.withoutInsurances
                    ? projections.withoutInsurances.total[yearIndex]
                    : projections.total[yearIndex];

                const height = ((value - minValue) / (maxValue - minValue)) * 100;

                return (
                  <div key={year} className='flex flex-col items-center flex-1'>
                    <div
                      className='w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors'
                      style={{ height: `${Math.max(height, 5)}%` }}
                      title={`${year}: ${formatCurrency(value)}`}
                    />
                    <div className='text-xs text-gray-600 mt-1 transform -rotate-45 origin-left'>
                      {year}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumo dos Valores */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                {formatCurrency(
                  showWithoutInsurances && projections.withoutInsurances
                    ? projections.withoutInsurances.total[0]
                    : projections.total[0]
                )}
              </div>
              <div className='text-sm text-gray-600'>Valor Inicial</div>
            </div>

            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {formatCurrency(
                  showWithoutInsurances && projections.withoutInsurances
                    ? projections.withoutInsurances.total[
                        projections.withoutInsurances.total.length - 1
                      ]
                    : projections.total[projections.total.length - 1]
                )}
              </div>
              <div className='text-sm text-gray-600'>Valor Final</div>
            </div>

            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                {(() => {
                  const initial =
                    showWithoutInsurances && projections.withoutInsurances
                      ? projections.withoutInsurances.total[0]
                      : projections.total[0];
                  const final =
                    showWithoutInsurances && projections.withoutInsurances
                      ? projections.withoutInsurances.total[
                          projections.withoutInsurances.total.length - 1
                        ]
                      : projections.total[projections.total.length - 1];
                  const growth = ((final - initial) / initial) * 100;
                  return `+${growth.toFixed(1)}%`;
                })()}
              </div>
              <div className='text-sm text-gray-600'>Crescimento Total</div>
            </div>

            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600'>
                {formatCurrency(
                  showWithoutInsurances && projections.withoutInsurances
                    ? projections.withoutInsurances.total[
                        projections.withoutInsurances.total.length - 1
                      ] - projections.withoutInsurances.total[0]
                    : projections.total[projections.total.length - 1] - projections.total[0]
                )}
              </div>
              <div className='text-sm text-gray-600'>Ganho Absoluto</div>
            </div>
          </div>

          {/* Gráfico de Área Empilhada (Simplificado) */}
          <div className='space-y-2'>
            <h4 className='text-sm font-medium text-gray-700'>Composição do Patrimônio</h4>
            <div className='space-y-1'>
              {displayYears.slice(0, 10).map((year, index) => {
                const yearIndex = getYearIndex(year);
                const total =
                  showWithoutInsurances && projections.withoutInsurances
                    ? projections.withoutInsurances.total[yearIndex]
                    : projections.total[yearIndex];

                const financial =
                  showWithoutInsurances && projections.withoutInsurances
                    ? projections.withoutInsurances.financial[yearIndex]
                    : projections.financial[yearIndex];

                const realEstate =
                  showWithoutInsurances && projections.withoutInsurances
                    ? projections.withoutInsurances.realEstate[yearIndex]
                    : projections.realEstate[yearIndex];

                const financialPercent = (financial / total) * 100;
                const realEstatePercent = (realEstate / total) * 100;

                return (
                  <div key={year} className='flex items-center gap-2'>
                    <div className='w-12 text-xs text-gray-600'>{year}</div>
                    <div className='flex-1 h-4 bg-gray-200 rounded overflow-hidden'>
                      <div
                        className='h-full bg-blue-500'
                        style={{ width: `${financialPercent}%` }}
                        title={`Financeiro: ${formatCurrency(financial)}`}
                      />
                      <div
                        className='h-full bg-green-500 -mt-4'
                        style={{ width: `${realEstatePercent}%` }}
                        title={`Imobiliário: ${formatCurrency(realEstate)}`}
                      />
                    </div>
                    <div className='w-20 text-xs text-right text-gray-600'>
                      {formatCurrency(total)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectionChart;
