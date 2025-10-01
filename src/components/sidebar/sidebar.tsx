'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Menu,
  ChevronDown,
  ChevronRight,
  User,
  UserPlus,
  BarChart3,
  History,
  TrendingUp,
  Building2,
  Users,
  Target,
  DollarSign,
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
  isActive?: boolean;
}

// Componente reutilizável para item de menu - estilo Figma
const MenuItemComponent = ({
  icon,
  label,
  hasDropdown = false,
  isExpanded = false,
  onClick,
  children,
  isSubItem = false,
  href,
  isActive = false,
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
    <div className='relative'>
      <button
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group',
          isSubItem && 'ml-8 text-sm',
          isActive && 'bg-[#2f2f2f] text-white',
          !isActive && 'text-[#c9c9c9] hover:text-white hover:bg-[#2f2f2f]/50'
        )}
        onClick={handleClick}
        data-testid={href ? `nav-${href.replace('/', '')}` : undefined}
      >
        <div
          className={cn(
            'w-5 h-5 flex items-center justify-center flex-shrink-0 transition-colors',
            isActive ? 'text-white' : 'text-[#c9c9c9] group-hover:text-white'
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            'flex-1 font-medium transition-colors',
            isActive ? 'text-white' : 'text-[#c9c9c9] group-hover:text-white'
          )}
        >
          {label}
        </span>
        {hasDropdown && (
          <div className='w-4 h-4 flex items-center justify-center'>
            {isExpanded ? (
              <ChevronDown className='w-4 h-4 text-[#c9c9c9]' />
            ) : (
              <ChevronRight className='w-4 h-4 text-[#c9c9c9]' />
            )}
          </div>
        )}
      </button>
      {isExpanded && children && <div className='ml-8 mt-1 space-y-1'>{children}</div>}
    </div>
  );
};

// Componente reutilizável para submenu
const SubMenuItem = ({
  icon,
  label,
  href,
  onClick,
  isActive = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <MenuItemComponent
    icon={icon}
    label={label}
    isSubItem
    href={href}
    onClick={onClick}
    isActive={isActive}
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
  isActive = false,
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

// Componente reutilizável para logo - estilo Figma
const Logo = () => (
  <div className='flex items-center justify-center p-6 border-b border-[#2f2f2f]'>
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center'>
        <Image src='/img/logo.svg' alt='Anka Logo' width={48} height={21} className='w-12 h-auto' />
      </div>
    </div>
  </div>
);

// Configuração dos itens do menu - baseado no design do Figma
const MENU_ITEMS = {
  clientes: {
    icon: <User className='w-5 h-5' />,
    label: 'Clientes',
    itemKey: 'clientes',
    isActive: true, // Clientes está ativo no design
    subItems: [
      {
        icon: <BarChart3 className='w-5 h-5' />,
        label: 'Dashboard',
        href: '/alocacoes',
        isActive: false,
      },
      {
        icon: <TrendingUp className='w-5 h-5' />,
        label: 'Projeção',
        href: '/projecao',
        isActive: false,
      },
      {
        icon: <History className='w-5 h-5' />,
        label: 'Histórico',
        href: '/historico',
        isActive: false,
      },
    ],
  },
  prospects: {
    icon: <UserPlus className='w-5 h-5' />,
    label: 'Prospects',
    itemKey: 'prospects',
    isActive: false,
    subItems: [],
  },
  consolidacao: {
    icon: <Building2 className='w-5 h-5' />,
    label: 'Consolidação',
    itemKey: 'consolidacao',
    isActive: false,
    subItems: [],
  },
  crm: {
    icon: <Users className='w-5 h-5' />,
    label: 'CRM',
    itemKey: 'crm',
    isActive: false,
    subItems: [],
  },
  captacao: {
    icon: <Target className='w-5 h-5' />,
    label: 'Captação',
    itemKey: 'captacao',
    isActive: false,
    subItems: [],
  },
  financeiro: {
    icon: <DollarSign className='w-5 h-5' />,
    label: 'Financeiro',
    itemKey: 'financeiro',
    isActive: false,
    subItems: [],
  },
} as const;

// Ordem dos itens no menu
const MENU_ORDER = [
  'clientes',
  'prospects',
  'consolidacao',
  'crm',
  'captacao',
  'financeiro',
] as const;

// Conteúdo do menu - estilo Figma
const MenuContent = ({
  onItemClick,
  isMobile = false,
}: {
  onItemClick?: () => void;
  isMobile?: boolean;
}) => {
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
    <div className='h-full bg-[#1b1b1b] border-r border-[#2f2f2f]'>
      {/* Logo - apenas no desktop */}
      {!isMobile && <Logo />}

      {/* Menu Items */}
      <div className='py-2'>
        {MENU_ORDER.map(itemKey => {
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
                  isActive={subItem.isActive}
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
    <nav className='hidden lg:block w-80 h-full bg-[#1b1b1b] border-r border-[#2f2f2f] flex-shrink-0'>
      <MenuContent isMobile={false} />
    </nav>
  );
}

export function MobileSidebar() {
  return (
    <div className='lg:hidden'>
      {/* Header Mobile - estilo Figma */}
      <header className='fixed top-0 left-0 z-50 w-full bg-[#1b1b1b]/95 backdrop-blur-sm border-b border-[#2f2f2f]'>
        <div className='flex items-center justify-between px-4 py-4'>
          {/* Logo Mobile */}
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 flex items-center justify-center'>
              <Image
                src='/img/logo.svg'
                alt='Anka Logo'
                width={40}
                height={18}
                className='w-10 h-auto'
              />
            </div>
          </div>

          {/* Botão Hambúrguer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='p-2 hover:bg-[#2f2f2f]/50 transition-colors text-[#c9c9c9] hover:text-white'
                aria-label='Abrir menu de navegação'
              >
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-80 p-0 border-none bg-[#1b1b1b]'>
              <nav>
                <MenuContent
                  isMobile={true}
                  onItemClick={() => {
                    // Fechar o sheet quando um item for clicado
                    const sheetClose = document
                      .querySelector('[data-state="open"]')
                      ?.querySelector('button[aria-label="Close"]') as HTMLButtonElement;
                    sheetClose?.click();
                  }}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Espaçamento para o header fixo */}
      <div className='h-20'></div>
    </div>
  );
}
