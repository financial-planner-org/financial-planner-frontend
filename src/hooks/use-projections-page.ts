'use client';

import React, { useState } from 'react';
import { useSimulations } from '@/hooks/api/use-simulations';
import { useMovements } from '@/hooks/api/use-movements';
import { useInsurances } from '@/hooks/api/use-insurances';
import { useProjection } from '@/hooks/api/use-projections';

export function useProjectionsPage() {
    const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
    const [selectedSimulation, setSelectedSimulation] = useState<string>('');
    const [lifeStatus, setLifeStatus] = useState<'VIVO' | 'MORTO' | 'INVALIDO'>('VIVO');
    const [realReturnRate, setRealReturnRate] = useState<number>(0.04);

    // Selecionar primeira simulação por padrão
    React.useEffect(() => {
        if (simulations.length > 0 && !selectedSimulation) {
            setSelectedSimulation(simulations[0].id.toString());
        }
    }, [simulations, selectedSimulation]);

    // Buscar movimentações da simulação selecionada
    const {
        data: movements = [],
        isLoading: isLoadingMovements
    } = useMovements(Number(selectedSimulation));

    // Buscar seguros da simulação selecionada
    const {
        data: insurances = [],
        isLoading: isLoadingInsurances
    } = useInsurances(Number(selectedSimulation));

    // Buscar projeção patrimonial
    const projectionRequest = {
        simulationId: Number(selectedSimulation),
        status: lifeStatus,
        realReturnRate,
        projectionYears: 35, // Até 2060
        includeInsurances: true
    };

    const {
        data: projectionResult,
        isLoading: isLoadingProjection
    } = useProjection(projectionRequest);

    // Formatar movimentações para exibição
    const formattedMovements = movements.map((movement) => ({
        id: movement.id.toString(),
        title: movement.name,
        type: movement.type,
        value: movement.value,
        frequency: movement.frequency,
        startDate: movement.startDate ? new Date(movement.startDate).toLocaleDateString('pt-BR') : undefined,
        endDate: movement.endDate ? new Date(movement.endDate).toLocaleDateString('pt-BR') : undefined,
        isCredit: movement.type === 'INCOME',
        isDebit: movement.type === 'EXPENSE',
        isDependent: movement.type === 'DEPENDENT'
    }));

    // Formatar seguros para exibição
    const formattedInsurances = insurances.map((insurance) => ({
        id: insurance.id.toString(),
        title: insurance.name,
        type: insurance.type,
        value: insurance.insuredValue,
        premium: insurance.monthlyPremium,
        duration: insurance.durationMonths,
        startDate: insurance.startDate ? new Date(insurance.startDate).toLocaleDateString('pt-BR') : undefined
    }));

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const getMovementIcon = (type: string) => {
        switch (type) {
            case 'INCOME':
                return '↑';
            case 'EXPENSE':
                return '↓';
            case 'DEPENDENT':
                return '👶';
            default:
                return '💰';
        }
    };

    const getMovementColor = (type: string) => {
        switch (type) {
            case 'INCOME':
                return 'text-green-700';
            case 'EXPENSE':
                return 'text-red-500';
            case 'DEPENDENT':
                return 'text-blue-500';
            default:
                return 'text-gray-500';
        }
    };

    const getInsuranceTypeLabel = (type: string) => {
        switch (type) {
            case 'LIFE':
                return 'Seguro de Vida';
            case 'DISABILITY':
                return 'Seguro de Invalidez';
            default:
                return 'Seguro';
        }
    };

    const getFrequencyLabel = (frequency: string) => {
        switch (frequency) {
            case 'UNIQUE':
                return 'Única';
            case 'MONTHLY':
                return 'Mensal';
            case 'ANNUAL':
                return 'Anual';
            default:
                return frequency;
        }
    };

    const handleCreateSimulation = () => {
        console.log('Criar nova simulação');
    };

    const handleEditSimulation = (id: string) => {
        console.log('Editar simulação:', id);
    };

    const handleDeleteSimulation = (id: string) => {
        console.log('Deletar simulação:', id);
    };

    const handleCreateVersion = (id: string) => {
        console.log('Criar nova versão:', id);
    };

    const handleViewDetails = (id: string) => {
        console.log('Ver detalhes:', id);
    };

    const handleDuplicateSimulation = (id: string) => {
        console.log('Duplicar simulação:', id);
    };

    return {
        // Dados
        simulations,
        selectedSimulation,
        setSelectedSimulation,
        lifeStatus,
        setLifeStatus,
        realReturnRate,
        setRealReturnRate,
        movements: formattedMovements,
        insurances: formattedInsurances,
        projectionResult,

        // Estados de loading
        isLoadingSimulations,
        isLoadingMovements,
        isLoadingInsurances,
        isLoadingProjection,

        // Formatação
        formatCurrency,
        getMovementIcon,
        getMovementColor,
        getInsuranceTypeLabel,
        getFrequencyLabel,

        // Handlers
        handleCreateSimulation,
        handleEditSimulation,
        handleDeleteSimulation,
        handleCreateVersion,
        handleViewDetails,
        handleDuplicateSimulation
    };
}
