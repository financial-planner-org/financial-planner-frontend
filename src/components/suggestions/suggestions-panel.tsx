'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    TrendingUp,
    TrendingDown,
    Clock,
    DollarSign,
    Target,
    CheckCircle,
    XCircle
} from 'lucide-react';
import type { Simulation, ProjectionData } from '@/lib/types/api';

interface Suggestion {
    id: string;
    type: 'savings' | 'retirement' | 'investment' | 'insurance';
    title: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
    priority: 'high' | 'medium' | 'low';
    value?: number;
    period?: string;
    action?: string;
    isAccepted?: boolean;
    isDismissed?: boolean;
}

interface SuggestionsPanelProps {
    simulation: Simulation | null;
    projectionData: ProjectionData[];
    onAcceptSuggestion?: (suggestion: Suggestion) => void;
    onDismissSuggestion?: (suggestion: Suggestion) => void;
}

export function SuggestionsPanel({
    simulation,
    projectionData,
    onAcceptSuggestion,
    onDismissSuggestion
}: SuggestionsPanelProps) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    // Gerar sugestões baseadas nos dados da projeção
    const generateSuggestions = (): Suggestion[] => {
        if (!projectionData.length || !simulation) return [];

        const currentYear = projectionData[0];
        const finalYear = projectionData[projectionData.length - 1];
        const maxPatrimony = Math.max(...projectionData.map(p => p.totalPatrimony));
        const maxYear = projectionData.find(p => p.totalPatrimony === maxPatrimony)?.year || 0;

        const growthRate = ((finalYear.totalPatrimony - currentYear.totalPatrimony) / currentYear.totalPatrimony) * 100;
        const declineAfterMax = finalYear.totalPatrimony < maxPatrimony;

        const newSuggestions: Suggestion[] = [];

        // Sugestão de economia se o crescimento for baixo
        if (growthRate < 5) {
            const suggestedSavings = currentYear.totalPatrimony * 0.1; // 10% do patrimônio atual
            newSuggestions.push({
                id: 'savings-1',
                type: 'savings',
                title: 'Economize para acelerar o crescimento',
                description: `Economize R$ ${suggestedSavings.toLocaleString('pt-BR', { minimumFractionDigits: 0 })} por 24 meses para voltar ao plano original`,
                impact: 'positive',
                priority: 'high',
                value: suggestedSavings,
                period: '24 meses',
                action: 'Aceitar'
            });
        }

        // Sugestão de adiar aposentadoria se houver declínio
        if (declineAfterMax) {
            const yearsToDelay = Math.ceil((maxPatrimony - finalYear.totalPatrimony) / (currentYear.totalPatrimony * 0.05));
            newSuggestions.push({
                id: 'retirement-1',
                type: 'retirement',
                title: 'Adie sua aposentadoria',
                description: `Adie sua aposentadoria em ${yearsToDelay} anos para voltar ao plano original`,
                impact: 'positive',
                priority: 'medium',
                period: `${yearsToDelay} anos`,
                action: 'Aceitar'
            });
        }

        // Sugestão de investimento se o patrimônio financeiro for baixo
        const financialRatio = currentYear.financialPatrimony / currentYear.totalPatrimony;
        if (financialRatio < 0.3) {
            const suggestedInvestment = currentYear.totalPatrimony * 0.2; // 20% do patrimônio atual
            newSuggestions.push({
                id: 'investment-1',
                type: 'investment',
                title: 'Aumente investimentos financeiros',
                description: `Considere investir R$ ${suggestedInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 0 })} em ativos financeiros para melhorar a liquidez`,
                impact: 'positive',
                priority: 'medium',
                value: suggestedInvestment,
                action: 'Aceitar'
            });
        }

        // Sugestão de seguro se não houver cobertura adequada
        const insuranceRatio = (currentYear.totalPatrimony - currentYear.totalPatrimonyWithoutInsurance) / currentYear.totalPatrimony;
        if (insuranceRatio < 0.1) {
            const suggestedInsurance = currentYear.totalPatrimony * 0.15; // 15% do patrimônio atual
            newSuggestions.push({
                id: 'insurance-1',
                type: 'insurance',
                title: 'Considere seguros de vida',
                description: `Proteja seu patrimônio com seguros no valor de R$ ${suggestedInsurance.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`,
                impact: 'positive',
                priority: 'low',
                value: suggestedInsurance,
                action: 'Aceitar'
            });
        }

        return newSuggestions;
    };

    // Atualizar sugestões quando os dados mudarem
    useState(() => {
        const newSuggestions = generateSuggestions();
        setSuggestions(newSuggestions);
    });

    const handleAcceptSuggestion = (suggestion: Suggestion) => {
        setSuggestions(prev =>
            prev.map(s =>
                s.id === suggestion.id
                    ? { ...s, isAccepted: true, isDismissed: false }
                    : s
            )
        );
        onAcceptSuggestion?.(suggestion);
    };

    const handleDismissSuggestion = (suggestion: Suggestion) => {
        setSuggestions(prev =>
            prev.map(s =>
                s.id === suggestion.id
                    ? { ...s, isDismissed: true, isAccepted: false }
                    : s
            )
        );
        onDismissSuggestion?.(suggestion);
    };

    const getSuggestionIcon = (type: string) => {
        switch (type) {
            case 'savings': return <DollarSign className="w-5 h-5" />;
            case 'retirement': return <Clock className="w-5 h-5" />;
            case 'investment': return <TrendingUp className="w-5 h-5" />;
            case 'insurance': return <Target className="w-5 h-5" />;
            default: return <TrendingUp className="w-5 h-5" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-400/10 text-red-400 border-red-400/20';
            case 'medium': return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
            case 'low': return 'bg-green-400/10 text-green-400 border-green-400/20';
            default: return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
        }
    };

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'positive': return 'text-green-400';
            case 'negative': return 'text-red-400';
            case 'neutral': return 'text-gray-400';
            default: return 'text-gray-400';
        }
    };

    const activeSuggestions = suggestions.filter(s => !s.isDismissed && !s.isAccepted);

    if (activeSuggestions.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-[#9F9F9F] text-lg font-semibold">Sugestões</h3>

            <div className="space-y-3">
                {activeSuggestions.map((suggestion) => (
                    <Card
                        key={suggestion.id}
                        className={`bg-[#434343] border-[#454545] transition-all duration-200 hover:shadow-lg ${suggestion.isAccepted ? 'border-green-400/50' : ''
                            }`}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${suggestion.impact === 'positive' ? 'bg-green-500/20' :
                                        suggestion.impact === 'negative' ? 'bg-red-500/20' :
                                            'bg-gray-500/20'
                                    }`}>
                                    {getSuggestionIcon(suggestion.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-[#B1B1B1] font-medium text-sm">
                                            {suggestion.title}
                                        </h4>
                                        <Badge className={`text-xs ${getPriorityColor(suggestion.priority)}`}>
                                            {suggestion.priority === 'high' ? 'Alta' :
                                                suggestion.priority === 'medium' ? 'Média' : 'Baixa'}
                                        </Badge>
                                    </div>

                                    <p className="text-[#9F9F9F] text-sm mb-3">
                                        {suggestion.description}
                                    </p>

                                    {suggestion.value && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[#B1B1B1] text-sm font-medium">
                                                Valor sugerido:
                                            </span>
                                            <span className={`text-sm font-semibold ${getImpactColor(suggestion.impact)}`}>
                                                R$ {suggestion.value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                    )}

                                    {suggestion.period && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[#B1B1B1] text-sm font-medium">
                                                Período:
                                            </span>
                                            <span className="text-[#9F9F9F] text-sm">
                                                {suggestion.period}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleAcceptSuggestion(suggestion)}
                                            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Aceitar
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDismissSuggestion(suggestion)}
                                            className="bg-[#454545] border-[#434343] text-[#9F9F9F] hover:bg-[#434343]"
                                        >
                                            <XCircle className="w-4 h-4 mr-1" />
                                            Dispensar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
