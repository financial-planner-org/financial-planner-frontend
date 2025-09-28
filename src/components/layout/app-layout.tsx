'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/admin-panel/sidebar';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="lg:ml-80 transition-all duration-300 ease-in-out">
                <div className="min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
