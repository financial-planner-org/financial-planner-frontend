'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

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

// Componente reutilizável para item de menu - estilo Anka
const MenuItemComponent = ({
  icon,
  label,
  hasDropdown = false,
  isExpanded = false,
  onClick,
  children,
  isSubItem = false,
  href,
  isActive = false
}: MenuItemProps & { isActive?: boolean }) => {
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
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start px-6 py-3 h-auto text-left rounded-none",
          isSubItem && "ml-6 text-sm",
          isActive && "bg-muted/30 text-foreground",
          !isActive && "text-muted-foreground hover:text-foreground",
          "hover:bg-muted/20 transition-all duration-200 group"
        )}
        onClick={handleClick}
        data-testid={href ? `nav-${href.replace('/', '')}` : undefined}
      >
        <div className="flex items-center gap-4 w-full">
          <div className={cn(
            "w-6 h-6 flex items-center justify-center flex-shrink-0 transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}>
            {icon}
          </div>
          <span className={cn(
            "flex-1 font-medium transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}>
            {label}
          </span>
          {hasDropdown && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          )}
        </div>
      </Button>
      {isExpanded && children && (
        <div className="ml-6 mt-1 space-y-1 border-l border-border/30 pl-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Componente reutilizável para submenu
const SubMenuItem = ({
  icon,
  label,
  href,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}) => (
  <MenuItemComponent
    icon={icon}
    label={label}
    isSubItem
    href={href}
    onClick={onClick}
  />
);

// Componente reutilizável para item principal com dropdown
const MainMenuItem = ({
  icon,
  label,
  itemKey,
  isExpanded,
  onToggle,
  children,
  isActive = false
}: {
  icon: React.ReactNode;
  label: string;
  itemKey: string;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  children: React.ReactNode;
  isActive?: boolean;
}) => (
  <MenuItemComponent
    icon={icon}
    label={label}
    hasDropdown
    isExpanded={isExpanded}
    onClick={() => onToggle(itemKey)}
    isActive={isActive}
  >
    {children}
  </MenuItemComponent>
);

// Componente reutilizável para logo - estilo Anka
const Logo = () => (
  <div className="flex items-center justify-center p-6 border-b border-border/20">
    <div className="flex items-center gap-3">
      {/* Logo usando imagem SVG do diretório public */}
      <div className="w-12 h-12 flex items-center justify-center">
        <Image
          src="/img/logo.svg"
          alt="Anka Logo"
          width={48}
          height={21}
          className="w-12 h-auto"
        />
      </div>
    </div>
  </div>
);

// Configuração dos itens do menu - baseado na imagem Anka usando SVGs do public
const MENU_ITEMS = {
  clientes: {
    icon: <Image src="/img/person.svg" alt="Clientes" width={24} height={24} className="w-6 h-6" />,
    label: "Clientes",
    itemKey: "clientes",
    isActive: true, // Clientes está ativo na imagem
    subItems: [
      {
        icon: <Image src="/img/dashboard.svg" alt="Dashboard" width={20} height={22} className="w-5 h-5" />,
        label: "Dashboard",
        href: "/alocacoes"
      },
      {
        icon: <Image src="/img/projections.svg" alt="Projeção" width={24} height={24} className="w-5 h-5" />,
        label: "Projeção",
        href: "/projecao"
      },
      {
        icon: <Image src="/img/history.svg" alt="Histórico" width={22} height={18} className="w-5 h-5" />,
        label: "Histórico",
        href: "/historico"
      }
    ]
  },
  prospects: {
    icon: <Image src="/img/person_add.svg" alt="Prospects" width={24} height={24} className="w-6 h-6" />,
    label: "Prospects",
    itemKey: "prospects",
    isActive: false,
    subItems: []
  },
  consolidacao: {
    icon: <Image src="/img/consolidation.svg" alt="Consolidação" width={24} height={24} className="w-6 h-6" />,
    label: "Consolidação",
    itemKey: "consolidacao",
    isActive: false,
    subItems: []
  },
  crm: {
    icon: <Image src="/img/crm.svg" alt="CRM" width={24} height={22} className="w-6 h-6" />,
    label: "CRM",
    itemKey: "crm",
    isActive: false,
    subItems: []
  },
  captacao: {
    icon: <Image src="/img/capture.svg" alt="Captação" width={22} height={22} className="w-6 h-6" />,
    label: "Captação",
    itemKey: "captacao",
    isActive: false,
    subItems: []
  },
  financeiro: {
    icon: <Image src="/img/finance.svg" alt="Financeiro" width={23} height={24} className="w-6 h-6" />,
    label: "Financeiro",
    itemKey: "financeiro",
    isActive: false,
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

// Conteúdo do menu - estilo Anka
const MenuContent = ({ onItemClick, isMobile = false }: { onItemClick?: () => void; isMobile?: boolean }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['clientes'])); // Clientes expandido por padrão

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
    <div className="h-full bg-background border-r border-border/20">
      {/* Logo - apenas no desktop */}
      {!isMobile && <Logo />}

      {/* Menu Items */}
      <div className="py-4">
        {MENU_ORDER.map((itemKey) => {
          const item = MENU_ITEMS[itemKey];
          return (
            <MainMenuItem
              key={itemKey}
              icon={item.icon}
              label={item.label}
              itemKey={item.itemKey}
              isExpanded={expandedItems.has(item.itemKey)}
              onToggle={toggleExpanded}
              isActive={item.isActive}
            >
              {item.subItems.map((subItem, index) => (
                <SubMenuItem
                  key={`${itemKey}-${index}`}
                  icon={subItem.icon}
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
    <nav className="hidden lg:block w-80 h-full bg-background border-r border-border/20 flex-shrink-0">
      <MenuContent isMobile={false} />
    </nav>
  );
}

export function MobileSidebar() {
  return (
    <div className="lg:hidden">
      {/* Header Mobile - estilo Anka */}
      <header className="fixed top-0 left-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border/20">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo Mobile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="/img/logo.svg"
                alt="Anka Logo"
                width={40}
                height={18}
                className="w-10 h-auto"
              />
            </div>
          </div>

          {/* Botão Hambúrguer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-muted/20 transition-colors"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="h-6 w-6 text-muted-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 p-0 border-none bg-background"
            >
              <nav>
                <MenuContent
                  isMobile={true}
                  onItemClick={() => {
                    // Fechar o sheet quando um item for clicado
                    const sheetClose = document.querySelector('[data-state="open"]')?.querySelector('button[aria-label="Close"]') as HTMLButtonElement;
                    sheetClose?.click();
                  }}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Espaçamento para o header fixo */}
      <div className="h-20"></div>
    </div>
  );
}