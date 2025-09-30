'use client';

import React from 'react';
import { CONTAINER_RESPONSIVE, SPACING_RESPONSIVE } from '@/lib/constants/responsive-system';
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
            SPACING_RESPONSIVE.padding.md,
            fullWidth ? CONTAINER_RESPONSIVE.main : CONTAINER_RESPONSIVE.page,
            className
        )}>
            {children}
        </div>
    );
}
