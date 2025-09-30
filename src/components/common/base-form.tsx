'use client';

import { useForm, UseFormReturn, FieldPath, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Tipos para configuração de campos
export interface FormFieldConfig {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
}

// Props do componente base
export interface BaseFormProps<T extends FieldValues> {
    schema: z.ZodSchema<T>;
    fields: FormFieldConfig[];
    onSubmit: (data: T) => void;
    defaultValues?: Partial<T>;
    title: string;
    triggerText: string;
    submitText?: string;
    className?: string;
    maxWidth?: string;
}

// Componente base reutilizável para formulários
export function BaseForm<T extends FieldValues>({
    schema,
    fields,
    onSubmit,
    defaultValues,
    title,
    triggerText,
    submitText = 'Salvar',
    className = 'sm:max-w-[425px]',
    maxWidth
}: BaseFormProps<T>) {
    const form = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as any,
    });

    const renderField = (fieldConfig: FormFieldConfig) => {
        const { name, label, type, placeholder, options } = fieldConfig;

        if (type === 'select' && options) {
            return (
                <FormField
                    key={name}
                    control={form.control}
                    name={name as FieldPath<T>}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={placeholder || `Selecione ${label.toLowerCase()}`} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            );
        }

        return (
            <FormField
                key={name}
                control={form.control}
                name={name as FieldPath<T>}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                type={type}
                                placeholder={placeholder || label}
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{triggerText}</Button>
            </DialogTrigger>
            <DialogContent className={maxWidth || className}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {fields.map(renderField)}
                        <Button type="submit" className="w-full">
                            {submitText}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

// Hook para criar formulários com configuração
export function useBaseForm<T extends FieldValues>(
    schema: z.ZodSchema<T>,
    defaultValues?: Partial<T>
): UseFormReturn<T> {
    return useForm<T>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as any,
    });
}
