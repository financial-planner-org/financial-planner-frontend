'use client';

import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LegacyWarningProps {
    isLegacy?: boolean;
    isCurrentSituation?: boolean;
    className?: string;
}

export function LegacyWarning({ isLegacy, isCurrentSituation, className = '' }: LegacyWarningProps) {
    if (!isLegacy && !isCurrentSituation) {
        return null;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Badge
                        variant={isCurrentSituation ? "secondary" : "destructive"}
                        className={`flex items-center gap-1 ${className}`}
                    >
                        <AlertTriangle className="h-3 w-3" />
                        {isCurrentSituation ? 'Situação Atual' : 'Versão Legada'}
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="max-w-xs">
                        {isCurrentSituation ? (
                            <p>
                                <strong>Situação Atual:</strong><br />
                                Esta simulação não pode ser editada ou deletada.
                                Ela representa o estado atual do patrimônio.
                            </p>
                        ) : (
                            <p>
                                <strong>Versão Legada:</strong><br />
                                Esta é uma versão antiga e não pode ser editada.
                                Você pode criar uma nova simulação a partir desta versão.
                            </p>
                        )}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default LegacyWarning;
