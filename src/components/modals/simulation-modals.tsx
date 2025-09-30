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
import { toast } from 'sonner';
import { Calendar, Trash2, Copy, Edit3 } from 'lucide-react';

// Schemas de validação
const editSimulationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  realRate: z.number().min(0, 'Taxa deve ser positiva').max(100, 'Taxa deve ser menor que 100%'),
});

const createVersionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
});

const addSimulationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
});

type EditSimulationData = z.infer<typeof editSimulationSchema>;
type CreateVersionData = z.infer<typeof createVersionSchema>;
type AddSimulationData = z.infer<typeof addSimulationSchema>;

interface Simulation {
  id: number;
  name: string;
  startDate: string;
  realRate: number;
}

interface SimulationModalsProps {
  simulation?: Simulation;
  onEdit?: (data: EditSimulationData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  onCreateVersion?: (id: number, data: CreateVersionData) => Promise<void>;
  onAddSimulation?: (data: AddSimulationData) => Promise<void>;
  existingNames?: string[];
}

export function EditSimulationModal({ simulation, onEdit }: SimulationModalsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditSimulationData>({
    resolver: zodResolver(editSimulationSchema),
    defaultValues: {
      name: simulation?.name || '',
      startDate: simulation?.startDate ? new Date(simulation.startDate).toISOString().split('T')[0] : '',
      realRate: simulation?.realRate || 4,
    },
  });

  const onSubmit = async (data: EditSimulationData) => {
    if (!onEdit) return;
    
    setIsLoading(true);
    try {
      await onEdit(data);
      toast.success('Simulação editada com sucesso!');
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Erro ao editar simulação');
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
          <ModalTitle>Editar Simulação</ModalTitle>
          <ModalDescription>
            Altere as informações da simulação selecionada.
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Simulação</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Digite o nome da simulação"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
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
            <Label htmlFor="realRate">Taxa Real (% a.a.)</Label>
            <Input
              id="realRate"
              type="number"
              step="0.01"
              min="0"
              max="100"
              {...form.register('realRate', { valueAsNumber: true })}
              placeholder="4.00"
            />
            {form.formState.errors.realRate && (
              <p className="text-sm text-destructive">{form.formState.errors.realRate.message}</p>
            )}
          </div>

          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export function DeleteSimulationModal({ simulation, onDelete }: SimulationModalsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!simulation || !onDelete) return;
    
    setIsLoading(true);
    try {
      await onDelete(simulation.id);
      toast.success('Simulação deletada com sucesso!');
      setOpen(false);
    } catch (error) {
      toast.error('Erro ao deletar simulação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Deletar Simulação</ModalTitle>
          <ModalDescription>
            Tem certeza que deseja deletar a simulação "{simulation?.name}"? Esta ação não pode ser desfeita.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function CreateVersionModal({ simulation, onCreateVersion }: SimulationModalsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateVersionData>({
    resolver: zodResolver(createVersionSchema),
    defaultValues: {
      name: simulation?.name || '',
    },
  });

  const onSubmit = async (data: CreateVersionData) => {
    if (!simulation || !onCreateVersion) return;
    
    setIsLoading(true);
    try {
      await onCreateVersion(simulation.id, data);
      toast.success('Nova versão criada com sucesso!');
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Erro ao criar nova versão');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Copy className="h-4 w-4" />
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Criar Nova Versão</ModalTitle>
          <ModalDescription>
            Crie uma nova versão da simulação "{simulation?.name}" com o mesmo nome.
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Versão</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Digite o nome da versão"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Criar Versão'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export function AddSimulationModal({ onAddSimulation, existingNames = [] }: SimulationModalsProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddSimulationData>({
    resolver: zodResolver(addSimulationSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: AddSimulationData) => {
    if (!onAddSimulation) return;
    
    // Verificar se o nome já existe
    if (existingNames.includes(data.name)) {
      toast.error('Já existe uma simulação com este nome');
      return;
    }
    
    setIsLoading(true);
    try {
      await onAddSimulation(data);
      toast.success('Nova simulação criada com sucesso!');
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Erro ao criar nova simulação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Adicionar Simulação
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Adicionar Nova Simulação</ModalTitle>
          <ModalDescription>
            Crie uma nova simulação duplicando a simulação selecionada.
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Nova Simulação</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Digite o nome da nova simulação"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Criar Simulação'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
