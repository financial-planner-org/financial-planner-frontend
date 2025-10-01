/**
 * @fileoverview Campo de formulário personalizado do Financial Planner
 * @description Componente de campo com validação e estilos específicos do projeto
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

const formFieldVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      error: 'border-destructive focus:ring-destructive',
      success: 'border-green-500 focus:ring-green-500',
      warning: 'border-yellow-500 focus:ring-yellow-500',
    },
    size: {
      default: 'h-10',
      sm: 'h-9',
      lg: 'h-11',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'textarea'
    | 'select';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Campo de formulário personalizado do Financial Planner
 *
 * @param props - Props do campo
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * // Campo de texto básico
 * <FormField
 *   label="Nome completo"
 *   placeholder="Digite seu nome"
 *   required
 * />
 *
 * // Campo com validação
 * <FormField
 *   label="Email"
 *   type="email"
 *   error="Email é obrigatório"
 *   required
 * />
 *
 * // Campo de seleção
 * <FormField
 *   type="select"
 *   label="Tipo de alocação"
 *   options={[
 *     { value: "financial", label: "Financeira" },
 *     { value: "real_estate", label: "Imóveis" }
 *   ]}
 * />
 *
 * // Campo com ícones
 * <FormField
 *   label="Valor"
 *   type="number"
 *   leftIcon={<DollarSign />}
 *   rightIcon={<span>R$</span>}
 * />
 * ```
 */
const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helpText,
      required,
      leftIcon,
      rightIcon,
      type = 'text',
      options = [],
      placeholder,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    const fieldId = React.useId();
    const errorId = `${fieldId}-error`;
    const helpId = `${fieldId}-help`;

    const hasError = Boolean(error);
    const fieldVariant = hasError ? 'error' : variant;

    const renderInput = () => {
      const inputProps = {
        id: fieldId,
        className: cn(
          formFieldVariants({ variant: fieldVariant, size }),
          leftIcon && 'pl-10',
          rightIcon && 'pr-10',
          className
        ),
        placeholder,
        disabled: disabled || loading,
        'aria-invalid': hasError,
        'aria-describedby': cn(hasError && errorId, helpText && helpId),
        ...props,
      };

      switch (type) {
        case 'textarea':
          return (
            <Textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          );

        case 'select':
          return (
            <Select disabled={disabled || loading}>
              <SelectTrigger
                className={cn(
                  formFieldVariants({ variant: fieldVariant, size }),
                  leftIcon && 'pl-10',
                  rightIcon && 'pr-10',
                  className
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        default:
          return <Input ref={ref} type={type} {...inputProps} />;
      }
    };

    return (
      <div className='space-y-2'>
        {label && (
          <Label
            htmlFor={fieldId}
            className={cn(
              'block text-sm font-medium text-foreground',
              required && "after:content-['*'] after:ml-0.5 after:text-destructive"
            )}
          >
            {label}
          </Label>
        )}

        <div className='relative'>
          {leftIcon && (
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'>
              {leftIcon}
            </div>
          )}

          {renderInput()}

          {rightIcon && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'>
              {rightIcon}
            </div>
          )}

          {loading && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <svg
                className='h-4 w-4 animate-spin text-muted-foreground'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
            </div>
          )}
        </div>

        {hasError && (
          <p id={errorId} className='text-sm text-destructive'>
            {error}
          </p>
        )}

        {helpText && !hasError && (
          <p id={helpId} className='text-sm text-muted-foreground'>
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField, formFieldVariants };
