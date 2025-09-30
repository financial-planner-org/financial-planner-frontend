// ============================================================================
// SISTEMA DE RESPONSIVIDADE - FINANCIAL PLANNER
// ============================================================================

// Breakpoints do Tailwind CSS
export const BREAKPOINTS = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop small
  xl: '1280px',  // Desktop large
  '2xl': '1536px' // Desktop extra large
} as const;

// Classes responsivas para containers
export const CONTAINER_RESPONSIVE = {
  // Container principal - se adapta a qualquer tela
  main: 'w-full min-h-screen max-w-none',
  
  // Container de conteúdo - com padding responsivo
  content: 'w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
  
  // Container de página - centralizado com largura máxima
  page: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Container de seção - com espaçamento vertical
  section: 'w-full py-4 sm:py-6 md:py-8 lg:py-12',
  
  // Container de grid - responsivo
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',
  
  // Container de cards - empilha em mobile
  cards: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6',
  
  // Container de timeline - horizontal em desktop, vertical em mobile
  timeline: 'flex flex-col sm:flex-row gap-4 sm:gap-8',
  
  // Container de gráfico - responsivo
  chart: 'w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]',
  
  // Container de sidebar - oculta em mobile, fixa em desktop
  sidebar: 'hidden lg:block lg:w-64 xl:w-72',
  
  // Container de main content - se adapta ao sidebar
  mainContent: 'w-full lg:ml-64 xl:ml-72'
} as const;

// Classes responsivas para tipografia
export const TYPOGRAPHY_RESPONSIVE = {
  // Títulos principais
  h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold',
  h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold',
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold',
  h4: 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium',
  h5: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium',
  h6: 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium',
  
  // Texto do corpo
  body: 'text-sm sm:text-base md:text-lg',
  bodySmall: 'text-xs sm:text-sm md:text-base',
  bodyLarge: 'text-base sm:text-lg md:text-xl',
  
  // Texto de interface
  label: 'text-xs sm:text-sm font-medium',
  caption: 'text-xs sm:text-sm text-muted-foreground',
  small: 'text-xs text-muted-foreground'
} as const;

// Classes responsivas para espaçamento
export const SPACING_RESPONSIVE = {
  // Padding responsivo
  padding: {
    xs: 'p-2 sm:p-3 md:p-4 lg:p-6',
    sm: 'p-3 sm:p-4 md:p-6 lg:p-8',
    md: 'p-4 sm:p-6 md:p-8 lg:p-12',
    lg: 'p-6 sm:p-8 md:p-12 lg:p-16',
    xl: 'p-8 sm:p-12 md:p-16 lg:p-24'
  },
  
  // Margin responsivo
  margin: {
    xs: 'm-2 sm:m-3 md:m-4 lg:m-6',
    sm: 'm-3 sm:m-4 md:m-6 lg:m-8',
    md: 'm-4 sm:m-6 md:m-8 lg:m-12',
    lg: 'm-6 sm:m-8 md:m-12 lg:m-16',
    xl: 'm-8 sm:m-12 md:m-16 lg:m-24'
  },
  
  // Gap responsivo
  gap: {
    xs: 'gap-2 sm:gap-3 md:gap-4 lg:gap-6',
    sm: 'gap-3 sm:gap-4 md:gap-6 lg:gap-8',
    md: 'gap-4 sm:gap-6 md:gap-8 lg:gap-12',
    lg: 'gap-6 sm:gap-8 md:gap-12 lg:gap-16',
    xl: 'gap-8 sm:gap-12 md:gap-16 lg:gap-24'
  }
} as const;

// Classes responsivas para componentes específicos
export const COMPONENT_RESPONSIVE = {
  // Botões
  button: {
    sm: 'px-3 py-1.5 text-xs sm:text-sm',
    md: 'px-4 py-2 text-sm sm:text-base',
    lg: 'px-6 py-3 text-base sm:text-lg',
    xl: 'px-8 py-4 text-lg sm:text-xl'
  },
  
  // Cards
  card: {
    container: 'p-4 sm:p-6 md:p-8',
    header: 'pb-3 sm:pb-4 md:pb-6',
    content: 'space-y-2 sm:space-y-3 md:space-y-4',
    footer: 'pt-3 sm:pt-4 md:pt-6'
  },
  
  // Inputs
  input: {
    container: 'w-full',
    field: 'px-3 py-2 text-sm sm:text-base',
    label: 'text-xs sm:text-sm font-medium mb-1 sm:mb-2'
  },
  
  // Tables
  table: {
    container: 'w-full overflow-x-auto',
    table: 'min-w-full',
    cell: 'px-3 py-2 text-xs sm:text-sm md:text-base',
    header: 'px-3 py-2 text-xs sm:text-sm md:text-base font-medium'
  },
  
  // Navigation
  nav: {
    container: 'flex flex-col sm:flex-row gap-2 sm:gap-4',
    item: 'px-3 py-2 text-sm sm:text-base',
    active: 'px-3 py-2 text-sm sm:text-base font-medium'
  }
} as const;

// Classes para zoom-in/zoom-out
export const ZOOM_RESPONSIVE = {
  // Container que se adapta ao zoom
  zoomContainer: 'w-full h-full min-h-screen',
  
  // Texto que escala com zoom
  zoomText: 'text-sm sm:text-base md:text-lg lg:text-xl',
  
  // Elementos que mantêm proporção
  zoomElement: 'w-full h-auto max-w-full',
  
  // Gráficos responsivos ao zoom
  zoomChart: 'w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] min-h-[200px]',
  
  // Cards que se adaptam ao zoom
  zoomCard: 'w-full max-w-full min-w-0',
  
  // Timeline responsiva ao zoom
  zoomTimeline: 'w-full overflow-x-auto sm:overflow-x-visible'
} as const;

// Classes para mobile específico
export const MOBILE_RESPONSIVE = {
  // Sidebar mobile
  mobileSidebar: 'fixed inset-0 z-50 lg:hidden',
  mobileSidebarOverlay: 'fixed inset-0 bg-black/50 lg:hidden',
  mobileSidebarContent: 'fixed left-0 top-0 h-full w-64 bg-background p-4',
  
  // Menu mobile
  mobileMenu: 'flex flex-col space-y-2 lg:hidden',
  mobileMenuButton: 'lg:hidden p-2',
  
  // Layout mobile
  mobileLayout: 'flex flex-col lg:flex-row',
  mobileContent: 'flex-1 lg:ml-64',
  
  // Cards mobile
  mobileCards: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
  
  // Timeline mobile
  mobileTimeline: 'flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'
} as const;

// Utilitários de responsividade
export const RESPONSIVE_UTILS = {
  // Esconder em mobile
  hideMobile: 'hidden sm:block',
  
  // Esconder em desktop
  hideDesktop: 'block sm:hidden',
  
  // Mostrar apenas em mobile
  mobileOnly: 'block sm:hidden',
  
  // Mostrar apenas em desktop
  desktopOnly: 'hidden sm:block',
  
  // Mostrar apenas em tablet
  tabletOnly: 'hidden sm:block lg:hidden',
  
  // Mostrar apenas em desktop grande
  largeDesktopOnly: 'hidden xl:block',
  
  // Container que se adapta
  adaptive: 'w-full max-w-full min-w-0',
  
  // Elemento que não quebra
  noWrap: 'whitespace-nowrap',
  
  // Elemento que quebra quando necessário
  wrap: 'break-words',
  
  // Overflow responsivo
  overflowResponsive: 'overflow-x-auto sm:overflow-x-visible',
  
  // Scroll suave
  smoothScroll: 'scroll-smooth'
} as const;
