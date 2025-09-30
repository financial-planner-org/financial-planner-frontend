'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Plus, Edit3, DollarSign, Calendar, Building2 } from 'lucide-react';

// Schemas de validação
const financialAllocationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  value: z.number().min(0, 'Valor deve ser positivo'),
  date: z.string().min(1, 'Data é obrigatória'),
});

const immovableAllocationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  value: z.number().min(0, 'Valor deve ser positivo'),
  date: z.string().min(1, 'Data é obrigatória'),
  hasFinancing: z.boolean(),
  financingStartDate: z.string().optional(),
  installments: z.number().optional(),
  interestRate: z.number().optional(),
  downPayment: z.number().optional(),
});

const updateAllocationSchema = z.object({
  value: z.number().min(0, 'Valor deve ser positivo'),
});

type FinancialAllocationData = z.infer<typeof financialAllocationSchema>;
type ImmovableAllocationData = z.infer<typeof immovableAllocationSchema>;
type UpdateAllocationData = z.infer<typeof updateAllocationSchema>;

interface Allocation {
  id: number;
  name: string;
  value: number;
  date: string;
  type: 'FINANCIAL' | 'IMMOVABLE';
  financing?: {
    startDate: string;
    installments: number;
    interestRate: number;
    downPayment: number;
  };
}

interface AllocationModalsProps {
  allocation?: Allocation;
  onAddFinancial?: (data: FinancialAllocationData) => Promise<void>;
  onAddImmovable?: (data: ImmovableAllocationData) => Promise<void>;
  onUpdate?: (id: number, data: UpdateAllocationData) => Promise<void>;
  onEdit?: (id: number, data: FinancialAllocationData | ImmovableAllocationData) => Promise<void>;
}

export function AddFinancialAllocationModal({ onAddFinancial }: AllocationModalsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FinancialAllocationData>({
    resolver: zodResolver(financialAllocationSchema),
    defaultValues: {
      name: '',
      value: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: FinancialAllocationData) => {
    if (!onAddFinancial) return;
    
    setIsLoading(true);
    try {
      await onAddFinancial(data);
      toast.success('Alocação financeira adicionada com sucesso!');
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Erro ao adicionar alocação financeira');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Adicionar Financeira
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Adicionar Alocação Financeira</ModalTitle>
          <ModalDescription>
            Registre uma nova alocação financeira (ações, fundos, etc.).
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Ativo</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Ex: Ações da Petrobras"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              min="0"
              {...form.register('value', { valueAsNumber: true })}
              placeholder="10000.00"
            />
            {form.formState.errors.value && (
              <p className="text-sm text-destructive">{form.formState.errors.value.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              {...form.register('date')}
            />
            {form.formState.errors.date && (
              <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
            )}
          </div>

          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export function AddImmovableAllocationModal({ onAddImmovable }: AllocationModalsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFinancing, setHasFinancing] = useState(false);

  const form = useForm<ImmovableAllocationData>({
    resolver: zodResolver(immovableAllocationSchema),
    defaultValues: {
      name: '',
      value: 0,
      date: new Date().toISOString().split('T')[0],
      hasFinancing: false,
    },
  });

  const onSubmit = async (data: ImmovableAllocationData) => {
    if (!onAddImmovable) return;
    
    setIsLoading(true);
    try {
      await onAddImmovable(data);
      toast.success('Alocação imobilizada adicionada com sucesso!');
      setOpen(false);
      form.reset();
      setHasFinancing(false);
    } catch (error) {
      toast.error('Erro ao adicionar alocação imobilizada');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Adicionar Imobilizada
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Adicionar Alocação Imobilizada</ModalTitle>
          <ModalDescription>
            Registre uma nova alocação imobilizada (imóveis, veículos, etc.).
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Ativo</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Ex: Apartamento em Copacabana"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              min="0"
              {...form.register('value', { valueAsNumber: true })}
              placeholder="500000.00"
            />
            {form.formState.errors.value && (
              <p className="text-sm text-destructive">{form.formState.errors.value.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              {...form.register('date')}
            />
            {form.formState.errors.date && (
              <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasFinancing"
              checked={hasFinancing}
              onChange={(e) => {
                setHasFinancing(e.target.checked);
                form.setValue('hasFinancing', e.target.checked);
              }}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="hasFinancing">Possui financiamento</Label>
          </div>

          {hasFinancing && (
            <div className="space-y-4 pl-6 border-l-2 border-muted">
              <div className="space-y-2">
                <Label htmlFor="financingStartDate">Data de Início do Financiamento</Label>
                <Input
                  id="financingStartDate"
                  type="date"
                  {...form.register('financingStartDate')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="installments">Número de Parcelas</Label>
                <Input
                  id="installments"
                  type="number"
                  min="1"
                  {...form.register('installments', { valueAsNumber: true })}
                  placeholder="360"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Taxa de Juros (% a.a.)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  min="0"
                  {...form.register('interestRate', { valueAsNumber: true })}
                  placeholder="8.50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Valor de Entrada (R$)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  step="0.01"
                  min="0"
                  {...form.register('downPayment', { valueAsNumber: true })}
                  placeholder="100000.00"
                />
              </div>
            </div>
          )}

          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export function UpdateAllocationModal({ allocation, onUpdate }: AllocationModalsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateAllocationData>({
    resolver: zodResolver(updateAllocationSchema),
    defaultValues: {
      value: allocation?.value || 0,
    },
  });

  const onSubmit = async (data: UpdateAllocationData) => {
    if (!allocation || !onUpdate) return;
    
    setIsLoading(true);
    try {
      await onUpdate(allocation.id, data);
      toast.success('Alocação atualizada com sucesso!');
      setOpen(false);
    } catch (error) {
      toast.error('Erro ao atualizar alocação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit3 className="h-4 w-4" />
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Atualizar Alocação</ModalTitle>
          <ModalDescription>
            Atualize o valor da alocação "{allocation?.name}" para a data atual.
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value">Novo Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              min="0"
              {...form.register('value', { valueAsNumber: true })}
              placeholder="10000.00"
            />
            {form.formState.errors.value && (
              <p className="text-sm text-destructive">{form.formState.errors.value.message}</p>
            )}
          </div>

          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
