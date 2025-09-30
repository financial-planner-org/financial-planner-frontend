'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/admin-panel/sidebar';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="h-screen bg-black dark:bg-black flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
