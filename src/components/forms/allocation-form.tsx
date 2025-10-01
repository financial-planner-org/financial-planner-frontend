'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateAllocationSchema, CreateAllocationInput } from '@/lib/schemas/allocation';
import { useCreateAllocation, useUpdateAllocation } from '@/hooks/api/use-allocations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface AllocationFormProps {
  simulationId: number;
  onSuccess?: () => void;
  initialData?: Partial<CreateAllocationInput>;
  isEditing?: boolean;
  allocationId?: number;
}

export function AllocationForm({
  simulationId,
  onSuccess,
  initialData,
  isEditing = false,
  allocationId,
}: AllocationFormProps) {
  const createAllocation = useCreateAllocation();
  const updateAllocation = useUpdateAllocation();
  const [showFinancingFields, setShowFinancingFields] = useState(
    initialData?.type === 'IMMOVABLE' && !!initialData?.installments
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateAllocationInput>({
    resolver: zodResolver(CreateAllocationSchema),
    defaultValues: {
      simulationId,
      type: initialData?.type || 'FINANCIAL',
      name: initialData?.name || '',
      value: initialData?.value || 0,
      startDate: initialData?.startDate || '',
      installments: initialData?.installments || undefined,
      interestRate: initialData?.interestRate || undefined,
    },
  });

  const watchedType = watch('type');

  const onSubmit = async (data: CreateAllocationInput) => {
    try {
      if (isEditing && allocationId) {
        await updateAllocation.mutateAsync({
          id: allocationId,
          ...data,
        });
        toast.success('Alocação atualizada com sucesso!');
      } else {
        await createAllocation.mutateAsync(data);
        toast.success('Alocação criada com sucesso!');
      }

      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar alocação. Tente novamente.');
      console.error('Erro ao salvar alocação:', error);
    }
  };

  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader>
        <CardTitle>{isEditing ? 'Editar Alocação' : 'Nova Alocação'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Tipo */}
          <div className='space-y-2'>
            <Label htmlFor='type'>Tipo *</Label>
            <Select
              value={watch('type')}
              onValueChange={value => {
                setValue('type', value as 'FINANCIAL' | 'IMMOVABLE');
                if (value === 'FINANCIAL') {
                  setShowFinancingFields(false);
                  setValue('installments', undefined);
                  setValue('interestRate', undefined);
                  setValue('startDate', '');
                } else {
                  setShowFinancingFields(true);
                }
              }}
            >
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder='Selecione o tipo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='FINANCIAL'>Financeira</SelectItem>
                <SelectItem value='IMMOVABLE'>Imobilizada</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className='text-sm text-red-500'>{errors.type.message}</p>}
          </div>

          {/* Nome */}
          <div className='space-y-2'>
            <Label htmlFor='name'>Nome *</Label>
            <Input
              id='name'
              {...register('name')}
              placeholder='Digite o nome da alocação'
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
          </div>

          {/* Valor */}
          <div className='space-y-2'>
            <Label htmlFor='value'>Valor (R$) *</Label>
            <Input
              id='value'
              type='number'
              step='0.01'
              min='0'
              {...register('value', { valueAsNumber: true })}
              placeholder='0.00'
              className={errors.value ? 'border-red-500' : ''}
            />
            {errors.value && <p className='text-sm text-red-500'>{errors.value.message}</p>}
          </div>

          {/* Campos de Financiamento (apenas para imóveis) */}
          {watchedType === 'IMMOVABLE' && (
            <>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='hasFinancing'
                    checked={showFinancingFields}
                    onChange={e => {
                      setShowFinancingFields(e.target.checked);
                      if (!e.target.checked) {
                        setValue('installments', undefined);
                        setValue('interestRate', undefined);
                        setValue('startDate', '');
                      }
                    }}
                  />
                  <Label htmlFor='hasFinancing'>Possui financiamento</Label>
                </div>
              </div>

              {showFinancingFields && (
                <>
                  {/* Data de Início */}
                  <div className='space-y-2'>
                    <Label htmlFor='startDate'>Data de Início do Financiamento *</Label>
                    <Input
                      id='startDate'
                      type='date'
                      {...register('startDate')}
                      className={errors.startDate ? 'border-red-500' : ''}
                    />
                    {errors.startDate && (
                      <p className='text-sm text-red-500'>{errors.startDate.message}</p>
                    )}
                  </div>

                  {/* Número de Parcelas */}
                  <div className='space-y-2'>
                    <Label htmlFor='installments'>Número de Parcelas *</Label>
                    <Input
                      id='installments'
                      type='number'
                      min='1'
                      max='1000'
                      {...register('installments', { valueAsNumber: true })}
                      placeholder='120'
                      className={errors.installments ? 'border-red-500' : ''}
                    />
                    {errors.installments && (
                      <p className='text-sm text-red-500'>{errors.installments.message}</p>
                    )}
                  </div>

                  {/* Taxa de Juros */}
                  <div className='space-y-2'>
                    <Label htmlFor='interestRate'>Taxa de Juros (% a.a.) *</Label>
                    <Input
                      id='interestRate'
                      type='number'
                      step='0.01'
                      min='0'
                      max='1'
                      {...register('interestRate', { valueAsNumber: true })}
                      placeholder='0.08'
                      className={errors.interestRate ? 'border-red-500' : ''}
                    />
                    {errors.interestRate && (
                      <p className='text-sm text-red-500'>{errors.interestRate.message}</p>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/* Botões */}
          <div className='flex gap-2 pt-4'>
            <Button
              type='submit'
              disabled={isSubmitting || createAllocation.isPending || updateAllocation.isPending}
              className='flex-1'
            >
              {(isSubmitting || createAllocation.isPending || updateAllocation.isPending) && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isEditing ? 'Atualizar' : 'Criar'} Alocação
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
