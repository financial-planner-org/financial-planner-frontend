'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <AppLayout>
      {children}
      <Toaster />
    </AppLayout>
  );
}
