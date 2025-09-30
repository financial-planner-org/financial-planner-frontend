'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
}

export function PageContainer({
    children,
    className = '',
    fullWidth = false
}: PageContainerProps) {
    return (
        <div className={cn(
            "p-6",
            fullWidth ? "w-full" : "max-w-7xl mx-auto",
            className
        )}>
            {children}
        </div>
    );
}
