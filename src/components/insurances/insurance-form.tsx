'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const insuranceSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    type: z.enum(['life', 'disability']),
    startDate: z.string().min(1, 'Data de início é obrigatória'),
    duration: z.string().min(1, 'Duração é obrigatória'),
    premium: z.string().min(1, 'Prêmio é obrigatório'),
    insuredValue: z.string().min(1, 'Valor segurado é obrigatório'),
});

type InsuranceFormData = z.infer<typeof insuranceSchema>;

interface InsuranceFormProps {
    onSubmit: (data: InsuranceFormData) => void;
    defaultValues?: Partial<InsuranceFormData>;
}

export function InsuranceForm({ onSubmit, defaultValues }: InsuranceFormProps) {
    const form = useForm<InsuranceFormData>({
        resolver: zodResolver(insuranceSchema),
        defaultValues,
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Adicionar Seguro</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Seguro</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do seguro" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="life">Vida</SelectItem>
                                            <SelectItem value="disability">Invalidez</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Início</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duração (meses)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="12" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="premium"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prêmio (mensal)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$ 0,00" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="insuredValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor Segurado</FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$ 0,00" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Salvar
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}