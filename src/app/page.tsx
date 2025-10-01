'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UpdateIconButton } from '@/components/ui/update-icon-button';
import { useSimulationAllocations, useDeleteAllocation } from '@/hooks/api/useAllocations';
import { useSimulations } from '@/hooks/api/useSimulations';
import { Plus, MoreVertical, AlertTriangle, Edit, Trash2, Eye } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Interface para alocação
interface Allocation {
  id: number;
  name: string;
  value: number;
  type: 'FINANCIAL' | 'IMMOVABLE';
  startDate?: string;
  installments?: number;
  updatedAt: string;
  records?: any[];
}

// Componente reutilizável para cards de alocação
interface AllocationCardProps {
  id: string;
  title: string;
  value: string;
  totalValue?: string;
  date?: string;
  period?: string;
  progress?: string;
  progressValue?: number;
  progressTotal?: number;
  lastUpdate: string;
  hasWarning?: boolean;
  updateType?: string;
  badges: Array<{
    type: 'financial' | 'immobilized' | 'financed';
    label: string;
  }>;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

function AllocationCard({
  id,
  title,
  value,
  totalValue,
  date,
  period,
  progress,
  progressValue = 0,
  progressTotal = 100,
  lastUpdate,
  hasWarning = false,
  updateType,
  badges,
  onEdit,
  onView,
  onDelete,
  onUpdate,
}: AllocationCardProps) {
  const progressPercentage = progressTotal > 0 ? (progressValue / progressTotal) * 100 : 0;

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'financial':
        return 'secondary';
      case 'immobilized':
        return 'outline';
      case 'financed':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className='relative hover:shadow-lg transition-all duration-300 group'>
      {/* Actions menu */}
      <div className='absolute top-4 right-4 z-10'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => onView(id)}>
              <Eye className='mr-2 h-4 w-4' />
              Ver Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(id)}>
              <Edit className='mr-2 h-4 w-4' />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(id)} className='text-destructive'>
              <Trash2 className='mr-2 h-4 w-4' />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className='p-6'>
        {/* Header com título e valor */}
        <div className='flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4'>
          <div className='flex-1 min-w-0'>
            <h3 className="text-xl font-semibold text-foreground leading-tight mb-2 truncate">
              {title}
            </h3>
            <div className='space-y-1'>
              <div className="text-2xl font-bold text-foreground leading-tight">
                {value}
              </div>
              {totalValue && (
                <div className="text-sm text-foreground-muted">
                  {totalValue}
                </div>
              )}
            </div>
          </div>
          <div className='flex-shrink-0'>
            <Button variant="outline" size="sm" onClick={() => onUpdate(id)}>
              Atualizar
            </Button>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className='space-y-3'>
          {date && (
            <div className="text-sm text-foreground-muted">
              <span className='font-medium text-foreground-secondary'>Início:</span> {date}
            </div>
          )}

          {period && (
            <div className="text-sm text-foreground-muted">
              <span className='font-medium text-foreground-secondary'>Período:</span> {period}
            </div>
          )}

          {/* Progresso */}
          {progress && (
            <div className='space-y-2'>
              <div className="text-sm font-medium text-foreground-secondary">
                {progress}
              </div>
              <div className='w-full bg-muted rounded-full h-2 overflow-hidden'>
                <div
                  className='h-full bg-primary rounded-full transition-all duration-500 ease-out'
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className='flex items-center gap-2 flex-wrap'>
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={getBadgeVariant(badge.type)}
                className="text-xs px-2 py-1"
              >
                {badge.label}
              </Badge>
            ))}
          </div>

          {/* Última atualização */}
          <div className='flex items-center gap-2 pt-3 border-t border-border'>
            {hasWarning && <AlertTriangle className='h-4 w-4 text-warning flex-shrink-0' />}
            <span
              className={`text-xs ${hasWarning ? 'text-warning' : 'text-foreground-muted'
                }`}
            >
              {hasWarning ? 'Atenção: ' : ''}Última atualização: {lastUpdate}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [selectedSimulation] = useState<string>('');

  // Redirecionar automaticamente para /alocacoes
  useEffect(() => {
    router.replace('/alocacoes');
  }, [router]);

  useSimulations();
  const { data: allocations = [], isLoading: isLoadingAllocations } = useSimulationAllocations(
    Number(selectedSimulation)
  );

  const deleteAllocation = useDeleteAllocation();

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

  // Função para formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Função para obter badges da alocação
  const getAllocationBadges = (allocation: Allocation) => {
    const badges = [];

    if (allocation.type === 'FINANCIAL') {
      badges.push({ type: 'financial' as const, label: 'Financeira' });
    } else if (allocation.type === 'IMMOVABLE') {
      badges.push({ type: 'immobilized' as const, label: 'Imobilizada' });
      if (allocation.installments && allocation.installments > 0) {
        badges.push({ type: 'financed' as const, label: '$ Financiado' });
      }
    }

    return badges;
  };

  // Função para calcular progresso do financiamento
  const getFinancingProgress = (allocation: Allocation) => {
    if (allocation.type === 'IMMOVABLE' && allocation.installments && allocation.installments > 0) {
      const startDate = new Date(allocation.startDate || '');
      const currentDate = new Date();
      const monthsDiff =
        (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        (currentDate.getMonth() - startDate.getMonth());

      const progressValue = Math.max(0, Math.min(monthsDiff, allocation.installments));
      const progressTotal = allocation.installments;

      return {
        progress: `Progresso: ${progressValue}/${progressTotal} parcelas`,
        progressValue,
        progressTotal,
      };
    }
    return null;
  };

  // Transformar dados reais em formato do componente
  const transformedAllocations = allocations.map((allocation: any) => {
    const badges = getAllocationBadges(allocation);
    const financingProgress = getFinancingProgress(allocation);

    return {
      id: allocation.id.toString(),
      title: allocation.name,
      value: formatCurrency(allocation.value),
      totalValue:
        allocation.type === 'IMMOVABLE' && allocation.installments
          ? `de ${formatCurrency(allocation.value)}`
          : undefined,
      date: allocation.startDate ? formatDate(allocation.startDate) : undefined,
      period:
        allocation.type === 'IMMOVABLE' && allocation.installments
          ? `${formatDate(allocation.startDate || '')} - ${formatDate(
            new Date(
              new Date(allocation.startDate || '').getTime() +
              allocation.installments * 30 * 24 * 60 * 60 * 1000
            ).toISOString()
          )}`
          : undefined,
      progress: financingProgress?.progress,
      progressValue: financingProgress?.progressValue,
      progressTotal: financingProgress?.progressTotal,
      lastUpdate: formatDate(allocation.updatedAt),
      hasWarning: false, // Pode ser implementado baseado em regras de negócio
      updateType:
        allocation.records && allocation.records.length === 1 ? 'Atualização única' : undefined,
      badges,
    };
  });

  return (
    <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header da página */}
        <div className='mb-8'>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
            Dashboard Financeiro
          </h1>
          <p className="text-lg text-foreground-muted leading-relaxed">
            Gerencie suas alocações e acompanhe o progresso dos seus investimentos
          </p>
        </div>

        {/* Container principal */}
        <Card className='shadow-lg'>
          <CardHeader className='pb-6'>
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6'>
              <div className='flex-1'>
                <CardTitle className="text-2xl font-bold leading-tight mb-3">
                  Alocações Financeiras
                </CardTitle>
                <p className="text-base text-foreground-muted leading-relaxed">
                  Acompanhe o histórico e progresso das suas alocações
                </p>
              </div>

              <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto'>
                <div className='flex items-center gap-3'>
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    Filtrar:
                  </span>
                  <Select defaultValue='todas'>
                    <SelectTrigger className='w-36 bg-background-secondary border-border'>
                      <SelectValue placeholder='Todas' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='todas'>Todas</SelectItem>
                      <SelectItem value='financeiras'>Financeiras</SelectItem>
                      <SelectItem value='imobilizadas'>Imobilizadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className='w-full sm:w-auto' size="lg">
                  <Plus className='w-4 h-4' />
                  Adicionar Alocação
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-6 pt-6'>
            {isLoadingAllocations ? (
              <div className='flex items-center justify-center py-16'>
                <div className='flex flex-col items-center gap-4'>
                  <div className='w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin'></div>
                  <div className='text-foreground-muted font-medium'>Carregando alocações...</div>
                </div>
              </div>
            ) : transformedAllocations.length === 0 ? (
              <div className='flex items-center justify-center py-16'>
                <div className='flex flex-col items-center gap-4 text-center'>
                  <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center'>
                    <Plus className='w-8 h-8 text-foreground-muted' />
                  </div>
                  <div className='text-foreground font-medium'>Nenhuma alocação encontrada</div>
                  <p className='text-foreground-muted text-sm'>Comece adicionando sua primeira alocação</p>
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {transformedAllocations.map((allocation: any) => (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
