'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { useSimulations } from '@/hooks/api/use-simulations';
import { useMovements } from '@/hooks/api/use-movements';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, MoreVertical, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function MovimentacoesPage() {
    const { data: simulations = [] } = useSimulations();
    const [selectedSimulation, setSelectedSimulation] = useState<string>('');

    const {
        data: movements = [],
        isLoading: isLoadingMovements
    } = useMovements(Number(selectedSimulation));

    const handleEditMovement = (id: string) => {
        console.log('Editar movimentação:', id);
    };

    const handleDeleteMovement = (id: string) => {
        console.log('Deletar movimentação:', id);
    };

    return (
        <PageContainer
            title="Movimentações"
            description="Gerencie entradas e saídas financeiras"
        >
            {/* Controles */}
            <Section title="Controles">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Select value={selectedSimulation} onValueChange={setSelectedSimulation}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma simulação" />
                            </SelectTrigger>
                            <SelectContent>
                                {simulations.map((simulation) => (
                                    <SelectItem key={simulation.id} value={simulation.id.toString()}>
                                        {simulation.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Adicionar Movimentação
                    </Button>
                </div>
            </Section>

            {/* Resumo */}
            <Section title="Resumo">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Entradas</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                R$ {movements
                                    .filter(m => m.type === 'ENTRADA')
                                    .reduce((sum, m) => sum + m.value, 0)
                                    .toLocaleString('pt-BR')}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saídas</CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                R$ {movements
                                    .filter(m => m.type === 'SAIDA')
                                    .reduce((sum, m) => sum + m.value, 0)
                                    .toLocaleString('pt-BR')}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${movements.reduce((sum, m) =>
                                sum + (m.type === 'ENTRADA' ? m.value : -m.value), 0
                            ) >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                R$ {movements
                                    .reduce((sum, m) =>
                                        sum + (m.type === 'ENTRADA' ? m.value : -m.value), 0
                                    )
                                    .toLocaleString('pt-BR')}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            {/* Lista de Movimentações */}
            <Section title="Movimentações">
                {isLoadingMovements ? (
                    <div className="text-center py-8">
                        <div className="text-gray-500">Carregando movimentações...</div>
                    </div>
                ) : movements.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-gray-500">Nenhuma movimentação encontrada</div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {movements.map((movement) => (
                            <Card key={movement.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Badge
                                                    variant={movement.type === 'ENTRADA' ? 'default' : 'destructive'}
                                                    className={movement.type === 'ENTRADA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                                                >
                                                    {movement.type === 'ENTRADA' ? 'Entrada' : 'Saída'}
                                                </Badge>
                                                <span className="font-medium">{`${movement.type} - R$ ${movement.value.toLocaleString('pt-BR')}`}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <div>Valor: R$ {movement.value.toLocaleString('pt-BR')}</div>
                                                <div>Frequência: {movement.frequency}</div>
                                                <div>Data de Início: {new Date(movement.startDate).toLocaleDateString('pt-BR')}</div>
                                                {movement.endDate && (
                                                    <div>Data de Fim: {new Date(movement.endDate).toLocaleDateString('pt-BR')}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-right">
                                                <div className={`text-lg font-bold ${movement.type === 'ENTRADA' ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {movement.type === 'ENTRADA' ? '+' : '-'} R$ {movement.value.toLocaleString('pt-BR')}
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditMovement(movement.id.toString())}>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteMovement(movement.id.toString())}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Excluir
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </Section>
        </PageContainer>
    );
}
