'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useDialog, useConfirmationDialog } from '../../common/ui/useDialog';

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
  type: 'FINANCIAL' | 'REAL_ESTATE';
  hasFinancing?: boolean;
  financingStartDate?: string;
  installments?: number;
  interestRate?: number;
  downPayment?: number;
}

interface UseAllocationDialogsProps {
  allocation?: Allocation;
  onAddFinancial?: (data: FinancialAllocationData) => Promise<void>;
  onAddImmovable?: (data: ImmovableAllocationData) => Promise<void>;
  onUpdate?: (id: number, data: UpdateAllocationData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

/**
 * Hook para controle de dialogs de alocação na página de alocações
 */
export function useAllocationDialogs({
  allocation,
  onAddFinancial,
  onAddImmovable,
  onUpdate,
  onDelete,
}: UseAllocationDialogsProps) {
  // Estados dos dialogs
  const addFinancialDialog = useDialog();
  const addImmovableDialog = useDialog();
  const updateDialog = useDialog();
  const deleteDialog = useConfirmationDialog();

  // Estados de loading
  const [isAddFinancialLoading, setIsAddFinancialLoading] = useState(false);
  const [isAddImmovableLoading, setIsAddImmovableLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Formulários
  const addFinancialForm = useForm<FinancialAllocationData>({
    resolver: zodResolver(financialAllocationSchema),
    defaultValues: {
      name: '',
      value: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  const addImmovableForm = useForm<ImmovableAllocationData>({
    resolver: zodResolver(immovableAllocationSchema),
    defaultValues: {
      name: '',
      value: 0,
      date: new Date().toISOString().split('T')[0],
      hasFinancing: false,
    },
  });

  const updateForm = useForm<UpdateAllocationData>({
    resolver: zodResolver(updateAllocationSchema),
    defaultValues: {
      value: allocation?.value || 0,
    },
  });

  // Handlers
  const handleAddFinancial = async (data: FinancialAllocationData) => {
    if (!onAddFinancial) return;

    setIsAddFinancialLoading(true);
    try {
      await onAddFinancial(data);
      toast.success('Alocação financeira adicionada com sucesso!');
      addFinancialDialog.closeDialog();
      addFinancialForm.reset();
    } catch (error) {
      toast.error('Erro ao adicionar alocação financeira');
    } finally {
      setIsAddFinancialLoading(false);
    }
  };

  const handleAddImmovable = async (data: ImmovableAllocationData) => {
    if (!onAddImmovable) return;

    setIsAddImmovableLoading(true);
    try {
      await onAddImmovable(data);
      toast.success('Alocação imobilizada adicionada com sucesso!');
      addImmovableDialog.closeDialog();
      addImmovableForm.reset();
    } catch (error) {
      toast.error('Erro ao adicionar alocação imobilizada');
    } finally {
      setIsAddImmovableLoading(false);
    }
  };

  const handleUpdate = async (data: UpdateAllocationData) => {
    if (!allocation || !onUpdate) return;

    setIsUpdateLoading(true);
    try {
      await onUpdate(allocation.id, data);
      toast.success('Alocação atualizada com sucesso!');
      updateDialog.closeDialog();
      updateForm.reset();
    } catch (error) {
      toast.error('Erro ao atualizar alocação');
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!allocation || !onDelete) return;

    setIsDeleteLoading(true);
    try {
      await onDelete(allocation.id);
      toast.success('Alocação deletada com sucesso!');
      deleteDialog.closeDialog();
    } catch (error) {
      toast.error('Erro ao deletar alocação');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return {
    // Add Financial Dialog
    addFinancialDialog: {
      ...addFinancialDialog,
      form: addFinancialForm,
      isLoading: isAddFinancialLoading,
      onSubmit: handleAddFinancial,
    },
    // Add Immovable Dialog
    addImmovableDialog: {
      ...addImmovableDialog,
      form: addImmovableForm,
      isLoading: isAddImmovableLoading,
      onSubmit: handleAddImmovable,
    },
    // Update Dialog
    updateDialog: {
      ...updateDialog,
      form: updateForm,
      isLoading: isUpdateLoading,
      onSubmit: handleUpdate,
    },
    // Delete Dialog
    deleteDialog: {
      ...deleteDialog,
      isLoading: isDeleteLoading,
      onConfirm: handleDelete,
    },
  };
}
