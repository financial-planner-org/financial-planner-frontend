'use client';

import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HISTORY_CONFIG } from '@/lib/constants/pages';

export default function HistoricoPage() {
  // Mock data baseado no Figma
  const simulations = [
    {
      id: '1',
      title: 'Plano original',
      date: '01/02/25',
      patrimony: 'R$ 4.132.500',
      retirementAge: '68',
      version: '1',
      iconColor: 'from-blue-500 to-indigo-800',
      iconBlur: 'bg-indigo-500/50',
      isLarge: true
    },
    {
      id: '2',
      title: 'Adiantar aposentadoria 3 anos',
      date: '04/05/25',
      patrimony: 'R$ 3.587.420',
      retirementAge: '68',
      version: '2',
      iconColor: 'from-lime-300 to-yellow-700',
      iconBlur: 'bg-lime-400/50',
      isLarge: false
    },
    {
      id: '3',
      title: 'Aposentadoria na praia',
      date: '10/06/25',
      patrimony: 'R$ 2.987.320',
      retirementAge: '65',
      version: '3',
      iconColor: 'from-gray-200 to-neutral-400',
      iconBlur: 'bg-stone-300/50',
      isLarge: false
    }
  ];

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
          <div className={HISTORY_CONFIG.userHeader.name}>Matheus Silveira</div>
          <div className={HISTORY_CONFIG.userHeader.dropdown}></div>
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
            {simulations.map((simulation, index) => (
              <div
                key={simulation.id}
                className={simulation.isLarge ? HISTORY_CONFIG.simulationCards.card.container : HISTORY_CONFIG.simulationCards.card.smallCard}
              >
                {/* Ícone com efeitos */}
                <div className={HISTORY_CONFIG.simulationCards.card.icon.container}>
                  <div className={`${HISTORY_CONFIG.simulationCards.card.icon.blur} ${simulation.iconBlur}`}></div>
                  <div className={`${HISTORY_CONFIG.simulationCards.card.icon.gradient} bg-gradient-to-bl ${simulation.iconColor}`}></div>
                  {!simulation.isLarge && (
                    <div className={`${HISTORY_CONFIG.simulationCards.card.icon.small} bg-gradient-to-bl ${simulation.iconColor}`}></div>
                  )}
                  <div className={HISTORY_CONFIG.simulationCards.card.icon.highlight}></div>
                  <div className={HISTORY_CONFIG.simulationCards.card.icon.highlightClean}></div>
                </div>

                {/* Título da simulação */}
                <div className={HISTORY_CONFIG.simulationCards.card.title}>
                  {simulation.title}
                </div>

                {/* Dados da tabela */}
                <div className="absolute left-[32px] top-[68px] flex items-center space-x-32">
                  <div className={HISTORY_CONFIG.table.row.data}>{simulation.date}</div>
                  <div className={HISTORY_CONFIG.table.row.patrimony}>{simulation.patrimony}</div>
                  <div className={HISTORY_CONFIG.table.row.retirement}>{simulation.retirementAge}</div>
                  <div className={HISTORY_CONFIG.table.row.version}>{simulation.version}</div>
                </div>

                {/* Botão "Ver no gráfico" */}
                <div className={HISTORY_CONFIG.simulationCards.card.button.container}>
                  <div className={HISTORY_CONFIG.simulationCards.card.button.text}>
                    Ver no gráfico
                  </div>
                </div>
              </div>
            ))}
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