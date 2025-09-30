'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/pages/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSimulationHistory, useDuplicateSimulation } from '@/hooks/api/use-simulation-history';
import { useClient } from '@/contexts/ClientContext';
import { useClients } from '@/hooks/api/use-clients';
import { HISTORY_STYLES, getIconColor, COMMON_STYLES } from '@/lib/constants';
import { Plus, AlertTriangle, Eye, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { SimulationHistoryItem } from '@/hooks/api/use-simulation-history';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/page-states';

export default function HistoricoPage() {
  // Usar contexto global de cliente
  const { selectedClientId } = useClient();

  // Estado para controlar visualização
  const [selectedSimulation, setSelectedSimulation] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<string>(selectedClientId?.toString() || '');
  const [includeVersions, setIncludeVersions] = useState<boolean>(false);

  // Buscar clientes e histórico de simulações
  const { data: clients = [] } = useClients();
  const { data: simulations = [], isLoading, error } = useSimulationHistory(selectedClientId || undefined, includeVersions);
  const duplicateSimulation = useDuplicateSimulation();

  const handleCreateVersion = async (simulationId: number, newName: string) => {
    try {
      await duplicateSimulation.mutateAsync({ simulationId, newName });
      toast.success('Nova versão criada com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar nova versão');
    }
  };

  const handleViewSimulation = (simulationId: number) => {
    // Navegar para a página de projeção com a simulação selecionada
    window.location.href = `/projecao?simulation=${simulationId}`;
  };

  const handleCreateNewSimulationFromLegacy = async (simulationId: number) => {
    const newName = prompt('Nome da nova simulação editável:');
    if (newName) {
      try {
        await duplicateSimulation.mutateAsync({ simulationId, newName });
        toast.success('Nova simulação criada a partir da versão legada!');
      } catch (error) {
        toast.error('Erro ao criar nova simulação');
      }
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
    return <LoadingState message="Carregando histórico..." />;
  }

  // Error state
  if (error) {
    return <ErrorState message={`Erro ao carregar histórico: ${error.message}`} />;
  }

  return (
    <PageContainer className="relative rounded-3xl overflow-hidden">
      {/* Container principal com dimensões fixas do Figma */}
      <div className={HISTORY_STYLES.mainContainer}>

        {/* Header do usuário */}
        <div className={HISTORY_STYLES.userHeader.container}>
          <div className={HISTORY_STYLES.userHeader.name}>
            {clients.find(c => c.id.toString() === selectedClient)?.name || 'Selecione um cliente'}
          </div>
          <div className={HISTORY_STYLES.userHeader.dropdown}></div>
        </div>

        {/* Controles de filtro */}
        <div className={COMMON_STYLES.filterContainer}>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className={COMMON_STYLES.selectTrigger}>
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

          <label className={COMMON_STYLES.checkboxLabel}>
            <input
              type="checkbox"
              checked={includeVersions}
              onChange={(e) => setIncludeVersions(e.target.checked)}
              className={COMMON_STYLES.checkboxInput}
            />
            Incluir versões legadas
          </label>
        </div>

        {/* Título da página */}
        <div className={HISTORY_STYLES.pageTitle.container}>
          <div className={HISTORY_STYLES.pageTitle.text} data-testid="page-title">
            Histórico de Simulações
          </div>
        </div>

        {/* Tabela de simulações */}
        <div className={HISTORY_STYLES.table.container}>
          {/* Header da tabela */}
          <div className={HISTORY_STYLES.table.header.container}>
            <div className={`${HISTORY_STYLES.table.header.cell} left-[32px]`}>Data</div>
            <div className={`${HISTORY_STYLES.table.header.patrimony} left-[182px]`}>Patrimônio final</div>
            <div className={`${HISTORY_STYLES.table.header.retirement} left-[412px]`}>Data de Aposentadoria</div>
            <div className={`${HISTORY_STYLES.table.header.version} left-[695px]`}>Versão</div>
          </div>

          {/* Cards de simulações */}
          <div className={COMMON_STYLES.simulationCards}>
            {simulations.map((simulation, index) => {
              const iconColors = getIconColor(simulation.name, simulation.isLegacy);
              const isLarge = index === 0 && !simulation.isLegacy; // Primeira simulação não-legada é grande

              return (
                <div
                  key={simulation.id}
                  className={isLarge ? HISTORY_STYLES.simulationCards.card.container : HISTORY_STYLES.simulationCards.card.smallCard}
                >
                  {/* Ícone com efeitos */}
                  <div className={HISTORY_STYLES.simulationCards.card.icon.container}>
                    <div className={`${HISTORY_STYLES.simulationCards.card.icon.blur} ${iconColors.iconBlur}`}></div>
                    <div className={`${HISTORY_STYLES.simulationCards.card.icon.gradient} bg-gradient-to-bl ${iconColors.iconColor}`}></div>
                    {!isLarge && (
                      <div className={`${HISTORY_STYLES.simulationCards.card.icon.small} bg-gradient-to-bl ${iconColors.iconColor}`}></div>
                    )}
                    <div className={HISTORY_STYLES.simulationCards.card.icon.highlight}></div>
                    <div className={HISTORY_STYLES.simulationCards.card.icon.highlightClean}></div>
                  </div>

                  {/* Título da simulação */}
                  <div className={HISTORY_STYLES.simulationCards.card.title}>
                    {simulation.name}
                    {simulation.isLegacy && (
                      <Badge
                        variant="secondary"
                        className={COMMON_STYLES.badgeLegacy}
                        title="Versão legado – não editável"
                      >
                        <AlertTriangle className={COMMON_STYLES.iconSmall} />
                        Versão Legada
                      </Badge>
                    )}
                  </div>

                  {/* Dados da tabela */}
                  <div className={COMMON_STYLES.simulationData}>
                    <div className={HISTORY_STYLES.table.row.data}>
                      {new Date(simulation.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <div className={HISTORY_STYLES.table.row.patrimony}>
                      {calculateFinalPatrimony(simulation)}
                    </div>
                    <div className={HISTORY_STYLES.table.row.retirement}>
                      {calculateRetirementAge(simulation)}
                    </div>
                    <div className={HISTORY_STYLES.table.row.version}>
                      v{simulation.versions.length}
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className={COMMON_STYLES.simulationActions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewSimulation(simulation.id)}
                      className={COMMON_STYLES.buttonGhost}
                    >
                      <Eye className={COMMON_STYLES.iconMedium} />
                      Ver no gráfico
                    </Button>

                    {simulation.isLegacy ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCreateNewSimulationFromLegacy(simulation.id)}
                        className={COMMON_STYLES.buttonGhost}
                        title="Criar nova simulação editável a partir desta versão legada"
                      >
                        <Plus className={COMMON_STYLES.iconMedium} />
                        Criar nova
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newName = prompt('Nome da nova versão:');
                          if (newName) {
                            handleCreateVersion(simulation.id, newName);
                          }
                        }}
                        className={COMMON_STYLES.buttonGhost}
                      >
                        <Copy className={COMMON_STYLES.iconMedium} />
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
        <div className={HISTORY_STYLES.pagination.container}>
          <div className={HISTORY_STYLES.pagination.button.container}>
            <div className={HISTORY_STYLES.pagination.button.prev}></div>
          </div>
          <div className={HISTORY_STYLES.pagination.text}>Página 1 de 10</div>
          <div className={HISTORY_STYLES.pagination.button.container}>
            <div className={HISTORY_STYLES.pagination.button.next}></div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={HISTORY_STYLES.sidebar.container}>
          {/* Logo */}
          <div className={HISTORY_STYLES.sidebar.logo.container}>
            <img
              src="https://placehold.co/96x42"
              alt="Logo"
              className={HISTORY_STYLES.sidebar.logo.image}
            />
          </div>

          {/* Menu */}
          <div className={HISTORY_STYLES.sidebar.menu.container}>
            {/* Dashboard */}
            <div className={HISTORY_STYLES.sidebar.menu.item.container}>
              <div className={HISTORY_STYLES.sidebar.menu.item.smallIcon}></div>
              <div className={COMMON_STYLES.sidebarDots}></div>
              <div className={COMMON_STYLES.sidebarDotsSmall}></div>
              <div className={COMMON_STYLES.sidebarDots}></div>
              <div className={COMMON_STYLES.sidebarDotsSmall}></div>
              <div className={HISTORY_STYLES.sidebar.menu.item.textInactive}>Dashboard</div>
            </div>

            {/* Clientes */}
            <div className={HISTORY_STYLES.sidebar.menu.item.container}>
              <div className={HISTORY_STYLES.sidebar.menu.item.icon}></div>
              <div className={COMMON_STYLES.sidebarIcon}></div>
              <div className={HISTORY_STYLES.sidebar.menu.item.text}>Clientes</div>
            </div>

            {/* Projeção */}
            <div className={HISTORY_STYLES.sidebar.menu.item.container}>
              <div className="w-5 h-5 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500"></div>
              <div className={HISTORY_STYLES.sidebar.menu.item.textInactive}>Projeção</div>
            </div>

            {/* Histórico (ativo) */}
            <div className={HISTORY_STYLES.sidebar.menu.item.active}>
              <div className={COMMON_STYLES.sidebarIconActive}></div>
              <div className={COMMON_STYLES.sidebarIcon}></div>
              <div className={HISTORY_STYLES.sidebar.menu.item.textActive}>Histórico</div>
            </div>

            {/* Prospects */}
            <div className={HISTORY_STYLES.sidebar.menu.item.container}>
              <div className={HISTORY_STYLES.sidebar.menu.item.icon}></div>
              <div className={COMMON_STYLES.sidebarIconInactive}></div>
              <div className={HISTORY_STYLES.sidebar.menu.item.textInactive}>Prospects</div>
              <div className={HISTORY_STYLES.sidebar.menu.item.dropdown}></div>
            </div>
          </div>
        </div>

        {/* Linhas decorativas */}
        <div className={HISTORY_STYLES.decorativeLines.vertical}></div>
        <div className={HISTORY_STYLES.decorativeLines.horizontal}></div>

        {/* Dots decorativos */}
        <div className={HISTORY_STYLES.decorativeDots.container}>
          <div className={HISTORY_STYLES.decorativeDots.dot}></div>
          <div className={HISTORY_STYLES.decorativeDots.dot}></div>
          <div className={HISTORY_STYLES.decorativeDots.dot}></div>
        </div>

        {/* Barra decorativa */}
        <div className={COMMON_STYLES.decorativeBar}></div>

        {/* Informações do usuário na barra */}
        <div className={COMMON_STYLES.userInfo}>Paulo Alberto</div>
        <div className={COMMON_STYLES.userEmail}>p.alberto@gmail.com</div>
        <div className={COMMON_STYLES.userAvatar}></div>
        <div className={COMMON_STYLES.userInitials}>PA</div>

        {/* Barra decorativa adicional */}
        <div className={COMMON_STYLES.decorativeBarSmall}></div>
        <div className={COMMON_STYLES.decorativeBarTiny}></div>

        {/* Barra vertical decorativa */}
        <div className={COMMON_STYLES.decorativeBarVertical}></div>
      </div>
    </PageContainer>
  );
}