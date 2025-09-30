'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SIDEBAR_CONFIG, createSidebarIcon, createDropdownIcon } from '@/lib/constants/sidebar';

// Interface para props dos componentes
interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  hasDropdown?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  isSubItem?: boolean;
  href?: string;
}

// Componente reutilizável para ícones
const SidebarIcon = ({ src, alt }: { src: string; alt: string }) => (
  <Image {...createSidebarIcon(src, alt)} />
);

// Componente reutilizável para dropdown
const DropdownIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <Image {...createDropdownIcon(isExpanded)} />
);

// Componente reutilizável para item de menu
const MenuItemComponent = ({
  icon,
  label,
  hasDropdown = false,
  isExpanded = false,
  onClick,
  children,
  isSubItem = false,
  href
}: MenuItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className="relative">
      <div
        className={`${SIDEBAR_CONFIG.menuItem} ${isSubItem ? SIDEBAR_CONFIG.subMenuItem : ''}`}
        onClick={handleClick}
        data-testid={href ? `nav-${href.replace('/', '')}` : undefined}
      >
        <div className={SIDEBAR_CONFIG.iconContainer}>
          {icon}
        </div>
        <div className={`${SIDEBAR_CONFIG.textContainer} ${SIDEBAR_CONFIG.textColor}`}>
          {label}
        </div>
        {hasDropdown && <DropdownIcon isExpanded={isExpanded} />}
      </div>
      {isExpanded && children && (
        <div className="ml-4 mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

// Componente reutilizável para submenu
const SubMenuItem = ({
  iconSrc,
  iconAlt,
  label,
  href,
  onClick
}: {
  iconSrc: string;
  iconAlt: string;
  label: string;
  href: string;
  onClick?: () => void;
}) => (
  <MenuItemComponent
    icon={<SidebarIcon src={iconSrc} alt={iconAlt} />}
    label={label}
    isSubItem
    href={href}
    onClick={onClick}
  />
);

// Componente reutilizável para item principal com dropdown
const MainMenuItem = ({
  iconSrc,
  iconAlt,
  label,
  itemKey,
  isExpanded,
  onToggle,
  children
}: {
  iconSrc: string;
  iconAlt: string;
  label: string;
  itemKey: string;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  children: React.ReactNode;
}) => (
  <MenuItemComponent
    icon={<SidebarIcon src={iconSrc} alt={iconAlt} />}
    label={label}
    hasDropdown
    isExpanded={isExpanded}
    onClick={() => onToggle(itemKey)}
  >
    {children}
  </MenuItemComponent>
);

// Componente reutilizável para logo
const Logo = () => (
  <div className={SIDEBAR_CONFIG.logoContainer}>
    <img
      src="/img/logo.svg"
      alt="Anka Logo"
      className={SIDEBAR_CONFIG.logoImage}
    />
  </div>
);

// Configuração dos itens do menu
const MENU_ITEMS = {
  clientes: {
    iconSrc: "/img/person.svg",
    iconAlt: "Clientes",
    label: "Clientes",
    itemKey: "clientes",
    subItems: [
      {
        iconSrc: "/img/dashboard.svg",
        iconAlt: "Dashboard",
        label: "Dashboard",
        href: "/alocacoes"
      },
      {
        iconSrc: "/img/projections.svg",
        iconAlt: "Projeção",
        label: "Projeção",
        href: "/projecao"
      },
      {
        iconSrc: "/img/history.svg",
        iconAlt: "Histórico",
        label: "Histórico",
        href: "/historico"
      }
    ]
  },
  prospects: {
    iconSrc: "/img/person_add.svg",
    iconAlt: "Prospects",
    label: "Prospects",
    itemKey: "prospects",
    subItems: []
  },
  consolidacao: {
    iconSrc: "/img/consolidation.svg",
    iconAlt: "Consolidação",
    label: "Consolidação",
    itemKey: "consolidacao",
    subItems: []
  },
  crm: {
    iconSrc: "/img/crm.svg",
    iconAlt: "CRM",
    label: "CRM",
    itemKey: "crm",
    subItems: []
  },
  captacao: {
    iconSrc: "/img/capture.svg",
    iconAlt: "Captação",
    label: "Captação",
    itemKey: "captacao",
    subItems: []
  },
  financeiro: {
    iconSrc: "/img/finance.svg",
    iconAlt: "Financeiro",
    label: "Financeiro",
    itemKey: "financeiro",
    subItems: []
  }
} as const;

// Ordem dos itens no menu
const MENU_ORDER = [
  'clientes',
  'prospects',
  'consolidacao',
  'crm',
  'captacao',
  'financeiro'
] as const;

// Conteúdo do menu
const MenuContent = ({ onItemClick, isMobile = false }: { onItemClick?: () => void; isMobile?: boolean }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  return (
    <div className={SIDEBAR_CONFIG.mainContainer}>
      {/* Linha vertical */}
      <div className={SIDEBAR_CONFIG.verticalLine}></div>

      {/* Logo - apenas no desktop */}
      {!isMobile && <Logo />}


      {/* Ícone */}
      <div className={SIDEBAR_CONFIG.iconPlaceholder} />

      {/* Menu Items */}
      <div className={isMobile ? SIDEBAR_CONFIG.menuContainerMobile : SIDEBAR_CONFIG.menuContainer}>
        {MENU_ORDER.map((itemKey) => {
          const item = MENU_ITEMS[itemKey];
          return (
            <MainMenuItem
              key={itemKey}
              iconSrc={item.iconSrc}
              iconAlt={item.iconAlt}
              label={item.label}
              itemKey={item.itemKey}
              isExpanded={expandedItems.has(item.itemKey)}
              onToggle={toggleExpanded}
            >
              {item.subItems.map((subItem, index) => (
                <SubMenuItem
                  key={`${itemKey}-${index}`}
                  iconSrc={subItem.iconSrc}
                  iconAlt={subItem.iconAlt}
                  label={subItem.label}
                  href={subItem.href}
                  onClick={onItemClick}
                />
              ))}
            </MainMenuItem>
          );
        })}
      </div>
    </div>
  );
};

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar - oculta em mobile */}
      <aside className="hidden lg:block w-80 h-full bg-stone-950 border-r border-neutral-700 flex-shrink-0">
        <MenuContent isMobile={false} />
      </aside>

      {/* Mobile Sidebar - visível apenas em telas pequenas */}
      <div className={`${SIDEBAR_CONFIG.mobileContainer} lg:hidden`}>
        {/* Botão Hambúrguer com Layout Melhorado */}
        <div className={SIDEBAR_CONFIG.mobileHeader}>
          <div className={SIDEBAR_CONFIG.mobileHeaderContent}>
            {/* Logo */}
            <div className={SIDEBAR_CONFIG.mobileLogoContainer}>
              <img
                src="/img/logo.svg"
                alt=""
                className={SIDEBAR_CONFIG.logoImageMobile}
              />
            </div>

            {/* Botão Hambúrguer */}
            <Sheet>
              <SheetTrigger asChild>
                <button className={SIDEBAR_CONFIG.mobileHamburgerButton}>
                  <Menu className={SIDEBAR_CONFIG.mobileHamburgerIcon} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className={SIDEBAR_CONFIG.mobileSheetContent}>
                {/* Header do Menu Mobile */}
                <div className={SIDEBAR_CONFIG.mobileSheetHeader}>
                  {/* Logo oculta na versão mobile do sidebar */}
                </div>

                {/* Conteúdo do Menu */}
                <div className={SIDEBAR_CONFIG.mobileMenuContent}>
                  <MenuContent
                    isMobile={true}
                    onItemClick={() => {
                      // Fechar o sheet quando um item for clicado
                      const sheetClose = document.querySelector('[data-state="open"]')?.querySelector('button[aria-label="Close"]') as HTMLButtonElement;
                      sheetClose?.click();
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>

        {/* Espaçamento para o header fixo */}
        <div className={SIDEBAR_CONFIG.mobileHeaderSpacing}></div>
      </div>
    </>
  );
}