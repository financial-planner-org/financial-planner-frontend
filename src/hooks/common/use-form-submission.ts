'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export interface UseFormSubmissionOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    successMessage?: string;
    errorMessage?: string;
}

export function useFormSubmission<T>(
    mutationFn: (data: T) => Promise<any>,
    options: UseFormSubmissionOptions = {}
) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        onSuccess,
        onError,
        successMessage = 'Operação realizada com sucesso!',
        errorMessage = 'Erro ao realizar operação'
    } = options;

    const submit = async (data: T) => {
        try {
            setIsLoading(true);
            const result = await mutationFn(data);

            if (onSuccess) {
                onSuccess(result);
            } else {
                toast.success(successMessage);
            }

            return result;
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                toast.error(errorMessage);
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        submit,
        isLoading
    };
}

// Hook para operações CRUD comuns
export function useCrudOperations<T>(
    createFn: (data: T) => Promise<any>,
    updateFn: (id: number, data: Partial<T>) => Promise<any>,
    deleteFn: (id: number) => Promise<any>,
    options: UseFormSubmissionOptions = {}
) {
    const create = useFormSubmission(createFn, {
        ...options,
        successMessage: options.successMessage || 'Item criado com sucesso!',
        errorMessage: options.errorMessage || 'Erro ao criar item'
    });

    const update = useFormSubmission(
        ({ id, data }: { id: number; data: Partial<T> }) => updateFn(id, data),
        {
            ...options,
            successMessage: options.successMessage || 'Item atualizado com sucesso!',
            errorMessage: options.errorMessage || 'Erro ao atualizar item'
        }
    );

    const remove = useFormSubmission(deleteFn, {
        ...options,
        successMessage: options.successMessage || 'Item removido com sucesso!',
        errorMessage: options.errorMessage || 'Erro ao remover item'
    });

    return {
        create: create.submit,
        update: update.submit,
        remove: remove.submit,
        isCreating: create.isLoading,
        isUpdating: update.isLoading,
        isDeleting: remove.isLoading,
        isLoading: create.isLoading || update.isLoading || remove.isLoading
    };
}

