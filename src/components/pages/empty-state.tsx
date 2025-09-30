'use client';

import React from 'react';

interface EmptyStateProps {
    title: string;
    description?: string;
    className?: string;
}

export function EmptyState({
    title,
    description,
    className = 'h-32'
}: EmptyStateProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="text-center">
                <div className="text-gray-400 text-lg mb-2">{title}</div>
                {description && (
                    <div className="text-gray-500 text-sm">{description}</div>
                )}
            </div>
        </div>
    );
}
