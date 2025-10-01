// ============================================================================
// CONSTANTES DE ROTAS - FINANCIAL PLANNER
// ============================================================================
// Centraliza todas as rotas e configurações de navegação

export const ROUTES = {
    HOME: '/',
    ALLOCATIONS: '/alocacoes',
    PROJECTIONS: '/projecao',
    HISTORY: '/historico',
    MOVEMENTS: '/movimentacoes',
    INSURANCE: '/seguros'
} as const;

export const NAVIGATION_ITEMS = {
    ALLOCATIONS: {
        label: 'Alocações',
        href: ROUTES.ALLOCATIONS,
        icon: 'Building2'
    },
    PROJECTIONS: {
        label: 'Projeção Patrimonial',
        href: ROUTES.PROJECTIONS,
        icon: 'TrendingUp'
    },
    MOVEMENTS: {
        label: 'Movimentações',
        href: ROUTES.MOVEMENTS,
        icon: 'DollarSign'
    },
    HISTORY: {
        label: 'Histórico de Simulações',
        href: ROUTES.HISTORY,
        icon: 'History'
    },
    INSURANCE: {
        label: 'Seguros',
        href: ROUTES.INSURANCE,
        icon: 'Shield'
    }
} as const;

// Configuração de navegação para cada página
export const PAGE_NAVIGATION = {
    [ROUTES.HOME]: [
        { ...NAVIGATION_ITEMS.ALLOCATIONS, isActive: true },
        NAVIGATION_ITEMS.PROJECTIONS,
        NAVIGATION_ITEMS.MOVEMENTS,
        NAVIGATION_ITEMS.HISTORY,
        NAVIGATION_ITEMS.INSURANCE
    ],
    [ROUTES.ALLOCATIONS]: [
        { ...NAVIGATION_ITEMS.ALLOCATIONS, isActive: true },
        NAVIGATION_ITEMS.PROJECTIONS,
        NAVIGATION_ITEMS.MOVEMENTS,
        NAVIGATION_ITEMS.HISTORY,
        NAVIGATION_ITEMS.INSURANCE
    ],
    [ROUTES.PROJECTIONS]: [
        NAVIGATION_ITEMS.ALLOCATIONS,
        { ...NAVIGATION_ITEMS.PROJECTIONS, isActive: true },
        NAVIGATION_ITEMS.MOVEMENTS,
        NAVIGATION_ITEMS.HISTORY,
        NAVIGATION_ITEMS.INSURANCE
    ],
    [ROUTES.MOVEMENTS]: [
        NAVIGATION_ITEMS.ALLOCATIONS,
        NAVIGATION_ITEMS.PROJECTIONS,
        { ...NAVIGATION_ITEMS.MOVEMENTS, isActive: true },
        NAVIGATION_ITEMS.HISTORY,
        NAVIGATION_ITEMS.INSURANCE
    ],
    [ROUTES.HISTORY]: [
        NAVIGATION_ITEMS.ALLOCATIONS,
        NAVIGATION_ITEMS.PROJECTIONS,
        NAVIGATION_ITEMS.MOVEMENTS,
        { ...NAVIGATION_ITEMS.HISTORY, isActive: true },
        NAVIGATION_ITEMS.INSURANCE
    ],
    [ROUTES.INSURANCE]: [
        NAVIGATION_ITEMS.ALLOCATIONS,
        NAVIGATION_ITEMS.PROJECTIONS,
        NAVIGATION_ITEMS.MOVEMENTS,
        NAVIGATION_ITEMS.HISTORY,
        { ...NAVIGATION_ITEMS.INSURANCE, isActive: true }
    ]
} as const;
