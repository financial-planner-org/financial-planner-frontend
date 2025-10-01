// ============================================================================
// ESTILOS UNIFICADOS - FINANCIAL PLANNER
// ============================================================================
// Este arquivo consolida todos os estilos do projeto, eliminando redundâncias
// e centralizando as constantes em um local único e organizado.

// ============================================================================
// DESIGN TOKENS BÁSICOS
// ============================================================================

// Cores do sistema
export const COLORS = {
    // Cores primárias
    white: '#FFFFFF',
    black: '#000000',

    // Cores neutras
    neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
        950: '#030712'
    },

    // Cores específicas do projeto
    zinc: {
        100: '#F4F4F5',
        200: '#E4E4E7',
        300: '#D4D4D8',
        400: '#A1A1AA',
        500: '#71717A',
        600: '#52525B',
        700: '#3F3F46',
        800: '#27272A',
        900: '#18181B',
        950: '#09090B'
    },

    // Cores de status
    blue: { 400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB' },
    green: { 400: '#4ADE80', 500: '#22C55E', 600: '#16A34A', 700: '#15803D' },
    red: { 400: '#F87171', 500: '#EF4444', 600: '#DC2626' },
    amber: { 300: '#FCD34D', 400: '#FBBF24', 500: '#F59E0B' },
    indigo: { 500: '#6366F1', 600: '#4F46E5' },
    teal: { 500: '#14B8A6' },
    purple: { 500: '#A855F7', 600: '#9333EA' }
} as const;

// Tipografia
export const TYPOGRAPHY = {
    fontFamily: {
        satoshi: 'Satoshi',
        workSans: 'Work_Sans',
        neuton: 'Neuton',
        inter: 'Inter'
    },
    fontSize: {
        xs: 'text-xs', sm: 'text-sm', base: 'text-base', lg: 'text-lg',
        xl: 'text-xl', '2xl': 'text-2xl', '3xl': 'text-3xl', '4xl': 'text-4xl'
    },
    fontWeight: {
        normal: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold'
    }
} as const;

// ============================================================================
// CLASSES CSS COMUNS
// ============================================================================

// Layout
export const LAYOUT = {
    // Containers
    container: 'w-full',
    containerCentered: 'w-full mx-auto',
    containerPadded: 'w-full p-6',

    // Flexbox
    flexCenter: 'flex items-center justify-center',
    flexBetween: 'flex items-center justify-between',
    flexStart: 'flex items-center justify-start',
    flexEnd: 'flex items-center justify-end',
    flexCol: 'flex flex-col',
    flexRow: 'flex flex-row',

    // Grid
    grid2: 'grid grid-cols-1 md:grid-cols-2',
    grid3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    grid4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',

    // Posicionamento
    absolute: 'absolute',
    relative: 'relative',
    fixed: 'fixed',

    // Espaçamento
    spaceY2: 'space-y-2',
    spaceY4: 'space-y-4',
    spaceY6: 'space-y-6',
    gap1: 'gap-1',
    gap2: 'gap-2',
    gap4: 'gap-4',
    gap6: 'gap-6'
} as const;

// Texto
export const TEXT = {
    // Títulos
    h1: 'text-4xl font-medium text-white',
    h2: 'text-3xl font-medium text-white',
    h3: 'text-2xl font-medium text-white',
    h4: 'text-xl font-medium text-white',

    // Texto comum
    body: 'text-base text-white',
    bodyMuted: 'text-base text-neutral-400',
    small: 'text-sm text-neutral-400',
    caption: 'text-xs text-neutral-500',

    // Cores específicas
    primary: 'text-white',
    secondary: 'text-neutral-400',
    muted: 'text-neutral-500',
    accent: 'text-blue-400',
    success: 'text-green-600',
    error: 'text-red-500',
    warning: 'text-amber-300',

    // Fontes específicas
    workSans: 'font-[\'Work_Sans\']',
    neuton: 'font-[\'Neuton\']',
    inter: 'font-[\'Inter\']',
    satoshi: 'font-[\'Satoshi\']'
} as const;

// Backgrounds
export const BG = {
    // Básicos
    white: 'bg-white',
    black: 'bg-black',
    transparent: 'bg-transparent',

    // Neutros
    neutral800: 'bg-neutral-800',
    neutral900: 'bg-neutral-900',
    zinc800: 'bg-zinc-800',
    zinc900: 'bg-zinc-900',
    zinc950: 'bg-zinc-950',

    // Cores
    blue500: 'bg-blue-500',
    green500: 'bg-green-500',
    green700: 'bg-green-700',
    red500: 'bg-red-500',
    red400: 'bg-red-400',
    purple500: 'bg-purple-500',
    amber300: 'bg-amber-300',

    // Com opacidade
    blue500_25: 'bg-blue-500/25',
    indigo500_30: 'bg-indigo-500/30',

    // Gradientes
    gradientBlue: 'bg-gradient-to-bl from-indigo-500 to-teal-500',
    gradientOrange: 'bg-gradient-to-l from-orange-400/10 to-red-600/25'
} as const;

// Bordas
export const BORDER = {
    // Básicas
    none: 'border-0',
    solid: 'border',
    solid2: 'border-2',
    solid4: 'border-4',

    // Cores
    neutral400: 'border-neutral-400',
    neutral600: 'border-neutral-600',
    neutral700: 'border-neutral-700',
    zinc800: 'border-zinc-800',
    blue400: 'border-blue-400',
    orange600: 'border-orange-600',

    // Raio
    rounded: 'rounded-md',
    roundedMd: 'rounded-md',
    roundedLg: 'rounded-lg',
    roundedXl: 'rounded-xl',
    rounded2xl: 'rounded-2xl',
    rounded3xl: 'rounded-3xl',
    roundedFull: 'rounded-full',

    // Específicos do projeto
    rounded47: 'rounded-[47px]',
    rounded32: 'rounded-[32px]',
    rounded20: 'rounded-[20px]'
} as const;

// Tamanhos
export const SIZE = {
    // Larguras
    wFull: 'w-full',
    wAuto: 'w-auto',
    w0_5: 'w-0.5',
    w1: 'w-1',
    w2: 'w-2',
    w3: 'w-3',
    w4: 'w-4',
    w6: 'w-6',
    w8: 'w-8',
    w10: 'w-10',
    w12: 'w-12',
    w16: 'w-16',
    w20: 'w-20',
    w24: 'w-24',
    w28: 'w-28',
    w32: 'w-32',
    w40: 'w-40',
    w48: 'w-48',
    w64: 'w-64',
    w72: 'w-72',
    w80: 'w-80',
    w96: 'w-96',

    // Alturas
    hFull: 'h-full',
    hAuto: 'h-auto',
    h0_5: 'h-0.5',
    h1: 'h-1',
    h2: 'h-2',
    h3: 'h-3',
    h4: 'h-4',
    h6: 'h-6',
    h8: 'h-8',
    h10: 'h-10',
    h12: 'h-12',
    h14: 'h-14',
    h16: 'h-16',
    h20: 'h-20',
    h24: 'h-24',
    h32: 'h-32',
    h44: 'h-44',
    h48: 'h-48',
    h64: 'h-64',
    h72: 'h-72',
    h80: 'h-80',
    h96: 'h-96',

    // Específicos do projeto
    w1413: 'w-[1413px]',
    w1272: 'w-[1272px]',
    w1064: 'w-[1064.43px]',
    w766: 'w-[766.92px]',
    h1108: 'h-[1108px]',
    h1083: 'h-[1083px]'
} as const;

// Posicionamento
export const POSITION = {
    absolute: 'absolute',
    relative: 'relative',
    fixed: 'fixed',

    // Específicos do projeto
    left101: 'left-[101px]',
    left111: 'left-[111px]',
    left159: 'left-[159px]',
    left163: 'left-[163px]',
    left434: 'left-[434px]',
    left667: 'left-[667px]',
    left1061: 'left-[1061px]',
    left1473: 'left-[1473px]',

    top59: 'top-[59px]',
    top101: 'top-[101px]',
    top140: 'top-[140px]',
    top170: 'top-[170px]',
    top291: 'top-[291px]',
    top288: 'top-[288px]',
    top385: 'top-[385px]',
    top476: 'top-[476px]',
    top540: 'top-[540px]',
    top976: 'top-[976px]',
    top1072: 'top-[1072px]',
    top1426: 'top-[1426px]',
    top1879: 'top-[1879px]'
} as const;

// Efeitos
export const EFFECT = {
    // Sombras
    shadowSm: 'shadow-sm',
    shadowMd: 'shadow-md',
    shadowLg: 'shadow-lg',

    // Blur
    blurSm: 'blur-sm',
    blurMd: 'blur-md',

    // Opacidade
    opacity50: 'opacity-50',
    opacity70: 'opacity-70',
    opacity90: 'opacity-90',

    // Hover
    hoverWhite: 'hover:text-white',
    hoverBg: 'hover:bg-neutral-800',
    hoverShadow: 'hover:shadow-lg',

    // Transições
    transitionColors: 'transition-colors',
    transitionAll: 'transition-all',
    transitionFast: 'transition-all duration-150 ease-in-out',
    transitionNormal: 'transition-all duration-300 ease-in-out'
} as const;

// ============================================================================
// SISTEMA RESPONSIVO
// ============================================================================

// Breakpoints
export const BREAKPOINTS = {
    sm: '640px',   // Mobile landscape
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop small
    xl: '1280px',  // Desktop large
    '2xl': '1536px' // Desktop extra large
} as const;

// Containers responsivos
export const CONTAINER_RESPONSIVE = {
    main: 'w-full min-h-screen max-w-none',
    content: 'w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
    page: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    section: 'w-full py-4 sm:py-6 md:py-8 lg:py-12',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',
    cards: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6',
    timeline: 'flex flex-col sm:flex-row gap-4 sm:gap-8',
    chart: 'w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]',
    sidebar: 'hidden lg:block lg:w-64 xl:w-72',
    mainContent: 'w-full lg:ml-64 xl:ml-72'
} as const;

// Tipografia responsiva
export const TYPOGRAPHY_RESPONSIVE = {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold',
    h4: 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium',
    h5: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium',
    h6: 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium',
    body: 'text-sm sm:text-base md:text-lg',
    bodySmall: 'text-xs sm:text-sm md:text-base',
    bodyLarge: 'text-base sm:text-lg md:text-xl',
    label: 'text-xs sm:text-sm font-medium',
    caption: 'text-xs sm:text-sm text-muted-foreground',
    small: 'text-xs text-muted-foreground'
} as const;

// Espaçamento responsivo
export const SPACING_RESPONSIVE = {
    padding: {
        xs: 'p-2 sm:p-3 md:p-4 lg:p-6',
        sm: 'p-3 sm:p-4 md:p-6 lg:p-8',
        md: 'p-4 sm:p-6 md:p-8 lg:p-12',
        lg: 'p-6 sm:p-8 md:p-12 lg:p-16',
        xl: 'p-8 sm:p-12 md:p-16 lg:p-24'
    },
    margin: {
        xs: 'm-2 sm:m-3 md:m-4 lg:m-6',
        sm: 'm-3 sm:m-4 md:m-6 lg:m-8',
        md: 'm-4 sm:m-6 md:m-8 lg:m-12',
        lg: 'm-6 sm:m-8 md:m-12 lg:m-16',
        xl: 'm-8 sm:m-12 md:m-16 lg:m-24'
    },
    gap: {
        xs: 'gap-2 sm:gap-3 md:gap-4 lg:gap-6',
        sm: 'gap-3 sm:gap-4 md:gap-6 lg:gap-8',
        md: 'gap-4 sm:gap-6 md:gap-8 lg:gap-12',
        lg: 'gap-6 sm:gap-8 md:gap-12 lg:gap-16',
        xl: 'gap-8 sm:gap-12 md:gap-16 lg:gap-24'
    }
} as const;

// Componentes responsivos
export const COMPONENT_RESPONSIVE = {
    button: {
        sm: 'px-3 py-1.5 text-xs sm:text-sm',
        md: 'px-4 py-2 text-sm sm:text-base',
        lg: 'px-6 py-3 text-base sm:text-lg',
        xl: 'px-8 py-4 text-lg sm:text-xl'
    },
    card: {
        container: 'p-4 sm:p-6 md:p-8',
        header: 'pb-3 sm:pb-4 md:pb-6',
        content: 'space-y-2 sm:space-y-3 md:space-y-4',
        footer: 'pt-3 sm:pt-4 md:pt-6'
    },
    input: {
        container: 'w-full',
        field: 'px-3 py-2 text-sm sm:text-base',
        label: 'text-xs sm:text-sm font-medium mb-1 sm:mb-2'
    },
    table: {
        container: 'w-full overflow-x-auto',
        table: 'min-w-full',
        cell: 'px-3 py-2 text-xs sm:text-sm md:text-base',
        header: 'px-3 py-2 text-xs sm:text-sm md:text-base font-medium'
    },
    nav: {
        container: 'flex flex-col sm:flex-row gap-2 sm:gap-4',
        item: 'px-3 py-2 text-sm sm:text-base',
        active: 'px-3 py-2 text-sm sm:text-base font-medium'
    }
} as const;

// Zoom responsivo
export const ZOOM_RESPONSIVE = {
    zoomContainer: 'w-full h-full min-h-screen',
    zoomText: 'text-sm sm:text-base md:text-lg lg:text-xl',
    zoomElement: 'w-full h-auto max-w-full',
    zoomChart: 'w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] min-h-[200px]',
    zoomCard: 'w-full max-w-full min-w-0',
    zoomTimeline: 'w-full overflow-x-auto sm:overflow-x-visible'
} as const;

// Mobile específico
export const MOBILE_RESPONSIVE = {
    mobileSidebar: 'fixed inset-0 z-50 lg:hidden',
    mobileSidebarOverlay: 'fixed inset-0 bg-black/50 lg:hidden',
    mobileSidebarContent: 'fixed left-0 top-0 h-full w-64 bg-background p-4',
    mobileMenu: 'flex flex-col space-y-2 lg:hidden',
    mobileMenuButton: 'lg:hidden p-2',
    mobileLayout: 'flex flex-col lg:flex-row',
    mobileContent: 'flex-1 lg:ml-64',
    mobileCards: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
    mobileTimeline: 'flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'
} as const;

// Utilitários responsivos
export const RESPONSIVE_UTILS = {
    hideMobile: 'hidden sm:block',
    hideDesktop: 'block sm:hidden',
    mobileOnly: 'block sm:hidden',
    desktopOnly: 'hidden sm:block',
    tabletOnly: 'hidden sm:block lg:hidden',
    largeDesktopOnly: 'hidden xl:block',
    adaptive: 'w-full max-w-full min-w-0',
    noWrap: 'whitespace-nowrap',
    wrap: 'break-words',
    overflowResponsive: 'overflow-x-auto sm:overflow-x-visible',
    smoothScroll: 'scroll-smooth'
} as const;

// ============================================================================
// ESTILOS ESPECÍFICOS DAS PÁGINAS
// ============================================================================

// Página de Alocações
export const ALLOCATIONS_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,

    header: {
        container: `${LAYOUT.flexBetween} ${SIZE.wFull} mb-6`,
        title: `${TYPOGRAPHY_RESPONSIVE.h2} ${TEXT.primary}`,
        controls: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} ${LAYOUT.flexCenter}`,
        filter: `${COMPONENT_RESPONSIVE.input.container}`,
        addButton: `${COMPONENT_RESPONSIVE.button.lg} ${BG.blue500} ${TEXT.primary} ${BORDER.roundedMd} ${LAYOUT.flexRow} ${LAYOUT.gap2}`
    },

    timeline: {
        container: `${POSITION.relative} ${SIZE.wFull} mt-6`,
        title: `${TYPOGRAPHY_RESPONSIVE.h4} mb-6`,
        line: `${POSITION.absolute} left-4 top-10 ${SIZE.w0_5} ${SIZE.hFull} ${BG.neutral800}`,
        oldDataLabel: `${POSITION.absolute} left-6 top-12 ${TYPOGRAPHY_RESPONSIVE.caption}`,
        updatedLabel: `${POSITION.absolute} left-6 top-28 ${TYPOGRAPHY_RESPONSIVE.caption}`,
        itemsContainer: 'mt-16'
    },

    card: {
        container: `${SIZE.wFull} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} mb-4 ${ZOOM_RESPONSIVE.zoomCard}`,
        header: `${LAYOUT.flexBetween} ${LAYOUT.flexStart} mb-4`,
        title: `${TYPOGRAPHY_RESPONSIVE.h5} ${TEXT.primary}`,
        badge: `${BG.neutral800} ${TEXT.secondary} ${BORDER.roundedFull} px-3 py-1 ${TYPOGRAPHY_RESPONSIVE.caption}`,
        content: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
        value: `${TYPOGRAPHY_RESPONSIVE.h4} ${TEXT.primary}`,
        details: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
        actions: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} mt-4`,
        updateButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG.blue500} ${TEXT.primary} ${BORDER.roundedMd}`,
        menuButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd}`
    }
} as const;

// Página de Projeção
export const PROJECTIONS_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,

    clientSelector: `${POSITION.relative} ${SIZE.wFull} ${SIZE.h12} ${RESPONSIVE_UTILS.adaptive}`,

    netWorth: {
        container: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm} ${POSITION.relative} ${SIZE.wFull} ${SIZE.h24} ${RESPONSIVE_UTILS.adaptive}`,
        label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
        value: `${TYPOGRAPHY_RESPONSIVE.h1} ${TEXT.primary}`,
        percentage: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} ${TEXT.success} font-medium`
    },

    projections: {
        container: `${CONTAINER_RESPONSIVE.cards} ${SIZE.wFull}`,
        current: {
            container: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm} ${SIZE.wFull} ${SIZE.h24} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
            year: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
            value: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} font-bold`,
            age: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
            bar: `${SIZE.wFull} ${SIZE.h2} ${BG.neutral800} ${BORDER.roundedFull}`,
            barFill: `${SIZE.hFull} ${BG.blue500} ${BORDER.roundedFull}`
        },
        future: {
            container: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm} ${SIZE.wFull} ${SIZE.h24} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
            year: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
            age: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
            value: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} font-bold`,
            percentage: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.success} font-medium`,
            bar: `${SIZE.wFull} ${SIZE.h2} ${BG.neutral800} ${BORDER.roundedFull}`,
            barFill: `${SIZE.hFull} ${BG.blue500} ${BORDER.roundedFull}`
        }
    },

    chart: {
        container: `${ZOOM_RESPONSIVE.zoomChart} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} mb-4`,
        controls: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} mb-4 ${RESPONSIVE_UTILS.overflowResponsive}`,
        link: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.accent} cursor-pointer hover:underline`
    },

    simulations: {
        container: `${CONTAINER_RESPONSIVE.timeline} ${SIZE.wFull} mb-6 ${RESPONSIVE_UTILS.overflowResponsive}`,
        button: `${COMPONENT_RESPONSIVE.button.md} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer hover:bg-neutral-700`,
        activeButton: `${COMPONENT_RESPONSIVE.button.md} ${BG.blue500} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer`,
        addButton: `${COMPONENT_RESPONSIVE.button.md} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer hover:bg-neutral-700 ${LAYOUT.flexRow} ${LAYOUT.gap2}`
    },

    timeline: {
        container: `${SIZE.wFull} ${SIZE.h32} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomTimeline}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} mb-4`,
        content: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
        line: `${SIZE.wFull} ${SIZE.h1} ${BG.neutral800} ${BORDER.roundedFull}`,
        marker: `${SIZE.w3} ${SIZE.h3} ${BG.blue500} ${BORDER.roundedFull} ${POSITION.absolute}`
    },

    movements: {
        container: `${SIZE.wFull} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomCard}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} mb-4`,
        tabs: `${CONTAINER_RESPONSIVE.timeline} mb-4`,
        tab: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary} cursor-pointer hover:text-white`,
        activeTab: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary} font-medium`,
        cards: `${CONTAINER_RESPONSIVE.cards}`,
        card: `${SIZE.wFull} ${BG.neutral800} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
        cardTitle: `${TYPOGRAPHY_RESPONSIVE.bodySmall} font-medium mb-2`,
        cardValue: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} font-bold mb-1`,
        cardDate: `${TYPOGRAPHY_RESPONSIVE.caption}`
    },

    insurances: {
        container: `${SIZE.wFull} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomCard}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} mb-4`,
        cards: `${CONTAINER_RESPONSIVE.cards}`,
        card: `${SIZE.wFull} ${BG.neutral800} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
        cardTitle: `${TYPOGRAPHY_RESPONSIVE.bodySmall} font-medium mb-2`,
        cardValue: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} font-bold mb-1`,
        cardDetails: `${TYPOGRAPHY_RESPONSIVE.caption}`
    }
} as const;

// Página de Histórico
export const HISTORY_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,

    header: {
        container: `${LAYOUT.flexBetween} ${SIZE.wFull} mb-6`,
        title: `${TYPOGRAPHY_RESPONSIVE.h2} ${TEXT.primary}`,
        menu: `${COMPONENT_RESPONSIVE.button.sm} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd}`
    },

    clientSelector: {
        container: `${COMPONENT_RESPONSIVE.input.container}`,
        label: `${COMPONENT_RESPONSIVE.input.label}`,
        select: `${COMPONENT_RESPONSIVE.input.field} ${BG.zinc950} ${BORDER.solid} ${BORDER.roundedMd}`
    },

    simulations: {
        container: `${CONTAINER_RESPONSIVE.cards} ${SIZE.wFull}`,
        card: `${SIZE.wFull} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} mb-4 ${ZOOM_RESPONSIVE.zoomCard}`,
        header: `${LAYOUT.flexBetween} ${LAYOUT.flexCenter} mb-4`,
        title: `${TYPOGRAPHY_RESPONSIVE.h5} ${TEXT.primary}`,
        status: `${BG.neutral800} ${TEXT.secondary} ${BORDER.roundedFull} px-3 py-1 ${TYPOGRAPHY_RESPONSIVE.caption}`,
        content: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
        value: `${TYPOGRAPHY_RESPONSIVE.h4} ${TEXT.primary}`,
        date: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
        actions: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} mt-4`,
        viewButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG.blue500} ${TEXT.primary} ${BORDER.roundedMd}`,
        menuButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd}`
    },

    pagination: {
        container: `${LAYOUT.flexCenter} ${LAYOUT.flexCenter} ${SPACING_RESPONSIVE.gap.sm} mt-8`,
        button: `${COMPONENT_RESPONSIVE.button.sm} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd}`,
        pageInfo: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`
    }
} as const;

// ============================================================================
// ESTILOS COMUNS REUTILIZÁVEIS
// ============================================================================

export const COMMON_STYLES = {
    // Containers responsivos
    pageContainer: `${CONTAINER_RESPONSIVE.page} ${SPACING_RESPONSIVE.padding.md}`,
    sectionContainer: `${CONTAINER_RESPONSIVE.section} ${SIZE.wFull}`,
    cardContainer: `${CONTAINER_RESPONSIVE.cards} ${SIZE.wFull}`,

    // Tipografia responsiva
    pageTitle: `${TYPOGRAPHY_RESPONSIVE.h1} ${TEXT.primary} mb-6`,
    sectionTitle: `${TYPOGRAPHY_RESPONSIVE.h2} ${TEXT.primary} mb-4`,
    cardTitle: `${TYPOGRAPHY_RESPONSIVE.h3} ${TEXT.primary} mb-2`,

    // Botões responsivos
    primaryButton: `${COMPONENT_RESPONSIVE.button.md} ${BG.blue500} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer`,
    secondaryButton: `${COMPONENT_RESPONSIVE.button.md} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer`,
    outlineButton: `${COMPONENT_RESPONSIVE.button.md} ${BG.transparent} ${TEXT.primary} ${BORDER.solid} ${BORDER.neutral600} ${BORDER.roundedMd} cursor-pointer`,

    // Cards responsivos
    card: `${SIZE.wFull} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomCard}`,
    cardHeader: `${LAYOUT.flexBetween} ${LAYOUT.flexCenter} mb-4`,
    cardContent: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
    cardFooter: `${LAYOUT.flexRow} ${LAYOUT.flexEnd} ${SPACING_RESPONSIVE.gap.sm} mt-4`,

    // Formulários responsivos
    form: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.md}`,
    formGroup: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
    formLabel: `${COMPONENT_RESPONSIVE.input.label}`,
    formInput: `${COMPONENT_RESPONSIVE.input.field} ${BG.zinc950} ${BORDER.solid} ${BORDER.neutral600} ${BORDER.roundedMd}`,
    formSelect: `${COMPONENT_RESPONSIVE.input.field} ${BG.zinc950} ${BORDER.solid} ${BORDER.neutral600} ${BORDER.roundedMd}`,

    // Tabelas responsivas
    table: `${COMPONENT_RESPONSIVE.table.container}`,
    tableElement: `${COMPONENT_RESPONSIVE.table.table}`,
    tableHeader: `${COMPONENT_RESPONSIVE.table.header}`,
    tableCell: `${COMPONENT_RESPONSIVE.table.cell}`,

    // Navegação responsiva
    nav: `${COMPONENT_RESPONSIVE.nav.container}`,
    navItem: `${COMPONENT_RESPONSIVE.nav.item}`,
    navActive: `${COMPONENT_RESPONSIVE.nav.active}`
} as const;

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

// Função para criar estilos condicionais
export const createStyle = (base: string, conditional?: string, condition?: boolean): string => {
    return condition ? `${base} ${conditional}` : base;
};

// Função para cores de ícones baseadas no status
export const getIconColor = (name: string, isLegacy: boolean) => {
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

// Função para formatação de dados de movimentação
export const formatMovementData = (movement: any) => ({
    id: movement.id.toString(),
    title: movement.type,
    date: `${new Date(movement.startDate).toLocaleDateString('pt-BR')}${movement.endDate ? ` - ${new Date(movement.endDate).toLocaleDateString('pt-BR')}` : ''}`,
    frequency: `Frequência: ${movement.frequency}`,
    type: movement.type,
    value: movement.value,
    isCredit: movement.type === 'CREDIT'
});

// Função para formatação de dados de seguro
export const formatInsuranceData = (insurance: any) => ({
    id: insurance.id.toString(),
    title: insurance.name,
    type: (insurance as any).type || 'Seguro de Vida',
    duration: `Duração: ${Math.floor(insurance.durationMonths / 12)} anos`,
    premium: `Prêmio: R$ ${insurance.premium.toLocaleString('pt-BR')}/mês`,
    value: insurance.insuredValue
});

// Função para obter label de status
export const getStatusLabel = (status: string) => {
    switch (status) {
        case 'VIVO': return 'Vivo';
        case 'MORTO': return 'Morto';
        case 'INVALIDO': return 'Inválido';
        default: return status;
    }
};

// ============================================================================
// CONSTANTES ADICIONAIS PARA PÁGINA DE PROJEÇÃO
// ============================================================================

// Estilos para controles de simulação
export const SIMULATION_CONTROLS_STYLES = {
    container: "flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-12",
    button: {
        container: "flex items-center gap-2 sm:gap-3 md:gap-4",
        text: "text-sm sm:text-base md:text-lg font-medium text-zinc-200",
        icon: "w-4 h-4 sm:w-5 sm:h-5 text-zinc-400"
    }
};

// Estilos para timeline
export const TIMELINE_STYLES = {
    container: "w-full h-32 bg-zinc-900 rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 w-full overflow-x-auto sm:overflow-x-visible",
    title: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4",
    content: "flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8",
    line: "w-full h-1 bg-zinc-700 rounded-full relative",
    salary: "w-2 h-2 bg-blue-500 rounded-full absolute top-1/2 transform -translate-y-1/2",
    costOfLiving: "w-2 h-2 bg-red-500 rounded-full absolute top-1/2 transform -translate-y-1/2",
    years: "w-2 h-2 bg-green-500 rounded-full absolute top-1/2 transform -translate-y-1/2",
    mainLine: "w-2 h-2 bg-yellow-500 rounded-full absolute top-1/2 transform -translate-y-1/2"
};

// Estilos para posicionamento absoluto
export const ABSOLUTE_POSITIONS = {
    left0: "left-0",
    left200: "left-[200px]",
    left400: "left-[400px]",
    left600: "left-[600px]",
    left800: "left-[800px]"
};

// Estilos para texto
export const TEXT_STYLES = {
    center: "text-center",
    left: "text-left",
    right: "text-right"
};

// Estilos para flexbox
export const FLEX_STYLES = {
    center: "flex items-center justify-center",
    gap1: "flex gap-1",
    gap2: "flex gap-2",
    gap3: "flex gap-3",
    gap4: "flex gap-4"
};

// Estilos para status de cenário
export const SCENARIO_STATUS_STYLES = {
    container: "flex items-center gap-2 sm:gap-3 md:gap-4",
    label: "text-sm sm:text-base font-medium text-zinc-300",
    value: "text-sm sm:text-base font-semibold text-zinc-100"
};

// Estilos para eixos do gráfico
export const CHART_AXIS_STYLES = {
    yAxis: "text-xs sm:text-sm text-zinc-400",
    xAxis: "text-xs sm:text-sm text-zinc-400"
};

// Estilos para linhas do gráfico
export const CHART_LINE_STYLES = {
    line: "stroke-2",
    dot: "w-2 h-2"
};
