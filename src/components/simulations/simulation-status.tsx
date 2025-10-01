'use client';

import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle, Info, Lock } from 'lucide-react';

interface SimulationStatusProps {
  isCurrentSituation?: boolean;
  isLegacy?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function SimulationStatus({
  isCurrentSituation = false,
  isLegacy = false,
  canEdit = true,
  canDelete = true,
}: SimulationStatusProps) {
  if (isCurrentSituation) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant='default' className='bg-blue-500 hover:bg-blue-500'>
              <Info className='w-3 h-3 mr-1' />
              Situação Atual
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Esta é a simulação da situação atual. Não pode ser editada ou deletada.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (isLegacy) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge
              variant='outline'
              className='border-orange-500 text-orange-500 hover:bg-orange-50'
            >
              <AlertTriangle className='w-3 h-3 mr-1' />
              Versão Legada
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Versão legada - não editável. Você pode criar uma nova simulação a partir desta
              versão.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (!canEdit || !canDelete) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant='outline' className='border-gray-500 text-gray-500'>
              <Lock className='w-3 h-3 mr-1' />
              Protegida
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Esta simulação está protegida contra edição ou exclusão.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Badge variant='secondary' className='bg-green-100 text-green-700'>
      Editável
    </Badge>
  );
}
