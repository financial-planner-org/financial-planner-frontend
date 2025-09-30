'use client';

import { ReactNode, useState } from 'react';
import { Sidebar } from '@/components/admin-panel/sidebar';
import { cn } from '@/lib/utils';
import { CONTAINER_RESPONSIVE, MOBILE_RESPONSIVE } from '@/lib/constants/responsive-system';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black dark:bg-black flex flex-col lg:flex-row">
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    "fixed top-4 left-4 z-50 lg:hidden",
                    "bg-background/80 backdrop-blur-sm border"
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className={MOBILE_RESPONSIVE.mobileSidebarOverlay}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                CONTAINER_RESPONSIVE.sidebar,
                isMobileMenuOpen && MOBILE_RESPONSIVE.mobileSidebarContent,
                !isMobileMenuOpen && "hidden lg:block"
            )}>
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className={cn(
                CONTAINER_RESPONSIVE.mainContent,
                "flex-1 min-h-screen overflow-y-auto"
            )}>
                {children}
            </main>
        </div>
    );
}
