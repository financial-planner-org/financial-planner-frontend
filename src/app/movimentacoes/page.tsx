'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { useSimulations } from '@/hooks/api/use-simulations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, MoreVertical, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function MovimentacoesPage() {
  const { data: simulations = [] } = useSimulations();
  const [selectedSimulation, setSelectedSimulation] = useState<string>('');

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
            <label className="text-sm font-medium mb-2 block">Simulação</label>
            <Select value={selectedSimulation} onValueChange={setSelectedSimulation}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma simulação" />
              </SelectTrigger>
              <SelectContent>
                {simulations.map((simulation) => (
                  <SelectItem key={simulation.id} value={simulation.id}>
                    {simulation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Movimentação
            </Button>
          </div>
        </div>
      </Section>

      {/* Movimentações */}
      {selectedSimulation && (
        <Section title="Movimentações">
          <div className="space-y-4">
            {/* Mock data - será substituído por dados reais da API */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <CardTitle>Salário</CardTitle>
                    <Badge variant="default">Receita</Badge>
                    <Badge variant="outline">Mensal</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditMovement('1')}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteMovement('1')}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="font-medium text-green-600">R$ 15.000,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Período</p>
                    <p className="font-medium">01/01/2025 - 31/12/2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequência</p>
                    <p className="font-medium">Mensal</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Descrição</p>
                    <p className="font-medium">CLT: R$ 15.000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    <CardTitle>Custo de Vida</CardTitle>
                    <Badge variant="secondary">Despesa</Badge>
                    <Badge variant="outline">Mensal</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditMovement('2')}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteMovement('2')}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="font-medium text-red-600">R$ 8.000,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Período</p>
                    <p className="font-medium">01/01/2025 - 31/12/2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequência</p>
                    <p className="font-medium">Mensal</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Descrição</p>
                    <p className="font-medium">Despesas mensais</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      )}
    </PageContainer>
  );
}