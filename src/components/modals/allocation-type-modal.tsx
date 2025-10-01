'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Home, DollarSign } from 'lucide-react';

interface AllocationTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: 'FINANCEIRA' | 'IMOBILIZADA') => void;
}

export function AllocationTypeModal({ isOpen, onClose, onSelectType }: AllocationTypeModalProps) {
  const handleSelectType = (type: 'FINANCEIRA' | 'IMOBILIZADA') => {
    onSelectType(type);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#101010] border-[#434343] text-[#9F9F9F]">
        <DialogHeader>
          <DialogTitle className="text-[#9F9F9F] text-xl font-semibold">
            Selecionar Tipo de Alocação
          </DialogTitle>
          <DialogDescription className="text-[#B1B1B1]">
            Escolha o tipo de ativo que deseja adicionar à simulação.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <Card
            className="bg-[#434343] border-[#454545] hover:bg-[#454545] transition-colors cursor-pointer group"
            onClick={() => handleSelectType('FINANCEIRA')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-[#9F9F9F] text-lg group-hover:text-[#B1B1B1] transition-colors">
                    Alocação Financeira
                  </CardTitle>
                  <CardDescription className="text-[#B1B1B1] text-sm">
                    Ativos líquidos e investimentos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-[#B1B1B1] text-sm space-y-1">
                <li>• CDBs, LCIs, LCAs</li>
                <li>• Tesouro Direto</li>
                <li>• Fundos de investimento</li>
                <li>• Ações e ETFs</li>
                <li>• Conta corrente/poupança</li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className="bg-[#434343] border-[#454545] hover:bg-[#454545] transition-colors cursor-pointer group"
            onClick={() => handleSelectType('IMOBILIZADA')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Home className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-[#9F9F9F] text-lg group-hover:text-[#B1B1B1] transition-colors">
                    Alocação Imobilizada
                  </CardTitle>
                  <CardDescription className="text-[#B1B1B1] text-sm">
                    Bens físicos e imóveis
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-[#B1B1B1] text-sm space-y-1">
                <li>• Imóveis residenciais</li>
                <li>• Imóveis comerciais</li>
                <li>• Terrenos</li>
                <li>• Veículos</li>
                <li>• Outros bens físicos</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="p-4 bg-[#434343] rounded-lg border border-[#454545]">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-[#9F9F9F] mt-0.5" />
            <div>
              <p className="text-[#B1B1B1] text-sm font-medium">
                Dica: Alocações imobilizadas podem incluir financiamento
              </p>
              <p className="text-[#9F9F9F] text-xs mt-1">
                Para imóveis e veículos, você pode configurar parcelas, taxa de juros e valor de entrada.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-[#434343] border-[#454545] text-[#B1B1B1] hover:bg-[#454545]"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}