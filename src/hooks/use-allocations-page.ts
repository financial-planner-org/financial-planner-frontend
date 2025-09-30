'use client';

import React, { useState } from 'react';
import { useSimulations } from '@/hooks/api/use-simulations';
import { useAllocations, useDeleteAllocation } from '@/hooks/api/use-allocations';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export function useAllocationsPage() {
    const { data: simulations = [], isLoading: isLoadingSimulations } = useSimulations();
    const [selectedSimulation, setSelectedSimulation] = useState<string>('');

    // Selecionar primeira simulação por padrão
    React.useEffect(() => {
        if (simulations.length > 0 && !selectedSimulation) {
            setSelectedSimulation(simulations[0].id.toString());
        }
    }, [simulations, selectedSimulation]);

    const {
        data: allocations = [],
        isLoading: isLoadingAllocations
    } = useAllocations(Number(selectedSimulation));

    const deleteAllocation = useDeleteAllocation();

    // Converter dados da API para o formato esperado pelo componente
    const formattedAllocations = allocations.map((allocation) => ({
        id: allocation.id.toString(),
        title: allocation.name,
        type: allocation.type,
        value: allocation.value,
        startDate: allocation.startDate ? new Date(allocation.startDate).toLocaleDateString('pt-BR') : undefined,
        lastUpdate: allocation.records && allocation.records.length > 0
            ? new Date(allocation.records[0].date).toLocaleDateString('pt-BR')
            : new Date(allocation.updatedAt).toLocaleDateString('pt-BR'),
        hasWarning: false,
        status: (allocation.records && allocation.records.length > 0 ? 'updated' : 'old') as 'updated' | 'old',
        // Para imóveis financiados
        ...(allocation.installments && {
            totalValue: allocation.value * allocation.installments,
            period: allocation.startDate
                ? `${new Date(allocation.startDate).toLocaleDateString('pt-BR')} - ${new Date(new Date(allocation.startDate).getTime() + (allocation.installments * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString('pt-BR')}`
                : undefined,
            progress: `Progresso: ${allocation.records?.length || 0}/${allocation.installments} parcelas`,
            progressValue: allocation.records?.length || 0,
            progressTotal: allocation.installments,
            isFinanced: true
        })
    }));

    // formatCurrency agora vem de @/lib/utils

    const getTypeColor = (type: string) => {
        return type === 'FINANCIAL' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
    };

    const getTypeLabel = (type: string) => {
        return type === 'FINANCIAL' ? 'Financeira Manual' : 'Imobilizada';
    };

    const handleEditAllocation = (id: string) => {
        console.log('Editar alocação:', id);
    };

    const handleViewAllocation = (id: string) => {
        console.log('Ver detalhes da alocação:', id);
    };

    const handleDeleteAllocation = async (id: string) => {
        try {
            await deleteAllocation.mutateAsync(Number(id));
            toast.success('Alocação deletada com sucesso!');
        } catch (error) {
            toast.error('Erro ao deletar alocação. Tente novamente.');
        }
    };

    const handleUpdateAllocation = (id: string) => {
        console.log('Atualizar alocação:', id);
    };

    return {
        simulations,
        isLoadingSimulations,
        selectedSimulation,
        setSelectedSimulation,
        allocations,
        isLoadingAllocations,
        formattedAllocations,
        formatCurrency,
        getTypeColor,
        getTypeLabel,
        handleEditAllocation,
        handleViewAllocation,
        handleDeleteAllocation,
        handleUpdateAllocation
    };
}
