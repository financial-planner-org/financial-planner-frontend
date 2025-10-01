'use client';

import { useState } from 'react';
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
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useCreateMovement } from '@/hooks/api/useMovements';
import { toast } from 'sonner';

const movementAddSchema = z.object({
    type: z.enum(['ENTRADA', 'SAIDA'], { required_error: 'Tipo é obrigatório' }),
    value: z.number().min(0.01, 'Valor deve ser maior que zero'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    frequency: z.enum(['UNICA', 'MENSAL', 'ANUAL'], { required_error: 'Frequência é obrigatória' }),
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    endDate: z.string().optional(),
    category: z.string().optional(),
});

type MovementAddFormData = z.infer<typeof movementAddSchema>;

interface MovementAddModalProps {
    simulationId: number;
    isOpen: boolean;
    onClose: () => void;
}

export function MovementAddModal({ simulationId, isOpen, onClose }: MovementAddModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const createMovement = useCreateMovement();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<MovementAddFormData>({
        resolver: zodResolver(movementAddSchema),
        defaultValues: {
            type: 'ENTRADA',
            value: 0,
            description: '',
            frequency: 'UNICA',
            startDate: new Date().toISOString().split('T')[0],
            endDate: '',
            category: '',
        },
    });


    const onSubmit = async (data: MovementAddFormData) => {
        setIsLoading(true);
        try {
            await createMovement.mutateAsync({
                simulationId,
                type: data.type,
                value: data.value,
                description: data.description,
                frequency: data.frequency,
                startDate: data.startDate,
                endDate: data.frequency === 'UNICA' ? undefined : data.endDate,
                category: data.category || undefined,
            });

            toast.success('Movimentação adicionada com sucesso!');
            onClose();
            reset();
        } catch (error) {
            toast.error('Erro ao adicionar movimentação. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px] bg-[#101010] border-[#434343] text-[#9F9F9F]">
                <DialogHeader>
                    <DialogTitle className="text-[#9F9F9F] text-xl font-semibold">
                        Adicionar Movimentação
                    </DialogTitle>
                    <DialogDescription className="text-[#B1B1B1]">
                        Registre uma nova entrada ou saída financeira.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-[#9F9F9F] font-medium">
                                Tipo
                            </Label>
                            <Select
                                onValueChange={(value: 'ENTRADA' | 'SAIDA') => setValue('type', value)}
                                defaultValue="ENTRADA"
                            >
                                <SelectTrigger className="bg-[#434343] border-[#454545] text-[#B1B1B1]">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#434343] border-[#454545]">
                                    <SelectItem value="ENTRADA" className="text-[#B1B1B1] hover:bg-[#454545]">
                                        Entrada
                                    </SelectItem>
                                    <SelectItem value="SAIDA" className="text-[#B1B1B1] hover:bg-[#454545]">
                                        Saída
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-red-400 text-sm">{errors.type.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="frequency" className="text-[#9F9F9F] font-medium">
                                Frequência
                            </Label>
                            <Select
                                onValueChange={(value: 'UNICA' | 'MENSAL' | 'ANUAL') => {
                                    setValue('frequency', value);
                                }}
                                defaultValue="UNICA"
                            >
                                <SelectTrigger className="bg-[#434343] border-[#454545] text-[#B1B1B1]">
                                    <SelectValue placeholder="Selecione a frequência" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#434343] border-[#454545]">
                                    <SelectItem value="UNICA" className="text-[#B1B1B1] hover:bg-[#454545]">
                                        Única
                                    </SelectItem>
                                    <SelectItem value="MENSAL" className="text-[#B1B1B1] hover:bg-[#454545]">
                                        Mensal
                                    </SelectItem>
                                    <SelectItem value="ANUAL" className="text-[#B1B1B1] hover:bg-[#454545]">
                                        Anual
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.frequency && (
                                <p className="text-red-400 text-sm">{errors.frequency.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-[#9F9F9F] font-medium">
                            Descrição
                        </Label>
                        <Input
                            id="description"
                            {...register('description')}
                            className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
                            placeholder="Ex: Salário, Aluguel, Investimento..."
                        />
                        {errors.description && (
                            <p className="text-red-400 text-sm">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="value" className="text-[#9F9F9F] font-medium">
                            Valor (R$)
                        </Label>
                        <Input
                            id="value"
                            type="number"
                            step="0.01"
                            min="0.01"
                            {...register('value', { valueAsNumber: true })}
                            className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
                            placeholder="0,00"
                        />
                        {errors.value && (
                            <p className="text-red-400 text-sm">{errors.value.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-[#9F9F9F] font-medium">
                            Categoria (Opcional)
                        </Label>
                        <Input
                            id="category"
                            {...register('category')}
                            className="bg-[#434343] border-[#454545] text-[#B1B1B1] placeholder:text-[#9F9F9F] focus:border-[#9F9F9F]"
                            placeholder="Ex: Salário, Investimento, Despesa..."
                        />
                        {errors.category && (
                            <p className="text-red-400 text-sm">{errors.category.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate" className="text-[#9F9F9F] font-medium">
                                Data de Início
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                {...register('startDate')}
                                className="bg-[#434343] border-[#454545] text-[#B1B1B1] focus:border-[#9F9F9F]"
                            />
                            {errors.startDate && (
                                <p className="text-red-400 text-sm">{errors.startDate.message}</p>
                            )}
                        </div>

                        {watch('frequency') !== 'UNICA' && (
                            <div className="space-y-2">
                                <Label htmlFor="endDate" className="text-[#9F9F9F] font-medium">
                                    Data de Fim
                                </Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    {...register('endDate')}
                                    className="bg-[#434343] border-[#454545] text-[#B1B1B1] focus:border-[#9F9F9F]"
                                />
                                {errors.endDate && (
                                    <p className="text-red-400 text-sm">{errors.endDate.message}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="bg-[#434343] border-[#454545] text-[#B1B1B1] hover:bg-[#454545]"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#434343] hover:bg-[#454545] text-[#B1B1B1]"
                        >
                            {isLoading ? 'Adicionando...' : 'Adicionar Movimentação'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
