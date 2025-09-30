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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Edit3, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

// Schemas de validação
const movementSchema = z.object({
    type: z.enum(['INCOME', 'EXPENSE'], {
        required_error: 'Tipo é obrigatório',
    }),
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    value: z.number().min(0, 'Valor deve ser positivo'),
    frequency: z.enum(['UNIQUE', 'MONTHLY', 'ANNUAL'], {
        required_error: 'Frequência é obrigatória',
    }),
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    endDate: z.string().optional(),
});

type MovementData = z.infer<typeof movementSchema>;

interface Movement {
    id: number;
    type: 'INCOME' | 'EXPENSE';
    title: string;
    description?: string;
    value: number;
    frequency: 'UNIQUE' | 'MONTHLY' | 'ANNUAL';
    startDate: string;
    endDate?: string;
}

interface MovementDialogsProps {
    movement?: Movement;
    onAdd?: (data: MovementData) => Promise<void>;
    onEdit?: (id: number, data: MovementData) => Promise<void>;
    onDelete?: (id: number) => Promise<void>;
}

export function AddMovementDialog({ onAdd }: MovementDialogsProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<MovementData>({
        resolver: zodResolver(movementSchema),
        defaultValues: {
            type: 'INCOME',
            title: '',
            description: '',
            value: 0,
            frequency: 'UNIQUE',
            startDate: new Date().toISOString().split('T')[0],
            endDate: '',
        },
    });

    const onSubmit = async (data: MovementData) => {
        if (!onAdd) return;

        setIsLoading(true);
        try {
            await onAdd(data);
            toast.success('Movimentação adicionada com sucesso!');
            setOpen(false);
            form.reset();
        } catch (error) {
            toast.error('Erro ao adicionar movimentação');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Movimentação
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Movimentação</DialogTitle>
                    <DialogDescription>
                        Registre uma nova movimentação financeira (entrada ou saída).
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Select onValueChange={(value) => form.setValue('type', value as 'INCOME' | 'EXPENSE')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INCOME">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                            Entrada
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="EXPENSE">
                                        <div className="flex items-center gap-2">
                                            <TrendingDown className="h-4 w-4 text-red-500" />
                                            Saída
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {form.formState.errors.type && (
                                <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="frequency">Frequência</Label>
                            <Select onValueChange={(value) => form.setValue('frequency', value as 'UNIQUE' | 'MONTHLY' | 'ANNUAL')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a frequência" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UNIQUE">Única</SelectItem>
                                    <SelectItem value="MONTHLY">Mensal</SelectItem>
                                    <SelectItem value="ANNUAL">Anual</SelectItem>
                                </SelectContent>
                            </Select>
                            {form.formState.errors.frequency && (
                                <p className="text-sm text-destructive">{form.formState.errors.frequency.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            {...form.register('title')}
                            placeholder="Ex: Salário CLT"
                        />
                        {form.formState.errors.title && (
                            <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição (opcional)</Label>
                        <Textarea
                            id="description"
                            {...form.register('description')}
                            placeholder="Descrição adicional da movimentação"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="value">Valor (R$)</Label>
                        <Input
                            id="value"
                            type="number"
                            step="0.01"
                            min="0"
                            {...form.register('value', { valueAsNumber: true })}
                            placeholder="5000.00"
                        />
                        {form.formState.errors.value && (
                            <p className="text-sm text-destructive">{form.formState.errors.value.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                            <Label htmlFor="endDate">Data de Fim (opcional)</Label>
                            <Input
                                id="endDate"
                                type="date"
                                {...form.register('endDate')}
                            />
                        </div>
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

export function EditMovementDialog({ movement, onEdit }: MovementDialogsProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<MovementData>({
        resolver: zodResolver(movementSchema),
        defaultValues: {
            type: movement?.type || 'INCOME',
            title: movement?.title || '',
            description: movement?.description || '',
            value: movement?.value || 0,
            frequency: movement?.frequency || 'UNIQUE',
            startDate: movement?.startDate ? new Date(movement.startDate).toISOString().split('T')[0] : '',
            endDate: movement?.endDate ? new Date(movement.endDate).toISOString().split('T')[0] : '',
        },
    });

    const onSubmit = async (data: MovementData) => {
        if (!movement || !onEdit) return;

        setIsLoading(true);
        try {
            await onEdit(movement.id, data);
            toast.success('Movimentação editada com sucesso!');
            setOpen(false);
        } catch (error) {
            toast.error('Erro ao editar movimentação');
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
                    <DialogTitle>Editar Movimentação</DialogTitle>
                    <DialogDescription>
                        Edite as informações da movimentação selecionada.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Select
                                value={form.watch('type')}
                                onValueChange={(value) => form.setValue('type', value as 'INCOME' | 'EXPENSE')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INCOME">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                            Entrada
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="EXPENSE">
                                        <div className="flex items-center gap-2">
                                            <TrendingDown className="h-4 w-4 text-red-500" />
                                            Saída
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="frequency">Frequência</Label>
                            <Select
                                value={form.watch('frequency')}
                                onValueChange={(value) => form.setValue('frequency', value as 'UNIQUE' | 'MONTHLY' | 'ANNUAL')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a frequência" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UNIQUE">Única</SelectItem>
                                    <SelectItem value="MONTHLY">Mensal</SelectItem>
                                    <SelectItem value="ANNUAL">Anual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            {...form.register('title')}
                            placeholder="Ex: Salário CLT"
                        />
                        {form.formState.errors.title && (
                            <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição (opcional)</Label>
                        <Textarea
                            id="description"
                            {...form.register('description')}
                            placeholder="Descrição adicional da movimentação"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="value">Valor (R$)</Label>
                        <Input
                            id="value"
                            type="number"
                            step="0.01"
                            min="0"
                            {...form.register('value', { valueAsNumber: true })}
                            placeholder="5000.00"
                        />
                        {form.formState.errors.value && (
                            <p className="text-sm text-destructive">{form.formState.errors.value.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                            <Label htmlFor="endDate">Data de Fim (opcional)</Label>
                            <Input
                                id="endDate"
                                type="date"
                                {...form.register('endDate')}
                            />
                        </div>
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

export function DeleteMovementDialog({ movement, onDelete }: MovementDialogsProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!movement || !onDelete) return;

        setIsLoading(true);
        try {
            await onDelete(movement.id);
            toast.success('Movimentação deletada com sucesso!');
            setOpen(false);
        } catch (error) {
            toast.error('Erro ao deletar movimentação');
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
                    <DialogTitle>Deletar Movimentação</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja deletar a movimentação "{movement?.title}"? Esta ação não pode ser desfeita.
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
