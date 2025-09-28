// Constantes centralizadas para UI
export const UI_CONFIG = {
    // Cores principais
    colors: {
        primary: '#9F9F9F',
        secondary: '#B1B1B1',
        background: {
            dark: '#101010',
            stone: '#1a1a1a',
            card: '#2a2a2a'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#9F9F9F',
            muted: '#6B7280'
        },
        accent: {
            orange: '#FA4515',
            red: '#DC2626',
            green: '#10B981',
            blue: '#3B82F6'
        }
    },

    // Tamanhos
    sizes: {
        icon: { width: 24, height: 24 },
        iconSmall: { width: 16, height: 16 },
        iconLarge: { width: 24, height: 24 },
        dropdown: { width: 16, height: 8 },
        logo: { width: 96, height: 42 }
    },

    // Espaçamentos
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem'
    },

    // Bordas
    borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px'
    },

    // Sombras
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    },

    // Transições
    transitions: {
        fast: '150ms ease-in-out',
        normal: '300ms ease-in-out',
        slow: '500ms ease-in-out'
    },

    // Breakpoints
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    }
} as const;

// Filtros CSS para ícones
export const ICON_FILTERS = {
    primary: 'filter brightness-0 saturate-100',
    primaryStyle: {
        filter: 'brightness(0) saturate(100%) invert(63%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
    },
    white: 'filter brightness-0 saturate-100',
    whiteStyle: {
        filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
    }
} as const;

// Classes CSS comuns
export const COMMON_CLASSES = {
    // Layout
    container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    section: 'py-8 md:py-12 lg:py-16',

    // Flexbox
    flexCenter: 'flex items-center justify-center',
    flexBetween: 'flex items-center justify-between',
    flexStart: 'flex items-center justify-start',
    flexEnd: 'flex items-center justify-end',

    // Grid
    gridCols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    },

    // Cards
    card: 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
    cardHover: 'hover:shadow-lg transition-shadow duration-300',

    // Botões
    button: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors duration-200',
        outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200'
    },

    // Inputs
    input: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',

    // Texto
    text: {
        h1: 'text-3xl md:text-4xl lg:text-5xl font-bold',
        h2: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
        h3: 'text-xl md:text-2xl lg:text-3xl font-semibold',
        h4: 'text-lg md:text-xl lg:text-2xl font-medium',
        body: 'text-base leading-relaxed',
        small: 'text-sm text-gray-600 dark:text-gray-400',
        muted: 'text-sm text-gray-500 dark:text-gray-500'
    }
} as const;
