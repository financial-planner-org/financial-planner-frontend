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
import { useCreateAllocation } from '@/hooks/api/useAllocations';
import { toast } from 'sonner';

const allocationFinancialSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  value: z.number().min(0.01, 'Valor deve ser maior que zero'),
  date: z.string().min(1, 'Data é obrigatória'),
});

type AllocationFinancialFormData = z.infer<typeof allocationFinancialSchema>;

interface AllocationFinancialModalProps {
  simulationId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function AllocationFinancialModal({
  simulationId,
  isOpen,
  onClose
}: AllocationFinancialModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createAllocation = useCreateAllocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AllocationFinancialFormData>({
    resolver: zodResolver(allocationFinancialSchema),
    defaultValues: {
      name: '',
      value: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: AllocationFinancialFormData) => {
    setIsLoading(true);
    try {
      await createAllocation.mutateAsync({
        simulationId,
        name: data.name,
        value: data.value,
        date: data.date,
        type: 'FINANCEIRA',
      });

      toast.success('Alocação financeira adicionada com sucesso!');
      onClose();
      reset();
    } catch (error) {
      toast.error('Erro ao adicionar alocação. Tente novamente.');
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
            Adicionar Alocação Financeira
          </DialogTitle>
          <DialogDescription className="text-[#B1B1B1]">
            Registre um novo ativo financeiro para a simulação.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#9F9F9F] font-medium">
              Nome do Ativo
            </Label>
            <Input
              id="name"
              {...register('name')}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
              placeholder="Ex: CDB Banco Itaú, Tesouro Selic..."
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value" className="text-[#9F9F9F] font-medium">
              Valor (R$)
            </Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              min="0.01"
              {...register('value', { valueAsNumber: true })}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
              placeholder="0,00"
            />
            {errors.value && (
              <p className="text-red-400 text-sm">{errors.value.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-[#9F9F9F] font-medium">
              Data de Início
            </Label>
            <Input
              id="date"
              type="date"
              {...register('date')}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] focus:border-[#9F9F9F]"
            />
            {errors.date && (
              <p className="text-red-400 text-sm">{errors.date.message}</p>
            )}
          </div>

          <div className="p-3 bg-[#434343] rounded-lg border border-[#454545]">
            <p className="text-[#B1B1B1] text-sm">
              <strong>Tipo:</strong> Alocação Financeira
            </p>
            <p className="text-[#9F9F9F] text-xs mt-1">
              Esta alocação será registrada como um ativo financeiro na simulação.
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
              {isLoading ? 'Adicionando...' : 'Adicionar Alocação'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}