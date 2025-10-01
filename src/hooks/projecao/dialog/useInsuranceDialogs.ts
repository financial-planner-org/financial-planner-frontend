'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useDialog, useConfirmationDialog } from '../../common/ui/useDialog';

// Schema de validação
const insuranceSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['LIFE', 'DISABILITY']),
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
  duration: number;
  premium: number;
  insuredValue: number;
}

interface UseInsuranceDialogsProps {
  insurance?: Insurance;
  onAdd?: (data: InsuranceData) => Promise<void>;
  onUpdate?: (id: number, data: InsuranceData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

/**
 * Hook para controle de dialogs de seguro na página de projeção
 */
export function useInsuranceDialogs({
  insurance,
  onAdd,
  onUpdate,
  onDelete,
}: UseInsuranceDialogsProps) {
  // Estados dos dialogs
  const addDialog = useDialog();
  const editDialog = useDialog();
  const deleteDialog = useConfirmationDialog();

  // Estados de loading
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Formulários
  const addForm = useForm<InsuranceData>({
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

  const editForm = useForm<InsuranceData>({
    resolver: zodResolver(insuranceSchema),
    defaultValues: {
      name: insurance?.name || '',
      type: insurance?.type || 'LIFE',
      startDate: insurance?.startDate
        ? new Date(insurance.startDate).toISOString().split('T')[0]
        : '',
      duration: insurance?.duration || 12,
      premium: insurance?.premium || 0,
      insuredValue: insurance?.insuredValue || 0,
    },
  });

  // Handlers
  const handleAdd = async (data: InsuranceData) => {
    if (!onAdd) return;

    setIsAddLoading(true);
    try {
      await onAdd(data);
      toast.success('Seguro adicionado com sucesso!');
      addDialog.closeDialog();
      addForm.reset();
    } catch (error) {
      toast.error('Erro ao adicionar seguro');
    } finally {
      setIsAddLoading(false);
    }
  };

  const handleEdit = async (data: InsuranceData) => {
    if (!insurance || !onUpdate) return;

    setIsEditLoading(true);
    try {
      await onUpdate(insurance.id, data);
      toast.success('Seguro atualizado com sucesso!');
      editDialog.closeDialog();
      editForm.reset();
    } catch (error) {
      toast.error('Erro ao atualizar seguro');
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!insurance || !onDelete) return;

    setIsDeleteLoading(true);
    try {
      await onDelete(insurance.id);
      toast.success('Seguro deletado com sucesso!');
      deleteDialog.closeDialog();
    } catch (error) {
      toast.error('Erro ao deletar seguro');
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
