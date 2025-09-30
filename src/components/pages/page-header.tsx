'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    navigationItems: Array<{
        label: string;
        href: string;
        isActive?: boolean;
    }>;
}

export function PageHeader({ title, navigationItems }: PageHeaderProps) {
    const router = useRouter();

    return (
        <div className="mb-8">
            <div className="flex space-x-2">
                {navigationItems.map((item) => (
                    <Button
                        key={item.href}
                        variant={item.isActive ? "default" : "ghost"}
                        className={cn(
                            "text-lg font-medium transition-colors",
                            item.isActive 
                                ? "text-foreground" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => router.push(item.href)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
