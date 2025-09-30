'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface Insurance {
    id: string;
    title: string;
    type: string;
    value: number;
    premium: number;
    duration: number;
    startDate?: string;
}

interface InsurancesSectionProps {
    insurances: Insurance[];
    isLoading: boolean;
    formatCurrency: (value: number) => string;
    getInsuranceTypeLabel: (type: string) => string;
}

export function InsurancesSection({
    insurances,
    isLoading,
    formatCurrency,
    getInsuranceTypeLabel
}: InsurancesSectionProps) {
    if (isLoading) {
        return (
            <div className="mb-8">
                <h2 className="text-orange-500 text-3xl font-normal font-['Neuton'] leading-loose mb-4">
                    Seguros
                </h2>
                <div className="flex items-center justify-center h-32">
                    <div className="text-gray-400">Carregando seguros...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <h2 className="text-orange-500 text-3xl font-normal font-['Neuton'] leading-loose mb-4">
                Seguros
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {insurances.length > 0 ? (
                    insurances.map((insurance) => (
                        <Card key={insurance.id} className="w-[697.82px] h-44 bg-zinc-900 rounded-2xl border-2 border-orange-500 p-6 relative">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-stone-300 text-2xl font-medium font-['Work_Sans'] leading-loose">
                                    {insurance.title}
                                </h3>
                            </div>

                            <div className="space-y-1">
                                <p className="text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose">
                                    {getInsuranceTypeLabel(insurance.type)}
                                </p>
                                <p className="text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose">
                                    Duração: {insurance.duration} anos
                                </p>
                                <p className="text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose">
                                    Prêmio: {formatCurrency(insurance.premium)}/mês
                                </p>
                                <p className="text-purple-600 text-2xl font-bold font-['Work_Sans'] leading-loose">
                                    {formatCurrency(insurance.value)}
                                </p>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-2 text-center text-gray-400 py-8">
                        Nenhum seguro encontrado
                    </div>
                )}
            </div>
        </div>
    );
}
