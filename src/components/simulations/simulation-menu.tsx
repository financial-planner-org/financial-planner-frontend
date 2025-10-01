'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { SimulationEditModal } from '@/components/modals/simulation-edit-modal';
import { SimulationVersionModal } from '@/components/modals/simulation-version-modal';
import { SimulationAddModal } from '@/components/modals/simulation-add-modal';
import { MoreVertical, Edit, Copy, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Simulation {
  id: number;
  name: string;
  startDate: string;
  realRate: number;
  isCurrentSituation?: boolean;
  isLegacy?: boolean;
}

interface SimulationMenuProps {
  simulation: Simulation;
  onEdit: (data: { name: string; startDate: Date; realRate: number }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onCreateVersion: (data: { name: string; startDate: Date; realRate: number }) => Promise<void>;
  onCreateNew: (data: {
    name: string;
    startDate: Date;
    realRate: number;
    baseSimulationId?: number;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function SimulationMenu({
  simulation,
  onEdit,
  onDelete,
  onCreateVersion,
  onCreateNew,
  isLoading = false,
}: SimulationMenuProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async (data: { name: string; startDate: Date; realRate: number }) => {
    try {
      await onEdit(data);
      setIsEditModalOpen(false);
      toast.success('Simulação editada com sucesso!');
    } catch (error) {
      toast.error('Erro ao editar simulação. Tente novamente.');
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(simulation.id);
      setIsDeleteDialogOpen(false);
      toast.success('Simulação deletada com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar simulação. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateVersion = async (data: { name: string; startDate: Date; realRate: number }) => {
    try {
      await onCreateVersion(data);
      setIsVersionModalOpen(false);
      toast.success('Nova versão criada com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar nova versão. Tente novamente.');
    }
  };

  const handleCreateNew = async (data: {
    name: string;
    startDate: Date;
    realRate: number;
    baseSimulationId?: number;
  }) => {
    try {
      await onCreateNew(data);
      setIsAddModalOpen(false);
      toast.success('Nova simulação criada com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar nova simulação. Tente novamente.');
    }
  };

  const canEdit = !simulation.isCurrentSituation && !simulation.isLegacy;
  const canDelete = !simulation.isCurrentSituation && !simulation.isLegacy;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {canEdit && (
            <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
              <Edit className='mr-2 h-4 w-4' />
              Editar Simulação
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => setIsVersionModalOpen(true)}>
            <Copy className='mr-2 h-4 w-4' />
            Criar Nova Versão
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsAddModalOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Adicionar Simulação
          </DropdownMenuItem>

          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className='text-destructive'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Deletar Simulação
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modais */}
      <SimulationEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        simulation={simulation}
        onSave={handleEdit}
        isLoading={isLoading}
      />

      <SimulationVersionModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        baseSimulation={simulation}
        onSave={handleCreateVersion}
        isLoading={isLoading}
      />

      <SimulationAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        baseSimulation={simulation}
        onSave={handleCreateNew}
        isLoading={isLoading}
      />

      {/* Dialog de confirmação para deletar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar a simulação "{simulation.name}"? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {isDeleting ? 'Deletando...' : 'Deletar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
