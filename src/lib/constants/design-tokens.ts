// ============================================================================
// DESIGN TOKENS - TOKENS DE DESIGN CENTRALIZADOS
// ============================================================================

// Cores do sistema
export const COLORS = {
  // Cores primárias
  white: '#FFFFFF',
  black: '#000000',
  
  // Cores neutras
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712'
  },
  
  // Cores específicas do projeto
  zinc: {
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B'
  },
  
  // Cores de status
  blue: {
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB'
  },
  
  green: {
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D'
  },
  
  red: {
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626'
  },
  
  amber: {
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B'
  },
  
  indigo: {
    500: '#6366F1',
    600: '#4F46E5'
  },
  
  teal: {
    500: '#14B8A6'
  },
  
  purple: {
    500: '#A855F7',
    600: '#9333EA'
  }
} as const;

// Tipografia
export const TYPOGRAPHY = {
  // Famílias de fontes
  fontFamily: {
    satoshi: 'Satoshi',
    workSans: 'Work_Sans',
    neuton: 'Neuton',
    inter: 'Inter'
  },
  
  // Tamanhos de fonte
  fontSize: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  },
  
  // Pesos de fonte
  fontWeight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  },
  
  // Altura da linha
  lineHeight: {
    tight: 'leading-tight',
    normal: 'leading-normal',
    loose: 'leading-loose'
  }
} as const;

// Espaçamentos
export const SPACING = {
  // Padding
  p: {
    0: 'p-0',
    1: 'p-1',
    2: 'p-2',
    3: 'p-3',
    4: 'p-4',
    6: 'p-6',
    8: 'p-8'
  },
  
  // Margin
  m: {
    0: 'm-0',
    1: 'm-1',
    2: 'm-2',
    3: 'm-3',
    4: 'm-4',
    6: 'm-6',
    8: 'm-8'
  },
  
  // Gap
  gap: {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  },
  
  // Space between
  space: {
    y: {
      1: 'space-y-1',
      2: 'space-y-2',
      4: 'space-y-4',
      6: 'space-y-6'
    }
  }
} as const;

// Tamanhos
export const SIZES = {
  // Largura
  w: {
    auto: 'w-auto',
    full: 'w-full',
    4: 'w-4',
    6: 'w-6',
    8: 'w-8',
    10: 'w-10',
    12: 'w-12',
    16: 'w-16',
    20: 'w-20',
    24: 'w-24',
    28: 'w-28',
    32: 'w-32',
    40: 'w-40',
    48: 'w-48',
    64: 'w-64',
    72: 'w-72',
    80: 'w-80',
    96: 'w-96',
    0.5: 'w-0.5',
    1.5: 'w-1.5',
    2.5: 'w-2.5',
    3.5: 'w-3.5'
  },
  
  // Altura
  h: {
    auto: 'h-auto',
    full: 'h-full',
    4: 'h-4',
    6: 'h-6',
    8: 'h-8',
    10: 'h-10',
    12: 'h-12',
    16: 'h-16',
    20: 'h-20',
    24: 'h-24',
    28: 'h-28',
    32: 'h-32',
    40: 'h-40',
    48: 'h-48',
    64: 'h-64',
    72: 'h-72',
    80: 'h-80',
    96: 'h-96',
    0.5: 'h-0.5',
    1.5: 'h-1.5',
    2.5: 'h-2.5',
    3.5: 'h-3.5'
  }
} as const;

// Bordas
export const BORDERS = {
  radius: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  },
  
  width: {
    0: 'border-0',
    1: 'border',
    2: 'border-2',
    4: 'border-4'
  },
  
  style: {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  }
} as const;

// Posicionamento
export const POSITION = {
  absolute: 'absolute',
  relative: 'relative',
  fixed: 'fixed',
  static: 'static',
  sticky: 'sticky',
  
  // Top/Right/Bottom/Left
  top: {
    0: 'top-0',
    4: 'top-4',
    6: 'top-6',
    8: 'top-8',
    10: 'top-10',
    12: 'top-12',
    16: 'top-16',
    20: 'top-20'
  },
  
  left: {
    0: 'left-0',
    4: 'left-4',
    6: 'left-6',
    8: 'left-8',
    10: 'left-10',
    12: 'left-12',
    16: 'left-16',
    20: 'left-20'
  },
  
  right: {
    0: 'right-0',
    4: 'right-4',
    6: 'right-6',
    8: 'right-8',
    10: 'right-10',
    12: 'right-12',
    16: 'right-16',
    20: 'right-20'
  }
} as const;

// Flexbox
export const FLEX = {
  container: 'flex',
  col: 'flex-col',
  row: 'flex-row',
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  
  // Justify
  justify: {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  },
  
  // Align
  align: {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
  }
} as const;

// Grid
export const GRID = {
  container: 'grid',
  cols: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }
} as const;

// Efeitos
export const EFFECTS = {
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  },
  
  blur: {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg'
  },
  
  opacity: {
    0: 'opacity-0',
    25: 'opacity-25',
    50: 'opacity-50',
    75: 'opacity-75',
    100: 'opacity-100'
  }
} as const;

// Transições
export const TRANSITIONS = {
  all: 'transition-all',
  colors: 'transition-colors',
  opacity: 'transition-opacity',
  transform: 'transition-transform',
  
  duration: {
    75: 'duration-75',
    100: 'duration-100',
    150: 'duration-150',
    200: 'duration-200',
    300: 'duration-300',
    500: 'duration-500',
    700: 'duration-700',
    1000: 'duration-1000'
  },
  
  ease: {
    linear: 'ease-linear',
    in: 'ease-in',
    out: 'ease-out',
    'in-out': 'ease-in-out'
  }
} as const;

// Classes de texto comuns
export const TEXT_CLASSES = {
  // Cores de texto
  white: 'text-white',
  black: 'text-black',
  neutral: {
    400: 'text-neutral-400',
    500: 'text-neutral-500',
    600: 'text-neutral-600',
    700: 'text-neutral-700'
  },
  zinc: {
    100: 'text-zinc-100',
    300: 'text-zinc-300',
    400: 'text-zinc-400'
  },
  blue: {
    400: 'text-blue-400'
  },
  green: {
    600: 'text-green-600',
    700: 'text-green-700'
  },
  red: {
    500: 'text-red-500'
  },
  purple: {
    600: 'text-purple-600'
  },
  
  // Tamanhos comuns
  xs: `${TYPOGRAPHY.fontSize.xs} ${TYPOGRAPHY.fontWeight.medium}`,
  sm: `${TYPOGRAPHY.fontSize.sm} ${TYPOGRAPHY.fontWeight.medium}`,
  base: `${TYPOGRAPHY.fontSize.base} ${TYPOGRAPHY.fontWeight.medium}`,
  lg: `${TYPOGRAPHY.fontSize.lg} ${TYPOGRAPHY.fontWeight.medium}`,
  xl: `${TYPOGRAPHY.fontSize.xl} ${TYPOGRAPHY.fontWeight.medium}`,
  '2xl': `${TYPOGRAPHY.fontSize['2xl']} ${TYPOGRAPHY.fontWeight.medium}`,
  '3xl': `${TYPOGRAPHY.fontSize['3xl']} ${TYPOGRAPHY.fontWeight.normal}`,
  '4xl': `${TYPOGRAPHY.fontSize['4xl']} ${TYPOGRAPHY.fontWeight.medium}`
} as const;

// Classes de background comuns
export const BG_CLASSES = {
  white: 'bg-white',
  black: 'bg-black',
  neutral: {
    400: 'bg-neutral-400',
    600: 'bg-neutral-600',
    700: 'bg-neutral-700',
    800: 'bg-neutral-800',
    900: 'bg-neutral-900'
  },
  zinc: {
    800: 'bg-zinc-800',
    900: 'bg-zinc-900',
    950: 'bg-zinc-950'
  },
  blue: {
    500: 'bg-blue-500',
    600: 'bg-blue-600'
  },
  green: {
    400: 'bg-green-400',
    500: 'bg-green-500',
    600: 'bg-green-600',
    700: 'bg-green-700'
  },
  red: {
    400: 'bg-red-400',
    500: 'bg-red-500'
  },
  amber: {
    300: 'bg-amber-300'
  },
  indigo: {
    500: 'bg-indigo-500'
  },
  teal: {
    500: 'bg-teal-500'
  },
  purple: {
    500: 'bg-purple-500',
    600: 'bg-purple-600'
  }
} as const;

