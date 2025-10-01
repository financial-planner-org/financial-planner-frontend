/**
 * @fileoverview Constantes de SEO e meta tags
 * @description Configurações para head, meta tags e SEO
 */

/**
 * Configurações de SEO da aplicação
 */
export const SEO_CONFIG = {
  // Informações básicas
  SITE_NAME: 'Financial Planner',
  SITE_DESCRIPTION:
    'Sistema de planejamento financeiro para multi family office (MFO) com projeções patrimoniais e gestão de alocações',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  SITE_IMAGE: '/og-image.png',

  // Configurações de idioma
  DEFAULT_LANGUAGE: 'pt-BR',
  SUPPORTED_LANGUAGES: ['pt-BR', 'en-US'],

  // Configurações de viewport
  VIEWPORT: 'width=device-width, initial-scale=1',

  // Configurações de tema
  THEME_COLOR: '#0f172a', // slate-900
  THEME_COLOR_DARK: '#0f172a',

  // Configurações de ícones
  FAVICON: '/favicon.ico',
  APPLE_TOUCH_ICON: '/apple-touch-icon.png',
  ICON_192: '/icon-192x192.png',
  ICON_512: '/icon-512x512.png',

  // Configurações de manifest
  MANIFEST: '/manifest.json',

  // Configurações de robots
  ROBOTS: 'index, follow',
  ROBOTS_NO_INDEX: 'noindex, nofollow',

  // Configurações de cache
  CACHE_CONTROL: 'public, max-age=31536000, immutable',
} as const;

/**
 * Meta tags padrão para todas as páginas
 */
export const DEFAULT_META_TAGS = {
  // Meta tags básicas
  charset: 'utf-8',
  viewport: SEO_CONFIG.VIEWPORT,
  'theme-color': SEO_CONFIG.THEME_COLOR,

  // Meta tags de SEO
  robots: SEO_CONFIG.ROBOTS,
  language: SEO_CONFIG.DEFAULT_LANGUAGE,
  author: 'Financial Planner Team',
  publisher: 'Financial Planner',
  copyright: `© ${new Date().getFullYear()} Financial Planner`,

  // Meta tags Open Graph
  'og:type': 'website',
  'og:site_name': SEO_CONFIG.SITE_NAME,
  'og:locale': 'pt_BR',
  'og:image:width': '1200',
  'og:image:height': '630',
  'og:image:type': 'image/png',

  // Meta tags Twitter
  'twitter:card': 'summary_large_image',
  'twitter:site': '@financialplanner',
  'twitter:creator': '@financialplanner',

  // Meta tags de aplicação
  'application-name': SEO_CONFIG.SITE_NAME,
  'apple-mobile-web-app-title': SEO_CONFIG.SITE_NAME,
  'apple-mobile-web-app-capable': 'yes',
  'apple-mobile-web-app-status-bar-style': 'black-translucent',

  // Meta tags de segurança
  referrer: 'origin-when-cross-origin',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'x-xss-protection': '1; mode=block',
} as const;

/**
 * Meta tags específicas por página
 */
export const PAGE_META_TAGS = {
  // Página inicial
  HOME: {
    title: 'Financial Planner - Planejamento Financeiro MFO',
    description:
      'Sistema completo de planejamento financeiro para multi family office com projeções patrimoniais, gestão de alocações e simulações dinâmicas.',
    keywords: [
      'planejamento financeiro',
      'MFO',
      'multi family office',
      'projeções patrimoniais',
      'gestão de alocações',
      'simulações financeiras',
    ],
    canonical: '/',
  },

  // Página de alocações
  ALLOCATIONS: {
    title: 'Alocações - Financial Planner',
    description:
      'Gerencie suas alocações financeiras e imobilizadas com timeline completa e histórico de registros.',
    keywords: ['alocações', 'investimentos', 'patrimônio', 'gestão financeira', 'timeline'],
    canonical: '/alocacoes',
  },

  // Página de projeções
  PROJECTIONS: {
    title: 'Projeções Patrimoniais - Financial Planner',
    description:
      'Visualize projeções patrimoniais até 2060 com simulações dinâmicas e diferentes cenários de vida.',
    keywords: ['projeções', 'patrimônio', 'simulações', 'cenários', 'planejamento futuro'],
    canonical: '/projecao',
  },

  // Página de histórico
  HISTORY: {
    title: 'Histórico de Simulações - Financial Planner',
    description: 'Acesse e compare versões anteriores de suas simulações patrimoniais.',
    keywords: ['histórico', 'simulações', 'versões', 'comparação', 'análise temporal'],
    canonical: '/historico',
  },

  // Página de movimentações
  MOVEMENTS: {
    title: 'Movimentações - Financial Planner',
    description:
      'Gerencie receitas, despesas e movimentações financeiras com frequências personalizadas.',
    keywords: ['movimentações', 'receitas', 'despesas', 'fluxo de caixa', 'frequências'],
    canonical: '/movimentacoes',
  },
} as const;

/**
 * Configurações de structured data (JSON-LD)
 */
export const STRUCTURED_DATA = {
  // Dados da organização
  ORGANIZATION: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.SITE_NAME,
    description: SEO_CONFIG.SITE_DESCRIPTION,
    url: SEO_CONFIG.SITE_URL,
    logo: `${SEO_CONFIG.SITE_URL}${SEO_CONFIG.SITE_IMAGE}`,
    sameAs: [
      'https://github.com/financial-planner',
      'https://linkedin.com/company/financial-planner',
    ],
  },

  // Dados da aplicação web
  WEB_APPLICATION: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SEO_CONFIG.SITE_NAME,
    description: SEO_CONFIG.SITE_DESCRIPTION,
    url: SEO_CONFIG.SITE_URL,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
  },

  // Dados de navegação
  BREADCRUMB_LIST: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SEO_CONFIG.SITE_URL}${item.url}`,
    })),
  }),
} as const;

/**
 * Configurações de sitemap
 */
export const SITEMAP_CONFIG = {
  // URLs estáticas
  STATIC_PATHS: ['/', '/alocacoes', '/projecao', '/historico', '/movimentacoes'],

  // Configurações de prioridade
  PRIORITY: {
    HOME: 1.0,
    MAIN_PAGES: 0.8,
    SUB_PAGES: 0.6,
    STATIC_PAGES: 0.4,
  },

  // Configurações de frequência de mudança
  CHANGE_FREQUENCY: {
    HOME: 'daily',
    MAIN_PAGES: 'weekly',
    SUB_PAGES: 'monthly',
    STATIC_PAGES: 'yearly',
  },

  // Configurações de última modificação
  LAST_MODIFIED: new Date().toISOString(),
} as const;

/**
 * Configurações de analytics
 */
export const ANALYTICS_CONFIG = {
  // Google Analytics
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID,

  // Google Tag Manager
  GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GTM_ID,

  // Eventos personalizados
  CUSTOM_EVENTS: {
    SIMULATION_CREATED: 'simulation_created',
    SIMULATION_EDITED: 'simulation_edited',
    ALLOCATION_ADDED: 'allocation_added',
    MOVEMENT_ADDED: 'movement_added',
    INSURANCE_ADDED: 'insurance_added',
    PROJECTION_VIEWED: 'projection_viewed',
    HISTORY_VIEWED: 'history_viewed',
  },

  // Configurações de privacidade
  PRIVACY: {
    ANONYMIZE_IP: true,
    COOKIE_CONSENT: true,
    DATA_RETENTION: '24 months',
  },
} as const;
