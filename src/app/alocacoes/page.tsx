'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AllocationTypeModal } from '@/components/modals/allocation-type-modal';
import { AllocationFinancialModal } from '@/components/modals/allocation-financial-modal';
import { AllocationImmobilizedModal } from '@/components/modals/allocation-immobilized-modal';
import { useSimulationAllocations, useDeleteAllocation } from '@/hooks/api/useAllocations';
import { useSimulations } from '@/hooks/api/useSimulations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Componente reutilizável para cards de alocação
interface AllocationCardProps {
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
}

function AllocationCard({
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
}: AllocationCardProps) {
  const progressPercentage = progressTotal > 0 ? (progressValue / progressTotal) * 100 : 0;


  return (
    <div className='relative w-[1095px] h-20 bg-[#1D1F1E] rounded-[15px] border border-[#F2F2F2] flex items-center justify-between px-6'>
      {/* Lado esquerdo - Timeline dot */}
      <div className='w-6 h-6 relative flex-shrink-0'>
        <div className='w-6 h-6 left-0 top-0 absolute bg-zinc-300 rounded-full'></div>
        <div className='w-1 h-4 left-[10px] top-[4px] absolute bg-sky-900 rounded-sm'></div>
      </div>

      {/* Conteúdo principal */}
      <div className='flex-1 flex items-center justify-between ml-4'>
        {/* Lado esquerdo - Informações */}
        <div className='flex flex-col gap-2'>
          {/* Título */}
          <div className="text-white text-base font-semibold font-['Inter'] leading-loose">
            {title}
          </div>

          {/* Data de início */}
          {date && (
            <div className="text-white text-sm font-normal font-['ABeeZee'] leading-loose">
              Início: {date}
            </div>
          )}

          {/* Período */}
          {period && (
            <div className="text-white text-sm font-normal font-['ABeeZee'] leading-loose">
              {period}
            </div>
          )}

          {/* Progresso */}
          {progress && (
            <div className="text-neutral-400 text-sm font-normal font-['ABeeZee'] leading-loose">
              {progress}
            </div>
          )}

          {/* Badges */}
          <div className='flex items-center gap-2 flex-wrap'>
            {badges.map((badge, index) => (
              <div key={index} className="w-28 h-6 bg-[#434343] rounded-[35px] flex items-center justify-center">
                <span className="justify-start text-sm font-normal font-['ABeeZee'] leading-loose text-[#9F9F9F]">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          {/* Barra de progresso */}
          {progress && (
            <div className='w-[455px] h-2 bg-zinc-300 rounded-[5px]'>
              <div
                className='h-2 bg-orange-400 rounded-[5px]'
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          )}

          {/* Última atualização */}
          <div className='flex items-center gap-2'>
            {hasWarning && (
              <div className='w-4 h-4 relative'>
                <div className='w-4 h-4 left-0 top-0 absolute bg-zinc-300'></div>
                <div className='w-3.5 h-3 left-[0.67px] top-[1.33px] absolute bg-orange-500'></div>
              </div>
            )}
            <span
              className={`text-sm font-normal font-['ABeeZee'] leading-loose ${hasWarning ? 'text-orange-500' : 'text-neutral-400'}`}
            >
              {hasWarning ? 'A ' : ''}Última atualização: {lastUpdate}
            </span>
          </div>

          {/* Tipo de atualização */}
          {updateType && (
            <div className="text-neutral-400 text-sm font-normal font-['ABeeZee'] leading-loose">
              {updateType}
            </div>
          )}
        </div>

        {/* Lado direito - Valor e botões */}
        <div className='flex flex-col items-end gap-2'>
          {/* Valor total */}
          {totalValue && (
            <div className="text-neutral-400 text-base font-normal font-['ABeeZee'] leading-loose">
              {totalValue}
            </div>
          )}

          {/* Valor principal */}
          <div className="text-white text-xl font-normal font-['ABeeZee'] leading-loose">
            {value}
          </div>

          {/* Botão Atualizar */}
          <div className='w-36 h-9 px-6 py-3 bg-stone-50 rounded-[40px] outline outline-1 outline-offset-[-1px] outline-orange-400 inline-flex justify-center items-center gap-2.5'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M17.9626 4.88142C17.9633 4.76956 17.9416 4.65867 17.8987 4.55512C17.8559 4.45157 17.7928 4.35738 17.7131 4.27796L14.0643 0.67423C13.9839 0.595457 13.8885 0.533135 13.7837 0.490838C13.6788 0.448542 13.5666 0.427102 13.4533 0.427749C13.34 0.427102 13.2278 0.448542 13.1229 0.490838C13.0181 0.533135 12.9227 0.595457 12.8423 0.67423L10.4069 3.07955L1.00104 12.3694C0.921283 12.4488 0.858183 12.543 0.815357 12.6465C0.772532 12.7501 0.750824 12.861 0.751479 12.9728V16.5765C0.751479 16.802 0.842145 17.0181 1.00353 17.1775C1.16492 17.3369 1.3838 17.4265 1.61204 17.4265H5.2608C5.38121 17.4329 5.50166 17.4143 5.61433 17.3719C5.727 17.3294 5.82938 17.264 5.91482 17.18L15.2691 7.89019L17.7131 5.52737C17.7916 5.44499 17.8556 5.35018 17.9024 5.24689C17.9107 5.17914 17.9107 5.11065 17.9024 5.0429C17.9064 5.00334 17.9064 4.96348 17.9024 4.92391L17.9626 4.88142ZM4.90797 15.7266H2.47259V13.3213L11.0179 4.88142L13.4533 7.28674L4.90797 15.7266ZM14.6667 6.08833L12.2313 3.68301L13.4533 2.4846L15.8801 4.88142L14.6667 6.08833Z'
                fill='#FD6C00'
              />
            </svg>
            <div className="justify-start text-orange-500 text-sm font-normal font-['ABeeZee'] leading-loose">
              Atualizar
            </div>
          </div>

          {/* Menu de opções */}
          <div className='w-6 h-6 relative'>
            <div className='w-6 h-6 left-0 top-0 absolute bg-zinc-300 rounded-full'></div>
            <div className='w-1 h-4 left-[10px] top-[4px] absolute bg-sky-900 rounded-sm'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AlocacoesPage() {
  const { data: simulations = [] } = useSimulations();
  const [selectedSimulation, setSelectedSimulation] = useState<string>('');

  // Definir a primeira simulação quando os dados chegarem
  useEffect(() => {
    if (simulations.length > 0 && !selectedSimulation) {
      setSelectedSimulation(simulations[0].id.toString());
    }
  }, [simulations, selectedSimulation]);

  const { data: allocations = [], isLoading: isLoadingAllocations } = useSimulationAllocations(
    Number(selectedSimulation) || (simulations.length > 0 ? simulations[0].id : 0)
  );

  const deleteAllocation = useDeleteAllocation();

  // Estados para modais
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  const [isImmobilizedModalOpen, setIsImmobilizedModalOpen] = useState(false);

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

  // Handlers para modais
  const handleAddAllocation = () => {
    setIsTypeModalOpen(true);
  };

  const handleSelectAllocationType = (type: 'FINANCEIRA' | 'IMOBILIZADA') => {
    if (type === 'FINANCEIRA') {
      setIsFinancialModalOpen(true);
    } else {
      setIsImmobilizedModalOpen(true);
    }
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
  const getAllocationBadges = (allocation: any) => {
    const badges = [];

    if (allocation.type === 'FINANCEIRA') {
      badges.push({ type: 'financial' as const, label: 'Financeira' });
    } else if (allocation.type === 'IMOBILIZADA') {
      badges.push({ type: 'immobilized' as const, label: 'Imobilizada' });
      if (allocation.installments && allocation.installments > 0) {
        badges.push({ type: 'financed' as const, label: '$ Financiado' });
      }
    }

    return badges;
  };

  // Função para calcular progresso do financiamento
  const getFinancingProgress = (allocation: any) => {
    if (allocation.type === 'IMOBILIZADA' && allocation.installments && allocation.installments > 0) {
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
  const transformedAllocations = allocations.map(allocation => {
    const badges = getAllocationBadges(allocation);
    const financingProgress = getFinancingProgress(allocation);

    return {
      id: allocation.id.toString(),
      title: allocation.name,
      value: formatCurrency(allocation.value),
      totalValue:
        allocation.type === 'IMOBILIZADA' && allocation.installments
          ? `de ${formatCurrency(allocation.value)}`
          : undefined,
      date: allocation.startDate ? formatDate(allocation.startDate) : undefined,
      period:
        allocation.type === 'IMOBILIZADA' && allocation.installments
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
            Alocações
          </h1>
          <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
            Gerencie suas alocações financeiras e imobilizadas
          </p>
        </div>

        {/* Navegação superior */}
        <div className='flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-8 mb-6 sm:mb-8'>
          <div className="text-[#9F9F9F] text-base sm:text-lg font-medium font-['ABeeZee'] leading-loose underline">
            Alocações
          </div>
          <div className="text-[#B1B1B1] text-base sm:text-lg font-normal font-['ABeeZee'] leading-loose hover:text-[#9F9F9F] transition-colors cursor-pointer">
            Projeção
          </div>
          <div className="text-[#B1B1B1] text-base sm:text-lg font-normal font-['ABeeZee'] leading-loose hover:text-[#9F9F9F] transition-colors cursor-pointer">
            Histórico
          </div>
        </div>

        {/* Container principal */}
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
                    Simulação:
                  </span>
                  <Select value={selectedSimulation} onValueChange={setSelectedSimulation}>
                    <SelectTrigger className='w-48 sm:w-56 bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors'>
                      <SelectValue placeholder="Selecione uma simulação" />
                    </SelectTrigger>
                    <SelectContent className='bg-[#434343] border-[#454545]'>
                      {simulations.map((simulation) => (
                        <SelectItem key={simulation.id} value={simulation.id.toString()} className='text-[#9F9F9F] hover:bg-[#454545]'>
                          {simulation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                <Button
                  onClick={handleAddAllocation}
                  className='w-full sm:w-auto h-10 px-4 sm:px-6 py-3 bg-[#434343] hover:bg-[#454545] text-[#B1B1B1] rounded-[40px] inline-flex justify-center items-center gap-2.5 transition-all duration-200 shadow-lg hover:shadow-xl'
                >
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16.8193 7.9375H10.4443V1.5625C10.4443 1.28071 10.3324 1.01046 10.1331 0.811199C9.93388 0.611942 9.66363 0.5 9.38184 0.5C9.10004 0.5 8.82979 0.611942 8.63054 0.811199C8.43128 1.01046 8.31934 1.28071 8.31934 1.5625V7.9375H1.94434C1.66254 7.9375 1.39229 8.04944 1.19304 8.2487C0.993778 8.44796 0.881836 8.71821 0.881836 9C0.881836 9.28179 0.993778 9.55204 1.19304 9.7513C1.39229 9.95056 1.66254 10.0625 1.94434 10.0625H8.31934V16.4375C8.31934 16.7193 8.43128 16.9895 8.63054 17.1888C8.82979 17.3881 9.10004 17.5 9.38184 17.5C9.66363 17.5 9.93388 17.3881 10.1331 17.1888C10.3324 16.9895 10.4443 16.7193 10.4443 16.4375V10.0625H16.8193C17.1011 10.0625 17.3714 9.95056 17.5706 9.7513C17.7699 9.55204 17.8818 9.28179 17.8818 9C17.8818 8.71821 17.7699 8.44796 17.5706 8.2487C17.3714 8.04944 17.1011 7.9375 16.8193 7.9375Z'
                      fill='#B1B1B1'
                    />
                  </svg>
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
                    <svg
                      width='32'
                      height='32'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M16.8193 7.9375H10.4443V1.5625C10.4443 1.28071 10.3324 1.01046 10.1331 0.811199C9.93388 0.611942 9.66363 0.5 9.38184 0.5C9.10004 0.5 8.82979 0.611942 8.63054 0.811199C8.43128 1.01046 8.31934 1.28071 8.31934 1.5625V7.9375H1.94434C1.66254 7.9375 1.39229 8.04944 1.19304 8.2487C0.993778 8.44796 0.881836 8.71821 0.881836 9C0.881836 9.28179 0.993778 9.55204 1.19304 9.7513C1.39229 9.95056 1.66254 10.0625 1.94434 10.0625H8.31934V16.4375C8.31934 16.7193 8.43128 16.9895 8.63054 17.1888C8.82979 17.3881 9.10004 17.5 9.38184 17.5C9.66363 17.5 9.93388 17.3881 10.1331 17.1888C10.3324 16.9895 10.4443 16.7193 10.4443 16.4375V10.0625H16.8193C17.1011 10.0625 17.3714 9.95056 17.5706 9.7513C17.7699 9.55204 17.8818 9.28179 17.8818 9C17.8818 8.71821 17.7699 8.44796 17.5706 8.2487C17.3714 8.04944 17.1011 7.9375 16.8193 7.9375Z'
                        fill='#9F9F9F'
                      />
                    </svg>
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



      {/* Modais */}
      <AllocationTypeModal
        isOpen={isTypeModalOpen}
        onClose={() => setIsTypeModalOpen(false)}
        onSelectType={handleSelectAllocationType}
      />

      {selectedSimulation && (
        <>
          <AllocationFinancialModal
            simulationId={Number(selectedSimulation)}
            isOpen={isFinancialModalOpen}
            onClose={() => setIsFinancialModalOpen(false)}
          />

          <AllocationImmobilizedModal
            simulationId={Number(selectedSimulation)}
            isOpen={isImmobilizedModalOpen}
            onClose={() => setIsImmobilizedModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}
