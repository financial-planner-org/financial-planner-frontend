import { UI_CONFIG, ICON_FILTERS } from './ui';

// Constantes específicas para o sidebar
export const SIDEBAR_CONFIG = {
  // Container principal
  mainContainer: 'w-80 h-[1083px] relative bg-[#101010] rounded-3xl overflow-hidden',
  verticalLine:
    'w-[1080px] h-0 left-[322px] top-0 absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-[#434343]',
  iconPlaceholder: 'w-5 h-5 left-[1504px] top-[1269px] absolute bg-[#9F9F9F]',

  // Logo
  logoContainer:
    'w-40 h-12 left-[78px] top-[59px] absolute bg-gradient-to-l from-[#101010]/0 via-orange-400/10 to-red-600/25 rounded-[39px] border border-orange-600 flex items-center justify-center',
  logoImage: 'w-24 h-10',
  logoImageMobile: 'w-32 h-10',
  logoContainerMobile: 'flex items-center',

  // Menu
  menuContainer: 'absolute left-[44px] top-[170px] space-y-2',
  menuContainerMobile: 'absolute left-[44px] top-[30px] space-y-2',
  menuItem:
    'w-60 px-6 py-2 rounded-[47px] inline-flex justify-start items-center gap-2 cursor-pointer hover:bg-[#434343] transition-colors',
  subMenuItem: 'ml-4',
  iconContainer: 'w-6 h-6 flex items-center justify-center',
  textContainer: "w-36 justify-start text-xl font-medium font-['Work_Sans'] leading-loose",
  textColor: 'text-[#9F9F9F]',
  dropdownContainer: 'w-4 h-2',

  // Mobile
  mobileContainer: 'lg:hidden',
  mobileHeader:
    'fixed top-0 left-0 z-50 w-full bg-[#101010]/95 backdrop-blur-sm border-b border-[#434343]',
  mobileHeaderContent: 'flex items-center justify-between px-4 py-3',
  mobileLogoContainer: 'flex items-center',
  mobileHamburgerButton:
    'p-2 bg-[#434343] hover:bg-[#454545] text-[#B1B1B1] rounded-lg transition-colors duration-200 shadow-lg',
  mobileHamburgerIcon: 'h-6 w-6',
  mobileSheetContent: 'w-80 p-0 border-none bg-[#101010]',
  mobileSheetHeader:
    'flex items-center justify-end p-6 border-b border-[#434343] bg-gradient-to-r from-[#101010] to-[#434343]',
  mobileMenuContent: 'flex-1 overflow-y-auto',
  mobileHeaderSpacing: 'h-16',

  // Desktop
  desktopSidebar: 'fixed left-0 top-0 z-50 h-screen w-80 bg-[#101010] border-r border-[#434343]',
} as const;

// Helper para criar ícones do sidebar
export const createSidebarIcon = (src: string, alt: string) => ({
  src,
  alt,
  width: UI_CONFIG.sizes.icon.width,
  height: UI_CONFIG.sizes.icon.height,
  className: ICON_FILTERS.primary,
  style: ICON_FILTERS.primaryStyle,
});

// Helper para criar ícones de dropdown
export const createDropdownIcon = (isExpanded: boolean) => ({
  src: isExpanded ? '/img/close.svg' : '/img/open.svg',
  alt: isExpanded ? 'Fechar' : 'Abrir',
  width: UI_CONFIG.sizes.dropdown.width,
  height: UI_CONFIG.sizes.dropdown.height,
  className: `${SIDEBAR_CONFIG.dropdownContainer} ${ICON_FILTERS.primary}`,
  style: ICON_FILTERS.primaryStyle,
});
