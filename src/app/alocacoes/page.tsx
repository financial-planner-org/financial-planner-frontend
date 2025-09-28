'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSimulations } from '@/hooks/api/use-simulations';
import { Plus } from 'lucide-react';
import { ALLOCATIONS_CONFIG } from '@/lib/constants/pages';
import { AllocationCard } from '@/components/allocations/allocation-card';

export default function AlocacoesPage() {
  const { data: simulations = [] } = useSimulations();
  const [selectedSimulation, setSelectedSimulation] = useState<string>('');

  const handleEditAllocation = (id: string) => {
    console.log('Editar alocação:', id);
  };

  const handleViewAllocation = (id: string) => {
    console.log('Ver detalhes da alocação:', id);
  };

  const handleDeleteAllocation = (id: string) => {
    console.log('Deletar alocação:', id);
  };

  const handleUpdateAllocation = (id: string) => {
    console.log('Atualizar alocação:', id);
  };

  // Mock data baseado na imagem
  const allocations = [
    {
      id: '1',
      title: 'CDB Banco Itaú',
      value: 'R$ 1.000.000',
      date: '20/06/2024',
      lastUpdate: '10/06/2025',
      hasWarning: true,
      badges: [{ type: 'financial' as const, label: 'Financeira Manual' }]
    },
    {
      id: '2',
      title: 'CDB Banco C6',
      value: 'R$ 1.000.000',
      date: '20/06/2023',
      lastUpdate: '10/08/2025',
      hasWarning: false,
      badges: [{ type: 'financial' as const, label: 'Financeira Manual' }]
    },
    {
      id: '3',
      title: 'Apartamento Vila Olímpia',
      value: 'R$ 148.666',
      totalValue: 'de R$ 2.123.800',
      dateRange: '01/07/2024 - 01/02/2041',
      progress: 'Progresso: 14/200 parcelas',
      progressValue: 14,
      progressTotal: 200,
      lastUpdate: '10/08/2025',
      hasWarning: false,
      badges: [
        { type: 'immobilized' as const, label: 'Imobilizada' },
        { type: 'financed' as const, label: '$ Financiado' }
      ]
    },
    {
      id: '4',
      title: 'Loja',
      value: 'R$ 1.800.000',
      date: '20/04/2023',
      lastUpdate: 'Atualização única',
      hasWarning: false,
      updateType: 'Atualização única',
      badges: [{ type: 'immobilized' as const, label: 'Imobilizada' }]
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navegação superior */}
        <div className="mb-8">
          <div className={ALLOCATIONS_CONFIG.navigation.container}>
            <div className={ALLOCATIONS_CONFIG.navigation.activeItem}>
              Alocações
            </div>
            <div className={ALLOCATIONS_CONFIG.navigation.inactiveItem}>
              Projeção
            </div>
            <div className={ALLOCATIONS_CONFIG.navigation.inactiveItem}>
              Histórico
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className={ALLOCATIONS_CONFIG.controls.container}>
          <div className={ALLOCATIONS_CONFIG.controls.filterContainer}>
            <span className={ALLOCATIONS_CONFIG.controls.filterLabel}>
              Alocações:
            </span>
            <div className={ALLOCATIONS_CONFIG.controls.filterSelect}>
              <span className={ALLOCATIONS_CONFIG.controls.filterText}>
                Todas
              </span>
              <div className="w-4 h-4 bg-zinc-300 rounded-sm flex items-center justify-center">
                <div className="w-2 h-1 bg-gray-800 rounded-sm"></div>
              </div>
            </div>
          </div>

          <Button className={ALLOCATIONS_CONFIG.controls.addButton}>
            <div className={ALLOCATIONS_CONFIG.controls.addButtonIcon}></div>
            <span className={ALLOCATIONS_CONFIG.controls.addButtonText}>
              Adicionar
            </span>
          </Button>
        </div>

        {/* Timeline de alocações */}
        <div className={ALLOCATIONS_CONFIG.timeline.container}>
          <h2 className={ALLOCATIONS_CONFIG.timeline.title}>
            {ALLOCATIONS_CONFIG.timelineTitle}
          </h2>

          {/* Linha da timeline */}
          <div className={ALLOCATIONS_CONFIG.timeline.line}></div>

          {/* Labels da timeline */}
          <div className={ALLOCATIONS_CONFIG.timeline.oldDataLabel}>
            Dados antigos
          </div>

          <div className={ALLOCATIONS_CONFIG.timeline.updatedLabel}>
            Atualizado
          </div>

          {/* Cards de alocação */}
          <div className={ALLOCATIONS_CONFIG.timeline.itemsContainer}>
            {allocations.map((allocation) => (
              <AllocationCard
                key={allocation.id}
                {...allocation}
                onEdit={handleEditAllocation}
                onView={handleViewAllocation}
                onDelete={handleDeleteAllocation}
                onUpdate={handleUpdateAllocation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
