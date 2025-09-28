'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { PAGE_CONFIG } from '@/lib/constants/pages';

interface PageContainerProps {
    children: ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

export function PageContainer({
    children,
    className,
    title,
    description
}: PageContainerProps) {
    return (
        <div className={cn(PAGE_CONFIG.content, className)}>
            {/* Header */}
            {(title || description) && (
                <div className={PAGE_CONFIG.header}>
                    {title && (
                        <h1 className={PAGE_CONFIG.title}>
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className={PAGE_CONFIG.description}>
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}
