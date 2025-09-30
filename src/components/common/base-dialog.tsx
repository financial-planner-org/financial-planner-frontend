'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export interface BaseDialogProps {
    title: string;
    triggerText: string;
    triggerVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    triggerSize?: 'default' | 'sm' | 'lg' | 'icon';
    children: ReactNode;
    className?: string;
    maxWidth?: string;
    asChild?: boolean;
}

export function BaseDialog({
    title,
    triggerText,
    triggerVariant = 'default',
    triggerSize = 'default',
    children,
    className = 'sm:max-w-[425px]',
    maxWidth,
    asChild = false
}: BaseDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild={asChild}>
                <Button variant={triggerVariant} size={triggerSize}>
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className={maxWidth || className}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}

// Componente para diálogos de confirmação
export interface ConfirmationDialogProps {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
    triggerText: string;
    triggerVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    triggerSize?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
}

export function ConfirmationDialog({
    title,
    description,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    triggerText,
    triggerVariant = 'destructive',
    triggerSize = 'default',
    className = 'sm:max-w-[425px]'
}: ConfirmationDialogProps) {
    return (
        <BaseDialog
            title={title}
            triggerText={triggerText}
            triggerVariant={triggerVariant}
            triggerSize={triggerSize}
            className={className}
        >
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </BaseDialog>
    );
}

