// Constantes específicas para cada rota da aplicação

export const ROUTES = {
    HOME: '/',
    ALLOCATIONS: '/alocacoes',
    PROJECTIONS: '/projecao',
    HISTORY: '/historico'
} as const;

export const NAVIGATION_ITEMS = {
    ALLOCATIONS: {
        label: 'Alocações',
        href: ROUTES.ALLOCATIONS
    },
    PROJECTIONS: {
        label: 'Projeção',
        href: ROUTES.PROJECTIONS
    },
    HISTORY: {
        label: 'Histórico',
        href: ROUTES.HISTORY
    }
} as const;

// Configuração de navegação para cada página
export const PAGE_NAVIGATION = {
    [ROUTES.HOME]: [
        { ...NAVIGATION_ITEMS.ALLOCATIONS, isActive: true },
        NAVIGATION_ITEMS.PROJECTIONS,
        NAVIGATION_ITEMS.HISTORY
    ],
    [ROUTES.ALLOCATIONS]: [
        { ...NAVIGATION_ITEMS.ALLOCATIONS, isActive: true },
        NAVIGATION_ITEMS.PROJECTIONS,
        NAVIGATION_ITEMS.HISTORY
    ],
    [ROUTES.PROJECTIONS]: [
        NAVIGATION_ITEMS.ALLOCATIONS,
        { ...NAVIGATION_ITEMS.PROJECTIONS, isActive: true },
        NAVIGATION_ITEMS.HISTORY
    ],
    [ROUTES.HISTORY]: [
        NAVIGATION_ITEMS.ALLOCATIONS,
        NAVIGATION_ITEMS.PROJECTIONS,
        { ...NAVIGATION_ITEMS.HISTORY, isActive: true }
    ]
} as const;
