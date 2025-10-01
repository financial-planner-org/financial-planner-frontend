// ============================================================================
// CONSTANTES CENTRALIZADAS - FINANCIAL PLANNER
// ============================================================================
// Arquivo principal que centraliza todas as exportações de constantes

// Estilos e CSS
export * from './styles';

// Configurações de páginas
export * from './pages';

// Mensagens e textos
export * from './messages';

// Rotas e navegação
export * from './routes';

// Configurações de UI
export * from './ui';

// Validação e formulários
export * from './validation';

// Configurações de API
export * from './api';

// Configurações de dados
export * from './data';

// Re-exportar apenas as constantes utilizadas das outras pastas
export { FILTER_CONFIG } from './data';