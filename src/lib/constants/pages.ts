import { UI_CONFIG, COMMON_CLASSES } from './ui';

// Constantes para páginas
export const PAGE_CONFIG = {
  // Container principal
  container: 'min-h-screen bg-gray-50 dark:bg-gray-900',
  content: 'flex-1 p-6 md:p-8 lg:p-12',

  // Header da página
  header: 'mb-8',
  title: `${COMMON_CLASSES.text.h1} text-gray-900 dark:text-white mb-2`,
  description: `${COMMON_CLASSES.text.body} text-gray-600 dark:text-gray-400`,

  // Seções
  section: 'mb-8',
  sectionTitle: `${COMMON_CLASSES.text.h3} text-gray-900 dark:text-white mb-4`,
  sectionDescription: `${COMMON_CLASSES.text.body} text-gray-600 dark:text-gray-400 mb-6`,

  // Cards
  card: `${COMMON_CLASSES.card} ${COMMON_CLASSES.cardHover} p-6`,
  cardHeader: 'flex items-center justify-between mb-4',
  cardTitle: `${COMMON_CLASSES.text.h4} text-gray-900 dark:text-white`,
  cardContent: 'space-y-4',
  sectionActions: 'flex items-center gap-2',

  // Grids
  grid: {
    cols1: 'grid grid-cols-1 gap-6',
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  },

  // Botões de ação
  actionButton:
    'bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2',
  secondaryButton:
    'bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2',

  // Estados
  loading: 'flex items-center justify-center py-12',
  loadingText: 'text-gray-600 dark:text-gray-400',
  error: 'text-red-600 dark:text-red-400',
  empty: 'text-gray-500 dark:text-gray-500 text-center py-12',

  // Labels de formulário
  labels: {
    simulation: 'Simulação',
  },

  // Placeholders
  placeholder: {
    select: 'Selecione uma opção...',
  },

  // Texto
  text: {
    small: 'text-sm text-muted-foreground',
  },
} as const;

// Constantes específicas para cada página
export const DASHBOARD_CONFIG = {
  title: 'Dashboard',
  description: 'Visão geral das alocações e projeções patrimoniais',
  welcomeTitle: 'Bem-vindo ao Dashboard',
  welcomeDescription: 'Aqui você encontrará um resumo das suas informações financeiras.',
} as const;

export const ALLOCATIONS_CONFIG = {
  title: 'Alocações',
  description: 'Gerencie seus investimentos financeiros e imóveis',
  summaryTitle: 'Resumo',
  filtersTitle: 'Filtros',
  timelineTitle: 'Timeline de alocações manuais',
  kpisTitle: 'KPIs',

  // Navegação superior
  navigation: {
    container:
      'flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-12',
    activeItem: "text-zinc-800 text-lg font-normal font-['ABeeZee'] underline leading-loose",
    inactiveItem:
      "text-stone-300 text-lg font-normal font-['ABeeZee'] leading-loose hover:text-white transition-colors",
  },

  // Filtros e controles
  controls: {
    container: 'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6',
    filterContainer: 'flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4',
    filterLabel: "text-neutral-400 text-sm font-normal font-['ABeeZee'] leading-loose",
    filterSelect:
      'w-full sm:w-44 h-9 px-6 py-3 bg-black rounded-[40px] outline outline-1 outline-offset-[-1px] outline-zinc-400 inline-flex justify-center items-center gap-2.5',
    filterText: "text-cinza-claro text-base font-normal font-['ABeeZee'] leading-loose",
    addButton:
      'w-full sm:w-36 h-9 px-6 py-3 bg-laranja-escuro-botao rounded-[40px] inline-flex justify-center items-center gap-2.5 hover:bg-orange-600 transition-colors',
    addButtonText: "text-white text-sm font-normal font-['ABeeZee'] leading-loose",
    addButtonIcon: 'w-4 h-4 bg-white rounded-sm',
  },

  // Timeline
  timeline: {
    container: 'relative',
    title: "text-cinza-claro text-lg font-semibold font-['Inter'] leading-loose mb-4",
    line: 'absolute left-4 sm:left-8 top-0 w-0.5 h-full bg-zinc-800',
    oldDataLabel: "text-zinc-800 text-base font-normal font-['ABeeZee'] leading-none mb-4",
    updatedLabel: "text-zinc-800 text-base font-normal font-['ABeeZee'] leading-tight mt-4",
    itemsContainer: 'space-y-5 pl-4 sm:pl-8',
  },

  // Cards de alocação - Novo design
  allocationCard: {
    container: 'w-full bg-cards rounded-2xl border border-zinc-100 p-4 sm:p-6 relative',
    title: "text-white text-base font-semibold font-['Inter'] leading-loose mb-2",
    value: "text-white text-xl font-normal font-['ABeeZee'] leading-loose mb-2",
    totalValue: "text-neutral-400 text-base font-normal font-['ABeeZee'] leading-loose mb-2",
    date: "text-white text-sm font-normal font-['ABeeZee'] leading-loose mb-2",
    dateRange: "text-white text-sm font-normal font-['ABeeZee'] leading-loose mb-2",
    progress: "text-neutral-400 text-sm font-normal font-['ABeeZee'] leading-loose mb-2",
    lastUpdate: "text-neutral-400 text-sm font-normal font-['ABeeZee'] leading-loose mb-2",
    lastUpdateWarning: "text-orange-500 text-sm font-normal font-['ABeeZee'] leading-loose mb-2",
    updateType: "text-neutral-400 text-sm font-normal font-['ABeeZee'] leading-loose mb-2",
    updateButton:
      'w-full sm:w-36 h-9 px-6 py-3 bg-botao rounded-[40px] outline outline-1 outline-offset-[-1px] outline-orange-400 inline-flex justify-center items-center gap-2.5 hover:bg-orange-50 transition-colors',
    updateButtonText: "text-orange-500 text-sm font-normal font-['ABeeZee'] leading-loose",
    updateButtonIcon: 'w-4 h-4 bg-orange-500 rounded-sm',
    timelineDot:
      'w-6 h-6 bg-zinc-300 rounded-full absolute -left-4 sm:-left-8 top-6 flex items-center justify-center',
    timelineLine: 'w-1 h-4 bg-sky-900 rounded-sm',
    actions: 'flex items-center gap-2 absolute top-2 sm:top-4 right-2 sm:right-4',
  },

  // Badges - Novo design
  badges: {
    financial: 'w-36 h-6 bg-emerald-100 rounded-[35px] flex items-center justify-center',
    financialText: "text-green-700 text-sm font-normal font-['ABeeZee'] leading-loose",
    immobilized: 'w-28 h-6 bg-orange-100 rounded-[35px] flex items-center justify-center',
    immobilizedText: "text-orange-500 text-sm font-normal font-['ABeeZee'] leading-loose",
    financed:
      'w-28 h-6 bg-white rounded-[35px] border border-gray-200 flex items-center justify-center',
    financedText: "text-zinc-800 text-sm font-normal font-['ABeeZee'] leading-loose",
  },

  // Progress bar
  progressBar: {
    container: 'w-full h-2 bg-zinc-300 rounded-[5px] overflow-hidden',
    fill: 'h-full bg-orange-400 rounded-[5px] transition-all duration-300',
  },
} as const;

// Configuração para a página de Projeção
export const PROJECTIONS_CONFIG = {
  title: 'Projeção Patrimonial',
  description: 'Visualize e analise suas projeções financeiras',

  // Container principal
  mainContainer: 'w-full max-w-7xl mx-auto bg-stone-950 rounded-3xl overflow-hidden relative',

  // Header do usuário
  userHeader: {
    container: 'w-96 h-16 bg-stone-950 rounded-[32px] border-2 border-cinza-claro relative',
    name: "text-white text-4xl font-medium font-['Work_Sans'] leading-loose absolute left-[18px] top-[18px]",
    dropdown:
      'w-8 h-4 absolute right-[15px] top-[25px] outline outline-4 outline-offset-[-2px] outline-cinza-claro',
  },

  // Patrimônio líquido total
  netWorth: {
    container: 'absolute left-[111px] top-[291px]',
    label: "text-neutral-500 text-lg font-medium font-['Satoshi'] leading-loose",
    value: "text-white text-4xl font-medium font-['Work_Sans'] leading-loose",
    percentage: "text-blue-400 text-lg font-medium font-['Work_Sans'] leading-loose",
  },

  // Projeções de patrimônio
  projections: {
    container: 'absolute top-[140px]',
    current: {
      container: 'absolute left-[665px]',
      value: "text-white text-2xl font-medium font-['Work_Sans'] leading-loose",
      year: "text-neutral-500 text-lg font-medium font-['Work_Sans'] leading-loose",
      age: "text-blue-400 text-2xl font-medium font-['Work_Sans'] leading-loose",
      badge:
        'w-10 h-5 p-2.5 bg-blue-500/25 rounded inline-flex justify-center items-center gap-2.5',
      badgeText: "text-indigo-500 text-base font-medium font-['Work_Sans'] leading-loose",
      bar: 'w-96 h-16 bg-indigo-500/30 rounded-md',
      barFill: 'w-28 h-16 bg-gradient-to-bl from-indigo-500 to-teal-500 rounded-md',
    },
    future: {
      container: 'absolute left-[1061px]',
      value: "text-white text-2xl font-medium font-['Work_Sans'] leading-loose",
      year: "text-neutral-500 text-lg font-medium font-['Work_Sans'] leading-loose",
      age: "text-white text-2xl font-medium font-['Work_Sans'] leading-loose",
      percentage: "text-blue-400 text-lg font-medium font-['Work_Sans'] leading-loose",
      bar: 'w-96 h-16 bg-zinc-900 rounded-md',
    },
    retirement: {
      container: 'absolute left-[1473px]',
      value: "text-white text-xl font-semibold font-['Inter'] leading-loose",
      year: "text-neutral-500 text-lg font-medium font-['Work_Sans'] leading-loose",
      age: "text-zinc-100 text-2xl font-medium font-['Work_Sans'] leading-loose",
      percentage: "text-blue-400 text-base font-medium font-['Inter'] leading-loose",
      bar: 'w-96 h-16 bg-zinc-900 rounded-md',
    },
  },

  // Status de cenário
  scenarioStatus: {
    container: 'absolute left-[667px] top-[476px] flex items-center gap-6',
    radio: 'w-8 h-8 rounded-full border-2 border-neutral-400',
    label: "text-neutral-400 text-3xl font-normal font-['Neuton'] leading-loose",
  },

  // Gráfico de projeção patrimonial
  chart: {
    container: 'w-[1413px] h-96 absolute left-[101px] top-[540px] bg-zinc-900 rounded-[32px]',
    title:
      "text-zinc-300 text-3xl font-normal font-['Neuton'] leading-loose absolute left-[132.69px] top-[20px]",
    controls: {
      container: 'absolute right-[20px] top-[20px] flex gap-4',
      link: "text-zinc-300 text-base font-medium font-['Work_Sans'] leading-loose hover:text-white transition-colors",
    },
    yAxis: {
      container: 'absolute left-[20px] top-[60px] space-y-4',
      label: "text-neutral-600 text-sm font-medium font-['Inter'] leading-loose",
    },
    grid: {
      line: 'absolute w-[1183.98px] h-0 origin-top-left rotate-180 outline outline-1 outline-offset-[-0.50px] outline-neutral-600',
    },
    lines: {
      original:
        'absolute w-[1064.43px] h-48 left-[316.33px] top-[91.96px] shadow-[7px_2px_15px_0px_rgba(103,174,250,0.98)] shadow-[26px_8px_27px_0px_rgba(103,174,250,0.85)] shadow-[59px_17px_37px_0px_rgba(103,174,250,0.50)] shadow-[105px_30px_44px_0px_rgba(103,174,250,0.15)] shadow-[163px_47px_48px_0px_rgba(103,174,250,0.02)] outline outline-[3px] outline-offset-[-1.50px] outline-blue-400',
      current:
        'absolute w-80 h-32 left-[317.78px] top-[163.50px] shadow-[5px_1px_12px_0px_rgba(239,183,81,0.98)] shadow-[22px_5px_22px_0px_rgba(239,183,81,0.85)] shadow-[49px_11px_30px_0px_rgba(239,183,81,0.50)] shadow-[87px_20px_36px_0px_rgba(239,183,81,0.15)] shadow-[135px_31px_39px_0px_rgba(239,183,81,0.02)] outline outline-[3px] outline-offset-[-1.50px] outline-amber-300',
      realized:
        'absolute w-[766.92px] h-16 left-[643.59px] top-[100.95px] origin-top-left rotate-[10.54deg] shadow-[3px_2px_8px_0px_rgba(14,216,121,0.98)] shadow-[14px_6px_15px_0px_rgba(14,216,121,0.85)] shadow-[31px_14px_21px_0px_rgba(14,216,121,0.50)] shadow-[56px_25px_24px_0px_rgba(14,216,121,0.15)] shadow-[87px_39px_27px_0px_rgba(14,216,121,0.02)] outline outline-[3px] outline-offset-[-1.50px] outline-green-400',
    },
    dots: {
      amber: 'w-4 h-3 bg-amber-300 rounded-full absolute',
    },
  },

  // Controles de simulação
  simulationControls: {
    container: 'absolute left-[434px] top-[976px] flex gap-4',
    button: {
      container: 'w-72 h-16 bg-zinc-900 rounded-2xl flex items-center gap-4 px-4',
      selected:
        'w-72 h-16 bg-zinc-900 rounded-2xl outline outline-2 outline-blue-400 flex items-center gap-4 px-4',
      radio: 'w-8 h-8 rounded-full border-2 border-zinc-800',
      radioSelected: 'w-8 h-8 rounded-full border-2 border-blue-400',
      radioFill: 'w-6 h-6 bg-zinc-800 rounded-full',
      radioFillSelected: 'w-6 h-6 bg-blue-400 rounded-full',
      text: "text-cinza-claro text-lg font-medium font-['Work_Sans'] leading-loose",
      dots: 'w-1 h-1 bg-zinc-300 rounded-full',
    },
    addButton: {
      container:
        'w-28 h-16 bg-zinc-900 rounded-2xl outline outline-2 outline-amber-300 flex items-center justify-center',
      text: "text-cinza-claro text-lg font-medium font-['Work_Sans'] leading-loose",
    },
  },

  // Timeline
  timeline: {
    container: 'absolute left-[101px] top-[1072px]',
    title:
      "text-Plano-original text-3xl font-normal font-['Neuton'] leading-loose absolute left-[14.87px] top-[0px]",
    years: {
      container: 'absolute top-[160px] flex gap-8',
      year: "text-white text-2xl font-medium font-['Work_Sans'] leading-loose",
      age: "text-white text-lg font-normal font-['Work_Sans'] leading-loose",
    },
    salary: {
      container: 'absolute top-[64px]',
      label: "text-green-600 text-lg font-normal font-['Work_Sans'] leading-loose",
      value: "text-green-600 text-lg font-medium font-['Work_Sans'] leading-loose",
      dot: 'w-3.5 h-4 bg-green-600 rounded-full absolute',
      line: 'w-6 h-0 origin-top-left rotate-90 bg-green-600 outline outline-1 outline-offset-[-0.50px] outline-cinza-média absolute',
    },
    costOfLiving: {
      container: 'absolute top-[240px]',
      label: "text-custo-de-vida text-lg font-normal font-['Work_Sans'] leading-none",
      value: "text-custo-de-vida text-lg font-medium font-['Work_Sans'] leading-loose",
      dot: 'w-3.5 h-4 bg-custo-de-vida rounded-full absolute',
      line: 'w-6 h-0 origin-top-left rotate-90 bg-custo-de-vida outline outline-1 outline-offset-[-0.50px] outline-cinza-média absolute',
    },
    mainLine:
      'w-[1315.89px] h-0 absolute outline outline-4 outline-offset-[-2px] outline-cinza-média',
  },

  // Movimentações
  movements: {
    container: 'absolute left-[101px] top-[1426px]',
    title:
      "text-Plano-original text-3xl font-normal font-['Neuton'] leading-loose absolute left-[14.87px] top-[0px]",
    tabs: {
      container: 'absolute left-[1213px] top-[-12px] flex gap-4',
      active:
        'w-36 px-6 py-3 bg-gray-200 rounded-[47px] inline-flex justify-center items-center gap-2',
      inactive:
        'w-36 px-6 py-3 bg-stone-900 rounded-[47px] inline-flex justify-center items-center gap-2',
      text: "text-neutral-700 text-lg font-medium font-['Work_Sans'] leading-loose",
      textInactive: "text-neutral-500 text-lg font-medium font-['Work_Sans'] leading-loose",
    },
    cards: {
      container: 'absolute top-[60px] grid grid-cols-2 gap-4',
      card: 'w-[697.82px] h-44 bg-zinc-900 rounded-2xl border-2 border-Plano-original p-6 relative',
      title: "text-stone-300 text-2xl font-medium font-['Work_Sans'] leading-loose mb-2",
      date: "text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose mb-1",
      frequency: "text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose mb-1",
      type: "text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose mb-1",
      value: {
        credit: "text-green-700 text-2xl font-bold font-['Work_Sans'] leading-loose",
        debit: "text-red-500 text-2xl font-bold font-['Work_Sans'] leading-loose",
        insurance: "text-purple-600 text-2xl font-bold font-['Work_Sans'] leading-loose",
      },
      icon: {
        credit: 'w-5 h-5 bg-green-700 absolute',
        debit: 'w-5 h-5 bg-red-500 absolute origin-top-left -rotate-180',
      },
    },
  },

  // Seguros
  insurances: {
    container: 'absolute left-[101px] top-[1879px]',
    title:
      "text-Plano-original text-3xl font-normal font-['Neuton'] leading-loose absolute left-[14.87px] top-[0px]",
    subtitle:
      "text-neutral-400 text-lg font-medium font-['Inter'] leading-loose absolute left-[14.87px] top-[-60px]",
    cards: {
      container: 'absolute top-[60px] grid grid-cols-2 gap-4',
      card: 'w-[697.82px] h-44 bg-zinc-900 rounded-2xl border-2 border-Plano-original p-6 relative',
      title: "text-stone-300 text-2xl font-medium font-['Work_Sans'] leading-loose mb-2",
      type: "text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose mb-1",
      duration: "text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose mb-1",
      premium: "text-neutral-400 text-lg font-bold font-['Work_Sans'] leading-loose mb-1",
      value: "text-purple-600 text-2xl font-bold font-['Work_Sans'] leading-loose",
    },
  },
} as const;

export const MOVEMENTS_CONFIG = {
  title: 'Movimentações',
  description: 'Gerencie suas entradas e saídas financeiras',
  summaryTitle: 'Resumo',
  eventsTitle: 'Eventos de Movimentação',
  timelineTitle: 'Timeline de Entradas e Saídas',
} as const;

export const HISTORY_CONFIG = {
  title: 'Histórico de Simulações',
  description: 'Visualize e gerencie todas as versões das simulações dos seus clientes',
  clientsTitle: 'Resumo de Clientes',
  simulationsTitle: 'Simulações Registradas',
  recentTitle: 'Clientes Recentes',

  // Container principal
  mainContainer: 'w-full h-full relative bg-[#101010] overflow-hidden rounded-[27px]',

  // Header do usuário
  userHeader: {
    container:
      'w-[445px] h-[66px] left-[108px] top-[143px] absolute bg-[#101010] rounded-[32px] border-2 border-[#C9C9C9] flex items-center px-[18px]',
    name: "text-white text-[35px] font-['Work Sans'] font-medium leading-[30px]",
    dropdown: 'w-[32px] h-[16px] ml-auto border-4 border-[#C9C9C9] border-t-0',
  },

  // Título da página
  pageTitle: {
    container: 'left-[159px] top-[288px] absolute',
    text: "text-[#DADADA] text-[35px] font-['Neuton'] font-normal leading-[30px]",
  },

  // Tabela de simulações
  table: {
    container: 'absolute left-[163px] top-[385px]',
    header: {
      container: 'w-[1272px] h-16 flex items-center border-b border-neutral-600',
      cell: "text-[#919191] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
      data: "text-[#919191] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
      patrimony: "text-[#919191] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
      retirement: "text-[#919191] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
      version: "text-[#919191] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
    },
    row: {
      container: 'w-[1272px] h-24 border-b border-neutral-600 flex items-center',
      data: "text-[#C9C9C9] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
      patrimony: "text-[#C9C9C9] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
      retirement: "text-[#C9C9C9] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
      version: "text-[#C9C9C9] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
    },
  },

  // Cards de simulações
  simulationCards: {
    container: 'space-y-4 left-[163px] top-[385px] absolute',
    card: {
      container:
        'w-[1272px] h-[266px] bg-transparent border border-[#4B4B4B] rounded-[20px] relative',
      smallCard:
        'w-[1272px] h-[92px] bg-transparent border border-[#4B4B4B] rounded-[20px] relative',
      icon: {
        container: 'w-[50px] h-[50px] left-[29px] top-[21px] absolute',
        blur: 'w-[50px] h-[50px] absolute bg-gradient-to-br rounded-full blur-[7.50px] shadow-[15px_15px_15px]',
        gradient: 'w-[50px] h-[50px] absolute bg-gradient-to-br rounded-full',
        small: 'w-[44px] h-[44px] absolute left-[6px] top-[6px] bg-gradient-to-br rounded-full',
        highlight:
          'w-[21.92px] h-[18.37px] absolute left-[14.04px] top-[14.82px] border border-[#F6F6F6] rounded-sm blur-[2.50px]',
        highlightClean:
          'w-[21.92px] h-[18.37px] absolute left-[14.04px] top-[14.82px] border border-[#F6F6F6] rounded-sm',
      },
      title:
        "left-[89px] top-[21px] absolute text-[#EAEAEA] text-[23px] font-['Neuton'] font-normal leading-[30px]",
      button: {
        container:
          "w-[138px] h-[47px] left-[1111px] top-[21px] absolute bg-[#363636] rounded-[40px] text-[#B4B4B4] text-[17px] font-['Work Sans'] font-medium leading-[30px] hover:bg-[#404040]",
        text: "text-[#B4B4B4] text-[17px] font-['Work Sans'] font-medium leading-[30px]",
      },
    },
  },

  // Paginação
  pagination: {
    container: 'left-[735px] top-[953px] absolute text-center',
    text: "text-[#777777] text-[17px] font-['Work Sans'] font-normal",
    button: {
      container: 'w-[42px] h-[42px] bg-[#2E2E2E] rounded-[23px] border border-[#414141] p-0',
      icon: 'w-5 h-5 text-[#D9D9D9]',
      prev: 'w-5 h-5 text-[#D9D9D9]',
      next: 'w-5 h-5 text-[#D9D9D9]',
    },
  },

  // Sidebar
  sidebar: {
    container: 'w-[234px] h-full left-[-296px] top-0 absolute',
    logo: {
      container: 'w-[95.51px] h-[42px] left-[37px] top-[61px] absolute',
      image: 'w-full h-full',
    },
    menu: {
      container: 'space-y-4 left-0 top-[170px] absolute',
      item: {
        container: 'w-[210px] h-[54px] px-6 py-3 rounded-[47px] flex items-center gap-2',
        active: 'w-[210px] h-[54px] px-6 py-3 bg-[#303030] rounded-[47px] flex items-center gap-2',
        icon: 'w-[24px] h-[24px] bg-[#D9D9D9]',
        smallIcon: 'w-[20px] h-[22px] bg-[#D9D9D9] border border-[#737373]',
        text: "text-[#9F9F9F] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
        textActive: "text-[#9F9F9F] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
        textInactive: "text-[#737373] text-[19px] font-['Work Sans'] font-medium leading-[30px]",
        dropdown: 'w-[16px] h-[8px] border-4 border-[#4B4B4B] border-t-0 ml-auto',
      },
    },
  },

  // Linhas decorativas
  decorativeLines: {
    vertical:
      'w-[1108px] h-0 left-[-4px] top-0 absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-[#444444]',
    horizontal:
      'w-[1370px] h-0 left-[108px] top-[345px] absolute outline outline-1 outline-offset-[-0.50px] outline-[#444444]',
  },

  // Dots decorativos
  decorativeDots: {
    container: 'absolute left-[-67px] top-[1023px] flex gap-2',
    dot: 'w-[5px] h-[5px] bg-[#444444] rounded-full',
  },
} as const;
