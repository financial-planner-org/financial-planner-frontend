'use client';

import React, { useState } from 'react';
import { useSimulationHistory } from '@/hooks/api/use-simulation-history';
import { useSimulations } from '@/hooks/api/use-simulations';

export function useHistoryPage() {
    const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
    const { data: history = [], isLoading: isLoadingHistory } = useSimulationHistory();
    const [selectedClient, setSelectedClient] = useState<string>('');

    // Formatar histórico para exibição
    const formattedHistory = history.map((item) => ({
        id: item.id.toString(),
        clientName: item.clientName,
        simulationName: item.simulationName,
        version: item.version,
        createdAt: new Date(item.createdAt).toLocaleDateString('pt-BR'),
        totalPatrimony: item.totalPatrimony,
        retirementYear: item.retirementYear,
        isLegacy: item.isLegacy,
        canEdit: !item.isLegacy
    }));

    // Agrupar por cliente
    const clients = Array.from(new Set(history.map(item => item.clientName))).map(clientName => ({
        id: clientName,
        name: clientName,
        simulationsCount: history.filter(item => item.clientName === clientName).length
    }));

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handleViewSimulation = (id: string) => {
        console.log('Ver simulação:', id);
    };

    const handleReopenSimulation = (id: string) => {
        console.log('Reabrir simulação:', id);
    };

    const handleCreateFromLegacy = (id: string) => {
        console.log('Criar nova simulação a partir de versão legada:', id);
    };

    const handleEditSimulation = (id: string) => {
        console.log('Editar simulação:', id);
    };

    const handleDeleteSimulation = (id: string) => {
        console.log('Deletar simulação:', id);
    };

    return {
        // Dados
        simulations,
        history: formattedHistory,
        clients,
        selectedClient,
        setSelectedClient,

        // Estados de loading
        isLoadingSimulations,
        isLoadingHistory,

        // Formatação
        formatCurrency,

        // Handlers
        handleViewSimulation,
        handleReopenSimulation,
        handleCreateFromLegacy,
        handleEditSimulation,
        handleDeleteSimulation
    };
}
