'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSimulationHistory, useCreateSimulationVersion, SimulationHistoryItem } from '@/hooks/api/use-simulation-history';
import { useClients } from '@/hooks/api/use-clients';
import { HISTORY_CONFIG } from '@/lib/constants/pages';
import { Plus, AlertTriangle, Eye, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function HistoricoPage() {
  const { data: clients = [] } = useClients();
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [includeVersions, setIncludeVersions] = useState<boolean>(true);
  
  const { data: simulations = [], isLoading, error } = useSimulationHistory(
    selectedClient ? Number(selectedClient) : undefined,
    includeVersions
  );
  
  const createVersion = useCreateSimulationVersion();

  // Selecionar o primeiro cliente disponível quando os dados carregarem
  React.useEffect(() => {
    if (clients.length > 0 && !selectedClient) {
      setSelectedClient(clients[0].id.toString());
    }
  }, [clients, selectedClient]);

  const handleCreateVersion = async (simulationId: number, newName: string) => {
    try {
      await createVersion.mutateAsync({ simulationId, newName });
      toast.success('Nova versão criada com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar nova versão');
    }
  };

  const handleViewSimulation = (simulationId: number) => {
    // Navegar para a página de projeção com a simulação selecionada
    window.location.href = `/projecao?simulation=${simulationId}`;
  };

  // Função para obter cor do ícone baseada no nome da simulação
  const getIconColor = (name: string, isLegacy: boolean) => {
    if (isLegacy) {
      return {
        iconColor: 'from-gray-200 to-neutral-400',
        iconBlur: 'bg-stone-300/50'
      };
    }
    
    if (name.includes('Plano Original')) {
      return {
        iconColor: 'from-blue-500 to-indigo-800',
        iconBlur: 'bg-indigo-500/50'
      };
    } else if (name.includes('Aposentadoria')) {
      return {
        iconColor: 'from-lime-300 to-yellow-700',
        iconBlur: 'bg-lime-400/50'
      };
    } else {
      return {
        iconColor: 'from-purple-500 to-pink-800',
        iconBlur: 'bg-purple-500/50'
      };
    }
  };

  // Função para calcular patrimônio final (mock - seria calculado pela projeção)
  const calculateFinalPatrimony = (simulation: SimulationHistoryItem) => {
    // Mock calculation - em uma implementação real, seria calculado pela projeção
    const baseAmount = 1000000;
    const years = 35;
    const rate = simulation.realRate / 100;
    const finalAmount = baseAmount * Math.pow(1 + rate, years);
    return `R$ ${finalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  // Função para calcular idade de aposentadoria (mock)
  const calculateRetirementAge = (simulation: SimulationHistoryItem) => {
    const startDate = new Date(simulation.startDate);
    const currentYear = startDate.getFullYear();
    return (currentYear + 35).toString(); // Mock: 35 anos após início
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Carregando histórico...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-stone-950 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500 text-lg">Erro ao carregar histórico: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <PageContainer
      title={HISTORY_CONFIG.title}
      description={HISTORY_CONFIG.description}
      className="relative bg-stone-950 rounded-3xl overflow-hidden min-h-screen"
    >
      {/* Container principal com dimensões fixas do Figma */}
      <div className={HISTORY_CONFIG.mainContainer}>

        {/* Header do usuário */}
        <div className={HISTORY_CONFIG.userHeader.container}>
          <div className={HISTORY_CONFIG.userHeader.name}>
            {clients.find(c => c.id.toString() === selectedClient)?.name || 'Selecione um cliente'}
          </div>
          <div className={HISTORY_CONFIG.userHeader.dropdown}></div>
        </div>

        {/* Controles de filtro */}
        <div className="absolute left-[32px] top-[120px] flex gap-4 items-center">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id.toString()}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={includeVersions}
              onChange={(e) => setIncludeVersions(e.target.checked)}
              className="rounded"
            />
            Incluir versões legadas
          </label>
        </div>

        {/* Título da página */}
        <div className={HISTORY_CONFIG.pageTitle.container}>
          <div className={HISTORY_CONFIG.pageTitle.text}>
            {HISTORY_CONFIG.title}
          </div>
        </div>

        {/* Tabela de simulações */}
        <div className={HISTORY_CONFIG.table.container}>
          {/* Header da tabela */}
          <div className={HISTORY_CONFIG.table.header.container}>
            <div className={`${HISTORY_CONFIG.table.header.cell} left-[32px]`}>Data</div>
            <div className={`${HISTORY_CONFIG.table.header.patrimony} left-[182px]`}>Patrimônio final</div>
            <div className={`${HISTORY_CONFIG.table.header.retirement} left-[412px]`}>Data de Aposentadoria</div>
            <div className={`${HISTORY_CONFIG.table.header.version} left-[695px]`}>Versão</div>
          </div>

          {/* Cards de simulações */}
          <div className="space-y-4 mt-4">
            {simulations.map((simulation, index) => {
              const iconColors = getIconColor(simulation.name, simulation.isLegacy);
              const isLarge = index === 0 && !simulation.isLegacy; // Primeira simulação não-legada é grande
              
              return (
                <div
                  key={simulation.id}
                  className={isLarge ? HISTORY_CONFIG.simulationCards.card.container : HISTORY_CONFIG.simulationCards.card.smallCard}
                >
                  {/* Ícone com efeitos */}
                  <div className={HISTORY_CONFIG.simulationCards.card.icon.container}>
                    <div className={`${HISTORY_CONFIG.simulationCards.card.icon.blur} ${iconColors.iconBlur}`}></div>
                    <div className={`${HISTORY_CONFIG.simulationCards.card.icon.gradient} bg-gradient-to-bl ${iconColors.iconColor}`}></div>
                    {!isLarge && (
                      <div className={`${HISTORY_CONFIG.simulationCards.card.icon.small} bg-gradient-to-bl ${iconColors.iconColor}`}></div>
                    )}
                    <div className={HISTORY_CONFIG.simulationCards.card.icon.highlight}></div>
                    <div className={HISTORY_CONFIG.simulationCards.card.icon.highlightClean}></div>
                  </div>

                  {/* Título da simulação */}
                  <div className={HISTORY_CONFIG.simulationCards.card.title}>
                    {simulation.name}
                    {simulation.isLegacy && (
                      <Badge variant="secondary" className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Versão Legada
                      </Badge>
                    )}
                  </div>

                  {/* Dados da tabela */}
                  <div className="absolute left-[32px] top-[68px] flex items-center space-x-32">
                    <div className={HISTORY_CONFIG.table.row.data}>
                      {new Date(simulation.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <div className={HISTORY_CONFIG.table.row.patrimony}>
                      {calculateFinalPatrimony(simulation)}
                    </div>
                    <div className={HISTORY_CONFIG.table.row.retirement}>
                      {calculateRetirementAge(simulation)}
                    </div>
                    <div className={HISTORY_CONFIG.table.row.version}>
                      v{simulation.versions.length}
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="absolute right-[32px] top-[68px] flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewSimulation(simulation.id)}
                      className="text-white hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver no gráfico
                    </Button>
                    
                    {!simulation.isLegacy && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newName = prompt('Nome da nova versão:');
                          if (newName) {
                            handleCreateVersion(simulation.id, newName);
                          }
                        }}
                        className="text-white hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Nova versão
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Paginação */}
        <div className={HISTORY_CONFIG.pagination.container}>
          <div className={HISTORY_CONFIG.pagination.button.container}>
            <div className={HISTORY_CONFIG.pagination.button.prev}></div>
          </div>
          <div className={HISTORY_CONFIG.pagination.text}>Página 1 de 10</div>
          <div className={HISTORY_CONFIG.pagination.button.container}>
            <div className={HISTORY_CONFIG.pagination.button.next}></div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={HISTORY_CONFIG.sidebar.container}>
          {/* Logo */}
          <div className={HISTORY_CONFIG.sidebar.logo.container}>
            <img
              src="https://placehold.co/96x42"
              alt="Logo"
              className={HISTORY_CONFIG.sidebar.logo.image}
            />
          </div>

          {/* Menu */}
          <div className={HISTORY_CONFIG.sidebar.menu.container}>
            {/* Dashboard */}
            <div className={HISTORY_CONFIG.sidebar.menu.item.container}>
              <div className={HISTORY_CONFIG.sidebar.menu.item.smallIcon}></div>
              <div className="w-2 h-2.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500"></div>
              <div className="w-2 h-1 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500"></div>
              <div className="w-2 h-2.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500"></div>
              <div className="w-2 h-1 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500"></div>
              <div className={HISTORY_CONFIG.sidebar.menu.item.textInactive}>Dashboard</div>
            </div>

            {/* Clientes */}
            <div className={HISTORY_CONFIG.sidebar.menu.item.container}>
              <div className={HISTORY_CONFIG.sidebar.menu.item.icon}></div>
              <div className="w-4 h-4 bg-neutral-400"></div>
              <div className={HISTORY_CONFIG.sidebar.menu.item.text}>Clientes</div>
            </div>

            {/* Projeção */}
            <div className={HISTORY_CONFIG.sidebar.menu.item.container}>
              <div className="w-5 h-5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500"></div>
              <div className={HISTORY_CONFIG.sidebar.menu.item.textInactive}>Projeção</div>
            </div>

            {/* Histórico (ativo) */}
            <div className={HISTORY_CONFIG.sidebar.menu.item.active}>
              <div className="w-5 h-4 bg-zinc-300"></div>
              <div className="w-4 h-4 bg-neutral-400"></div>
              <div className={HISTORY_CONFIG.sidebar.menu.item.textActive}>Histórico</div>
            </div>

            {/* Prospects */}
            <div className={HISTORY_CONFIG.sidebar.menu.item.container}>
              <div className={HISTORY_CONFIG.sidebar.menu.item.icon}></div>
              <div className="w-5 h-4 bg-neutral-500"></div>
              <div className={HISTORY_CONFIG.sidebar.menu.item.textInactive}>Prospects</div>
              <div className={HISTORY_CONFIG.sidebar.menu.item.dropdown}></div>
            </div>
          </div>
        </div>

        {/* Linhas decorativas */}
        <div className={HISTORY_CONFIG.decorativeLines.vertical}></div>
        <div className={HISTORY_CONFIG.decorativeLines.horizontal}></div>

        {/* Dots decorativos */}
        <div className={HISTORY_CONFIG.decorativeDots.container}>
          <div className={HISTORY_CONFIG.decorativeDots.dot}></div>
          <div className={HISTORY_CONFIG.decorativeDots.dot}></div>
          <div className={HISTORY_CONFIG.decorativeDots.dot}></div>
        </div>

        {/* Barra decorativa */}
        <div className="w-72 h-16 left-[-310px] top-[993px] absolute bg-gradient-to-l from-stone-950/0 via-orange-400/5 to-neutral-200/20 rounded-xl border border-neutral-100"></div>

        {/* Informações do usuário na barra */}
        <div className="left-[-254px] top-[1003px] absolute text-white text-sm font-medium font-['Inter'] leading-loose">Paulo Alberto</div>
        <div className="left-[-254px] top-[1020px] absolute text-neutral-500 text-sm font-medium font-['Inter'] leading-loose">p.alberto@gmail.com</div>
        <div className="w-8 h-8 left-[-296px] top-[1009px] absolute bg-red-400 rounded-lg"></div>
        <div className="left-[-286px] top-[1012px] absolute text-white text-xs font-medium font-['Inter'] leading-loose">PA</div>

        {/* Barra decorativa adicional */}
        <div className="w-20 h-2.5 left-[-177px] top-[54px] absolute opacity-70 bg-red-500 blur"></div>
        <div className="w-12 h-2 left-[-162px] top-[56px] absolute opacity-70 bg-gray-200/50 blur-[2.50px]"></div>

        {/* Barra vertical decorativa */}
        <div className="w-1.5 h-16 left-[1839px] top-[182px] absolute bg-blue-950 rounded-lg"></div>
      </div>
    </PageContainer>
  );
}