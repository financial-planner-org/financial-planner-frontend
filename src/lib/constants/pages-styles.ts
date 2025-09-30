// ============================================================================
// ESTILOS ESPECÍFICOS DAS PÁGINAS - VERSÃO OTIMIZADA
// ============================================================================

import {
    LAYOUT_CLASSES,
    TEXT_COMMON,
    BG_COMMON,
    BORDER_COMMON,
    SIZE_COMMON,
    POSITION_COMMON,
    EFFECT_COMMON,
    RESPONSIVE_COMMON
} from './common-classes';
import {
    CONTAINER_RESPONSIVE,
    TYPOGRAPHY_RESPONSIVE,
    SPACING_RESPONSIVE,
    COMPONENT_RESPONSIVE,
    ZOOM_RESPONSIVE,
    RESPONSIVE_UTILS
} from './responsive-system';

// Classes específicas do projeto
const PROJECT_SPECIFIC = {
    // Posições específicas
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
    top1879: 'top-[1879px]',

    // Tamanhos específicos
    w1413: 'w-[1413px]',
    w1272: 'w-[1272px]',
    w1064: 'w-[1064.43px]',
    w766: 'w-[766.92px]',
    w697: 'w-[697.82px]',

    h1108: 'h-[1108px]',
    h1083: 'h-[1083px]',

    // Bordas específicas
    rounded47: 'rounded-[47px]',
    rounded32: 'rounded-[32px]',
    rounded20: 'rounded-[20px]',

    // Cores específicas
    cinzaClaro: 'text-cinza-claro',
    cinzaMedia: 'text-cinza-média',
    planoOriginal: 'text-Plano-original',
    custoDeVida: 'text-custo-de-vida'
} as const;

// Estilos da página de Alocações
export const ALLOCATIONS_STYLES = {
    timeline: {
        container: `${LAYOUT_CLASSES.relative} mt-6 sm:mt-8`,
        title: `${TEXT_COMMON.h4} ${RESPONSIVE_COMMON.textResponsive} mb-6 sm:mb-8`,
        line: `${POSITION_COMMON.absolute} left-4 sm:left-6 top-10 sm:top-12 ${SIZE_COMMON.w0_5} ${SIZE_COMMON.hFull} bg-gray-600`,
        oldDataLabel: `${POSITION_COMMON.absolute} left-6 sm:left-10 top-12 sm:top-16 ${TEXT_COMMON.small} ${RESPONSIVE_COMMON.textResponsive}`,
        updatedLabel: `${POSITION_COMMON.absolute} left-6 sm:left-10 top-28 sm:top-36 ${TEXT_COMMON.small} ${RESPONSIVE_COMMON.textResponsive}`,
        itemsContainer: 'mt-16 sm:mt-20'
    }
} as const;

// Estilos da página de Projeção
export const PROJECTIONS_STYLES = {
    mainContainer: `${LAYOUT_CLASSES.relative} overflow-hidden`,
    clientSelector: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left101} ${PROJECT_SPECIFIC.top101}`,

    netWorth: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left111} ${PROJECT_SPECIFIC.top291}`,
        label: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.satoshi}`,
        value: `${TEXT_COMMON.h1} ${TEXT_COMMON.workSans}`,
        percentage: `${TEXT_COMMON.accent} ${TEXT_COMMON.workSans}`
    },

    projections: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.top140}`,
        current: {
            container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left667}`,
            value: `${TEXT_COMMON.h3} ${TEXT_COMMON.workSans}`,
            year: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans}`,
            age: `${TEXT_COMMON.accent} ${TEXT_COMMON.workSans}`,
            badge: `${SIZE_COMMON.w10} ${SIZE_COMMON.h8} p-2.5 ${BG_COMMON.blue500_25} ${BORDER_COMMON.rounded} ${LAYOUT_CLASSES.flexCenter} gap-2.5`,
            badgeText: `${TEXT_COMMON.accent} ${TEXT_COMMON.workSans}`,
            bar: `${SIZE_COMMON.w96} ${SIZE_COMMON.h16} ${BG_COMMON.indigo500_30} ${BORDER_COMMON.roundedMd}`,
            barFill: `${SIZE_COMMON.w28} ${SIZE_COMMON.h16} ${BG_COMMON.gradientBlue} ${BORDER_COMMON.roundedMd}`
        },
        future: {
            container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left1061}`,
            value: `${TEXT_COMMON.h3} ${TEXT_COMMON.workSans}`,
            year: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans}`,
            age: `${TEXT_COMMON.primary} ${TEXT_COMMON.workSans}`,
            percentage: `${TEXT_COMMON.accent} ${TEXT_COMMON.workSans}`,
            bar: `${SIZE_COMMON.w96} ${SIZE_COMMON.h16} ${BG_COMMON.zinc900} ${BORDER_COMMON.roundedMd}`
        },
        retirement: {
            container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left1473}`,
            value: `${TEXT_COMMON.h4} ${TEXT_COMMON.inter}`,
            year: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans}`,
            age: `${TEXT_COMMON.primary} ${TEXT_COMMON.workSans}`,
            percentage: `${TEXT_COMMON.accent} ${TEXT_COMMON.inter}`,
            bar: `${SIZE_COMMON.w96} ${SIZE_COMMON.h16} ${BG_COMMON.zinc900} ${BORDER_COMMON.roundedMd}`
        }
    },

    scenarioStatus: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left667} ${PROJECT_SPECIFIC.top476} ${LAYOUT_CLASSES.flexCenter} gap-6`,
        radio: `${SIZE_COMMON.w8} ${SIZE_COMMON.h8} ${BORDER_COMMON.roundedFull} ${BORDER_COMMON.solid2} border-neutral-400`,
        label: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.neuton}`
    },

    chart: {
        container: `${PROJECT_SPECIFIC.w1413} ${SIZE_COMMON.h96} ${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left101} ${PROJECT_SPECIFIC.top540} ${BG_COMMON.zinc900} ${PROJECT_SPECIFIC.rounded32}`,
        title: `${TEXT_COMMON.h3} ${TEXT_COMMON.neuton} ${POSITION_COMMON.absolute} left-[132.69px] top-[20px]`,
        controls: {
            container: `${POSITION_COMMON.absolute} right-[20px] top-[20px] ${LAYOUT_CLASSES.flexCenter} gap-4`,
            link: `${TEXT_COMMON.body} ${EFFECT_COMMON.hoverWhite} ${EFFECT_COMMON.transitionColors}`
        },
        yAxis: {
            container: `${POSITION_COMMON.absolute} left-[20px] top-[60px] ${LAYOUT_CLASSES.spaceY4}`,
            label: `${TEXT_COMMON.small} ${TEXT_COMMON.inter}`
        },
        grid: {
            line: `${POSITION_COMMON.absolute} w-[1183.98px] h-0 origin-top-left rotate-180 outline outline-1 outline-offset-[-0.50px] outline-neutral-600`
        },
        lines: {
            original: `${POSITION_COMMON.absolute} w-[1064.43px] h-48 left-[316.33px] top-[91.96px] shadow-[7px_2px_15px_0px_rgba(103,174,250,0.98)] shadow-[26px_8px_27px_0px_rgba(103,174,250,0.85)] shadow-[59px_17px_37px_0px_rgba(103,174,250,0.50)] shadow-[105px_30px_44px_0px_rgba(103,174,250,0.15)] shadow-[163px_47px_48px_0px_rgba(103,174,250,0.02)] outline outline-[3px] outline-offset-[-1.50px] outline-blue-400`,
            current: `${POSITION_COMMON.absolute} w-80 h-32 left-[317.78px] top-[163.50px] shadow-[5px_1px_12px_0px_rgba(239,183,81,0.98)] shadow-[22px_5px_22px_0px_rgba(239,183,81,0.85)] shadow-[49px_11px_30px_0px_rgba(239,183,81,0.50)] shadow-[87px_20px_36px_0px_rgba(239,183,81,0.15)] shadow-[135px_31px_39px_0px_rgba(239,183,81,0.02)] outline outline-[3px] outline-offset-[-1.50px] outline-amber-300`,
            realized: `${POSITION_COMMON.absolute} w-[766.92px] h-16 left-[643.59px] top-[100.95px] origin-top-left rotate-[10.54deg] shadow-[3px_2px_8px_0px_rgba(14,216,121,0.98)] shadow-[14px_6px_15px_0px_rgba(14,216,121,0.85)] shadow-[31px_14px_21px_0px_rgba(14,216,121,0.50)] shadow-[56px_25px_24px_0px_rgba(14,216,121,0.15)] shadow-[87px_39px_27px_0px_rgba(14,216,121,0.02)] outline outline-[3px] outline-offset-[-1.50px] outline-green-400`
        },
        dots: {
            amber: `${SIZE_COMMON.w4} ${SIZE_COMMON.h3} bg-amber-300 ${BORDER_COMMON.roundedFull} ${POSITION_COMMON.absolute}`
        }
    },

    simulationControls: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left434} ${PROJECT_SPECIFIC.top976} ${LAYOUT_CLASSES.flexCenter} gap-4`,
        button: {
            container: `${SIZE_COMMON.w72} ${SIZE_COMMON.h16} ${BG_COMMON.zinc900} ${BORDER_COMMON.rounded2xl} ${LAYOUT_CLASSES.flexCenter} gap-4 px-4`,
            selected: `${SIZE_COMMON.w72} ${SIZE_COMMON.h16} ${BG_COMMON.zinc900} ${BORDER_COMMON.rounded2xl} outline outline-2 outline-blue-400 ${LAYOUT_CLASSES.flexCenter} gap-4 px-4`,
            radio: `${SIZE_COMMON.w8} ${SIZE_COMMON.h8} ${BORDER_COMMON.roundedFull} ${BORDER_COMMON.solid2} border-zinc-800`,
            radioSelected: `${SIZE_COMMON.w8} ${SIZE_COMMON.h8} ${BORDER_COMMON.roundedFull} ${BORDER_COMMON.solid2} border-blue-400`,
            radioFill: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6} ${BG_COMMON.zinc800} ${BORDER_COMMON.roundedFull}`,
            radioFillSelected: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6} ${BG_COMMON.blue500} ${BORDER_COMMON.roundedFull}`,
            text: `${PROJECT_SPECIFIC.cinzaClaro} ${TEXT_COMMON.workSans}`,
            dots: `${SIZE_COMMON.w1} ${SIZE_COMMON.h1} bg-zinc-300 ${BORDER_COMMON.roundedFull}`
        },
        addButton: {
            container: `${SIZE_COMMON.w28} ${SIZE_COMMON.h16} ${BG_COMMON.zinc900} ${BORDER_COMMON.rounded2xl} outline outline-2 outline-amber-300 ${LAYOUT_CLASSES.flexCenter}`,
            text: `${PROJECT_SPECIFIC.cinzaClaro} ${TEXT_COMMON.workSans}`
        }
    },

    timeline: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left101} ${PROJECT_SPECIFIC.top1072}`,
        title: `${PROJECT_SPECIFIC.planoOriginal} ${TEXT_COMMON.h3} ${TEXT_COMMON.neuton} ${POSITION_COMMON.absolute} left-[14.87px] top-0`,
        years: {
            container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.top140} ${LAYOUT_CLASSES.flexCenter} gap-8`,
            year: `${TEXT_COMMON.primary} ${TEXT_COMMON.workSans}`,
            age: `${TEXT_COMMON.primary} ${TEXT_COMMON.workSans}`
        },
        salary: {
            container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.top59}`,
            label: `${TEXT_COMMON.success} ${TEXT_COMMON.workSans}`,
            value: `${TEXT_COMMON.success} ${TEXT_COMMON.workSans}`,
            dot: `${SIZE_COMMON.w3} ${SIZE_COMMON.h4} ${BG_COMMON.green500} ${BORDER_COMMON.roundedFull} ${POSITION_COMMON.absolute}`,
            line: `${SIZE_COMMON.w6} h-0 origin-top-left rotate-90 ${BG_COMMON.green500} outline outline-1 outline-offset-[-0.50px] outline-cinza-média ${POSITION_COMMON.absolute}`
        },
        costOfLiving: {
            container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.top140}`,
            label: `${PROJECT_SPECIFIC.custoDeVida} ${TEXT_COMMON.workSans}`,
            value: `${PROJECT_SPECIFIC.custoDeVida} ${TEXT_COMMON.workSans}`,
            dot: `${SIZE_COMMON.w3} ${SIZE_COMMON.h4} bg-custo-de-vida ${BORDER_COMMON.roundedFull} ${POSITION_COMMON.absolute}`,
            line: `${SIZE_COMMON.w6} h-0 origin-top-left rotate-90 bg-custo-de-vida outline outline-1 outline-offset-[-0.50px] outline-cinza-média ${POSITION_COMMON.absolute}`
        },
        mainLine: `w-[1315.89px] h-0 ${POSITION_COMMON.absolute} outline outline-4 outline-offset-[-2px] outline-cinza-média`
    },

    movements: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left101} ${PROJECT_SPECIFIC.top1426}`,
        title: `${PROJECT_SPECIFIC.planoOriginal} ${TEXT_COMMON.h3} ${TEXT_COMMON.neuton} ${POSITION_COMMON.absolute} left-[14.87px] top-0`,
        tabs: {
            container: `${POSITION_COMMON.absolute} left-[1213px] top-[-12px] ${LAYOUT_CLASSES.flexCenter} gap-4`,
            active: `${SIZE_COMMON.w72} px-6 py-3 bg-gray-200 ${PROJECT_SPECIFIC.rounded47} ${LAYOUT_CLASSES.flexCenter} gap-2`,
            inactive: `${SIZE_COMMON.w72} px-6 py-3 ${BG_COMMON.zinc900} ${PROJECT_SPECIFIC.rounded47} ${LAYOUT_CLASSES.flexCenter} gap-2`,
            text: `${TEXT_COMMON.neutral700} ${TEXT_COMMON.workSans}`,
            textInactive: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans}`
        },
        cards: {
            container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.top59} grid grid-cols-2 gap-4`,
            card: `${PROJECT_SPECIFIC.w697} ${SIZE_COMMON.h44} ${BG_COMMON.zinc900} ${BORDER_COMMON.rounded2xl} border-2 border-Plano-original p-6 ${POSITION_COMMON.relative}`,
            title: `${TEXT_COMMON.zinc300} ${TEXT_COMMON.workSans} mb-2`,
            date: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans} mb-1`,
            frequency: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans} mb-1`,
            type: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans} mb-1`,
            value: {
                credit: `${TEXT_COMMON.success} ${TEXT_COMMON.workSans}`,
                debit: `${TEXT_COMMON.error} ${TEXT_COMMON.workSans}`,
                insurance: `${TEXT_COMMON.purple600} ${TEXT_COMMON.workSans}`
            },
            icon: {
                credit: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6} ${BG_COMMON.green700} ${POSITION_COMMON.absolute}`,
                debit: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6} ${BG_COMMON.red500} ${POSITION_COMMON.absolute} origin-top-left -rotate-180`
            }
        }
    },

    insurances: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left101} ${PROJECT_SPECIFIC.top1879}`,
        title: `${PROJECT_SPECIFIC.planoOriginal} ${TEXT_COMMON.h3} ${TEXT_COMMON.neuton} ${POSITION_COMMON.absolute} left-[14.87px] top-0`,
        subtitle: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.inter} ${POSITION_COMMON.absolute} left-[14.87px] top-[-60px]`,
        cards: {
            container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.top59} grid grid-cols-2 gap-4`,
            card: `${PROJECT_SPECIFIC.w697} ${SIZE_COMMON.h44} ${BG_COMMON.zinc900} ${BORDER_COMMON.rounded2xl} border-2 border-Plano-original p-6 ${POSITION_COMMON.relative}`,
            title: `${TEXT_COMMON.zinc300} ${TEXT_COMMON.workSans} mb-2`,
            type: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans} mb-1`,
            duration: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans} mb-1`,
            premium: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans} mb-1`,
            value: `${TEXT_COMMON.purple600} ${TEXT_COMMON.workSans}`
        }
    }
} as const;

// Estilos da página de Histórico
export const HISTORY_STYLES = {
    mainContainer: `${PROJECT_SPECIFIC.w1413} ${PROJECT_SPECIFIC.h1108} ${POSITION_COMMON.relative} ${BG_COMMON.zinc950} ${BORDER_COMMON.rounded3xl} overflow-hidden`,

    userHeader: {
        container: `${SIZE_COMMON.w96} ${SIZE_COMMON.h16} ${BG_COMMON.zinc950} ${PROJECT_SPECIFIC.rounded32} border-2 border-cinza-claro ${POSITION_COMMON.relative}`,
        name: `${TEXT_COMMON.primary} ${TEXT_COMMON.h1} ${TEXT_COMMON.workSans} ${POSITION_COMMON.absolute} left-[18px] top-[18px]`,
        dropdown: `${SIZE_COMMON.w8} ${SIZE_COMMON.h4} ${POSITION_COMMON.absolute} right-[15px] top-[25px] outline outline-4 outline-offset-[-2px] outline-cinza-claro`
    },

    pageTitle: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left159} ${PROJECT_SPECIFIC.top288}`,
        text: `${TEXT_COMMON.zinc300} ${TEXT_COMMON.h1} ${TEXT_COMMON.neuton}`
    },

    title: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left159} ${PROJECT_SPECIFIC.top288}`,
        text: `${TEXT_COMMON.zinc300} ${TEXT_COMMON.h1} ${TEXT_COMMON.neuton}`
    },

    table: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left163} ${PROJECT_SPECIFIC.top385}`,
        header: {
            container: `${PROJECT_SPECIFIC.w1272} ${SIZE_COMMON.h16} ${LAYOUT_CLASSES.flexCenter} border-b border-neutral-600`,
            cell: `${PROJECT_SPECIFIC.cinzaMedia} ${TEXT_COMMON.workSans}`,
            data: `${PROJECT_SPECIFIC.cinzaMedia} ${TEXT_COMMON.workSans}`,
            patrimony: `${PROJECT_SPECIFIC.cinzaMedia} ${TEXT_COMMON.workSans}`,
            retirement: `${PROJECT_SPECIFIC.cinzaMedia} ${TEXT_COMMON.workSans}`,
            version: `${PROJECT_SPECIFIC.cinzaMedia} ${TEXT_COMMON.workSans}`
        },
        row: {
            container: `${PROJECT_SPECIFIC.w1272} ${SIZE_COMMON.h24} border-b border-neutral-600 ${LAYOUT_CLASSES.flexCenter}`,
            data: `${PROJECT_SPECIFIC.cinzaClaro} ${TEXT_COMMON.workSans}`,
            patrimony: `${PROJECT_SPECIFIC.cinzaClaro} ${TEXT_COMMON.workSans}`,
            retirement: `${PROJECT_SPECIFIC.cinzaClaro} ${TEXT_COMMON.workSans}`,
            version: `${PROJECT_SPECIFIC.cinzaClaro} ${TEXT_COMMON.workSans}`
        }
    },

    simulationCards: {
        container: `${POSITION_COMMON.absolute} ${PROJECT_SPECIFIC.left163} ${PROJECT_SPECIFIC.top385} ${LAYOUT_CLASSES.spaceY4}`,
        card: {
            container: `${PROJECT_SPECIFIC.w1272} ${SIZE_COMMON.h64} bg-transparent ${PROJECT_SPECIFIC.rounded20} border border-neutral-600 ${POSITION_COMMON.relative}`,
            smallCard: `${PROJECT_SPECIFIC.w1272} ${SIZE_COMMON.h24} bg-transparent ${PROJECT_SPECIFIC.rounded20} border border-neutral-600 ${POSITION_COMMON.relative}`,
            icon: {
                container: `${SIZE_COMMON.w12} ${SIZE_COMMON.h12} ${POSITION_COMMON.absolute} left-[29px] top-[21px] ${BORDER_COMMON.roundedFull}`,
                blur: `${SIZE_COMMON.w12} ${SIZE_COMMON.h12} ${POSITION_COMMON.absolute} ${BORDER_COMMON.roundedFull} blur`,
                gradient: `${SIZE_COMMON.w12} ${SIZE_COMMON.h12} ${POSITION_COMMON.absolute} ${BORDER_COMMON.roundedFull}`,
                small: `${SIZE_COMMON.w11} ${SIZE_COMMON.h11} ${POSITION_COMMON.absolute} left-[76px] top-[68px] ${BORDER_COMMON.roundedFull}`,
                highlight: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6} ${POSITION_COMMON.absolute} ${BORDER_COMMON.roundedFull} outline outline-1 outline-offset-[-0.50px] outline-neutral-100 blur-[2.50px]`,
                highlightClean: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6} ${POSITION_COMMON.absolute} ${BORDER_COMMON.roundedFull} outline outline-1 outline-offset-[-0.50px] outline-neutral-100`
            },
            title: `${TEXT_COMMON.zinc300} ${TEXT_COMMON.h3} ${TEXT_COMMON.neuton} ${POSITION_COMMON.absolute} left-[98px] top-[21px]`,
            button: {
                container: `${SIZE_COMMON.w72} ${SIZE_COMMON.h12} px-6 py-3 ${BG_COMMON.neutral700} ${PROJECT_SPECIFIC.rounded47} ${LAYOUT_CLASSES.flexCenter} gap-2.5 ${POSITION_COMMON.absolute} right-[29px] top-[21px]`,
                text: `${TEXT_COMMON.zinc400} ${TEXT_COMMON.workSans}`
            }
        }
    },

    pagination: {
        container: `${POSITION_COMMON.absolute} left-[735px] ${PROJECT_SPECIFIC.top976} ${LAYOUT_CLASSES.flexCenter} gap-4`,
        text: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans}`,
        button: {
            container: `${SIZE_COMMON.w10} ${SIZE_COMMON.h10} ${BG_COMMON.zinc800} ${BORDER_COMMON.rounded3xl} border border-neutral-700 ${LAYOUT_CLASSES.flexCenter}`,
            icon: `${SIZE_COMMON.w8} ${PROJECT_SPECIFIC.h8}`,
            prev: `w-0 ${SIZE_COMMON.h4} ${BG_COMMON.neutral500}`,
            next: `${PROJECT_SPECIFIC.w3} ${SIZE_COMMON.h4} ${BG_COMMON.white}`
        }
    },

    decorativeLines: {
        vertical: `w-[1108px] h-0 left-[-4px] top-0 ${POSITION_COMMON.absolute} origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-neutral-700`,
        horizontal: `w-[1370px] h-0 left-[108px] ${PROJECT_SPECIFIC.top140} ${POSITION_COMMON.absolute} outline outline-1 outline-offset-[-0.50px] outline-neutral-700`
    },

    decorativeDots: {
        container: `${POSITION_COMMON.absolute} left-[-67px] ${PROJECT_SPECIFIC.top1072} ${LAYOUT_CLASSES.flexCenter} gap-2`,
        dot: `w-[5px] h-[5px] ${BG_COMMON.neutral700} ${BORDER_COMMON.roundedFull}`
    },

    sidebar: {
        container: `${POSITION_COMMON.absolute} left-[-310px] ${PROJECT_SPECIFIC.top59}`,
        logo: {
            container: `${PROJECT_SPECIFIC.w40} ${SIZE_COMMON.h12} ${BG_COMMON.gradientOrange} ${PROJECT_SPECIFIC.rounded47} border border-orange-600 ${LAYOUT_CLASSES.flexCenter}`,
            image: `${PROJECT_SPECIFIC.w24} ${PROJECT_SPECIFIC.h10}`
        },
        menu: {
            container: `${LAYOUT_CLASSES.spaceY2} mt-8`,
            item: {
                container: `${SIZE_COMMON.w72} px-6 py-3 ${PROJECT_SPECIFIC.rounded47} ${LAYOUT_CLASSES.flexStart} gap-2`,
                active: `${SIZE_COMMON.w72} ${SIZE_COMMON.h14} px-6 py-3 ${BG_COMMON.zinc800} ${PROJECT_SPECIFIC.rounded47}`,
                icon: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6} ${BG_COMMON.zinc300}`,
                smallIcon: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6}`,
                text: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans}`,
                textActive: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans}`,
                textInactive: `${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.workSans}`,
                dropdown: `${PROJECT_SPECIFIC.w4} ${PROJECT_SPECIFIC.h2} outline outline-4 outline-offset-[-2px] outline-neutral-600`
            }
        }
    }
} as const;

// Estilos comuns reutilizáveis
export const COMMON_STYLES = {
    // Flexbox
    flexCenter: LAYOUT_CLASSES.flexCenter,
    flexCenterGap4: `${LAYOUT_CLASSES.flexCenter} ${LAYOUT_CLASSES.gap4}`,
    flexGap1: `${LAYOUT_CLASSES.flexCenter} ${LAYOUT_CLASSES.gap1}`,
    textCenter: LAYOUT_CLASSES.flexCenter,

    // Posicionamento
    absoluteLeft0: `${POSITION_COMMON.absolute} left-0`,
    absoluteLeft200: `${POSITION_COMMON.absolute} left-[200px]`,
    absoluteLeft400: `${POSITION_COMMON.absolute} left-[400px]`,
    absoluteLeft600: `${POSITION_COMMON.absolute} left-[600px]`,
    absoluteLeft800: `${POSITION_COMMON.absolute} left-[800px]`,

    // Botões
    buttonGhost: `${TEXT_COMMON.primary} ${EFFECT_COMMON.hoverBg}`,

    // Badges
    badgeLegacy: `ml-2 ${BG_COMMON.amber300} ${TEXT_COMMON.warning} border-yellow-500/30`,

    // Ícones
    iconSmall: `${PROJECT_SPECIFIC.w3} ${PROJECT_SPECIFIC.h3} mr-1`,
    iconMedium: `${PROJECT_SPECIFIC.w4} ${SIZE_COMMON.h4} mr-1`,
    iconLarge: `${SIZE_COMMON.w6} ${SIZE_COMMON.h6} ${PROJECT_SPECIFIC.cinzaClaro}`,

    // Controles de filtro
    filterContainer: `${POSITION_COMMON.absolute} left-[32px] top-[120px] ${LAYOUT_CLASSES.flexCenter} gap-4`,
    selectTrigger: 'w-64',
    checkboxLabel: `${LAYOUT_CLASSES.flexCenter} gap-2 ${TEXT_COMMON.primary}`,
    checkboxInput: BORDER_COMMON.rounded,

    // Cards de simulação
    simulationCards: `${LAYOUT_CLASSES.spaceY4} mt-4`,
    simulationData: `${POSITION_COMMON.absolute} left-[32px] top-[68px] ${LAYOUT_CLASSES.flexCenter} space-x-32`,
    simulationActions: `${POSITION_COMMON.absolute} right-[32px] top-[68px] ${LAYOUT_CLASSES.flexCenter} gap-2`,

    // Sidebar decorativo
    sidebarDots: `${SIZE_COMMON.w2} ${SIZE_COMMON.h2} outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500`,
    sidebarDotsSmall: `${SIZE_COMMON.w2} ${SIZE_COMMON.h1} outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500`,
    sidebarIcon: `${SIZE_COMMON.w4} ${SIZE_COMMON.h4} ${BG_COMMON.neutral400}`,
    sidebarIconActive: `${SIZE_COMMON.w6} ${SIZE_COMMON.h4} ${BG_COMMON.zinc300}`,
    sidebarIconInactive: `${SIZE_COMMON.w6} ${SIZE_COMMON.h4} ${BG_COMMON.neutral500}`,

    // Barras decorativas
    decorativeBar: `${SIZE_COMMON.w72} ${SIZE_COMMON.h16} left-[-310px] ${PROJECT_SPECIFIC.top1072} ${POSITION_COMMON.absolute} ${BG_COMMON.gradientStone} ${BORDER_COMMON.roundedXl} border border-neutral-100`,
    userInfo: `left-[-254px] ${PROJECT_SPECIFIC.top1072} ${POSITION_COMMON.absolute} ${TEXT_COMMON.primary} ${TEXT_COMMON.small} ${TEXT_COMMON.inter}`,
    userEmail: `left-[-254px] ${PROJECT_SPECIFIC.top1072} ${POSITION_COMMON.absolute} ${TEXT_COMMON.bodyMuted} ${TEXT_COMMON.small} ${TEXT_COMMON.inter}`,
    userAvatar: `${SIZE_COMMON.w8} ${SIZE_COMMON.h8} left-[-296px] ${PROJECT_SPECIFIC.top1072} ${POSITION_COMMON.absolute} ${BG_COMMON.red400} ${BORDER_COMMON.roundedLg}`,
    userInitials: `left-[-286px] ${PROJECT_SPECIFIC.top1072} ${POSITION_COMMON.absolute} ${TEXT_COMMON.primary} ${TEXT_COMMON.xs} ${TEXT_COMMON.inter}`,
    decorativeBarSmall: `${SIZE_COMMON.w20} ${SIZE_COMMON.h2} left-[-177px] ${PROJECT_SPECIFIC.top59} ${POSITION_COMMON.absolute} opacity-70 ${BG_COMMON.red500} blur`,
    decorativeBarTiny: `${SIZE_COMMON.w12} ${SIZE_COMMON.h2} left-[-162px] ${PROJECT_SPECIFIC.top59} ${POSITION_COMMON.absolute} opacity-70 bg-gray-200/50 blur-[2.50px]`,
    decorativeBarVertical: `${SIZE_COMMON.w1} ${SIZE_COMMON.h16} left-[1839px] ${PROJECT_SPECIFIC.top140} ${POSITION_COMMON.absolute} ${BG_COMMON.blue500} ${BORDER_COMMON.roundedLg}`
} as const;

// Funções utilitárias para cores de ícones
export const getIconColor = (name: string, isLegacy: boolean) => {
    if (isLegacy) {
        return {
            iconColor: 'from-gray-200 to-neutral-400',
            iconBlur: 'bg-stone-300/50'
        };
    }

    if (name.includes('Plano Original')) {
        return {
            iconColor: 'from-blue-500 to-indigo-800',
            iconBlur: 'bg-indigo-500/50'
        };
    } else if (name.includes('Aposentadoria')) {
        return {
            iconColor: 'from-lime-300 to-yellow-700',
            iconBlur: 'bg-lime-400/50'
        };
    } else {
        return {
            iconColor: 'from-purple-500 to-pink-800',
            iconBlur: 'bg-purple-500/50'
        };
    }
};

// Funções utilitárias para formatação
export const formatMovementData = (movement: any) => ({
    id: movement.id.toString(),
    title: movement.type,
    date: `${new Date(movement.startDate).toLocaleDateString('pt-BR')}${movement.endDate ? ` - ${new Date(movement.endDate).toLocaleDateString('pt-BR')}` : ''}`,
    frequency: `Frequência: ${movement.frequency}`,
    type: movement.type,
    value: movement.value,
    isCredit: movement.type === 'CREDIT'
});

export const formatInsuranceData = (insurance: any) => ({
    id: insurance.id.toString(),
    title: insurance.name,
    type: (insurance as any).type || 'Seguro de Vida',
    duration: `Duração: ${Math.floor(insurance.durationMonths / 12)} anos`,
    premium: `Prêmio: R$ ${insurance.premium.toLocaleString('pt-BR')}/mês`,
    value: insurance.insuredValue
});

export const getStatusLabel = (status: string) => {
    switch (status) {
        case 'VIVO': return 'Vivo';
        case 'MORTO': return 'Morto';
        case 'INVALIDO': return 'Inválido';
        default: return status;
    }
};