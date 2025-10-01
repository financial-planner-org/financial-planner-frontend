'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useDialog, useConfirmationDialog } from '../../common/ui/useDialog';

// Schemas de validação
const movementSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE', 'DEPENDENT']),
  value: z.number().min(0, 'Valor deve ser positivo'),
  frequency: z.enum(['UNIQUE', 'MONTHLY', 'ANNUAL']),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

type MovementData = z.infer<typeof movementSchema>;

interface Movement {
  id: number;
  type: 'INCOME' | 'EXPENSE' | 'DEPENDENT';
  value: number;
  frequency: 'UNIQUE' | 'MONTHLY' | 'ANNUAL';
  startDate: string;
  endDate?: string;
  description?: string;
}

interface UseMovementDialogsProps {
  movement?: Movement;
  onAdd?: (data: MovementData) => Promise<void>;
  onUpdate?: (id: number, data: MovementData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

/**
 * Hook para controle de dialogs de movimentação na página de projeção
 */
export function useMovementDialogs({
  movement,
  onAdd,
  onUpdate,
  onDelete,
}: UseMovementDialogsProps) {
  // Estados dos dialogs
  const addDialog = useDialog();
  const editDialog = useDialog();
  const deleteDialog = useConfirmationDialog();

  // Estados de loading
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Formulários
  const addForm = useForm<MovementData>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      type: 'INCOME',
      value: 0,
      frequency: 'MONTHLY',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      description: '',
    },
  });

  const editForm = useForm<MovementData>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      type: movement?.type || 'INCOME',
      value: movement?.value || 0,
      frequency: movement?.frequency || 'MONTHLY',
      startDate: movement?.startDate
        ? new Date(movement.startDate).toISOString().split('T')[0]
        : '',
      endDate: movement?.endDate ? new Date(movement.endDate).toISOString().split('T')[0] : '',
      description: movement?.description || '',
    },
  });

  // Handlers
  const handleAdd = async (data: MovementData) => {
    if (!onAdd) return;

    setIsAddLoading(true);
    try {
      await onAdd(data);
      toast.success('Movimentação adicionada com sucesso!');
      addDialog.closeDialog();
      addForm.reset();
    } catch (error) {
      toast.error('Erro ao adicionar movimentação');
    } finally {
      setIsAddLoading(false);
    }
  };

  const handleEdit = async (data: MovementData) => {
    if (!movement || !onUpdate) return;

    setIsEditLoading(true);
    try {
      await onUpdate(movement.id, data);
      toast.success('Movimentação atualizada com sucesso!');
      editDialog.closeDialog();
      editForm.reset();
    } catch (error) {
      toast.error('Erro ao atualizar movimentação');
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!movement || !onDelete) return;

    setIsDeleteLoading(true);
    try {
      await onDelete(movement.id);
      toast.success('Movimentação deletada com sucesso!');
      deleteDialog.closeDialog();
    } catch (error) {
      toast.error('Erro ao deletar movimentação');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return {
    // Add Dialog
    addDialog: {
      ...addDialog,
      form: addForm,
      isLoading: isAddLoading,
      onSubmit: handleAdd,
    },
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
  };
}
