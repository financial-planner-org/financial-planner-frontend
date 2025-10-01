'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSimulationSchema, CreateSimulationInput } from '@/lib/schemas/simulation';
import { useCreateSimulation, useUpdateSimulation } from '@/hooks/api/use-simulations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

interface SimulationFormProps {
  onSuccess?: () => void;
  initialData?: Partial<CreateSimulationInput>;
  isEditing?: boolean;
  simulationId?: number;
}

export function SimulationForm({
  onSuccess,
  initialData,
  isEditing = false,
  simulationId,
}: SimulationFormProps) {
  const createSimulation = useCreateSimulation();
  const updateSimulation = useUpdateSimulation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateSimulationInput>({
    resolver: zodResolver(CreateSimulationSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      realRate: initialData?.realRate || 0.04,
      status: initialData?.status || 'ATIVO',
      startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: CreateSimulationInput) => {
    try {
      if (isEditing && simulationId) {
        await updateSimulation.mutateAsync({
          id: simulationId,
          ...data,
        });
        toast.success('Simulação atualizada com sucesso!');
      } else {
        await createSimulation.mutateAsync(data);
        toast.success('Simulação criada com sucesso!');
      }

      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar simulação. Tente novamente.');
      console.error('Erro ao salvar simulação:', error);
    }
  };

  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader>
        <CardTitle>{isEditing ? 'Editar Simulação' : 'Nova Simulação'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Nome */}
          <div className='space-y-2'>
            <Label htmlFor='name'>Nome *</Label>
            <Input
              id='name'
              {...register('name')}
              placeholder='Digite o nome da simulação'
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
          </div>

          {/* Descrição */}
          <div className='space-y-2'>
            <Label htmlFor='description'>Descrição</Label>
            <Textarea
              id='description'
              {...register('description')}
              placeholder='Digite uma descrição (opcional)'
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className='text-sm text-red-500'>{errors.description.message}</p>
            )}
          </div>

          {/* Taxa Real */}
          <div className='space-y-2'>
            <Label htmlFor='realRate'>Taxa Real (% a.a.) *</Label>
            <Input
              id='realRate'
              type='number'
              step='0.01'
              min='0'
              max='1'
              {...register('realRate', { valueAsNumber: true })}
              placeholder='0.04'
              className={errors.realRate ? 'border-red-500' : ''}
            />
            {errors.realRate && <p className='text-sm text-red-500'>{errors.realRate.message}</p>}
          </div>

          {/* Status */}
          <div className='space-y-2'>
            <Label htmlFor='status'>Status *</Label>
            <Select
              value={watch('status')}
              onValueChange={value => setValue('status', value as 'ATIVO' | 'INATIVO')}
            >
              <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                <SelectValue placeholder='Selecione o status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ATIVO'>Ativo</SelectItem>
                <SelectItem value='INATIVO'>Inativo</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className='text-sm text-red-500'>{errors.status.message}</p>}
          </div>

          {/* Data de Início */}
          <div className='space-y-2'>
            <Label htmlFor='startDate'>Data de Início *</Label>
            <Input
              id='startDate'
              type='date'
              {...register('startDate')}
              className={errors.startDate ? 'border-red-500' : ''}
            />
            {errors.startDate && <p className='text-sm text-red-500'>{errors.startDate.message}</p>}
          </div>

          {/* Botões */}
          <div className='flex gap-2 pt-4'>
            <Button
              type='submit'
              disabled={isSubmitting || createSimulation.isPending || updateSimulation.isPending}
              className='flex-1'
            >
              {(isSubmitting || createSimulation.isPending || updateSimulation.isPending) && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isEditing ? 'Atualizar' : 'Criar'} Simulação
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
