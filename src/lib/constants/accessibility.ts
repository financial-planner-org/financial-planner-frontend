/**
 * @fileoverview Constantes de acessibilidade
 * @description Labels, textos ARIA e configurações de acessibilidade
 */

/**
 * Labels de acessibilidade para elementos da interface
 */
export const ACCESSIBILITY_LABELS = {
  // Navegação
  MAIN_NAVIGATION: 'Navegação principal',
  SIDEBAR_TOGGLE: 'Alternar barra lateral',
  BREADCRUMB: 'Navegação estrutural',

  // Formulários
  FORM_REQUIRED: 'Campo obrigatório',
  FORM_OPTIONAL: 'Campo opcional',
  FORM_ERROR: 'Erro no campo',
  FORM_SUCCESS: 'Campo válido',

  // Tabelas
  TABLE_SORT_ASC: 'Ordenar em ordem crescente',
  TABLE_SORT_DESC: 'Ordenar em ordem decrescente',
  TABLE_FILTER: 'Filtrar dados da tabela',
  TABLE_PAGINATION: 'Navegação da tabela',

  // Modais e Diálogos
  MODAL_CLOSE: 'Fechar modal',
  DIALOG_CONFIRM: 'Confirmar ação',
  DIALOG_CANCEL: 'Cancelar ação',

  // Botões de ação
  BUTTON_ADD: 'Adicionar item',
  BUTTON_EDIT: 'Editar item',
  BUTTON_DELETE: 'Excluir item',
  BUTTON_SAVE: 'Salvar alterações',
  BUTTON_CANCEL: 'Cancelar operação',
  BUTTON_SUBMIT: 'Enviar formulário',

  // Estados de carregamento
  LOADING: 'Carregando conteúdo',
  LOADING_MORE: 'Carregando mais itens',
  SAVING: 'Salvando dados',
  DELETING: 'Excluindo item',

  // Gráficos e visualizações
  CHART_TITLE: 'Título do gráfico',
  CHART_DESCRIPTION: 'Descrição do gráfico',
  CHART_DATA: 'Dados do gráfico',
  CHART_LEGEND: 'Legenda do gráfico',

  // Status e badges
  STATUS_ACTIVE: 'Status ativo',
  STATUS_INACTIVE: 'Status inativo',
  STATUS_PENDING: 'Status pendente',
  STATUS_ERROR: 'Status de erro',
  STATUS_SUCCESS: 'Status de sucesso',

  // Notificações
  NOTIFICATION_SUCCESS: 'Notificação de sucesso',
  NOTIFICATION_ERROR: 'Notificação de erro',
  NOTIFICATION_WARNING: 'Notificação de aviso',
  NOTIFICATION_INFO: 'Notificação informativa',

  // Filtros e busca
  SEARCH_INPUT: 'Campo de busca',
  SEARCH_CLEAR: 'Limpar busca',
  FILTER_APPLY: 'Aplicar filtros',
  FILTER_CLEAR: 'Limpar filtros',

  // Páginas específicas
  SIMULATION_SELECT: 'Selecionar simulação',
  CLIENT_SELECT: 'Selecionar cliente',
  ALLOCATION_ADD: 'Adicionar alocação',
  MOVEMENT_ADD: 'Adicionar movimentação',
  INSURANCE_ADD: 'Adicionar seguro',

  // Projeções
  PROJECTION_GRAPH: 'Gráfico de projeção patrimonial',
  PROJECTION_TABLE: 'Tabela de projeção patrimonial',
  PROJECTION_YEAR: 'Ano da projeção',
  PROJECTION_VALUE: 'Valor da projeção',

  // Alocações
  ALLOCATION_TIMELINE: 'Timeline de alocações',
  ALLOCATION_RECORD: 'Registro de alocação',
  ALLOCATION_UPDATE: 'Atualizar alocação',

  // Histórico
  HISTORY_VERSION: 'Versão do histórico',
  HISTORY_LEGACY: 'Versão legada',
  HISTORY_CURRENT: 'Versão atual',
} as const;

/**
 * Textos ARIA para elementos interativos
 */
export const ARIA_LABELS = {
  // Botões
  BUTTON_LOADING: 'Carregando...',
  BUTTON_SAVING: 'Salvando...',
  BUTTON_DELETING: 'Excluindo...',

  // Estados de formulário
  FORM_VALIDATING: 'Validando formulário...',
  FORM_SUBMITTING: 'Enviando formulário...',

  // Tabelas
  TABLE_EMPTY: 'Nenhum item encontrado',
  TABLE_LOADING: 'Carregando dados da tabela...',
  TABLE_ERROR: 'Erro ao carregar dados da tabela',

  // Modais
  MODAL_OPENING: 'Abrindo modal...',
  MODAL_CLOSING: 'Fechando modal...',

  // Gráficos
  CHART_LOADING: 'Carregando gráfico...',
  CHART_ERROR: 'Erro ao carregar gráfico',

  // Navegação
  NAVIGATION_EXPAND: 'Expandir menu',
  NAVIGATION_COLLAPSE: 'Recolher menu',
  NAVIGATION_NEXT: 'Próxima página',
  NAVIGATION_PREVIOUS: 'Página anterior',

  // Filtros
  FILTER_OPEN: 'Abrir filtros',
  FILTER_CLOSE: 'Fechar filtros',
  FILTER_RESET: 'Resetar filtros',

  // Ações específicas
  SIMULATION_CREATE: 'Criar nova simulação',
  SIMULATION_EDIT: 'Editar simulação',
  SIMULATION_DELETE: 'Excluir simulação',
  SIMULATION_DUPLICATE: 'Duplicar simulação',

  ALLOCATION_CREATE: 'Criar nova alocação',
  ALLOCATION_EDIT: 'Editar alocação',
  ALLOCATION_DELETE: 'Excluir alocação',
  ALLOCATION_UPDATE: 'Atualizar alocação',

  MOVEMENT_CREATE: 'Criar nova movimentação',
  MOVEMENT_EDIT: 'Editar movimentação',
  MOVEMENT_DELETE: 'Excluir movimentação',

  INSURANCE_CREATE: 'Criar novo seguro',
  INSURANCE_EDIT: 'Editar seguro',
  INSURANCE_DELETE: 'Excluir seguro',
} as const;

/**
 * Configurações de acessibilidade para componentes
 */
export const ACCESSIBILITY_CONFIG = {
  // Timeouts para leitores de tela
  SCREEN_READER_DELAY: 100, // ms

  // Configurações de foco
  FOCUS_VISIBLE: true,
  FOCUS_RING_COLOR: 'ring-2 ring-blue-500',

  // Configurações de contraste
  MIN_CONTRAST_RATIO: 4.5,

  // Configurações de animação
  REDUCE_MOTION: 'prefers-reduced-motion: reduce',

  // Configurações de tamanho de fonte
  MIN_FONT_SIZE: 14, // px
  SCALE_FACTOR: 1.2,

  // Configurações de toque
  MIN_TOUCH_TARGET: 44, // px

  // Configurações de teclado
  KEYBOARD_NAVIGATION: true,
  TAB_INDEX_VISIBLE: 0,
  TAB_INDEX_HIDDEN: -1,
} as const;

/**
 * Mensagens de erro de acessibilidade
 */
export const ACCESSIBILITY_ERRORS = {
  MISSING_LABEL: 'Elemento sem label acessível',
  MISSING_ROLE: 'Elemento sem role apropriado',
  MISSING_ARIA_LABEL: 'Elemento sem aria-label',
  MISSING_ARIA_DESCRIBEDBY: 'Elemento sem aria-describedby',
  MISSING_KEYBOARD_SUPPORT: 'Elemento sem suporte a teclado',
  INVALID_COLOR_CONTRAST: 'Contraste de cor insuficiente',
  MISSING_FOCUS_INDICATOR: 'Indicador de foco ausente',
  MISSING_ALT_TEXT: 'Imagem sem texto alternativo',
  MISSING_HEADING_STRUCTURE: 'Estrutura de cabeçalhos incorreta',
  MISSING_LANDMARK_ROLES: 'Landmarks ARIA ausentes',
} as const;

/**
 * Configurações de teste de acessibilidade
 */
export const ACCESSIBILITY_TESTING = {
  // Regras do axe-core
  AXE_RULES: [
    'color-contrast',
    'keyboard-navigation',
    'focus-management',
    'aria-labels',
    'heading-order',
    'landmark-roles',
    'alt-text',
    'form-labels',
  ],

  // Configurações de teste
  TEST_TIMEOUT: 5000, // ms
  RETRY_ATTEMPTS: 3,

  // Configurações de relatório
  REPORT_LEVEL: 'error' as const,
  INCLUDE_IMPACT: ['critical', 'serious', 'moderate'],
} as const;
