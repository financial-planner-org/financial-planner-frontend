'use client';

import React, { useState } from 'react';
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
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Edit3, Trash2, Shield, Calendar } from 'lucide-react';

// Schemas de validação
const insuranceSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['LIFE', 'DISABILITY'], {
    required_error: 'Tipo é obrigatório',
  }),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  duration: z.number().min(1, 'Duração deve ser positiva'),
  premium: z.number().min(0, 'Prêmio deve ser positivo'),
  insuredValue: z.number().min(0, 'Valor segurado deve ser positivo'),
});

type InsuranceData = z.infer<typeof insuranceSchema>;

interface Insurance {
  id: number;
  name: string;
  type: 'LIFE' | 'DISABILITY';
  startDate: string;
  duration: number; // em meses
  premium: number; // pagamento mensal
  insuredValue: number; // valor segurado
}

interface InsuranceDialogsProps {
  insurance?: Insurance;
  onAdd?: (data: InsuranceData) => Promise<void>;
  onEdit?: (id: number, data: InsuranceData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

export function AddInsuranceDialog({ onAdd }: InsuranceDialogsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InsuranceData>({
    resolver: zodResolver(insuranceSchema),
    defaultValues: {
      name: '',
      type: 'LIFE',
      startDate: new Date().toISOString().split('T')[0],
      duration: 12,
      premium: 0,
      insuredValue: 0,
    },
  });

  const onSubmit = async (data: InsuranceData) => {
    if (!onAdd) return;
    
    setIsLoading(true);
    try {
      await onAdd(data);
      toast.success('Seguro adicionado com sucesso!');
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Erro ao adicionar seguro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Adicionar Seguro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Seguro</DialogTitle>
          <DialogDescription>
            Registre um novo seguro (vida ou invalidez).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Seguro</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Ex: Seguro de Vida Principal"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Seguro</Label>
            <Select onValueChange={(value) => form.setValue('type', value as 'LIFE' | 'DISABILITY')}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LIFE">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Seguro de Vida
                  </div>
                </SelectItem>
                <SelectItem value="DISABILITY">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-orange-500" />
                    Seguro de Invalidez
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.type && (
              <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Data de Início</Label>
            <Input
              id="startDate"
              type="date"
              {...form.register('startDate')}
            />
            {form.formState.errors.startDate && (
              <p className="text-sm text-destructive">{form.formState.errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duração (meses)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              {...form.register('duration', { valueAsNumber: true })}
              placeholder="12"
            />
            {form.formState.errors.duration && (
              <p className="text-sm text-destructive">{form.formState.errors.duration.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="premium">Prêmio Mensal (R$)</Label>
            <Input
              id="premium"
              type="number"
              step="0.01"
              min="0"
              {...form.register('premium', { valueAsNumber: true })}
              placeholder="500.00"
            />
            {form.formState.errors.premium && (
              <p className="text-sm text-destructive">{form.formState.errors.premium.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="insuredValue">Valor Segurado (R$)</Label>
            <Input
              id="insuredValue"
              type="number"
              step="0.01"
              min="0"
              {...form.register('insuredValue', { valueAsNumber: true })}
              placeholder="1000000.00"
            />
            {form.formState.errors.insuredValue && (
              <p className="text-sm text-destructive">{form.formState.errors.insuredValue.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditInsuranceDialog({ insurance, onEdit }: InsuranceDialogsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InsuranceData>({
    resolver: zodResolver(insuranceSchema),
    defaultValues: {
      name: insurance?.name || '',
      type: insurance?.type || 'LIFE',
      startDate: insurance?.startDate ? new Date(insurance.startDate).toISOString().split('T')[0] : '',
      duration: insurance?.duration || 12,
      premium: insurance?.premium || 0,
      insuredValue: insurance?.insuredValue || 0,
    },
  });

  const onSubmit = async (data: InsuranceData) => {
    if (!insurance || !onEdit) return;
    
    setIsLoading(true);
    try {
      await onEdit(insurance.id, data);
      toast.success('Seguro editado com sucesso!');
      setOpen(false);
    } catch (error) {
      toast.error('Erro ao editar seguro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Seguro</DialogTitle>
          <DialogDescription>
            Edite as informações do seguro selecionado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Seguro</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Ex: Seguro de Vida Principal"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Seguro</Label>
            <Select 
              value={form.watch('type')} 
              onValueChange={(value) => form.setValue('type', value as 'LIFE' | 'DISABILITY')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LIFE">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Seguro de Vida
                  </div>
                </SelectItem>
                <SelectItem value="DISABILITY">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-orange-500" />
                    Seguro de Invalidez
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.type && (
              <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Data de Início</Label>
            <Input
              id="startDate"
              type="date"
              {...form.register('startDate')}
            />
            {form.formState.errors.startDate && (
              <p className="text-sm text-destructive">{form.formState.errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duração (meses)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              {...form.register('duration', { valueAsNumber: true })}
              placeholder="12"
            />
            {form.formState.errors.duration && (
              <p className="text-sm text-destructive">{form.formState.errors.duration.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="premium">Prêmio Mensal (R$)</Label>
            <Input
              id="premium"
              type="number"
              step="0.01"
              min="0"
              {...form.register('premium', { valueAsNumber: true })}
              placeholder="500.00"
            />
            {form.formState.errors.premium && (
              <p className="text-sm text-destructive">{form.formState.errors.premium.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="insuredValue">Valor Segurado (R$)</Label>
            <Input
              id="insuredValue"
              type="number"
              step="0.01"
              min="0"
              {...form.register('insuredValue', { valueAsNumber: true })}
              placeholder="1000000.00"
            />
            {form.formState.errors.insuredValue && (
              <p className="text-sm text-destructive">{form.formState.errors.insuredValue.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteInsuranceDialog({ insurance, onDelete }: InsuranceDialogsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!insurance || !onDelete) return;
    
    setIsLoading(true);
    try {
      await onDelete(insurance.id);
      toast.success('Seguro deletado com sucesso!');
      setOpen(false);
    } catch (error) {
      toast.error('Erro ao deletar seguro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar Seguro</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar o seguro "{insurance?.name}"? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Deletando...' : 'Deletar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
