'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateSimulation } from '@/hooks/api/useSimulations';
import { toast } from 'sonner';
import type { Simulation } from '@/lib/types/api';

const simulationVersionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  realRate: z.number().min(0, 'Taxa deve ser positiva').max(100, 'Taxa deve ser menor que 100%'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
});

type SimulationVersionFormData = z.infer<typeof simulationVersionSchema>;

interface SimulationVersionModalProps {
  simulation: Simulation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SimulationVersionModal({ simulation, isOpen, onClose }: SimulationVersionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createSimulation = useCreateSimulation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SimulationVersionFormData>({
    resolver: zodResolver(simulationVersionSchema),
    defaultValues: {
      name: simulation?.name || '',
      description: simulation?.description || '',
      realRate: simulation?.realRate || 4,
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  // Atualizar valores quando a simulação mudar
  useState(() => {
    if (simulation) {
      setValue('name', simulation.name);
      setValue('description', simulation.description || '');
      setValue('realRate', simulation.realRate);
      setValue('startDate', new Date().toISOString().split('T')[0]);
    }
  });

  const onSubmit = async (data: SimulationVersionFormData) => {
    if (!simulation) return;

    setIsLoading(true);
    try {
      await createSimulation.mutateAsync({
        name: data.name,
        description: data.description,
        realRate: data.realRate,
        startDate: data.startDate,
        baseId: simulation.id, // Duplicar a simulação atual
        clientId: simulation.clientId,
      });

      toast.success('Nova versão criada com sucesso!');
      onClose();
      reset();
    } catch (error) {
      toast.error('Erro ao criar nova versão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#101010] border-[#434343] text-[#9F9F9F]">
        <DialogHeader>
          <DialogTitle className="text-[#9F9F9F] text-xl font-semibold">
            Criar Nova Versão
          </DialogTitle>
          <DialogDescription className="text-[#B1B1B1]">
            Duplicar a simulação "{simulation?.name}" incluindo movimentações e seguros.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#9F9F9F] font-medium">
              Nome da Simulação
            </Label>
            <Input
              id="name"
              {...register('name')}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
              placeholder="Digite o nome da simulação"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#9F9F9F] font-medium">
              Descrição (Opcional)
            </Label>
            <Textarea
              id="description"
              {...register('description')}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
              placeholder="Digite uma descrição para a simulação"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-400 text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="realRate" className="text-[#9F9F9F] font-medium">
              Taxa Real (% a.a.)
            </Label>
            <Input
              id="realRate"
              type="number"
              step="0.01"
              min="0"
              max="100"
              {...register('realRate', { valueAsNumber: true })}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
              placeholder="4.00"
            />
            {errors.realRate && (
              <p className="text-red-400 text-sm">{errors.realRate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-[#9F9F9F] font-medium">
              Data de Início
            </Label>
            <Input
              id="startDate"
              type="date"
              {...register('startDate')}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] focus:border-[#9F9F9F]"
            />
            {errors.startDate && (
              <p className="text-red-400 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div className="p-3 bg-[#434343] rounded-lg border border-[#454545]">
            <p className="text-[#B1B1B1] text-sm">
              <strong>Simulação original:</strong> {simulation?.name}
            </p>
            <p className="text-[#9F9F9F] text-xs mt-1">
              Esta nova versão será criada com o mesmo nome, incluindo todas as movimentações e seguros da simulação original.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] hover:bg-[#454545]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#434343] hover:bg-[#454545] text-[#B1B1B1]"
            >
              {isLoading ? 'Criando...' : 'Criar Nova Versão'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}