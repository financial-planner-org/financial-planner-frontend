'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SimulationMenu } from './simulation-menu';
import { SimulationStatus } from './simulation-status';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Simulation {
  id: number;
  name: string;
  startDate: string;
  realRate: number;
  isCurrentSituation?: boolean;
  isLegacy?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SimulationListProps {
  simulations: Simulation[];
  onEdit: (id: number, data: { name: string; startDate: Date; realRate: number }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onCreateVersion: (
    baseId: number,
    data: { name: string; startDate: Date; realRate: number }
  ) => Promise<void>;
  onCreateNew: (data: {
    name: string;
    startDate: Date;
    realRate: number;
    baseSimulationId?: number;
  }) => Promise<void>;
  onAddNew: () => void;
  isLoading?: boolean;
}

export function SimulationList({
  simulations,
  onEdit,
  onDelete,
  onCreateVersion,
  onCreateNew,
  onAddNew,
  isLoading = false,
}: SimulationListProps) {
  const [selectedSimulation, setSelectedSimulation] = useState<number | null>(null);

  const handleEdit = async (data: { name: string; startDate: Date; realRate: number }) => {
    if (selectedSimulation) {
      await onEdit(selectedSimulation, data);
    }
  };

  const handleDelete = async (id: number) => {
    await onDelete(id);
  };

  const handleCreateVersion = async (data: { name: string; startDate: Date; realRate: number }) => {
    if (selectedSimulation) {
      await onCreateVersion(selectedSimulation, data);
    }
  };

  const handleCreateNew = async (data: {
    name: string;
    startDate: Date;
    realRate: number;
    baseSimulationId?: number;
  }) => {
    await onCreateNew(data);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  };

  const formatRate = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  return (
    <div className='space-y-4'>
      {/* Header com botão de adicionar */}
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Simulações</h3>
        <Button onClick={onAddNew} className='flex items-center gap-2'>
          <Plus className='w-4 h-4' />
          Adicionar Simulação
        </Button>
      </div>

      {/* Lista de simulações */}
      <div className='grid gap-4'>
        {simulations.map(simulation => (
          <Card
            key={simulation.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSimulation === simulation.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedSimulation(simulation.id)}
          >
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <CardTitle className='text-lg'>{simulation.name}</CardTitle>
                  <SimulationStatus
                    isCurrentSituation={simulation.isCurrentSituation}
                    isLegacy={simulation.isLegacy}
                    canEdit={!simulation.isCurrentSituation && !simulation.isLegacy}
                    canDelete={!simulation.isCurrentSituation && !simulation.isLegacy}
                  />
                </div>
                <SimulationMenu
                  simulation={simulation}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCreateVersion={handleCreateVersion}
                  onCreateNew={handleCreateNew}
                  isLoading={isLoading}
                />
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-muted-foreground' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Data de Início</p>
                    <p className='font-medium'>{formatDate(simulation.startDate)}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <TrendingUp className='w-4 h-4 text-muted-foreground' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Taxa Real</p>
                    <p className='font-medium'>{formatRate(simulation.realRate)}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center'>
                    <span className='text-xs text-white font-bold'>S</span>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Status</p>
                    <p className='font-medium'>
                      {simulation.isCurrentSituation
                        ? 'Situação Atual'
                        : simulation.isLegacy
                          ? 'Versão Legada'
                          : 'Ativa'}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-4 pt-4 border-t'>
                <div className='flex justify-between text-sm text-muted-foreground'>
                  <span>Criada em: {formatDate(simulation.createdAt)}</span>
                  <span>Atualizada em: {formatDate(simulation.updatedAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {simulations.length === 0 && (
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
                <Plus className='w-8 h-8 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Nenhuma simulação encontrada</h3>
              <p className='text-muted-foreground mb-4'>
                Crie sua primeira simulação para começar a planejar seu futuro financeiro.
              </p>
              <Button onClick={onAddNew}>
                <Plus className='w-4 h-4 mr-2' />
                Criar Primeira Simulação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
