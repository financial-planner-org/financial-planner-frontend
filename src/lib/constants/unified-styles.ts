// ============================================================================
// ESTILOS UNIFICADOS - FINANCIAL PLANNER
// ============================================================================
// Este arquivo consolida apenas os estilos que estão sendo utilizados no projeto,
// eliminando redundâncias e mantendo apenas o essencial.

// ============================================================================
// CLASSES CSS UTILITÁRIAS
// ============================================================================

// Layout
export const LAYOUT = {
    flexCenter: 'flex items-center justify-center',
    flexBetween: 'flex items-center justify-between',
    flexStart: 'flex items-center justify-start',
    flexEnd: 'flex items-center justify-end',
    flexCol: 'flex flex-col',
    flexRow: 'flex flex-row',
    gap1: 'gap-1',
    gap2: 'gap-2',
    gap4: 'gap-4',
    gap6: 'gap-6',
} as const;

// Posicionamento
export const POSITION = {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    absoluteLeft0: 'absolute left-0',
    absoluteLeft200: 'absolute left-[200px]',
    absoluteLeft400: 'absolute left-[400px]',
    absoluteLeft800: 'absolute left-[800px]',
} as const;

// Texto
export const TEXT = {
    primary: 'text-foreground',
    secondary: 'text-muted-foreground',
    center: 'text-center',
    success: 'text-green-500',
    accent: 'text-blue-500',
} as const;

// Tamanhos
export const SIZE = {
    wFull: 'w-full',
    w0_5: 'w-0.5',
    w2: 'w-2',
    w3: 'w-3',
    w4: 'w-4',
    w12: 'w-12',
    h2: 'h-2',
    h3: 'h-3',
    h4: 'h-4',
    h8: 'h-8',
    h12: 'h-12',
    h24: 'h-24',
    h32: 'h-32',
    hFull: 'h-full',
    h0_5: 'h-0.5',
} as const;

// Backgrounds
export const BG = {
    transparent: 'bg-transparent',
    zinc900: 'bg-zinc-900',
    zinc950: 'bg-zinc-950',
    neutral800: 'bg-neutral-800',
    blue500: 'bg-blue-500',
    amber500: 'bg-amber-500',
} as const;

// Bordas
export const BORDER = {
    solid: 'border',
    roundedMd: 'rounded-md',
    roundedLg: 'rounded-lg',
    roundedFull: 'rounded-full',
    neutral600: 'border-neutral-600',
    blue500: 'border-blue-500',
} as const;

// ============================================================================
// RESPONSIVIDADE
// ============================================================================

export const CONTAINER_RESPONSIVE = {
    page: 'p-6 max-w-7xl mx-auto',
    section: 'w-full',
    cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    main: 'w-full',
    sidebar: 'w-80 h-full bg-background border-r border-border/20 flex-shrink-0',
    mainContent: 'flex-1 min-h-screen overflow-y-auto',
    timeline: 'flex space-x-4 overflow-x-auto',
} as const;

export const MOBILE_RESPONSIVE = {
    mobileSidebarOverlay: 'fixed inset-0 bg-black/50 z-40 lg:hidden',
    mobileSidebarContent: 'fixed left-0 top-0 z-50 h-full w-80 bg-background border-r border-border/20',
} as const;

// ============================================================================
// TIPOGRAFIA RESPONSIVA
// ============================================================================

export const TYPOGRAPHY_RESPONSIVE = {
    h1: 'text-3xl font-bold tracking-tight',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    h5: 'text-base font-semibold',
    bodyLarge: 'text-lg',
    bodySmall: 'text-sm',
    caption: 'text-xs',
} as const;

// ============================================================================
// ESPAÇAMENTO RESPONSIVO
// ============================================================================

export const SPACING_RESPONSIVE = {
    padding: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
    },
    gap: {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
    },
} as const;

// ============================================================================
// COMPONENTES RESPONSIVOS
// ============================================================================

export const COMPONENT_RESPONSIVE = {
    button: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    },
    input: {
        container: 'space-y-2',
        label: 'text-sm font-medium',
        field: 'w-full px-3 py-2 text-sm',
    },
} as const;

// ============================================================================
// ZOOM RESPONSIVO
// ============================================================================

export const ZOOM_RESPONSIVE = {
    zoomContainer: 'w-full max-w-full overflow-x-auto',
    zoomCard: 'min-w-0 flex-shrink-0',
    zoomChart: 'w-full h-[500px]',
    zoomTimeline: 'w-full h-32',
} as const;

// ============================================================================
// UTILITÁRIOS RESPONSIVOS
// ============================================================================

export const RESPONSIVE_UTILS = {
    adaptive: 'w-full',
    overflowResponsive: 'overflow-x-auto',
} as const;

// ============================================================================
// ESTILOS DE PÁGINAS
// ============================================================================

export const ALLOCATIONS_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,
} as const;

export const PROJECTIONS_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,
    projections: {
        container: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} ${SIZE.wFull} mb-6`,
        current: {
            container: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm} ${SIZE.wFull} ${SIZE.h24} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
            year: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
            value: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} font-bold`,
            age: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
            bar: `${SIZE.wFull} ${SIZE.h2} ${BG.neutral800} ${BORDER.roundedFull}`,
            barFill: `${SIZE.h2} ${BG.blue500} ${BORDER.roundedFull}`,
        },
        future: {
            container: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm} ${SIZE.wFull} ${SIZE.h24} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
            year: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
            age: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
            value: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} font-bold`,
            percentage: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.success} font-medium`,
            bar: `${SIZE.wFull} ${SIZE.h2} ${BG.neutral800} ${BORDER.roundedFull}`,
            barFill: `${SIZE.h2} ${BG.blue500} ${BORDER.roundedFull}`,
        },
    },
    scenarioStatus: {
        container: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} mb-4`,
        radio: `${SIZE.w4} ${SIZE.h4} ${BORDER.roundedFull} ${BORDER.solid} ${BORDER.neutral600}`,
        label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary}`,
    },
    chart: {
        container: `${ZOOM_RESPONSIVE.zoomChart} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} mb-4`,
        controls: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} mb-4 ${RESPONSIVE_UTILS.overflowResponsive}`,
        link: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.accent} cursor-pointer hover:underline`,
        yAxis: {
            container: `${POSITION.absolute} left-0 top-0 ${SIZE.w12} ${SIZE.hFull} ${LAYOUT.flexCol} ${LAYOUT.flexBetween} ${SPACING_RESPONSIVE.padding.sm}`,
            label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
        },
        lines: {
            original: `${POSITION.absolute} top-20 left-12 ${SIZE.wFull} ${SIZE.h0_5} ${BG.blue500}`,
            current: `${POSITION.absolute} top-32 left-12 ${SIZE.wFull} ${SIZE.h0_5} ${BG.blue500}`,
            realized: `${POSITION.absolute} top-44 left-12 ${SIZE.wFull} ${SIZE.h0_5} ${BG.blue500}`,
        },
        dots: {
            amber: `${SIZE.w3} ${SIZE.h3} ${BG.amber500} ${BORDER.roundedFull} ${POSITION.absolute}`,
        },
    },
    simulationControls: {
        container: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} mb-4`,
        button: {
            container: `${COMPONENT_RESPONSIVE.button.md} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer hover:bg-neutral-700`,
            selected: `${COMPONENT_RESPONSIVE.button.md} ${BG.blue500} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer`,
            radio: `${SIZE.w4} ${SIZE.h4} ${BORDER.roundedFull} ${BORDER.solid} ${BORDER.neutral600}`,
            radioSelected: `${SIZE.w4} ${SIZE.h4} ${BORDER.roundedFull} ${BORDER.solid} ${BORDER.blue500}`,
            radioFill: `${SIZE.w2} ${SIZE.h2} ${BG.transparent} ${BORDER.roundedFull}`,
            radioFillSelected: `${SIZE.w2} ${SIZE.h2} ${BG.blue500} ${BORDER.roundedFull}`,
        },
    },
    timeline: {
        container: `${SIZE.wFull} ${SIZE.h32} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomTimeline}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} mb-4`,
        salary: {
            container: `${POSITION.relative} ${SIZE.wFull} ${SIZE.h8} mb-4`,
            label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary}`,
            dot: `${SIZE.w3} ${SIZE.h3} ${BG.blue500} ${BORDER.roundedFull} ${POSITION.absolute}`,
        },
        years: {
            container: `${LAYOUT.flexRow} ${LAYOUT.flexBetween} ${SIZE.wFull} mb-4`,
            year: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary}`,
            age: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
        },
        costOfLiving: {
            container: `${POSITION.relative} ${SIZE.wFull} ${SIZE.h8} mb-4`,
            label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary}`,
            dot: `${SIZE.w3} ${SIZE.h3} ${BG.blue500} ${BORDER.roundedFull} ${POSITION.absolute}`,
        },
        mainLine: `${POSITION.absolute} top-4 left-0 ${SIZE.wFull} ${SIZE.h0_5} ${BG.blue500}`,
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
        cardDate: `${TYPOGRAPHY_RESPONSIVE.caption}`,
    },
    insurances: {
        container: `${SIZE.wFull} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomCard}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} mb-4`,
        cards: `${CONTAINER_RESPONSIVE.cards}`,
        card: `${SIZE.wFull} ${BG.neutral800} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
        cardTitle: `${TYPOGRAPHY_RESPONSIVE.bodySmall} font-medium mb-2`,
        cardValue: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} font-bold mb-1`,
        cardDetails: `${TYPOGRAPHY_RESPONSIVE.caption}`,
    },
} as const;

export const HISTORY_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,
    header: {
        container: `${LAYOUT.flexBetween} ${SIZE.wFull} mb-6`,
        title: `${TYPOGRAPHY_RESPONSIVE.h2} ${TEXT.primary}`,
        menu: `${COMPONENT_RESPONSIVE.button.sm} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd}`,
    },
    filters: {
        container: `${COMPONENT_RESPONSIVE.input.container}`,
        label: `${COMPONENT_RESPONSIVE.input.label}`,
        select: `${COMPONENT_RESPONSIVE.input.field} ${BG.zinc950} ${BORDER.solid} ${BORDER.roundedMd}`,
    },
    cards: {
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
        menuButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd}`,
    },
    pagination: {
        container: `${LAYOUT.flexCenter} ${LAYOUT.flexCenter} ${SPACING_RESPONSIVE.gap.sm} mt-8`,
        button: `${COMPONENT_RESPONSIVE.button.sm} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd}`,
        pageInfo: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
    },
} as const;

// ============================================================================
// ESTILOS COMUNS
// ============================================================================

export const COMMON_STYLES = {
    pageContainer: `${CONTAINER_RESPONSIVE.page} ${SPACING_RESPONSIVE.padding.md}`,
    sectionContainer: `${CONTAINER_RESPONSIVE.section} ${SIZE.wFull}`,
    cardContainer: `${CONTAINER_RESPONSIVE.cards} ${SIZE.wFull}`,

    // Títulos
    pageTitle: `${TYPOGRAPHY_RESPONSIVE.h1} ${TEXT.primary} mb-6`,
    sectionTitle: `${TYPOGRAPHY_RESPONSIVE.h2} ${TEXT.primary} mb-4`,
    cardTitle: `${TYPOGRAPHY_RESPONSIVE.h3} ${TEXT.primary} mb-2`,

    // Botões
    primaryButton: `${COMPONENT_RESPONSIVE.button.md} ${BG.blue500} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer`,
    secondaryButton: `${COMPONENT_RESPONSIVE.button.md} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer`,
    outlineButton: `${COMPONENT_RESPONSIVE.button.md} ${BG.transparent} ${TEXT.primary} ${BORDER.solid} ${BORDER.neutral600} ${BORDER.roundedMd} cursor-pointer`,

    // Cards
    card: `${SIZE.wFull} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomCard}`,
    cardHeader: `${LAYOUT.flexBetween} ${LAYOUT.flexCenter} mb-4`,
    cardContent: `${LAYOUT.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,

    // Utilitários
    flexCenter: `${LAYOUT.flexCenter}`,
    flexBetween: `${LAYOUT.flexBetween}`,
    textCenter: `${TEXT.center}`,
    absoluteLeft0: `${POSITION.absoluteLeft0}`,
    absoluteLeft200: `${POSITION.absoluteLeft200}`,
    absoluteLeft400: `${POSITION.absoluteLeft400}`,
    absoluteLeft800: `${POSITION.absoluteLeft800}`,
} as const;

// ============================================================================
// ESTILOS ESPECÍFICOS PARA COMPONENTES
// ============================================================================

export const SCENARIO_STATUS_STYLES = {
    container: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} mb-4`,
} as const;

export const CHART_AXIS_STYLES = {
    container: `${POSITION.absolute} left-0 top-0 ${SIZE.w12} ${SIZE.hFull} ${LAYOUT.flexCol} ${LAYOUT.flexBetween} ${SPACING_RESPONSIVE.padding.sm}`,
    label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
} as const;

export const CHART_LINE_STYLES = {
    original: `${POSITION.absolute} top-20 left-12 ${SIZE.wFull} ${SIZE.h0_5} ${BG.blue500}`,
    current: `${POSITION.absolute} top-32 left-12 ${SIZE.wFull} ${SIZE.h0_5} ${BG.blue500}`,
    realized: `${POSITION.absolute} top-44 left-12 ${SIZE.wFull} ${SIZE.h0_5} ${BG.blue500}`,
} as const;

export const SIMULATION_CONTROLS_STYLES = {
    container: `${LAYOUT.flexRow} ${SPACING_RESPONSIVE.gap.sm} mb-4`,
    button: {
        container: `${COMPONENT_RESPONSIVE.button.md} ${BG.neutral800} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer hover:bg-neutral-700`,
        selected: `${COMPONENT_RESPONSIVE.button.md} ${BG.blue500} ${TEXT.primary} ${BORDER.roundedMd} cursor-pointer`,
        text: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary}`,
    },
} as const;

export const TIMELINE_STYLES = {
    container: `${SIZE.wFull} ${SIZE.h32} ${BG.zinc900} ${BORDER.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomTimeline}`,
    title: `${TYPOGRAPHY_RESPONSIVE.h3} mb-4`,
    salary: {
        container: `${POSITION.relative} ${SIZE.wFull} ${SIZE.h8} mb-4`,
        label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary}`,
        dot: `${SIZE.w3} ${SIZE.h3} ${BG.blue500} ${BORDER.roundedFull} ${POSITION.absolute}`,
    },
    years: {
        container: `${LAYOUT.flexRow} ${LAYOUT.flexBetween} ${SIZE.wFull} mb-4`,
        year: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary}`,
        age: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.secondary}`,
    },
    costOfLiving: {
        container: `${POSITION.relative} ${SIZE.wFull} ${SIZE.h8} mb-4`,
        label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT.primary}`,
        dot: `${SIZE.w3} ${SIZE.h3} ${BG.blue500} ${BORDER.roundedFull} ${POSITION.absolute}`,
    },
    mainLine: `${POSITION.absolute} top-4 left-0 ${SIZE.wFull} ${SIZE.h0_5} ${BG.blue500}`,
} as const;

export const ABSOLUTE_POSITIONS = {
    left0: `${POSITION.absoluteLeft0}`,
    left200: `${POSITION.absoluteLeft200}`,
    left400: `${POSITION.absoluteLeft400}`,
    left800: `${POSITION.absoluteLeft800}`,
} as const;

export const TEXT_STYLES = {
    center: `${TEXT.center}`,
    primary: `${TEXT.primary}`,
    secondary: `${TEXT.secondary}`,
} as const;

export const FLEX_STYLES = {
    gap1: `${LAYOUT.gap1}`,
    gap2: `${LAYOUT.gap2}`,
    gap4: `${LAYOUT.gap4}`,
    gap6: `${LAYOUT.gap6}`,
} as const;

// ============================================================================
// FUNÇÃO AUXILIAR PARA CORES DE ÍCONES
// ============================================================================

export const getIconColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'ativo':
        case 'active':
            return 'text-green-500';
        case 'inativo':
        case 'inactive':
            return 'text-red-500';
        case 'pendente':
        case 'pending':
            return 'text-yellow-500';
        default:
            return 'text-muted-foreground';
    }
};