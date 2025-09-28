import { UI_CONFIG, COMMON_CLASSES } from './ui';

// Constantes para componentes de layout
export const LAYOUT_CONFIG = {
    // AppLayout
    appLayout: 'min-h-screen bg-gray-50 dark:bg-gray-900',
    mainContent: 'flex-1 flex flex-col',

    // PageContainer
    pageContainer: 'flex-1 p-6 md:p-8 lg:p-12',
    pageHeader: 'mb-8',
    pageTitle: `${COMMON_CLASSES.text.h1} text-gray-900 dark:text-white mb-2`,
    pageDescription: `${COMMON_CLASSES.text.body} text-gray-600 dark:text-gray-400`,

    // Section
    section: 'mb-8',
    sectionHeader: 'flex items-center justify-between mb-6',
    sectionTitle: `${COMMON_CLASSES.text.h3} text-gray-900 dark:text-white`,
    sectionDescription: `${COMMON_CLASSES.text.body} text-gray-600 dark:text-gray-400 mb-4`,
    sectionActions: 'flex items-center gap-2',
    sectionContent: 'space-y-6',

    // ClientWrapper
    clientWrapper: 'min-h-screen flex flex-col',

    // Responsive
    responsive: {
        mobile: 'block sm:hidden',
        tablet: 'hidden sm:block lg:hidden',
        desktop: 'hidden lg:block',
        mobileTablet: 'block lg:hidden',
        tabletDesktop: 'hidden sm:block'
    }
} as const;

// Constantes para breakpoints
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
} as const;

// Constantes para z-index
export const Z_INDEX = {
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    toast: 70
} as const;
