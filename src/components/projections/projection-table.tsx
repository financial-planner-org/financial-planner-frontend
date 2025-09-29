'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

interface ProjectionTableProps {
    data: ProjectionData;
    showWithoutInsurances?: boolean;
    selectedYears?: number[];
}

export function ProjectionTable({ data, showWithoutInsurances = false, selectedYears }: ProjectionTableProps) {
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

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Tabela de Projeção Patrimonial
                    {showWithoutInsurances && (
                        <Badge variant="secondary">Sem Seguros</Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ano</TableHead>
                                <TableHead className="text-right">Patrimônio Total</TableHead>
                                <TableHead className="text-right">Financeiro</TableHead>
                                <TableHead className="text-right">Imobiliário</TableHead>
                                {!showWithoutInsurances && (
                                    <TableHead className="text-right">Seguros</TableHead>
                                )}
                                <TableHead className="text-right">Crescimento</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayYears.map((year, index) => {
                                const yearIndex = getYearIndex(year);
                                const isFirstYear = yearIndex === 0;

                                // Usar dados com ou sem seguros
                                const totalValue = showWithoutInsurances && projections.withoutInsurances
                                    ? projections.withoutInsurances.total[yearIndex]
                                    : projections.total[yearIndex];

                                const financialValue = showWithoutInsurances && projections.withoutInsurances
                                    ? projections.withoutInsurances.financial[yearIndex]
                                    : projections.financial[yearIndex];

                                const realEstateValue = showWithoutInsurances && projections.withoutInsurances
                                    ? projections.withoutInsurances.realEstate[yearIndex]
                                    : projections.realEstate[yearIndex];

                                const insuranceValue = projections.insurance[yearIndex] || 0;

                                // Calcular crescimento
                                const previousTotal = isFirstYear
                                    ? totalValue
                                    : (showWithoutInsurances && projections.withoutInsurances
                                        ? projections.withoutInsurances.total[getYearIndex(years[yearIndex - 1])]
                                        : projections.total[getYearIndex(years[yearIndex - 1])]);

                                const growth = isFirstYear
                                    ? 0
                                    : ((totalValue - previousTotal) / previousTotal) * 100;

                                return (
                                    <TableRow key={year}>
                                        <TableCell className="font-medium">{year}</TableCell>
                                        <TableCell className="text-right font-semibold">
                                            {formatCurrency(totalValue)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(financialValue)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(realEstateValue)}
                                        </TableCell>
                                        {!showWithoutInsurances && (
                                            <TableCell className="text-right">
                                                {formatCurrency(insuranceValue)}
                                            </TableCell>
                                        )}
                                        <TableCell className="text-right">
                                            <span className={growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

export default ProjectionTable;