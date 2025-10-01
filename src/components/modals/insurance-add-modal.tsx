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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateInsurance } from '@/hooks/api/useInsurances';
import { toast } from 'sonner';

const insuranceAddSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['VIDA', 'RESIDENCIAL', 'AUTOMOVEL', 'OUTRO'], {
    required_error: 'Tipo é obrigatório'
  }),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  durationMonths: z.number().min(1, 'Duração deve ser pelo menos 1 mês'),
  premium: z.number().min(0.01, 'Prêmio deve ser maior que zero'),
  insuredValue: z.number().min(0.01, 'Valor segurado deve ser maior que zero'),
});

type InsuranceAddFormData = z.infer<typeof insuranceAddSchema>;

interface InsuranceAddModalProps {
  simulationId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function InsuranceAddModal({ simulationId, isOpen, onClose }: InsuranceAddModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createInsurance = useCreateInsurance();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<InsuranceAddFormData>({
    resolver: zodResolver(insuranceAddSchema),
    defaultValues: {
      name: '',
      type: 'VIDA',
      startDate: new Date().toISOString().split('T')[0],
      durationMonths: 12,
      premium: 0,
      insuredValue: 0,
    },
  });

  const onSubmit = async (data: InsuranceAddFormData) => {
    setIsLoading(true);
    try {
      await createInsurance.mutateAsync({
        simulationId,
        name: data.name,
        type: data.type,
        startDate: data.startDate,
        durationMonths: data.durationMonths,
        premium: data.premium,
        insuredValue: data.insuredValue,
      });

      toast.success('Seguro adicionado com sucesso!');
      onClose();
      reset();
    } catch (error) {
      toast.error('Erro ao adicionar seguro. Tente novamente.');
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
      <DialogContent className="sm:max-w-[500px] bg-[#101010] border-[#434343] text-[#9F9F9F]">
        <DialogHeader>
          <DialogTitle className="text-[#9F9F9F] text-xl font-semibold">
            Adicionar Seguro
          </DialogTitle>
          <DialogDescription className="text-[#B1B1B1]">
            Registre um novo seguro para a simulação.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#9F9F9F] font-medium">
              Nome do Seguro
            </Label>
            <Input
              id="name"
              {...register('name')}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
              placeholder="Ex: Seguro de Vida Familiar"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-[#9F9F9F] font-medium">
              Tipo de Seguro
            </Label>
            <Select
              onValueChange={(value: 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO') =>
                setValue('type', value)
              }
              defaultValue="VIDA"
            >
              <SelectTrigger className="bg-[#434343] border-[#454545] text-[#B1B1B1]">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-[#434343] border-[#454545]">
                <SelectItem value="VIDA" className="text-[#B1B1B1] hover:bg-[#454545]">
                  Vida
                </SelectItem>
                <SelectItem value="RESIDENCIAL" className="text-[#B1B1B1] hover:bg-[#454545]">
                  Residencial
                </SelectItem>
                <SelectItem value="AUTOMOVEL" className="text-[#B1B1B1] hover:bg-[#454545]">
                  Automóvel
                </SelectItem>
                <SelectItem value="OUTRO" className="text-[#B1B1B1] hover:bg-[#454545]">
                  Outro
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-red-400 text-sm">{errors.type.message}</p>
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

          <div className="space-y-2">
            <Label htmlFor="durationMonths" className="text-[#9F9F9F] font-medium">
              Duração (meses)
            </Label>
            <Input
              id="durationMonths"
              type="number"
              min="1"
              {...register('durationMonths', { valueAsNumber: true })}
              className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
              placeholder="12"
            />
            {errors.durationMonths && (
              <p className="text-red-400 text-sm">{errors.durationMonths.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="premium" className="text-[#9F9F9F] font-medium">
                Prêmio Mensal (R$)
              </Label>
              <Input
                id="premium"
                type="number"
                step="0.01"
                min="0.01"
                {...register('premium', { valueAsNumber: true })}
                className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
                placeholder="0,00"
              />
              {errors.premium && (
                <p className="text-red-400 text-sm">{errors.premium.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuredValue" className="text-[#9F9F9F] font-medium">
                Valor Segurado (R$)
              </Label>
              <Input
                id="insuredValue"
                type="number"
                step="0.01"
                min="0.01"
                {...register('insuredValue', { valueAsNumber: true })}
                className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
                placeholder="0,00"
              />
              {errors.insuredValue && (
                <p className="text-red-400 text-sm">{errors.insuredValue.message}</p>
              )}
            </div>
          </div>

          <div className="p-3 bg-[#434343] rounded-lg border border-[#454545]">
            <p className="text-[#B1B1B1] text-sm">
              <strong>Total a pagar:</strong> R$ {(
                (watch('premium') || 0) * (watch('durationMonths') || 0)
              ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[#9F9F9F] text-xs mt-1">
              Prêmio mensal × Duração em meses
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
              {isLoading ? 'Adicionando...' : 'Adicionar Seguro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}