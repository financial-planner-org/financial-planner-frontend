'use client';

import React from 'react';
import { PageContainer } from '@/components/pages/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle, FileX } from 'lucide-react';

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
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center justify-center p-8">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground text-lg">{message}</p>
                </CardContent>
            </Card>
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
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center justify-center p-8">
                    <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                    <p className="text-destructive text-lg mb-4 text-center">{message}</p>
                    {onRetry && (
                        <Button onClick={onRetry} variant="outline">
                            {retryText}
                        </Button>
                    )}
                </CardContent>
            </Card>
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
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center justify-center p-8">
                    <FileX className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-foreground text-xl font-semibold mb-2 text-center">{title}</h3>
                    {description && <p className="text-muted-foreground mb-4 text-center">{description}</p>}
                    {actionText && onAction && (
                        <Button onClick={onAction}>
                            {actionText}
                        </Button>
                    )}
                </CardContent>
            </Card>
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
