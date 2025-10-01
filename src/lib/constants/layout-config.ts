/**
 * @fileoverview Constantes de layout global - Financial Planner
 * @description Configurações de estrutura HTML para Server Components
 */

/**
 * Constantes de layout global do Financial Planner
 * Centraliza todas as configurações de estrutura HTML
 */
export const LAYOUT_CONFIG = {
  // Estrutura principal
  main: {
    className: 'min-h-screen bg-background text-foreground',
  },

  // Header global
  header: {
    className:
      'sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    container: 'container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8',
    logo: {
      container: 'flex items-center space-x-4',
      icon: 'h-8 w-8 rounded-lg bg-primary',
      title: 'text-xl font-bold',
    },
    nav: {
      container: 'hidden md:flex items-center space-x-6',
      link: 'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors',
    },
    user: {
      container: 'flex items-center space-x-4',
      avatar: 'h-8 w-8 rounded-full bg-muted',
    },
  },

  // Sidebar global
  sidebar: {
    className: 'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card',
    container: 'p-6',
    nav: {
      container: 'space-y-2',
      link: 'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
      icon: 'h-4 w-4 rounded',
    },
  },

  // Conteúdo principal
  mainContent: {
    className: 'ml-64 min-h-[calc(100vh-4rem)] p-6',
    container: 'container mx-auto max-w-7xl',
  },

  // Navegação específica
  navigation: {
    allocations: {
      href: '/alocacoes',
      label: 'Alocações',
      iconColor: 'bg-blue-500',
    },
    projections: {
      href: '/projecao',
      label: 'Projeções',
      iconColor: 'bg-green-500',
    },
    history: {
      href: '/historico',
      label: 'Histórico',
      iconColor: 'bg-purple-500',
    },
  },
} as const;

/**
 * Função para obter configurações de layout
 *
 * @param section - Seção do layout
 * @returns Configurações da seção
 */
export function getLayoutConfig(section: keyof typeof LAYOUT_CONFIG) {
  return LAYOUT_CONFIG[section];
}
