'use client';

import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface SelectOption {
    value: string;
    label: string;
}

export interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    required?: boolean;
}

// Campo de texto genérico
export function TextField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    required = false
}: FormFieldProps<T> & { type?: 'text' | 'email' | 'password' | 'number' | 'date' }) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder || label} {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}

// Campo de seleção genérico
export function SelectField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    options,
    required = false
}: FormFieldProps<T> & { options: SelectOption[] }) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </FormLabel>
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

// Campo de data genérico
export function DateField<T extends FieldValues>({
    control,
    name,
    label,
    required = false
}: FormFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}

// Campo de número genérico
export function NumberField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    required = false
}: FormFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input type="number" placeholder={placeholder || label} {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}

