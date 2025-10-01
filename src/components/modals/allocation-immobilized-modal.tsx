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
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateAllocation } from '@/hooks/api/useAllocations';
import { toast } from 'sonner';

const allocationImmobilizedSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  value: z.number().min(0.01, 'Valor deve ser maior que zero'),
  date: z.string().min(1, 'Data é obrigatória'),
  hasFinancing: z.boolean().default(false),
  financingStartDate: z.string().optional(),
  installments: z.number().optional(),
  interestRate: z.number().optional(),
  downPayment: z.number().optional(),
});

type AllocationImmobilizedFormData = z.infer<typeof allocationImmobilizedSchema>;

interface AllocationImmobilizedModalProps {
  simulationId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function AllocationImmobilizedModal({
  simulationId,
  isOpen,
  onClose
}: AllocationImmobilizedModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasFinancing, setHasFinancing] = useState(false);
  const createAllocation = useCreateAllocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AllocationImmobilizedFormData>({
    resolver: zodResolver(allocationImmobilizedSchema),
    defaultValues: {
      name: '',
      value: 0,
      date: new Date().toISOString().split('T')[0],
      hasFinancing: false,
      financingStartDate: '',
      installments: 0,
      interestRate: 0,
      downPayment: 0,
    },
  });

  const watchedValue = watch('value');
  const watchedDownPayment = watch('downPayment');
  const watchedInstallments = watch('installments');
  const watchedInterestRate = watch('interestRate');

  // Calcular valor financiado e parcela
  const financedValue = watchedValue - (watchedDownPayment || 0);
  const monthlyRate = (watchedInterestRate || 0) / 100 / 12;
  const monthlyPayment = (watchedInstallments || 0) > 0 && monthlyRate > 0
    ? (financedValue * monthlyRate * Math.pow(1 + monthlyRate, watchedInstallments || 0)) /
    (Math.pow(1 + monthlyRate, watchedInstallments || 0) - 1)
    : 0;

  const onSubmit = async (data: AllocationImmobilizedFormData) => {
    setIsLoading(true);
    try {
      await createAllocation.mutateAsync({
        simulationId,
        name: data.name,
        value: data.value,
        startDate: data.date,
        type: 'IMOBILIZADA',
        financing: data.hasFinancing ? {
          startDate: data.financingStartDate!,
          installments: data.installments!,
          interestRate: data.interestRate!,
          downPayment: data.downPayment!,
        } : undefined,
      });

      toast.success('Alocação imobilizada adicionada com sucesso!');
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
    setHasFinancing(false);
    onClose();
  };

  const handleFinancingChange = (checked: boolean) => {
    setHasFinancing(checked);
    setValue('hasFinancing', checked);
    if (!checked) {
      setValue('financingStartDate', '');
      setValue('installments', 0);
      setValue('interestRate', 0);
      setValue('downPayment', 0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#101010] border-[#434343] text-[#9F9F9F]">
        <DialogHeader>
          <DialogTitle className="text-[#9F9F9F] text-xl font-semibold">
            Adicionar Alocação Imobilizada
          </DialogTitle>
          <DialogDescription className="text-[#B1B1B1]">
            Registre um novo ativo imobilizado para a simulação.
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
              placeholder="Ex: Apartamento Vila Olímpia, Loja Comercial..."
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value" className="text-[#9F9F9F] font-medium">
              Valor Total (R$)
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasFinancing"
              checked={hasFinancing}
              onCheckedChange={handleFinancingChange}
              className="border-[#454545] data-[state=checked]:bg-[#434343] data-[state=checked]:text-[#9F9F9F]"
            />
            <Label htmlFor="hasFinancing" className="text-[#9F9F9F] font-medium">
              Incluir financiamento
            </Label>
          </div>

          {hasFinancing && (
            <div className="space-y-4 p-4 bg-[#434343] rounded-lg border border-[#454545]">
              <h4 className="text-[#B1B1B1] font-medium">Dados do Financiamento</h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="downPayment" className="text-[#9F9F9F] font-medium">
                    Entrada (R$)
                  </Label>
                  <Input
                    id="downPayment"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('downPayment', { valueAsNumber: true })}
                    className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
                    placeholder="0,00"
                  />
                  {errors.downPayment && (
                    <p className="text-red-400 text-sm">{errors.downPayment.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installments" className="text-[#9F9F9F] font-medium">
                    Nº de Parcelas
                  </Label>
                  <Input
                    id="installments"
                    type="number"
                    min="1"
                    {...register('installments', { valueAsNumber: true })}
                    className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
                    placeholder="240"
                  />
                  {errors.installments && (
                    <p className="text-red-400 text-sm">{errors.installments.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interestRate" className="text-[#9F9F9F] font-medium">
                    Taxa de Juros (% a.a.)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('interestRate', { valueAsNumber: true })}
                    className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
                    placeholder="8.50"
                  />
                  {errors.interestRate && (
                    <p className="text-red-400 text-sm">{errors.interestRate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financingStartDate" className="text-[#9F9F9F] font-medium">
                    Data Início Financiamento
                  </Label>
                  <Input
                    id="financingStartDate"
                    type="date"
                    {...register('financingStartDate')}
                    className="bg-[#434343] border-[#454545] text-[#B1B1B1] focus:border-[#9F9F9F]"
                  />
                  {errors.financingStartDate && (
                    <p className="text-red-400 text-sm">{errors.financingStartDate.message}</p>
                  )}
                </div>
              </div>

              {monthlyPayment > 0 && (
                <div className="p-3 bg-[#454545] rounded-lg">
                  <p className="text-[#B1B1B1] text-sm">
                    <strong>Valor financiado:</strong> R$ {financedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[#B1B1B1] text-sm">
                    <strong>Parcela mensal:</strong> R$ {monthlyPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
          )}

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