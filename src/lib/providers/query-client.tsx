/**
 * @fileoverview Configuração do TanStack Query
 * @description Provider para gerenciamento de estado da API
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryClientProviderWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tempo que os dados ficam "fresh" (5 minutos)
            staleTime: 5 * 60 * 1000,
            // Tempo que os dados ficam em cache (10 minutos)
            gcTime: 10 * 60 * 1000,
            // Retry automático em caso de erro
            retry: (failureCount, error: any) => {
              // Não retry para erros 4xx (client errors)
              if (error?.status >= 400 && error?.status < 500) {
                return false;
              }
              // Retry até 3 vezes para outros erros
              return failureCount < 3;
            },
            // Refetch quando a janela ganha foco
            refetchOnWindowFocus: false,
            // Refetch quando reconecta à internet
            refetchOnReconnect: true,
          },
          mutations: {
            // Retry para mutations
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools apenas em desenvolvimento */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}