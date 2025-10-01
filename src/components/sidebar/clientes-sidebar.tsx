'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import styled from 'styled-components';

// Styled Components
const SidebarContainer = styled.aside`
    width: 256px;
    background-color: #101010;
    color: #B1B1B1;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    border-right: 1px solid #434343;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 16px 40px;
    padding: 16px 0;
    border-radius: 39px;
    background: linear-gradient(90deg,
      rgba(16, 16, 16, 0) 0%,
      rgba(251, 146, 60, 0.1) 50%,
      rgba(220, 38, 38, 0.15) 100%
    );
    border: 1px solid rgba(251, 146, 60, 0.3);
`;

const MenuIcon = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`;

const MenuLabel = styled.span`
    flex-grow: 1;
    font-size: 16px;
    font-weight: 500;
`;

const DropdownIcon = styled.div<{ $isOpen: boolean }>`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    transform: rotate(${props => (props.$isOpen ? '180deg' : '0deg')});

    &:before {
        content: '▼';
        color: #9F9F9F;
        font-size: 12px;
    }
`;

const SubMenu = styled.div<{ $isOpen: boolean }>`
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    max-height: ${props => (props.$isOpen ? '500px' : '0')};
`;

const MenuItemContainer = styled.div<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    margin: 4px 16px;
    border-radius: 39px;
    cursor: pointer;
    color: ${props => props.$active ? '#FFFFFF' : '#9F9F9F'};
    background: ${props => props.$active
          ? 'linear-gradient(90deg, rgba(28, 25, 23, 0) 0%, rgba(251, 146, 60, 0.1) 50%, rgba(220, 38, 38, 0.25) 100%)'
          : 'transparent'};
    border: ${props => props.$active ? '1px solid rgba(251, 146, 60, 0.6)' : '1px solid transparent'};
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, rgba(28, 25, 23, 0) 0%, rgba(251, 146, 60, 0.08) 50%, rgba(220, 38, 38, 0.15) 100%);
        border: 1px solid rgba(251, 146, 60, 0.3);
    }
`;

const SubMenuItem = styled.div<{ $active?: boolean }>`
    padding: 8px 24px 8px 56px;
    margin: 4px 0;
    color: ${props => props.$active ? '#FFFFFF' : '#9F9F9F'};
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;

    .submenu-icon {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
    }

    &:hover {
        color: #FFFFFF;

        .submenu-icon {
            opacity: 1;
        }
    }
`;

// Types
type MenuItemType = {
    id: string;
    label: string;
    icon: string;
    href: string;
    subItems?: Array<{
        id: string;
        label: string;
        href: string;
        icon?: string;
    }>;
};

// Menu items data
const MENU_ITEMS: MenuItemType[] = [
    {
        id: 'clientes',
        label: 'Clientes',
        icon: '/img/person.svg',
        href: '/clientes',
        subItems: [
            { id: 'dashboard', label: 'Dashboard', href: '/', icon: '/img/dashboard.svg' },
            { id: 'projecao', label: 'Projeção', href: '/projecao', icon: '/img/projections.svg' },
            { id: 'historico', label: 'Histórico', href: '/historico', icon: '/img/history.svg' },
        ],
    },
    {
        id: 'prospects',
        label: 'Prospects',
        icon: '/img/person_add.svg',
        href: '/prospects',
    },
    {
        id: 'consolidacao',
        label: 'Consolidação',
        icon: '/img/consolidation.svg',
        href: '/consolidacao',
    },
    {
        id: 'crm',
        label: 'CRM',
        icon: '/img/crm.svg',
        href: '/crm',
        subItems: [
            { id: 'mensagens', label: 'Mensagens', href: '/crm/mensagens', icon: '/img/capture.svg' },
            { id: 'agenda', label: 'Agenda', href: '/crm/agenda', icon: '/img/update.svg' },
            { id: 'tarefas', label: 'Tarefas', href: '/crm/tarefas', icon: '/img/add.svg' },
        ],
    },
    {
        id: 'financeiro',
        label: 'Financeiro',
        icon: '/img/finance.svg',
        href: '/financeiro',
        subItems: [
            { id: 'transacoes', label: 'Transações', href: '/financeiro/transacoes', icon: '/img/update.svg' },
            { id: 'relatorios', label: 'Relatórios', href: '/financeiro/relatorios', icon: '/img/capture.svg' },
            { id: 'impostos', label: 'Impostos', href: '/financeiro/impostos', icon: '/img/finance.svg' },
        ],
    },
];

// Menu Item Component
const MenuItem = ({ item }: { item: MenuItemType }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isActive = pathname === item.href || (hasSubItems && item.subItems?.some(subItem => pathname === subItem.href));

    const handleClick = () => {
        if (hasSubItems) {
            setIsExpanded(!isExpanded);
        } else {
            router.push(item.href);
        }
    };

    return (
        <div key={item.id}>
            <MenuItemContainer
                $active={isActive}
                onClick={handleClick}
            >
                <MenuIcon>
                    <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                        style={{ filter: 'invert(71%) sepia(0%) saturate(0%) hue-rotate(22deg) brightness(89%) contrast(90%)' }}
                    />
                </MenuIcon>
                <MenuLabel>{item.label}</MenuLabel>
                {hasSubItems && <DropdownIcon $isOpen={isExpanded} />}
            </MenuItemContainer>

            {hasSubItems && (
                <SubMenu $isOpen={isExpanded}>
                    {item.subItems?.map((subItem) => {
                        const isSubItemActive = pathname === subItem.href;
                        return (
                            <SubMenuItem
                                key={subItem.id}
                                $active={isSubItemActive}
                                onClick={() => router.push(subItem.href)}
                            >
                                {subItem.icon && (
                                    <div className="submenu-icon">
                                        <Image
                                            src={subItem.icon}
                                            alt={subItem.label}
                                            width={16}
                                            height={16}
                                            style={{ filter: isSubItemActive ? 'brightness(0) invert(1)' : 'brightness(0) invert(0.6)' }}
                                        />
                                    </div>
                                )}
                                <span>{subItem.label}</span>
                            </SubMenuItem>
                        );
                    })}
                </SubMenu>
            )}
        </div>
    );
};

// Main Sidebar Component
export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar - visible on large screens */}
            <SidebarContainer>
                <LogoContainer>
                    <Image
                        src="/img/logo.svg"
                        alt="Logo"
                        width={96}
                        height={42}
                        style={{
                            filter: 'brightness(0) invert(1)',
                            objectFit: 'contain'
                        }}
                        priority
                    />
                </LogoContainer>

                <div style={{ padding: '0 16px' }}>
                    {MENU_ITEMS.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </div>
            </SidebarContainer>

            {/* Mobile Menu Button - visible on small screens */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-gray-800 rounded-lg"
                >
                    <Menu />
                </button>
            </div>

            {/* Mobile Sidebar */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute left-0 top-0 h-full w-72 bg-gray-900 overflow-y-auto">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-8">
                                <Image
                                    src="/img/logo.svg"
                                    alt="Logo"
                                    width={120}
                                    height={40}
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                    priority
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-1">
                                {MENU_ITEMS.map((item) => (
                                    <div key={item.id}>
                                        <MenuItem item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add padding to content when sidebar is open on mobile */}
            {isOpen && <div className="lg:hidden h-16" />}
        </>
    );
}