'use client';

import React from 'react';
import { PageContainer } from '@/components/pages/page-container';
import { Button } from '@/components/ui/button';
import { COMMON_STYLES } from '@/lib/constants';

interface LoadingStateProps {
    message?: string;
    showContainer?: boolean;
}

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
    retryText?: string;
    showContainer?: boolean;
}

interface EmptyStateProps {
    title: string;
    description?: string;
    actionText?: string;
    onAction?: () => void;
    showContainer?: boolean;
}

interface PageStateProps {
    showContainer?: boolean;
    className?: string;
}

const PageStateWrapper = ({ showContainer = true, className = '', children }: PageStateProps & { children: React.ReactNode }) => {
    if (showContainer) {
        return (
            <PageContainer>
                <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
                    {children}
                </div>
            </PageContainer>
        );
    }

    return (
        <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
            {children}
        </div>
    );
};

export function LoadingState({ message = "Carregando...", showContainer = true }: LoadingStateProps) {
    return (
        <PageStateWrapper showContainer={showContainer}>
            <div className={COMMON_STYLES.textCenter}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">{message}</p>
            </div>
        </PageStateWrapper>
    );
}

export function ErrorState({
    message,
    onRetry,
    retryText = "Tentar novamente",
    showContainer = true
}: ErrorStateProps) {
    return (
        <PageStateWrapper showContainer={showContainer}>
            <div className={COMMON_STYLES.textCenter}>
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-500 text-lg mb-4">{message}</p>
                {onRetry && (
                    <Button onClick={onRetry} variant="outline">
                        {retryText}
                    </Button>
                )}
            </div>
        </PageStateWrapper>
    );
}

export function EmptyState({
    title,
    description,
    actionText,
    onAction,
    showContainer = true
}: EmptyStateProps) {
    return (
        <PageStateWrapper showContainer={showContainer}>
            <div className={COMMON_STYLES.textCenter}>
                <div className="text-gray-400 text-6xl mb-4">📭</div>
                <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
                {description && <p className="text-gray-400 mb-4">{description}</p>}
                {actionText && onAction && (
                    <Button onClick={onAction}>
                        {actionText}
                    </Button>
                )}
            </div>
        </PageStateWrapper>
    );
}

// Componente combinado para diferentes estados
export function PageState({
    isLoading = false,
    isError = false,
    isEmpty = false,
    loadingMessage,
    errorMessage,
    errorRetry,
    emptyTitle,
    emptyDescription,
    emptyAction,
    showContainer = true
}: {
    isLoading?: boolean;
    isError?: boolean;
    isEmpty?: boolean;
    loadingMessage?: string;
    errorMessage?: string;
    errorRetry?: () => void;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: { text: string; onClick: () => void };
    showContainer?: boolean;
}) {
    if (isLoading) {
        return <LoadingState message={loadingMessage} showContainer={showContainer} />;
    }

    if (isError) {
        return <ErrorState message={errorMessage || 'Erro desconhecido'} onRetry={errorRetry} showContainer={showContainer} />;
    }

    if (isEmpty) {
        return (
            <EmptyState
                title={emptyTitle || 'Nenhum item encontrado'}
                description={emptyDescription}
                actionText={emptyAction?.text}
                onAction={emptyAction?.onClick}
                showContainer={showContainer}
            />
        );
    }

    return null;
}
