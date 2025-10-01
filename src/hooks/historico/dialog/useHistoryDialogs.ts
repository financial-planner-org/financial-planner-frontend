'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useDialog, useConfirmationDialog } from '../../common/ui/useDialog';

// Schemas de validação
const createVersionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
});

const createFromLegacySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
});

type CreateVersionData = z.infer<typeof createVersionSchema>;
type CreateFromLegacyData = z.infer<typeof createFromLegacySchema>;

interface HistorySimulation {
  id: number;
  clientName: string;
  simulationName: string;
  version: number;
  isLegacy: boolean;
  canEdit: boolean;
}

interface UseHistoryDialogsProps {
  simulation?: HistorySimulation;
  onCreateVersion?: (id: number, data: CreateVersionData) => Promise<void>;
  onCreateFromLegacy?: (id: number, data: CreateFromLegacyData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

/**
 * Hook para controle de dialogs de histórico de simulações
 */
export function useHistoryDialogs({
  simulation,
  onCreateVersion,
  onCreateFromLegacy,
  onDelete,
}: UseHistoryDialogsProps) {
  // Estados dos dialogs
  const createVersionDialog = useDialog();
  const createFromLegacyDialog = useDialog();
  const deleteDialog = useConfirmationDialog();

  // Estados de loading
  const [isCreateVersionLoading, setIsCreateVersionLoading] = useState(false);
  const [isCreateFromLegacyLoading, setIsCreateFromLegacyLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Formulários
  const createVersionForm = useForm<CreateVersionData>({
    resolver: zodResolver(createVersionSchema),
    defaultValues: {
      name: simulation?.simulationName || '',
    },
  });

  const createFromLegacyForm = useForm<CreateFromLegacyData>({
    resolver: zodResolver(createFromLegacySchema),
    defaultValues: {
      name: '',
    },
  });

  // Handlers
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

  const handleCreateFromLegacy = async (data: CreateFromLegacyData) => {
    if (!simulation || !onCreateFromLegacy) return;

    setIsCreateFromLegacyLoading(true);
    try {
      await onCreateFromLegacy(simulation.id, data);
      toast.success('Nova simulação criada a partir da versão legada!');
      createFromLegacyDialog.closeDialog();
      createFromLegacyForm.reset();
    } catch (error) {
      toast.error('Erro ao criar nova simulação');
    } finally {
      setIsCreateFromLegacyLoading(false);
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

  return {
    // Create Version Dialog
    createVersionDialog: {
      ...createVersionDialog,
      form: createVersionForm,
      isLoading: isCreateVersionLoading,
      onSubmit: handleCreateVersion,
    },
    // Create From Legacy Dialog
    createFromLegacyDialog: {
      ...createFromLegacyDialog,
      form: createFromLegacyForm,
      isLoading: isCreateFromLegacyLoading,
      onSubmit: handleCreateFromLegacy,
    },
    // Delete Dialog
    deleteDialog: {
      ...deleteDialog,
      isLoading: isDeleteLoading,
      onConfirm: handleDelete,
    },
  };
}
