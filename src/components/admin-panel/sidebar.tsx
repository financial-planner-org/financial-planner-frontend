'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Users, 
  BarChart3, 
  History, 
  UserPlus, 
  Building2, 
  MessageSquare, 
  Target, 
  DollarSign,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
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
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start px-6 py-2 h-auto text-left",
          isSubItem && "ml-4 text-sm",
          "hover:bg-muted/50 transition-colors"
        )}
        onClick={handleClick}
        data-testid={href ? `nav-${href.replace('/', '')}` : undefined}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <span className="flex-1 text-muted-foreground font-medium">
            {label}
          </span>
          {hasDropdown && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </div>
      </Button>
      {isExpanded && children && (
        <div className="ml-4 mt-2 space-y-1">
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
  children
}: {
  icon: React.ReactNode;
  label: string;
  itemKey: string;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  children: React.ReactNode;
}) => (
  <MenuItemComponent
    icon={icon}
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
  <div className="flex items-center justify-center p-4 border-b border-border">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <DollarSign className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-lg font-semibold text-foreground">Financial Planner</span>
    </div>
  </div>
);

// Configuração dos itens do menu
const MENU_ITEMS = {
  clientes: {
    icon: <Users className="w-6 h-6" />,
    label: "Clientes",
    itemKey: "clientes",
    subItems: [
      {
        icon: <BarChart3 className="w-5 h-5" />,
        label: "Dashboard",
        href: "/alocacoes"
      },
      {
        icon: <BarChart3 className="w-5 h-5" />,
        label: "Projeção",
        href: "/projecao"
      },
      {
        icon: <History className="w-5 h-5" />,
        label: "Histórico",
        href: "/historico"
      }
    ]
  },
  prospects: {
    icon: <UserPlus className="w-6 h-6" />,
    label: "Prospects",
    itemKey: "prospects",
    subItems: []
  },
  consolidacao: {
    icon: <Building2 className="w-6 h-6" />,
    label: "Consolidação",
    itemKey: "consolidacao",
    subItems: []
  },
  crm: {
    icon: <MessageSquare className="w-6 h-6" />,
    label: "CRM",
    itemKey: "crm",
    subItems: []
  },
  captacao: {
    icon: <Target className="w-6 h-6" />,
    label: "Captação",
    itemKey: "captacao",
    subItems: []
  },
  financeiro: {
    icon: <DollarSign className="w-6 h-6" />,
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
    <div className="h-full bg-background border-r border-border">
      {/* Logo - apenas no desktop */}
      {!isMobile && <Logo />}

      {/* Menu Items */}
      <div className="p-4 space-y-2">
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
    <>
      {/* Desktop Sidebar - oculta em mobile */}
      <aside className="hidden lg:block w-80 h-full bg-background border-r border-border flex-shrink-0">
        <MenuContent isMobile={false} />
      </aside>

      {/* Mobile Sidebar - visível apenas em telas pequenas */}
      <div className="lg:hidden">
        {/* Header Mobile */}
        <div className="fixed top-0 left-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Financial Planner</span>
            </div>

            {/* Botão Hambúrguer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 border-none bg-background">
                <MenuContent
                  isMobile={true}
                  onItemClick={() => {
                    // Fechar o sheet quando um item for clicado
                    const sheetClose = document.querySelector('[data-state="open"]')?.querySelector('button[aria-label="Close"]') as HTMLButtonElement;
                    sheetClose?.click();
                  }}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Espaçamento para o header fixo */}
        <div className="h-16"></div>
      </div>
    </>
  );
}