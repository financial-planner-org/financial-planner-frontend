'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useDialog, useConfirmationDialog } from '../../common/ui/useDialog';

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

interface UseSimulationDialogsProps {
  simulation?: Simulation;
  onEdit?: (data: EditSimulationData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  onCreateVersion?: (id: number, data: CreateVersionData) => Promise<void>;
  onAddSimulation?: (data: AddSimulationData) => Promise<void>;
  existingNames?: string[];
}

/**
 * Hook para controle de dialogs de simulação na página de projeção
 */
export function useSimulationDialogs({
  simulation,
  onEdit,
  onDelete,
  onCreateVersion,
  onAddSimulation,
  existingNames = [],
}: UseSimulationDialogsProps) {
  // Estados dos dialogs
  const editDialog = useDialog();
  const deleteDialog = useConfirmationDialog();
  const createVersionDialog = useDialog();
  const addSimulationDialog = useDialog();

  // Estados de loading
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isCreateVersionLoading, setIsCreateVersionLoading] = useState(false);
  const [isAddSimulationLoading, setIsAddSimulationLoading] = useState(false);

  // Formulários
  const editForm = useForm<EditSimulationData>({
    resolver: zodResolver(editSimulationSchema),
    defaultValues: {
      name: simulation?.name || '',
      startDate: simulation?.startDate
        ? new Date(simulation.startDate).toISOString().split('T')[0]
        : '',
      realRate: simulation?.realRate || 4,
    },
  });

  const createVersionForm = useForm<CreateVersionData>({
    resolver: zodResolver(createVersionSchema),
    defaultValues: {
      name: simulation?.name || '',
    },
  });

  const addSimulationForm = useForm<AddSimulationData>({
    resolver: zodResolver(addSimulationSchema),
    defaultValues: {
      name: '',
    },
  });

  // Handlers
  const handleEdit = async (data: EditSimulationData) => {
    if (!onEdit) return;

    setIsEditLoading(true);
    try {
      await onEdit(data);
      toast.success('Simulação editada com sucesso!');
      editDialog.closeDialog();
      editForm.reset();
    } catch (error) {
      toast.error('Erro ao editar simulação');
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!simulation || !onDelete) return;

    setIsDeleteLoading(true);
    try {
      await onDelete(simulation.id);
      toast.success('Simulação deletada com sucesso!');
      deleteDialog.closeDialog();
    } catch (error) {
      toast.error('Erro ao deletar simulação');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCreateVersion = async (data: CreateVersionData) => {
    if (!simulation || !onCreateVersion) return;

    setIsCreateVersionLoading(true);
    try {
      await onCreateVersion(simulation.id, data);
      toast.success('Nova versão criada com sucesso!');
      createVersionDialog.closeDialog();
      createVersionForm.reset();
    } catch (error) {
      toast.error('Erro ao criar nova versão');
    } finally {
      setIsCreateVersionLoading(false);
    }
  };

  const handleAddSimulation = async (data: AddSimulationData) => {
    if (!onAddSimulation) return;

    // Verificar se o nome já existe
    if (existingNames.includes(data.name)) {
      toast.error('Já existe uma simulação com este nome');
      return;
    }

    setIsAddSimulationLoading(true);
    try {
      await onAddSimulation(data);
      toast.success('Nova simulação criada com sucesso!');
      addSimulationDialog.closeDialog();
      addSimulationForm.reset();
    } catch (error) {
      toast.error('Erro ao criar nova simulação');
    } finally {
      setIsAddSimulationLoading(false);
    }
  };

  return {
    // Edit Dialog
    editDialog: {
      ...editDialog,
      form: editForm,
      isLoading: isEditLoading,
      onSubmit: handleEdit,
    },
    // Delete Dialog
    deleteDialog: {
      ...deleteDialog,
      isLoading: isDeleteLoading,
      onConfirm: handleDelete,
    },
    // Create Version Dialog
    createVersionDialog: {
      ...createVersionDialog,
      form: createVersionForm,
      isLoading: isCreateVersionLoading,
      onSubmit: handleCreateVersion,
    },
    // Add Simulation Dialog
    addSimulationDialog: {
      ...addSimulationDialog,
      form: addSimulationForm,
      isLoading: isAddSimulationLoading,
      onSubmit: handleAddSimulation,
    },
  };
}
