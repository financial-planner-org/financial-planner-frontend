'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from '@/components/sidebar/clientes-sidebar';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Resetar estado de loading quando a rota mudar
  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    };

    handleRouteChange();
  }, [pathname]);

  return (
    <div className='min-h-screen bg-[#101010]'>
      {/* Mobile Header and Sidebar */}
      <div className='lg:hidden'>
        <Sidebar />
      </div>

      <div className='flex flex-col lg:flex-row'>
        {/* Desktop Sidebar */}
        <div className='hidden lg:block w-64 flex-shrink-0'>
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className='flex-1 min-h-screen relative'>
          {/* Loading Overlay */}
          {isLoading && (
            <div className='absolute inset-0 bg-[#101010] bg-opacity-80 flex items-center justify-center z-50'>
              <Loader2 className='h-12 w-12 text-orange-500 animate-spin' />
            </div>
          )}
          
          <div className={`w-full min-h-screen transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className='w-full h-full'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
