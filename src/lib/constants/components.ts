import { UI_CONFIG, COMMON_CLASSES } from './ui';

// Constantes para componentes específicos
export const COMPONENT_CONFIG = {
    // Botões
    button: {
        primary: `${COMMON_CLASSES.button.primary} ${COMMON_CLASSES.flexCenter}`,
        secondary: `${COMMON_CLASSES.button.secondary} ${COMMON_CLASSES.flexCenter}`,
        outline: `${COMMON_CLASSES.button.outline} ${COMMON_CLASSES.flexCenter}`,
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-md transition-colors duration-200',
        destructive: 'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200',
        icon: 'p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200'
    },

    // Cards
    card: {
        default: `${COMMON_CLASSES.card} ${COMMON_CLASSES.cardHover}`,
        header: 'flex items-center justify-between p-6 pb-0',
        title: `${COMMON_CLASSES.text.h4} text-gray-900 dark:text-white`,
        content: 'p-6 pt-0',
        footer: 'flex items-center justify-between p-6 pt-0'
    },

    // Inputs
    input: {
        default: `${COMMON_CLASSES.input} dark:bg-gray-800 dark:border-gray-600 dark:text-white`,
        error: `${COMMON_CLASSES.input} border-red-500 focus:ring-red-500 focus:border-red-500`,
        disabled: `${COMMON_CLASSES.input} bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-50`
    },

    // Labels
    label: {
        default: 'text-sm font-medium text-gray-700 dark:text-gray-300',
        required: 'text-sm font-medium text-gray-700 dark:text-gray-300 after:content-["*"] after:ml-0.5 after:text-red-500',
        error: 'text-sm font-medium text-red-600 dark:text-red-400'
    },

    // Badges
    badge: {
        default: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300'
    },

    // Tables
    table: {
        container: 'w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700',
        header: 'bg-gray-50 dark:bg-gray-800',
        headerCell: 'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
        body: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
        row: 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150',
        cell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white',
        footer: 'bg-gray-50 dark:bg-gray-800 px-6 py-3 text-sm text-gray-500 dark:text-gray-400'
    },

    // Modals
    modal: {
        overlay: 'fixed inset-0 bg-black bg-opacity-50 z-50',
        container: 'fixed inset-0 z-50 flex items-center justify-center p-4',
        content: 'bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto',
        header: 'flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700',
        title: `${COMMON_CLASSES.text.h3} text-gray-900 dark:text-white`,
        body: 'p-6',
        footer: 'flex items-center justify-end gap-2 p-6 border-t border-gray-200 dark:border-gray-700'
    },

    // Dropdowns
    dropdown: {
        trigger: 'flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
        content: 'absolute z-10 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg',
        item: 'flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer',
        separator: 'border-t border-gray-200 dark:border-gray-700 my-1'
    },

    // Forms
    form: {
        container: 'space-y-6',
        field: 'space-y-2',
        fieldGroup: 'grid grid-cols-1 md:grid-cols-2 gap-4',
        fieldRow: 'flex items-center gap-4',
        error: 'text-sm text-red-600 dark:text-red-400',
        help: 'text-sm text-gray-500 dark:text-gray-400'
    },

    // Loading states
    loading: {
        spinner: 'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600',
        skeleton: 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
        text: 'text-gray-500 dark:text-gray-400 text-center py-8'
    },

    // Empty states
    empty: {
        container: 'text-center py-12',
        icon: 'mx-auto h-12 w-12 text-gray-400 dark:text-gray-500',
        title: `${COMMON_CLASSES.text.h4} text-gray-500 dark:text-gray-400 mb-2`,
        description: 'text-gray-500 dark:text-gray-400 mb-4',
        action: 'mt-4'
    }
} as const;
