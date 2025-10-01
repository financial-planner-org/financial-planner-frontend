/**
 * @fileoverview Constantes de tema e layout - Financial Planner
 * @description Centraliza todas as configurações de tema, cores, estilos globais e layout
 */

'use client';

import { useEffect } from 'react';

// ============================================================================
// 1. FUNDAÇÃO - CORES E TIPOGRAFIA
// ============================================================================

/**
 * Paleta de cores da aplicação, baseada no dark mode do Figma.
 */
export const colors = {
  // Cores primárias
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Cor primária principal
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },

  // Cores secundárias
  secondary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', // Cor secundária principal
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },

  // Cores de sucesso
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Cor de sucesso principal
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Cores de aviso
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Cor de aviso principal
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Cores de erro
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Cor de erro principal
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Tons de cinza
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280', // Cinza médio
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Cores de fundo
  background: {
    light: '#ffffff',
    dark: '#0f172a',
  },

  // Cores de texto
  text: {
    light: {
      primary: '#111827',
      secondary: '#4b5563',
      disabled: '#9ca3af',
    },
    dark: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      disabled: '#6b7280',
    },
  },
} as const;

/**
 * Configurações de tipografia da aplicação.
 */
export const typography = {
  fontFamily: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ].join(','),
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// 2. SISTEMA DE DESIGN - ESPAÇAMENTOS, BORDAS, SOMBRAS
// ============================================================================

/**
 * Sistema de espaçamentos da aplicação.
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
} as const;

/**
 * Configurações de bordas e raios.
 */
export const borders = {
  none: '0',
  sm: '1px',
  DEFAULT: '2px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const;

/**
 * Sistema de sombras da aplicação.
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const;

// ============================================================================
// 3. RESPONSIVIDADE E LAYOUT
// ============================================================================

/**
 * Breakpoints responsivos para a aplicação.
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Sistema de z-index para camadas.
 */
export const zIndex = {
  auto: 'auto',
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  modal: '1300',
  popover: '1400',
  toast: '1500',
  tooltip: '1600',
} as const;

/**
 * Sistema de opacidades da aplicação.
 */
export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

/**
 * Sistema de transições e animações.
 */
export const transitions = {
  duration: {
    '75': '75ms',
    '100': '100ms',
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
    '500': '500ms',
    '700': '700ms',
    '1000': '1000ms',
  },
  timingFunction: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================================================
// 4. INTEGRAÇÃO COM TAILWIND CSS
// ============================================================================

/**
 * Variáveis CSS para integração com Tailwind CSS.
 */
export const cssVariables = {
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '0 0% 9%',
    primaryForeground: '0 0% 98%',
    secondary: '0 0% 96.1%',
    secondaryForeground: '0 0% 9%',
    muted: '0 0% 96.1%',
    mutedForeground: '0 0% 45.1%',
    accent: '0 0% 96.1%',
    accentForeground: '0 0% 9%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '222.2 84% 4.9%',
    radius: '0.5rem',
    chart1: '160 84.1% 39.4%',
    chart2: '43 74.1% 49.4%',
    chart3: '217 91.2% 59.8%',
    chart4: '0 72.2% 50.6%',
    chart5: '270 95.2% 75.3%',
  },
  dark: {
    background: '222.2 84% 4.9%',
    foreground: '210 40% 98%',
    card: '222.2 84% 4.9%',
    cardForeground: '210 40% 98%',
    popover: '222.2 84% 4.9%',
    popoverForeground: '210 40% 98%',
    primary: '210 40% 98%',
    primaryForeground: '222.2 47.4% 11.2%',
    secondary: '217.2 32.6% 17.5%',
    secondaryForeground: '210 40% 98%',
    muted: '217.2 32.6% 17.5%',
    mutedForeground: '215 20.2% 65.1%',
    accent: '217.2 32.6% 17.5%',
    accentForeground: '210 40% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 40% 98%',
    border: '217.2 32.6% 17.5%',
    input: '217.2 32.6% 17.5%',
    ring: '212.7 26.8% 83.9%',
    radius: '0.5rem',
    chart1: '160 84.1% 39.4%',
    chart2: '43 74.1% 49.4%',
    chart3: '217 91.2% 59.8%',
    chart4: '0 72.2% 50.6%',
    chart5: '270 95.2% 75.3%',
  },
} as const;

// ============================================================================
// 5. TEMA PADRÃO
// ============================================================================

/**
 * Tema padrão da aplicação.
 */
export const defaultTheme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  breakpoints,
  zIndex,
  opacity,
  transitions,
  cssVariables,
} as const;

export type Theme = typeof defaultTheme;

// ============================================================================
// 6. CORES ESPECÍFICAS POR PÁGINA
// ============================================================================

/**
 * Cores específicas por página do Financial Planner
 * Cada página tem sua paleta de cores única baseada no tema dark
 */
export const PAGE_COLORS = {
  // Página de Alocações - Azul/Blue
  allocations: {
    primary: '#3b82f6', // blue-500
    secondary: '#1e40af', // blue-800
    accent: '#dbeafe', // blue-100
    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1e40af 100%)',
    card: 'rgba(30, 64, 175, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
    text: '#dbeafe',
    badge: 'bg-blue-500/20 text-blue-300',
    icon: 'bg-blue-500',
  },

  // Página de Projeções - Verde/Green
  projections: {
    primary: '#10b981', // emerald-500
    secondary: '#047857', // emerald-700
    accent: '#d1fae5', // emerald-100
    background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
    card: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.3)',
    text: '#d1fae5',
    badge: 'bg-green-500/20 text-green-300',
    icon: 'bg-green-500',
  },

  // Página de Histórico - Roxo/Purple
  history: {
    primary: '#8b5cf6', // violet-500
    secondary: '#6d28d9', // violet-700
    accent: '#ede9fe', // violet-100
    background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)',
    card: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.3)',
    text: '#ede9fe',
    badge: 'bg-purple-500/20 text-purple-300',
    icon: 'bg-purple-500',
  },

  // Página de Dashboard - Laranja/Orange
  dashboard: {
    primary: '#f97316', // orange-500
    secondary: '#ea580c', // orange-600
    accent: '#fed7aa', // orange-200
    background: 'linear-gradient(135deg, #9a3412 0%, #ea580c 50%, #f97316 100%)',
    card: 'rgba(249, 115, 22, 0.1)',
    border: 'rgba(249, 115, 22, 0.3)',
    text: '#fed7aa',
    badge: 'bg-orange-500/20 text-orange-300',
    icon: 'bg-orange-500',
  },

  // Página de Movimentações - Ciano/Cyan
  movements: {
    primary: '#06b6d4', // cyan-500
    secondary: '#0891b2', // cyan-600
    accent: '#cffafe', // cyan-100
    background: 'linear-gradient(135deg, #164e63 0%, #0891b2 50%, #06b6d4 100%)',
    card: 'rgba(6, 182, 212, 0.1)',
    border: 'rgba(6, 182, 212, 0.3)',
    text: '#cffafe',
    badge: 'bg-cyan-500/20 text-cyan-300',
    icon: 'bg-cyan-500',
  },

  // Página de Seguros - Vermelho/Red
  insurances: {
    primary: '#ef4444', // red-500
    secondary: '#dc2626', // red-600
    accent: '#fecaca', // red-200
    background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)',
    card: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
    text: '#fecaca',
    badge: 'bg-red-500/20 text-red-300',
    icon: 'bg-red-500',
  },
} as const;

// ============================================================================
// 7. LAYOUT GLOBAL
// ============================================================================

// ============================================================================
// 8. DIMENSÕES E CONFIGURAÇÕES DE LAYOUT
// ============================================================================

/**
 * Dimensões essenciais do layout.
 */
export const LAYOUT_DIMENSIONS = {
  sidebarWidth: {
    default: '280px',
    collapsed: '80px',
  },
  headerHeight: '64px',
  contentPadding: '24px',
  maxWidthContent: '1440px',
} as const;

/**
 * Transições de layout.
 */
export const LAYOUT_TRANSITIONS = {
  sidebar: 'width 0.3s ease-in-out',
  header: 'height 0.3s ease-in-out',
  fade: 'opacity 0.3s ease-in-out',
} as const;

/**
 * Estilos globais do body.
 */
export const BODY_STYLES = {
  margin: '0',
  padding: '0',
  scrollBehavior: 'smooth',
} as const;

/**
 * Configurações de scrollbar.
 */
export const SCROLLBAR_CONFIG = {
  width: '6px',
  borderRadius: '3px',
} as const;

/**
 * Breakpoints para responsividade.
 */
export const RESPONSIVE_BREAKPOINTS = {
  mobile: '640px',
  tablet: '1024px',
  desktop: '1025px',
} as const;

/**
 * Classes CSS utilitárias.
 */
export const CSS_CLASSES = {
  sidebar: 'sidebar-width',
  sidebarCollapsed: 'sidebar-width-collapsed',
  header: 'header-height',
  content: 'content-padding',
  scrollbar: 'scrollbar-thin',
  transitionFade: 'transition-fade',
  transitionSidebar: 'transition-sidebar',
  transitionHeader: 'transition-header',
  mobileHidden: 'mobile-hidden',
  tabletHidden: 'tablet-hidden',
  desktopHidden: 'desktop-hidden',
} as const;

// ============================================================================
// 9. FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Função para obter cores de uma página específica
 *
 * @param page - Nome da página
 * @returns Objeto com as cores da página
 */
export function getPageColors(page: keyof typeof PAGE_COLORS) {
  return PAGE_COLORS[page];
}

/**
 * Função para aplicar cores de página ao CSS
 *
 * @param page - Nome da página
 * @returns Objeto de estilos CSS
 */
export function getPageStyles(page: keyof typeof PAGE_COLORS) {
  const colors = getPageColors(page);

  return {
    background: colors.background,
    '--page-primary': colors.primary,
    '--page-secondary': colors.secondary,
    '--page-accent': colors.accent,
    '--page-card': colors.card,
    '--page-border': colors.border,
    '--page-text': colors.text,
  } as React.CSSProperties;
}

// ============================================================================
// 10. APLICAÇÃO DE ESTILOS GLOBAIS
// ============================================================================

/**
 * Aplica estilos globais ao documento usando constantes.
 *
 * @param theme - Tema a ser aplicado (padrão: 'dark')
 */
export function applyGlobalStyles(theme: 'light' | 'dark' = 'dark') {
  useEffect(() => {
    // Estilos do body usando constantes
    Object.assign(document.body.style, {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.normal,
      color: `hsl(${cssVariables.dark.foreground})`,
      backgroundColor: `hsl(${cssVariables.dark.background})`,
      ...BODY_STYLES,
    });

    // Variáveis CSS do tema
    const root = document.documentElement;
    Object.entries(cssVariables.dark).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });

    // Classe de tema
    root.classList.add('dark');

    // Classes CSS dinâmicas usando constantes
    const style = document.createElement('style');
    style.textContent = `
      .${CSS_CLASSES.sidebar} { width: ${LAYOUT_DIMENSIONS.sidebarWidth.default}; }
      .${CSS_CLASSES.sidebarCollapsed} { width: ${LAYOUT_DIMENSIONS.sidebarWidth.collapsed}; }
      .${CSS_CLASSES.header} { height: ${LAYOUT_DIMENSIONS.headerHeight}; }
      .${CSS_CLASSES.content} { padding: ${LAYOUT_DIMENSIONS.contentPadding}; }
      .${CSS_CLASSES.scrollbar} { scrollbar-width: thin; }
      .${CSS_CLASSES.scrollbar}::-webkit-scrollbar { width: ${SCROLLBAR_CONFIG.width}; }
      .${CSS_CLASSES.scrollbar}::-webkit-scrollbar-track { background: transparent; }
      .${CSS_CLASSES.scrollbar}::-webkit-scrollbar-thumb { background-color: ${colors.gray[600]}; border-radius: ${SCROLLBAR_CONFIG.borderRadius}; }
      .${CSS_CLASSES.scrollbar}::-webkit-scrollbar-thumb:hover { background-color: ${colors.gray[500]}; }
      .${CSS_CLASSES.transitionFade} { transition: ${LAYOUT_TRANSITIONS.fade}; }
      .${CSS_CLASSES.transitionSidebar} { transition: ${LAYOUT_TRANSITIONS.sidebar}; }
      .${CSS_CLASSES.transitionHeader} { transition: ${LAYOUT_TRANSITIONS.header}; }
      @media (max-width: ${RESPONSIVE_BREAKPOINTS.mobile}) { .${CSS_CLASSES.mobileHidden} { display: none !important; } }
      @media (min-width: ${parseInt(RESPONSIVE_BREAKPOINTS.mobile) + 1}px) and (max-width: ${RESPONSIVE_BREAKPOINTS.tablet}) { .${CSS_CLASSES.tabletHidden} { display: none !important; } }
      @media (min-width: ${RESPONSIVE_BREAKPOINTS.desktop}) { .${CSS_CLASSES.desktopHidden} { display: none !important; } }
    `;
    document.head.appendChild(style);

    return () => style.remove();
  }, [theme]);
}

/**
 * Componente para aplicar estilos globais.
 *
 * @param props - Props do componente
 * @returns JSX.Element
 */
export function GlobalStyles({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  applyGlobalStyles(theme);
  return null;
}

// ============================================================================
// 11. ESTILOS DE COMPONENTES E UI
// ============================================================================

/**
 * Containers e layouts padrão para páginas
 */
export const CONTAINER_STYLES = {
  // Container principal de página
  page: 'min-h-screen rounded-lg overflow-hidden',

  // Container com padding padrão
  padded: 'p-6',

  // Container com espaçamento vertical
  spaced: 'space-y-6',

  // Container de grid responsivo
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',

  // Container de grid com 4 colunas
  grid4: 'grid grid-cols-4 gap-4',

  // Container flexível
  flex: 'flex items-center justify-between',

  // Container flexível com espaçamento
  flexSpaced: 'flex items-center space-x-4',

  // Container de header de página
  pageHeader: 'bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50 mb-6',

  // Container de card simples
  cardSimple: 'bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50',

  // Espaçamento vertical padrão
  verticalSpace: 'space-y-4',
} as const;

/**
 * Estilos padrão para cards e painéis
 */
export const CARD_STYLES = {
  // Card base com backdrop
  base: 'bg-card/50 backdrop-blur-sm rounded-lg border border-border/50',

  // Card com padding padrão
  padded: 'bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50',

  // Card com padding menor
  compact: 'bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50',

  // Card de estatística
  stat: 'bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50',

  // Card de lista
  list: 'bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50',

  // Card de formulário
  form: 'bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50',

  // Card de tabela
  table: 'bg-card/50 backdrop-blur-sm rounded-lg border border-border/50',
} as const;

/**
 * Estilos padrão para títulos e textos
 */
export const TEXT_STYLES = {
  // Título principal da página
  pageTitle: 'text-2xl font-bold text-foreground',

  // Título de seção
  sectionTitle: 'text-2xl font-semibold text-foreground',

  // Título de card
  cardTitle: 'text-lg font-semibold text-foreground',

  // Título de item
  itemTitle: 'font-semibold text-foreground',

  // Subtítulo
  subtitle: 'text-muted-foreground',

  // Texto de descrição
  description: 'text-muted-foreground mt-2',

  // Texto de valor monetário
  currency: 'text-foreground font-medium',

  // Texto de entrada (verde)
  income: 'text-green-500 text-sm',

  // Texto de saída (vermelho)
  expense: 'text-red-500 text-sm',

  // Texto de badge
  badge: 'px-2 py-1 rounded text-xs font-medium',
} as const;

/**
 * Estilos padrão para formulários
 */
export const FORM_STYLES = {
  // Label de campo
  label: 'block text-sm font-medium text-foreground mb-2',

  // Input base
  input:
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',

  // Input com erro
  inputError:
    'w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2',

  // Select base
  select:
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',

  // Textarea base
  textarea:
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none',

  // Checkbox base
  checkbox: 'rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2',

  // Radio base
  radio: 'border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2',

  // Grupo de campos
  fieldGroup: 'space-y-4',

  // Linha de campos
  fieldRow: 'grid grid-cols-1 md:grid-cols-2 gap-4',

  // Mensagem de erro
  errorMessage: 'text-sm text-destructive mt-1',

  // Mensagem de ajuda
  helpMessage: 'text-sm text-muted-foreground mt-1',
} as const;

/**
 * Estilos padrão para botões (quando não usar tailwind-variants)
 */
export const BUTTON_STYLES = {
  // Botão primário
  primary:
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',

  // Botão secundário
  secondary:
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2',

  // Botão outline
  outline:
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',

  // Botão ghost
  ghost:
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',

  // Botão pequeno
  small:
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3',

  // Botão grande
  large:
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8',

  // Botão com ícone
  withIcon: 'inline-flex items-center gap-2',
} as const;

/**
 * Estilos padrão para badges e indicadores
 */
export const BADGE_STYLES = {
  // Badge padrão
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',

  // Badge de status
  status: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',

  // Badge de página (cores específicas)
  page: 'px-2 py-1 rounded text-xs font-medium',

  // Badge azul
  blue: 'bg-blue-500/20 text-blue-300',

  // Badge verde
  green: 'bg-green-500/20 text-green-300',

  // Badge roxo
  purple: 'bg-purple-500/20 text-purple-300',

  // Badge laranja
  orange: 'bg-orange-500/20 text-orange-300',

  // Badge ciano
  cyan: 'bg-cyan-500/20 text-cyan-300',

  // Badge vermelho
  red: 'bg-red-500/20 text-red-300',
} as const;

/**
 * Estilos padrão para tabelas
 */
export const TABLE_STYLES = {
  // Container da tabela
  container: 'w-full overflow-auto',

  // Tabela base
  table: 'w-full caption-bottom text-sm',

  // Cabeçalho da tabela
  header: 'bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50',

  // Cabeçalho de coluna
  headerCell: 'font-semibold text-foreground',

  // Linha da tabela
  row: 'bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50',

  // Célula da tabela
  cell: 'text-foreground',

  // Célula de valor monetário
  currencyCell: 'text-foreground font-medium',
} as const;

/**
 * Espaçamentos padrão para grids e layouts
 */
export const SPACING_STYLES = {
  // Gap padrão para grids
  gridGap: 'gap-4',

  // Gap para grids de 2 colunas
  gridGap2: 'gap-2',

  // Gap para grids de 6 colunas
  gridGap6: 'gap-6',

  // Espaçamento vertical padrão
  verticalSpace: 'space-y-4',

  // Espaçamento vertical grande
  verticalSpaceLarge: 'space-y-6',

  // Espaçamento horizontal padrão
  horizontalSpace: 'space-x-4',

  // Espaçamento horizontal pequeno
  horizontalSpaceSmall: 'space-x-2',
} as const;

/**
 * Animações e transições padrão
 */
export const ANIMATION_STYLES = {
  // Transição padrão
  transition: 'transition-colors duration-200',

  // Transição de hover
  hover: 'hover:bg-accent hover:text-accent-foreground transition-colors',

  // Transição de focus
  focus: 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',

  // Transição de backdrop
  backdrop: 'backdrop-blur-sm transition-all duration-200',
} as const;

// ============================================================================
// 12. FUNÇÕES UTILITÁRIAS DE ESTILO
// ============================================================================

/**
 * Combina estilos de forma inteligente
 *
 * @param base - Estilo base
 * @param conditional - Estilo condicional
 * @param condition - Condição para aplicar o estilo
 * @returns String com estilos combinados
 */
export function combineStyles(base: string, conditional: string, condition: boolean): string {
  return condition ? `${base} ${conditional}` : base;
}

/**
 * Combina múltiplos estilos condicionais
 *
 * @param base - Estilo base
 * @param conditionals - Array de objetos com estilo e condição
 * @returns String com estilos combinados
 */
export function combineMultipleStyles(
  base: string,
  conditionals: Array<{ style: string; condition: boolean }>
): string {
  const conditionalStyles = conditionals
    .filter(({ condition }) => condition)
    .map(({ style }) => style)
    .join(' ');

  return conditionalStyles ? `${base} ${conditionalStyles}` : base;
}

/**
 * Obtém estilos de card baseado no tipo
 *
 * @param type - Tipo do card
 * @param variant - Variante do card
 * @returns String com estilos do card
 */
export function getCardStyles(
  type: keyof typeof CARD_STYLES,
  variant?: 'default' | 'compact' | 'padded'
): string {
  const baseStyle = CARD_STYLES[type];

  if (variant === 'compact') {
    return `${baseStyle} p-4`;
  }

  if (variant === 'padded') {
    return `${baseStyle} p-6`;
  }

  return baseStyle;
}

/**
 * Obtém estilos de texto baseado no tipo
 *
 * @param type - Tipo do texto
 * @param variant - Variante do texto
 * @returns String com estilos do texto
 */
export function getTextStyles(
  type: keyof typeof TEXT_STYLES,
  variant?: 'default' | 'large' | 'small'
): string {
  const baseStyle = TEXT_STYLES[type];

  if (variant === 'large') {
    return `${baseStyle} text-lg`;
  }

  if (variant === 'small') {
    return `${baseStyle} text-sm`;
  }

  return baseStyle;
}

// ============================================================================
// 13. DOCUMENTAÇÃO E EXEMPLOS
// ============================================================================

/**
 * Exemplo de uso das constantes centralizadas:
 *
 * // No layout.tsx (mínimo):
 * <div className={LAYOUT_CONFIG.main.className}>
 *   <header className={LAYOUT_CONFIG.header.className}>
 *     <div className={LAYOUT_CONFIG.header.container}>
 *       <h1 className={LAYOUT_CONFIG.header.logo.title}>Financial Planner</h1>
 *     </div>
 *   </header>
 * </div>
 *
 * // Para cores de página:
 * const pageColors = getPageColors('allocations');
 * const pageStyles = getPageStyles('allocations');
 *
 * // Para configurações de layout:
 * const headerConfig = getLayoutConfig('header');
 * const sidebarConfig = getLayoutConfig('sidebar');
 */
