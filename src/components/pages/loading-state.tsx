'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
    message?: string;
    className?: string;
}

export function LoadingState({
    message = 'Carregando...',
    className = 'h-32'
}: LoadingStateProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-400">{message}</span>
        </div>
    );
}
