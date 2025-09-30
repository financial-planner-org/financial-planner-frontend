// ============================================================================
// ESTILOS RESPONSIVOS DAS PÁGINAS - FINANCIAL PLANNER
// ============================================================================

import {
    LAYOUT_CLASSES,
    TEXT_COMMON,
    BG_COMMON,
    BORDER_COMMON,
    SIZE_COMMON,
    POSITION_COMMON,
    EFFECT_COMMON
} from './common-classes';
import {
    CONTAINER_RESPONSIVE,
    TYPOGRAPHY_RESPONSIVE,
    SPACING_RESPONSIVE,
    COMPONENT_RESPONSIVE,
    ZOOM_RESPONSIVE,
    RESPONSIVE_UTILS
} from './responsive-system';

// ============================================================================
// ESTILOS DA PÁGINA DE PROJEÇÕES - RESPONSIVOS
// ============================================================================

export const PROJECTIONS_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,

    clientSelector: `${POSITION_COMMON.relative} ${SIZE_COMMON.wFull} ${SIZE_COMMON.h12} ${RESPONSIVE_UTILS.adaptive}`,

    netWorth: {
        container: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.sm} ${POSITION_COMMON.relative} ${SIZE_COMMON.wFull} ${SIZE_COMMON.h24} ${RESPONSIVE_UTILS.adaptive}`,
        label: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground}`,
        value: `${TYPOGRAPHY_RESPONSIVE.h1} ${TEXT_COMMON.textForeground}`,
        percentage: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} ${TEXT_COMMON.textGreen500} ${TEXT_COMMON.fontMedium}`
    },

    projections: {
        container: `${CONTAINER_RESPONSIVE.cards} ${SIZE_COMMON.wFull}`,
        current: {
            container: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.sm} ${SIZE_COMMON.wFull} ${SIZE_COMMON.h24} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
            year: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground}`,
            value: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} ${TEXT_COMMON.fontBold}`,
            age: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground}`,
            bar: `${SIZE_COMMON.wFull} ${SIZE_COMMON.h2} ${BG_COMMON.muted} ${BORDER_COMMON.roundedFull}`,
            barFill: `${SIZE_COMMON.hFull} ${BG_COMMON.primary} ${BORDER_COMMON.roundedFull}`
        },
        future: {
            container: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.sm} ${SIZE_COMMON.wFull} ${SIZE_COMMON.h24} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
            year: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground}`,
            age: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground}`,
            value: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} ${TEXT_COMMON.fontBold}`,
            percentage: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textGreen500} ${TEXT_COMMON.fontMedium}`,
            bar: `${SIZE_COMMON.wFull} ${SIZE_COMMON.h2} ${BG_COMMON.muted} ${BORDER_COMMON.roundedFull}`,
            barFill: `${SIZE_COMMON.hFull} ${BG_COMMON.primary} ${BORDER_COMMON.roundedFull}`
        }
    },

    chart: {
        container: `${ZOOM_RESPONSIVE.zoomChart} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.md}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} ${TEXT_COMMON.mb4}`,
        controls: `${LAYOUT_CLASSES.flexRow} ${SPACING_RESPONSIVE.gap.sm} ${TEXT_COMMON.mb4} ${RESPONSIVE_UTILS.overflowResponsive}`,
        link: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textBlue500} ${TEXT_COMMON.cursorPointer} ${TEXT_COMMON.hoverUnderline}`
    },

    simulations: {
        container: `${CONTAINER_RESPONSIVE.timeline} ${SIZE_COMMON.wFull} ${TEXT_COMMON.mb6} ${RESPONSIVE_UTILS.overflowResponsive}`,
        button: `${COMPONENT_RESPONSIVE.button.md} ${BG_COMMON.secondary} ${TEXT_COMMON.textForeground} ${BORDER_COMMON.roundedMd} ${TEXT_COMMON.cursorPointer} ${TEXT_COMMON.hoverBgSecondary}`,
        activeButton: `${COMPONENT_RESPONSIVE.button.md} ${BG_COMMON.primary} ${TEXT_COMMON.textPrimaryForeground} ${BORDER_COMMON.roundedMd} ${TEXT_COMMON.cursorPointer}`,
        addButton: `${COMPONENT_RESPONSIVE.button.md} ${BG_COMMON.outline} ${TEXT_COMMON.textForeground} ${BORDER_COMMON.roundedMd} ${TEXT_COMMON.cursorPointer} ${TEXT_COMMON.hoverBgSecondary} ${LAYOUT_CLASSES.flexRow} ${SPACING_COMMON.gap2}`
    },

    timeline: {
        container: `${SIZE_COMMON.wFull} ${SIZE_COMMON.h32} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomTimeline}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} ${TEXT_COMMON.mb4}`,
        content: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
        line: `${SIZE_COMMON.wFull} ${SIZE_COMMON.h1} ${BG_COMMON.muted} ${BORDER_COMMON.roundedFull}`,
        marker: `${SIZE_COMMON.w3} ${SIZE_COMMON.h3} ${BG_COMMON.primary} ${BORDER_COMMON.roundedFull} ${POSITION_COMMON.absolute}`
    },

    movements: {
        container: `${SIZE_COMMON.wFull} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomCard}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} ${TEXT_COMMON.mb4}`,
        tabs: `${CONTAINER_RESPONSIVE.timeline} ${TEXT_COMMON.mb4}`,
        tab: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground} ${TEXT_COMMON.cursorPointer} ${TEXT_COMMON.hoverTextForeground}`,
        activeTab: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textForeground} ${TEXT_COMMON.fontMedium}`,
        cards: `${CONTAINER_RESPONSIVE.cards}`,
        card: `${SIZE_COMMON.wFull} ${BG_COMMON.secondary} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
        cardTitle: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.fontMedium} ${TEXT_COMMON.mb2}`,
        cardValue: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} ${TEXT_COMMON.fontBold} ${TEXT_COMMON.mb1}`,
        cardDate: `${TYPOGRAPHY_RESPONSIVE.caption}`
    },

    insurances: {
        container: `${SIZE_COMMON.wFull} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomCard}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h3} ${TEXT_COMMON.mb4}`,
        cards: `${CONTAINER_RESPONSIVE.cards}`,
        card: `${SIZE_COMMON.wFull} ${BG_COMMON.secondary} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.sm} ${ZOOM_RESPONSIVE.zoomCard}`,
        cardTitle: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.fontMedium} ${TEXT_COMMON.mb2}`,
        cardValue: `${TYPOGRAPHY_RESPONSIVE.bodyLarge} ${TEXT_COMMON.fontBold} ${TEXT_COMMON.mb1}`,
        cardDetails: `${TYPOGRAPHY_RESPONSIVE.caption}`
    }
};

// ============================================================================
// ESTILOS DA PÁGINA DE ALOÇÕES - RESPONSIVOS
// ============================================================================

export const ALLOCATIONS_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,

    header: {
        container: `${LAYOUT_CLASSES.flexRow} ${LAYOUT_CLASSES.justifyBetween} ${LAYOUT_CLASSES.itemsCenter} ${SIZE_COMMON.wFull} ${TEXT_COMMON.mb6}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h2} ${TEXT_COMMON.textForeground}`,
        controls: `${LAYOUT_CLASSES.flexRow} ${SPACING_RESPONSIVE.gap.sm} ${LAYOUT_CLASSES.itemsCenter}`,
        filter: `${COMPONENT_RESPONSIVE.input.container}`,
        addButton: `${COMPONENT_RESPONSIVE.button.lg} ${BG_COMMON.primary} ${TEXT_COMMON.textPrimaryForeground} ${BORDER_COMMON.roundedMd} ${TEXT_COMMON.cursorPointer} ${LAYOUT_CLASSES.flexRow} ${SPACING_COMMON.gap2}`
    },

    timeline: {
        container: `${POSITION_COMMON.relative} ${SIZE_COMMON.wFull} ${TEXT_COMMON.mt6}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h4} ${TEXT_COMMON.mb6}`,
        line: `${POSITION_COMMON.absolute} ${SIZE_COMMON.left4} ${SIZE_COMMON.top10} ${SIZE_COMMON.w0_5} ${SIZE_COMMON.hFull} ${BG_COMMON.muted}`,
        oldDataLabel: `${POSITION_COMMON.absolute} ${SIZE_COMMON.left6} ${SIZE_COMMON.top12} ${TYPOGRAPHY_RESPONSIVE.caption}`,
        updatedLabel: `${POSITION_COMMON.absolute} ${SIZE_COMMON.left6} ${SIZE_COMMON.top28} ${TYPOGRAPHY_RESPONSIVE.caption}`,
        itemsContainer: `${TEXT_COMMON.mt16}`
    },

    card: {
        container: `${SIZE_COMMON.wFull} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${TEXT_COMMON.mb4} ${ZOOM_RESPONSIVE.zoomCard}`,
        header: `${LAYOUT_CLASSES.flexRow} ${LAYOUT_CLASSES.justifyBetween} ${LAYOUT_CLASSES.itemsStart} ${TEXT_COMMON.mb4}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h5} ${TEXT_COMMON.textForeground}`,
        badge: `${BG_COMMON.secondary} ${TEXT_COMMON.textSecondaryForeground} ${BORDER_COMMON.roundedFull} ${SPACING_COMMON.px3} ${SPACING_COMMON.py1} ${TYPOGRAPHY_RESPONSIVE.caption}`,
        content: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
        value: `${TYPOGRAPHY_RESPONSIVE.h4} ${TEXT_COMMON.textForeground}`,
        details: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground}`,
        actions: `${LAYOUT_CLASSES.flexRow} ${SPACING_RESPONSIVE.gap.sm} ${TEXT_COMMON.mt4}`,
        updateButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG_COMMON.primary} ${TEXT_COMMON.textPrimaryForeground} ${BORDER_COMMON.roundedMd}`,
        menuButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG_COMMON.outline} ${TEXT_COMMON.textForeground} ${BORDER_COMMON.roundedMd}`
    }
};

// ============================================================================
// ESTILOS DA PÁGINA DE HISTÓRICO - RESPONSIVOS
// ============================================================================

export const HISTORY_STYLES = {
    mainContainer: `${CONTAINER_RESPONSIVE.main} ${SPACING_RESPONSIVE.gap.md} ${ZOOM_RESPONSIVE.zoomContainer}`,

    header: {
        container: `${LAYOUT_CLASSES.flexRow} ${LAYOUT_CLASSES.justifyBetween} ${LAYOUT_CLASSES.itemsCenter} ${SIZE_COMMON.wFull} ${TEXT_COMMON.mb6}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h2} ${TEXT_COMMON.textForeground}`,
        menu: `${COMPONENT_RESPONSIVE.button.sm} ${BG_COMMON.outline} ${TEXT_COMMON.textForeground} ${BORDER_COMMON.roundedMd}`
    },

    clientSelector: {
        container: `${COMPONENT_RESPONSIVE.input.container}`,
        label: `${COMPONENT_RESPONSIVE.input.label}`,
        select: `${COMPONENT_RESPONSIVE.input.field} ${BG_COMMON.background} ${BORDER_COMMON.border} ${BORDER_COMMON.roundedMd}`
    },

    simulations: {
        container: `${CONTAINER_RESPONSIVE.cards} ${SIZE_COMMON.wFull}`,
        card: `${SIZE_COMMON.wFull} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${TEXT_COMMON.mb4} ${ZOOM_RESPONSIVE.zoomCard}`,
        header: `${LAYOUT_CLASSES.flexRow} ${LAYOUT_CLASSES.justifyBetween} ${LAYOUT_CLASSES.itemsCenter} ${TEXT_COMMON.mb4}`,
        title: `${TYPOGRAPHY_RESPONSIVE.h5} ${TEXT_COMMON.textForeground}`,
        status: `${BG_COMMON.secondary} ${TEXT_COMMON.textSecondaryForeground} ${BORDER_COMMON.roundedFull} ${SPACING_COMMON.px3} ${SPACING_COMMON.py1} ${TYPOGRAPHY_RESPONSIVE.caption}`,
        content: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
        value: `${TYPOGRAPHY_RESPONSIVE.h4} ${TEXT_COMMON.textForeground}`,
        date: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground}`,
        actions: `${LAYOUT_CLASSES.flexRow} ${SPACING_RESPONSIVE.gap.sm} ${TEXT_COMMON.mt4}`,
        viewButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG_COMMON.primary} ${TEXT_COMMON.textPrimaryForeground} ${BORDER_COMMON.roundedMd}`,
        menuButton: `${COMPONENT_RESPONSIVE.button.sm} ${BG_COMMON.outline} ${TEXT_COMMON.textForeground} ${BORDER_COMMON.roundedMd}`
    },

    pagination: {
        container: `${LAYOUT_CLASSES.flexRow} ${LAYOUT_CLASSES.justifyCenter} ${LAYOUT_CLASSES.itemsCenter} ${SPACING_RESPONSIVE.gap.sm} ${TEXT_COMMON.mt8}`,
        button: `${COMPONENT_RESPONSIVE.button.sm} ${BG_COMMON.outline} ${TEXT_COMMON.textForeground} ${BORDER_COMMON.roundedMd}`,
        pageInfo: `${TYPOGRAPHY_RESPONSIVE.bodySmall} ${TEXT_COMMON.textMutedForeground}`
    }
};

// ============================================================================
// ESTILOS COMUNS RESPONSIVOS
// ============================================================================

export const COMMON_RESPONSIVE_STYLES = {
    // Containers responsivos
    pageContainer: `${CONTAINER_RESPONSIVE.page} ${SPACING_RESPONSIVE.padding.md}`,
    sectionContainer: `${CONTAINER_RESPONSIVE.section} ${SIZE_COMMON.wFull}`,
    cardContainer: `${CONTAINER_RESPONSIVE.cards} ${SIZE_COMMON.wFull}`,

    // Tipografia responsiva
    pageTitle: `${TYPOGRAPHY_RESPONSIVE.h1} ${TEXT_COMMON.textForeground} ${TEXT_COMMON.mb6}`,
    sectionTitle: `${TYPOGRAPHY_RESPONSIVE.h2} ${TEXT_COMMON.textForeground} ${TEXT_COMMON.mb4}`,
    cardTitle: `${TYPOGRAPHY_RESPONSIVE.h3} ${TEXT_COMMON.textForeground} ${TEXT_COMMON.mb2}`,

    // Botões responsivos
    primaryButton: `${COMPONENT_RESPONSIVE.button.md} ${BG_COMMON.primary} ${TEXT_COMMON.textPrimaryForeground} ${BORDER_COMMON.roundedMd} ${TEXT_COMMON.cursorPointer}`,
    secondaryButton: `${COMPONENT_RESPONSIVE.button.md} ${BG_COMMON.secondary} ${TEXT_COMMON.textSecondaryForeground} ${BORDER_COMMON.roundedMd} ${TEXT_COMMON.cursorPointer}`,
    outlineButton: `${COMPONENT_RESPONSIVE.button.md} ${BG_COMMON.outline} ${TEXT_COMMON.textForeground} ${BORDER_COMMON.roundedMd} ${TEXT_COMMON.cursorPointer}`,

    // Cards responsivos
    card: `${SIZE_COMMON.wFull} ${BG_COMMON.card} ${BORDER_COMMON.roundedLg} ${SPACING_RESPONSIVE.padding.md} ${ZOOM_RESPONSIVE.zoomCard}`,
    cardHeader: `${LAYOUT_CLASSES.flexRow} ${LAYOUT_CLASSES.justifyBetween} ${LAYOUT_CLASSES.itemsCenter} ${TEXT_COMMON.mb4}`,
    cardContent: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
    cardFooter: `${LAYOUT_CLASSES.flexRow} ${LAYOUT_CLASSES.justifyEnd} ${SPACING_RESPONSIVE.gap.sm} ${TEXT_COMMON.mt4}`,

    // Formulários responsivos
    form: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.md}`,
    formGroup: `${LAYOUT_CLASSES.flexCol} ${SPACING_RESPONSIVE.gap.sm}`,
    formLabel: `${COMPONENT_RESPONSIVE.input.label}`,
    formInput: `${COMPONENT_RESPONSIVE.input.field} ${BG_COMMON.background} ${BORDER_COMMON.border} ${BORDER_COMMON.roundedMd}`,
    formSelect: `${COMPONENT_RESPONSIVE.input.field} ${BG_COMMON.background} ${BORDER_COMMON.border} ${BORDER_COMMON.roundedMd}`,

    // Tabelas responsivas
    table: `${COMPONENT_RESPONSIVE.table.container}`,
    tableElement: `${COMPONENT_RESPONSIVE.table.table}`,
    tableHeader: `${COMPONENT_RESPONSIVE.table.header}`,
    tableCell: `${COMPONENT_RESPONSIVE.table.cell}`,

    // Navegação responsiva
    nav: `${COMPONENT_RESPONSIVE.nav.container}`,
    navItem: `${COMPONENT_RESPONSIVE.nav.item}`,
    navActive: `${COMPONENT_RESPONSIVE.nav.active}`
};
