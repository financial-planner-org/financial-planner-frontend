'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationTab {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
}

interface MainNavigationProps {
  className?: string;
}

export function MainNavigation({ className }: MainNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: NavigationTab[] = [
    {
      id: 'alocacoes',
      label: 'Alocações',
      href: '/alocacoes',
      isActive: pathname === '/alocacoes' || pathname === '/',
    },
    {
      id: 'projecao',
      label: 'Projeção',
      href: '/projecao',
      isActive: pathname === '/projecao',
    },
    {
      id: 'historico',
      label: 'Histórico',
      href: '/historico',
      isActive: pathname === '/historico',
    },
  ];

  const handleTabClick = (href: string) => {
    router.push(href);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center space-x-1 bg-stone-950 rounded-2xl p-1',
        className
      )}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.href)}
          className={cn(
            'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200',
            'hover:bg-stone-800/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-stone-950',
            tab.isActive ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
