// ============================================================================
// CLASSES CSS COMUNS - ELIMINANDO REDUNDÂNCIAS
// ============================================================================

import { TEXT_CLASSES, BG_CLASSES, SIZES, SPACING, BORDERS, FLEX, POSITION, EFFECTS, TRANSITIONS } from './design-tokens';

// Classes de layout comuns
export const LAYOUT_CLASSES = {
  // Containers
  container: 'w-full',
  containerCentered: 'w-full mx-auto',
  containerPadded: 'w-full p-6',

  // Flexbox comum
  flexCenter: `${FLEX.container} ${FLEX.align.center} ${FLEX.justify.center}`,
  flexBetween: `${FLEX.container} ${FLEX.align.center} ${FLEX.justify.between}`,
  flexStart: `${FLEX.container} ${FLEX.align.center} ${FLEX.justify.start}`,
  flexEnd: `${FLEX.container} ${FLEX.align.center} ${FLEX.justify.end}`,
  flexCol: `${FLEX.container} ${FLEX.col}`,
  flexRow: `${FLEX.container} ${FLEX.row}`,

  // Grid comum
  grid2: 'grid grid-cols-1 md:grid-cols-2',
  grid3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  grid4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',

  // Posicionamento
  absolute: POSITION.absolute,
  relative: POSITION.relative,
  fixed: POSITION.fixed,

  // Espaçamento comum
  spaceY2: SPACING.space.y[2],
  spaceY4: SPACING.space.y[4],
  spaceY6: SPACING.space.y[6],
  gap1: SPACING.gap[1],
  gap2: SPACING.gap[2],
  gap4: SPACING.gap[4],
  gap6: SPACING.gap[6],

  // Padding comum
  p4: SPACING.p[4],
  p6: SPACING.p[6],
  px4: 'px-4',
  py2: 'py-2',
  py3: 'py-3',
  py4: 'py-4',

  // Margin comum
  mb2: 'mb-2',
  mb4: 'mb-4',
  mb6: 'mb-6',
  mb8: 'mb-8',
  mt4: 'mt-4',
  mt6: 'mt-6',
  mt8: 'mt-8'
} as const;

// Classes de texto comuns
export const TEXT_COMMON = {
  // Títulos
  h1: `${TEXT_CLASSES['4xl']} ${TEXT_CLASSES.white}`,
  h2: `${TEXT_CLASSES['3xl']} ${TEXT_CLASSES.white}`,
  h3: `${TEXT_CLASSES['2xl']} ${TEXT_CLASSES.white}`,
  h4: `${TEXT_CLASSES.xl} ${TEXT_CLASSES.white}`,

  // Texto comum
  body: `${TEXT_CLASSES.base} ${TEXT_CLASSES.white}`,
  bodyMuted: `${TEXT_CLASSES.base} ${TEXT_CLASSES.neutral[400]}`,
  small: `${TEXT_CLASSES.sm} ${TEXT_CLASSES.neutral[400]}`,
  caption: `${TEXT_CLASSES.xs} ${TEXT_CLASSES.neutral[500]}`,

  // Texto com cores específicas
  primary: `${TEXT_CLASSES.base} ${TEXT_CLASSES.white}`,
  secondary: `${TEXT_CLASSES.base} ${TEXT_CLASSES.neutral[400]}`,
  muted: `${TEXT_CLASSES.base} ${TEXT_CLASSES.neutral[500]}`,
  accent: `${TEXT_CLASSES.base} ${TEXT_CLASSES.blue[400]}`,
  success: `${TEXT_CLASSES.base} ${TEXT_CLASSES.green[600]}`,
  error: `${TEXT_CLASSES.base} ${TEXT_CLASSES.red[500]}`,
  warning: `${TEXT_CLASSES.base} text-amber-300`,

  // Texto com fontes específicas
  workSans: 'font-[\'Work_Sans\']',
  neuton: 'font-[\'Neuton\']',
  inter: 'font-[\'Inter\']',
  satoshi: 'font-[\'Satoshi\']',

  // Cores específicas do projeto
  zinc300: 'text-zinc-300',
  zinc400: 'text-zinc-400',
  neutral700: 'text-neutral-700',
  purple600: 'text-purple-600',
  xs: 'text-xs'
} as const;

// Classes de background comuns
export const BG_COMMON = {
  // Backgrounds básicos
  white: BG_CLASSES.white,
  black: BG_CLASSES.black,
  transparent: 'bg-transparent',

  // Backgrounds neutros
  neutral800: BG_CLASSES.neutral[800],
  neutral900: BG_CLASSES.neutral[900],
  zinc800: BG_CLASSES.zinc[800],
  zinc900: BG_CLASSES.zinc[900],
  zinc950: BG_CLASSES.zinc[950],

  // Backgrounds com cores
  blue500: BG_CLASSES.blue[500],
  green500: BG_CLASSES.green[500],
  green700: BG_CLASSES.green[700],
  red500: BG_CLASSES.red[500],
  red400: BG_CLASSES.red[400],
  purple500: BG_CLASSES.purple[500],
  neutral500: 'bg-neutral-500',
  neutral700: 'bg-neutral-700',
  amber300: 'bg-amber-300',

  // Backgrounds com opacidade
  blue500_25: 'bg-blue-500/25',
  indigo500_30: 'bg-indigo-500/30',
  zinc800_50: 'bg-zinc-800/50',

  // Gradientes
  gradientBlue: 'bg-gradient-to-bl from-indigo-500 to-teal-500',
  gradientOrange: 'bg-gradient-to-l from-orange-400/10 to-red-600/25',
  gradientStone: 'bg-gradient-to-l from-stone-950/0 via-orange-400/5 to-neutral-200/20'
} as const;

// Classes de borda comuns
export const BORDER_COMMON = {
  // Bordas básicas
  none: 'border-0',
  solid: 'border',
  solid2: BORDERS.width[2],
  solid4: BORDERS.width[4],

  // Cores de borda
  neutral400: 'border-neutral-400',
  neutral600: 'border-neutral-600',
  neutral700: 'border-neutral-700',
  zinc800: 'border-zinc-800',
  blue400: 'border-blue-400',
  orange600: 'border-orange-600',

  // Raio de borda
  rounded: BORDERS.radius.md,
  roundedMd: 'rounded-md',
  roundedLg: BORDERS.radius.lg,
  roundedXl: BORDERS.radius.xl,
  rounded2xl: BORDERS.radius['2xl'],
  rounded3xl: BORDERS.radius['3xl'],
  roundedFull: BORDERS.radius.full,

  // Bordas com raio específico
  rounded47: 'rounded-[47px]',
  rounded32: 'rounded-[32px]',
  rounded20: 'rounded-[20px]'
} as const;

// Classes de tamanho comuns
export const SIZE_COMMON = {
  // Larguras comuns
  wFull: SIZES.w.full,
  wAuto: SIZES.w.auto,
  w0_5: 'w-0.5',
  w1: 'w-1',
  w2: 'w-2',
  w3: 'w-3',
  w4: 'w-4',
  w6: 'w-6',
  w8: 'w-8',
  w10: 'w-10',
  w11: 'w-11',
  w12: 'w-12',
  w20: 'w-20',
  w24: 'w-24',
  w28: 'w-28',
  w40: 'w-40',
  w72: SIZES.w[72],
  w80: SIZES.w[80],
  w96: SIZES.w[96],

  // Alturas comuns
  hFull: SIZES.h.full,
  hAuto: SIZES.h.auto,
  h0_5: 'h-0.5',
  h1: 'h-1',
  h2: 'h-2',
  h3: 'h-3',
  h4: 'h-4',
  h6: 'h-6',
  h8: 'h-8',
  h10: 'h-10',
  h12: 'h-12',
  h14: 'h-14',
  h16: SIZES.h[16],
  h24: SIZES.h[24],
  h32: SIZES.h[32],
  h44: 'h-44',
  h48: SIZES.h[48],
  h64: SIZES.h[64],
  h72: SIZES.h[72],
  h80: SIZES.h[80],
  h96: SIZES.h[96],

  // Tamanhos específicos do projeto
  w1413: 'w-[1413px]',
  w1272: 'w-[1272px]',
  w1064: 'w-[1064.43px]',
  w766: 'w-[766.92px]',

  h1108: 'h-[1108px]',
  h1083: 'h-[1083px]'
} as const;

// Classes de posicionamento comuns
export const POSITION_COMMON = {
  // Posições absolutas comuns
  absolute: POSITION.absolute,
  relative: POSITION.relative,
  absoluteTop0: `${POSITION.absolute} top-0`,
  absoluteLeft0: `${POSITION.absolute} left-0`,
  absoluteRight0: `${POSITION.absolute} right-0`,

  // Posições específicas do projeto
  left101: 'left-[101px]',
  left111: 'left-[111px]',
  left159: 'left-[159px]',
  left163: 'left-[163px]',
  left434: 'left-[434px]',
  left667: 'left-[667px]',
  left1061: 'left-[1061px]',
  left1473: 'left-[1473px]',

  top59: 'top-[59px]',
  top101: 'top-[101px]',
  top140: 'top-[140px]',
  top170: 'top-[170px]',
  top291: 'top-[291px]',
  top288: 'top-[288px]',
  top385: 'top-[385px]',
  top476: 'top-[476px]',
  top540: 'top-[540px]',
  top976: 'top-[976px]',
  top1072: 'top-[1072px]',
  top1426: 'top-[1426px]',
  top1879: 'top-[1879px]'
} as const;

// Classes de efeito comuns
export const EFFECT_COMMON = {
  // Sombras
  shadowSm: EFFECTS.shadow.sm,
  shadowMd: EFFECTS.shadow.md,
  shadowLg: EFFECTS.shadow.lg,

  // Blur
  blurSm: EFFECTS.blur.sm,
  blurMd: EFFECTS.blur.md,

  // Opacidade
  opacity50: EFFECTS.opacity[50],
  opacity70: 'opacity-70',
  opacity90: 'opacity-90',

  // Hover
  hoverWhite: 'hover:text-white',
  hoverBg: 'hover:bg-neutral-800',
  hoverShadow: 'hover:shadow-lg',

  // Transições
  transitionColors: TRANSITIONS.colors,
  transitionAll: TRANSITIONS.all,
  transitionFast: `${TRANSITIONS.all} ${TRANSITIONS.duration[150]} ${TRANSITIONS.ease['in-out']}`,
  transitionNormal: `${TRANSITIONS.all} ${TRANSITIONS.duration[300]} ${TRANSITIONS.ease['in-out']}`
} as const;

// Classes de responsividade comuns
export const RESPONSIVE_COMMON = {
  // Breakpoints
  mobile: 'block sm:hidden',
  tablet: 'hidden sm:block lg:hidden',
  desktop: 'hidden lg:block',
  mobileTablet: 'block lg:hidden',
  tabletDesktop: 'hidden sm:block',

  // Texto responsivo
  textResponsive: 'text-lg sm:text-xl',
  textResponsive2xl: 'text-2xl sm:text-3xl',
  textResponsive3xl: 'text-3xl sm:text-4xl',

  // Espaçamento responsivo
  pResponsive: 'p-4 sm:p-6 lg:p-8',
  mResponsive: 'm-4 sm:m-6 lg:m-8',
  gapResponsive: 'gap-2 sm:gap-4 lg:gap-6'
} as const;

// Classes de estado comuns
export const STATE_COMMON = {
  // Estados de foco
  focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',

  // Estados de hover
  hover: 'hover:bg-neutral-800 hover:text-white',
  hoverOpacity: 'hover:opacity-80',

  // Estados de disabled
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  disabledPointer: 'disabled:pointer-events-none',

  // Estados de seleção
  selected: 'data-[state=selected]:bg-blue-500',
  checked: 'data-[state=checked]:bg-blue-500'
} as const;
