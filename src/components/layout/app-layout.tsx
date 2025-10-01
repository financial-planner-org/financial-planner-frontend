'use client';

import { ReactNode } from 'react';
import { Sidebar, MobileSidebar } from '@/components/admin-panel/sidebar';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            {/* Desktop Navigation */}
            <Sidebar />

            {/* Mobile Navigation */}
            <MobileSidebar />

            {/* Main Content Area */}
            <main className="flex-1 min-h-screen overflow-y-auto lg:ml-0">
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
