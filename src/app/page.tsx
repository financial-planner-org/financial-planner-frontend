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

  const getBadgeClassName = (type: string) => {
    switch (type) {
      case 'financial':
        return 'bg-[#434343] text-[#9F9F9F] hover:bg-[#454545] border-[#9F9F9F]';
      case 'immobilized':
        return 'bg-[#434343] text-[#B1B1B1] hover:bg-[#454545] border-[#B1B1B1]';
      case 'financed':
        return 'bg-[#101010] text-[#9F9F9F] border-[#434343] hover:bg-[#434343]';
      default:
        return 'bg-[#434343] text-[#9F9F9F] hover:bg-[#454545]';
    }
  };

  return (
    <Card className='relative min-h-[200px] sm:min-h-[220px] md:min-h-[240px] bg-[#101010] border-[#434343] shadow-lg hover:shadow-xl transition-all duration-300 group'>
      {/* Timeline dot */}
      <div className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#434343] rounded-full absolute -left-1 sm:-left-2 md:-left-3 top-4 sm:top-5 md:top-6 flex items-center justify-center group-hover:bg-[#9F9F9F] transition-colors'>
        <div className='w-1 h-2 sm:h-3 md:h-4 bg-[#9F9F9F] rounded-sm'></div>
      </div>

      {/* Actions menu */}
      <div className='flex items-center gap-1 sm:gap-2 absolute top-2 sm:top-3 right-2 sm:right-3'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='h-7 w-7 sm:h-8 sm:w-8 hover:bg-[#434343] transition-colors'>
              <MoreVertical className='h-3 w-3 sm:h-4 sm:w-4 text-[#9F9F9F] hover:text-[#B1B1B1]' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-[#434343] border-[#454545]'>
            <DropdownMenuItem onClick={() => onView(id)} className='text-[#9F9F9F] hover:bg-[#454545]'>
              <Eye className='mr-2 h-3 w-3 sm:h-4 sm:w-4' />
              Ver Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(id)} className='text-[#9F9F9F] hover:bg-[#454545]'>
              <Edit className='mr-2 h-3 w-3 sm:h-4 sm:w-4' />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(id)} className='text-red-400 hover:bg-red-900/20'>
              <Trash2 className='mr-2 h-3 w-3 sm:h-4 sm:w-4' />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className='space-y-3 sm:space-y-4 md:space-y-5 h-full flex flex-col p-4 sm:p-5 md:p-6'>
        {/* Header com título e valor */}
        <div className='flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4'>
          <div className='flex-1 min-w-0'>
            <CardTitle className="text-[#9F9F9F] text-base sm:text-lg md:text-xl font-semibold font-['Inter'] leading-tight mb-1 sm:mb-2 truncate">
              {title}
            </CardTitle>
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
              <div className='text-right sm:text-left'>
                <div className="text-[#B1B1B1] text-lg sm:text-xl md:text-2xl font-bold font-['ABeeZee'] leading-tight">
                  {value}
                </div>
                {totalValue && (
                  <div className="text-[#9F9F9F] text-sm sm:text-base font-normal font-['ABeeZee'] leading-tight">
                    {totalValue}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex-shrink-0'>
            <UpdateIconButton onClick={() => onUpdate(id)} className='w-full sm:w-auto text-xs sm:text-sm'>
              Atualizar
            </UpdateIconButton>
          </div>
        </div>

        {/* Data de início */}
        {date && (
          <div className="text-[#9F9F9F] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
            <span className='text-[#B1B1B1] font-medium'>Início:</span> {date}
          </div>
        )}

        {/* Período */}
        {period && (
          <div className="text-[#9F9F9F] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
            <span className='text-[#B1B1B1] font-medium'>Período:</span> {period}
          </div>
        )}

        {/* Progresso */}
        {progress && (
          <div className='space-y-2 sm:space-y-3'>
            <div className="text-[#9F9F9F] text-sm sm:text-base font-medium font-['ABeeZee'] leading-relaxed">
              {progress}
            </div>
            <div className='w-full bg-[#434343] rounded-full h-2 sm:h-3 overflow-hidden'>
              <div
                className='h-full bg-gradient-to-r from-[#434343] to-[#9F9F9F] rounded-full transition-all duration-500 ease-out'
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
              className={`${getBadgeClassName(badge.type)} text-xs sm:text-sm px-2 py-1 rounded-full`}
            >
              {badge.label}
            </Badge>
          ))}
        </div>

        {/* Última atualização */}
        <div className='flex items-center gap-2 mt-auto pt-2 border-t border-[#434343]'>
          {hasWarning && <AlertTriangle className='h-3 w-3 sm:h-4 sm:w-4 text-orange-400 flex-shrink-0' />}
          <span
            className={`text-xs sm:text-sm font-normal font-['ABeeZee'] leading-relaxed ${hasWarning ? 'text-orange-400' : 'text-[#9F9F9F]'
              }`}
          >
            {hasWarning ? 'Atenção: ' : ''}Última atualização: {lastUpdate}
          </span>
        </div>

        {/* Tipo de atualização */}
        {updateType && (
          <div className='flex items-center gap-2'>
            <span className="text-[#9F9F9F] text-xs sm:text-sm font-normal font-['ABeeZee'] leading-relaxed">
              {updateType}
            </span>
          </div>
        )}
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
    <div className='min-h-screen bg-[#101010] p-3 sm:p-4 md:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header da página */}
        <div className='mb-6 sm:mb-8'>
          <h1 className="text-[#9F9F9F] text-xl sm:text-2xl md:text-3xl font-semibold font-['Inter'] leading-tight mb-2">
            Dashboard Financeiro
          </h1>
          <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
            Gerencie suas alocações e acompanhe o progresso dos seus investimentos
          </p>
        </div>

        {/* Container principal com fundo escuro */}
        <Card className='bg-[#101010] border-[#434343] shadow-xl'>
          <CardHeader className='pb-4 sm:pb-6'>
            <div className='flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 sm:gap-6'>
              <div className='flex-1'>
                <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl md:text-2xl font-semibold font-['Inter'] leading-tight mb-2">
                  Timeline de alocações manuais
                </CardTitle>
                <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
                  Acompanhe o histórico e progresso das suas alocações
                </p>
              </div>

              <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full xl:w-auto'>
                <div className='flex items-center gap-2 sm:gap-3'>
                  <span className="text-[#9F9F9F] text-sm sm:text-base font-medium font-['ABeeZee'] leading-loose whitespace-nowrap">
                    Filtrar:
                  </span>
                  <Select defaultValue='todas'>
                    <SelectTrigger className='w-32 sm:w-36 bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors'>
                      <SelectValue placeholder='Todas' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#434343] border-[#454545]'>
                      <SelectItem value='todas' className='text-[#9F9F9F] hover:bg-[#454545]'>Todas</SelectItem>
                      <SelectItem value='financeiras' className='text-[#9F9F9F] hover:bg-[#454545]'>Financeiras</SelectItem>
                      <SelectItem value='imobilizadas' className='text-[#9F9F9F] hover:bg-[#454545]'>Imobilizadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className='w-full sm:w-auto h-10 px-4 sm:px-6 py-3 bg-[#434343] hover:bg-[#454545] text-[#B1B1B1] rounded-[40px] inline-flex justify-center items-center gap-2.5 transition-all duration-200 shadow-lg hover:shadow-xl'>
                  <Plus className='w-4 h-4' />
                  <span className="text-sm sm:text-base font-medium font-['ABeeZee'] leading-loose">
                    Adicionar Alocação
                  </span>
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Linha da timeline */}
          <div className='absolute left-2 sm:left-4 md:left-6 lg:left-8 top-0 w-0.5 h-full bg-[#434343]'></div>

          {/* Labels da timeline */}
          <div className="text-[#9F9F9F] text-xs sm:text-sm font-medium font-['ABeeZee'] leading-none mb-2 pl-4 sm:pl-6 md:pl-8">
            Dados antigos
          </div>

          <div className="text-[#9F9F9F] text-xs sm:text-sm font-medium font-['ABeeZee'] leading-tight mt-2 pl-4 sm:pl-6 md:pl-8">
            Atualizado
          </div>

          <CardContent className='space-y-3 sm:space-y-4 md:space-y-6 pl-2 sm:pl-4 md:pl-6 lg:pl-8 pt-4'>
            {isLoadingAllocations ? (
              <div className='flex items-center justify-center py-12 sm:py-16'>
                <div className='flex flex-col items-center gap-3'>
                  <div className='w-8 h-8 border-2 border-[#434343] border-t-[#9F9F9F] rounded-full animate-spin'></div>
                  <div className='text-[#9F9F9F] text-sm sm:text-base font-medium'>Carregando alocações...</div>
                </div>
              </div>
            ) : transformedAllocations.length === 0 ? (
              <div className='flex items-center justify-center py-12 sm:py-16'>
                <div className='flex flex-col items-center gap-3 text-center'>
                  <div className='w-16 h-16 bg-[#434343] rounded-full flex items-center justify-center'>
                    <Plus className='w-8 h-8 text-[#9F9F9F]' />
                  </div>
                  <div className='text-[#9F9F9F] text-sm sm:text-base font-medium'>Nenhuma alocação encontrada</div>
                  <p className='text-[#B1B1B1] text-xs sm:text-sm'>Comece adicionando sua primeira alocação</p>
                </div>
              </div>
            ) : (
              <div className='grid gap-3 sm:gap-4 md:gap-6'>
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
