'use client';

import React from 'react';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
    return (
        <div className={`p-6 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );
}
