/**
 * @fileoverview Configurações para produção
 * @description Configurações específicas para ambiente de produção
 */

export const PRODUCTION_CONFIG = {
    // URLs de produção
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.financial-planner.com',

    // Configurações de performance
    PERFORMANCE: {
        // Lazy loading de componentes
        ENABLE_LAZY_LOADING: true,
        // Preload de rotas críticas
        PRELOAD_CRITICAL_ROUTES: true,
        // Compressão de imagens
        ENABLE_IMAGE_OPTIMIZATION: true,
    },

    // Configurações de cache
    CACHE: {
        // Cache de API mais agressivo em produção
        API_CACHE_TIME: 10 * 60 * 1000, // 10 minutos
        // Cache de assets estáticos
        STATIC_CACHE_TIME: 24 * 60 * 60 * 1000, // 24 horas
    },

    // Configurações de monitoramento
    MONITORING: {
        // Sentry para tracking de erros
        ENABLE_SENTRY: process.env.NODE_ENV === 'production',
        SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
        // Analytics
        ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
        GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID,
    },

    // Configurações de segurança
    SECURITY: {
        // CSP (Content Security Policy)
        ENABLE_CSP: true,
        // HSTS
        ENABLE_HSTS: true,
        // X-Frame-Options
        ENABLE_X_FRAME_OPTIONS: true,
    },

    // Configurações de SEO
    SEO: {
        // Meta tags padrão
        DEFAULT_TITLE: 'Financial Planner - Planejamento Financeiro Inteligente',
        DEFAULT_DESCRIPTION: 'Plataforma completa para planejamento financeiro pessoal e empresarial',
        DEFAULT_KEYWORDS: 'planejamento financeiro, investimentos, simulações, alocações',
        // Open Graph
        DEFAULT_OG_IMAGE: '/og-image.jpg',
        DEFAULT_OG_TYPE: 'website',
    },

    // Configurações de PWA
    PWA: {
        ENABLE_PWA: true,
        CACHE_STRATEGY: 'stale-while-revalidate',
        OFFLINE_FALLBACK: '/offline.html',
    },
} as const;

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';
