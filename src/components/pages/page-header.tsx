'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
    title: string;
    navigationItems: readonly Array<{
        readonly label: string;
        readonly href: string;
        readonly isActive?: boolean;
    }>;
}

export function PageHeader({ title, navigationItems }: PageHeaderProps) {
    const router = useRouter();

    return (
        <div className="mb-8">
            <div className="flex space-x-8">
                {navigationItems.map((item) => (
                    <div
                        key={item.href}
                        className={`text-lg cursor-pointer hover:text-white transition-colors ${item.isActive
                                ? 'text-white font-medium'
                                : 'text-gray-400'
                            }`}
                        onClick={() => router.push(item.href)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
