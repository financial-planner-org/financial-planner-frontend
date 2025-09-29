'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { useSimulations } from '@/hooks/api/use-simulations';
import { useInsurances } from '@/hooks/api/use-insurances';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, MoreVertical, Edit, Trash2, Shield, Heart, AlertTriangle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function SegurosPage() {
  const { data: simulations = [] } = useSimulations();
  const [selectedSimulation, setSelectedSimulation] = useState<string>('');

  const {
    data: insurances = [],
    isLoading: isLoadingInsurances
  } = useInsurances(Number(selectedSimulation));

  const handleEditInsurance = (id: string) => {
    console.log('Editar seguro:', id);
  };

  const handleDeleteInsurance = (id: string) => {
    console.log('Deletar seguro:', id);
  };

  return (
    <PageContainer
      title="Seguros"
      description="Gerencie seguros de vida e invalidez"
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
              Adicionar Seguro
            </Button>
          </div>
        </div>
      </Section>

      {/* Seguros */}
      {selectedSimulation && (
        <Section title="Seguros">
          <div className="space-y-4">
            {/* Mock data - será substituído por dados reais da API */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <CardTitle>Seguro de Vida</CardTitle>
                    <Badge variant="default">Vida</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditInsurance('1')}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteInsurance('1')}
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
                    <p className="text-sm text-muted-foreground">Valor Segurado</p>
                    <p className="font-medium">R$ 500.000,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prêmio Mensal</p>
                    <p className="font-medium">R$ 120,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duração</p>
                    <p className="font-medium">15 meses</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Início</p>
                    <p className="font-medium">01/01/2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <CardTitle>Seguro de Invalidez</CardTitle>
                    <Badge variant="secondary">Invalidez</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditInsurance('2')}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteInsurance('2')}
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
                    <p className="text-sm text-muted-foreground">Valor Segurado</p>
                    <p className="font-medium">R$ 100.000,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prêmio Mensal</p>
                    <p className="font-medium">R$ 300,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duração</p>
                    <p className="font-medium">5 meses</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Início</p>
                    <p className="font-medium">01/01/2025</p>
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