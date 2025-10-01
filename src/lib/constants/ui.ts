// ============================================================================
// CONSTANTES DE UI - FINANCIAL PLANNER
// ============================================================================
// Centraliza configurações de interface e componentes

export const UI_CONFIG = {
    // Configurações de tema
    theme: {
        defaultMode: 'dark',
        primaryColor: 'blue',
        accentColor: 'amber'
    },

    // Configurações de layout
    layout: {
        sidebarWidth: 'w-80',
        headerHeight: 'h-16',
        contentPadding: 'p-6',
        maxWidth: 'max-w-7xl'
    },

    // Configurações de breakpoints
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },

    // Configurações de animações
    animations: {
        duration: {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms'
        },
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
        }
    },

    // Configurações de z-index
    zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        modalBackdrop: 1040,
        modal: 1050,
        popover: 1060,
        tooltip: 1070
    }
} as const;

export const ICON_FILTERS = {
    // Filtros para ícones de status
    status: {
        active: 'text-green-500',
        inactive: 'text-red-500',
        pending: 'text-yellow-500',
        default: 'text-muted-foreground'
    },

    // Filtros para ícones de tipo
    type: {
        financial: 'text-blue-500',
        realEstate: 'text-amber-500',
        insurance: 'text-purple-500',
        movement: 'text-green-500',
        default: 'text-muted-foreground'
    }
} as const;

export const COMMON_CLASSES = {
    // Classes comuns para botões
    button: {
        base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        sizes: {
            sm: 'h-9 px-3',
            default: 'h-10 py-2 px-4',
            lg: 'h-11 px-8',
            icon: 'h-10 w-10'
        }
    },

    // Classes comuns para cards
    card: {
        base: 'rounded-lg border bg-card text-card-foreground shadow-sm',
        header: 'flex flex-col space-y-1.5 p-6',
        title: 'text-2xl font-semibold leading-none tracking-tight',
        description: 'text-sm text-muted-foreground',
        content: 'p-6 pt-0',
        footer: 'flex items-center p-6 pt-0'
    },

    // Classes comuns para inputs
    input: {
        base: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        error: 'border-destructive focus-visible:ring-destructive'
    },

    // Classes comuns para labels
    label: {
        base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    }
} as const;
