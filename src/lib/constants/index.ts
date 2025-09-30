// ============================================================================
// CONSTANTES CENTRALIZADAS - VERSÃO OTIMIZADA
// ============================================================================

// Exportar apenas as constantes essenciais e utilizadas
export * from './pages-styles';
export * from './routes';
export * from './messages';
export * from './utils';
export * from './sidebar';

// Re-exportar apenas as constantes utilizadas das outras pastas
export { UI_CONFIG, ICON_FILTERS, COMMON_CLASSES } from './ui';
export { LAYOUT_CONFIG } from './layout';
export { API_CONFIG, CACHE_CONFIG, PAGINATION_CONFIG, VALIDATION_CONFIG } from './api';

// Re-exportar schemas de validação
export * from '../validations/schemas';

// Re-exportar design tokens e classes comuns
export * from './design-tokens';
export * from './common-classes';