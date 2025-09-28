'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { ALLOCATIONS_CONFIG } from '@/lib/constants/pages';

interface AllocationCardProps {
    id: string;
    title: string;
    value: string;
    totalValue?: string;
    date?: string;
    dateRange?: string;
    progress?: string;
    progressValue?: number;
    progressTotal?: number;
    lastUpdate: string;
    hasWarning?: boolean;
    updateType?: string;
    badges: {
        type: 'financial' | 'immobilized' | 'financed';
        label: string;
    }[];
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
}

export function AllocationCard({
    id,
    title,
    value,
    totalValue,
    date,
    dateRange,
    progress,
    progressValue = 0,
    progressTotal = 100,
    lastUpdate,
    hasWarning = false,
    updateType,
    badges,
    onEdit,
    onView,
    onDelete,
    onUpdate
}: AllocationCardProps) {
    const progressPercentage = progressTotal > 0 ? (progressValue / progressTotal) * 100 : 0;

    return (
        <div className={ALLOCATIONS_CONFIG.allocationCard.container}>
            {/* Timeline dot */}
            <div className={ALLOCATIONS_CONFIG.allocationCard.timelineDot}>
                <div className={ALLOCATIONS_CONFIG.allocationCard.timelineLine}></div>
            </div>

            {/* Actions menu */}
            <div className={ALLOCATIONS_CONFIG.allocationCard.actions}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete(id)}
                            className="text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Deletar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Card content */}
            <div className="space-y-4">
                {/* Title and badges */}
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={ALLOCATIONS_CONFIG.allocationCard.title}>{title}</h3>
                    {badges.map((badge, index) => (
                        <div key={index} className={ALLOCATIONS_CONFIG.badges[badge.type]}>
                            <span className={ALLOCATIONS_CONFIG.badges[`${badge.type}Text`]}>
                                {badge.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Value and total value */}
                <div className="flex items-center gap-2">
                    <span className={ALLOCATIONS_CONFIG.allocationCard.value}>{value}</span>
                    {totalValue && (
                        <span className={ALLOCATIONS_CONFIG.allocationCard.totalValue}>
                            {totalValue}
                        </span>
                    )}
                </div>

                {/* Date information */}
                {date && (
                    <div className={ALLOCATIONS_CONFIG.allocationCard.date}>
                        Início: {date}
                    </div>
                )}

                {dateRange && (
                    <div className={ALLOCATIONS_CONFIG.allocationCard.dateRange}>
                        {dateRange}
                    </div>
                )}

                {/* Progress information */}
                {progress && (
                    <div className="space-y-2">
                        <div className={ALLOCATIONS_CONFIG.allocationCard.progress}>
                            {progress}
                        </div>
                        <div className={ALLOCATIONS_CONFIG.progressBar.container}>
                            <div
                                className={ALLOCATIONS_CONFIG.progressBar.fill}
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Update type */}
                {updateType && (
                    <div className={ALLOCATIONS_CONFIG.allocationCard.updateType}>
                        {updateType}
                    </div>
                )}

                {/* Last update with warning */}
                <div className="flex items-center gap-2">
                    {hasWarning && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                    <span className={hasWarning ? ALLOCATIONS_CONFIG.allocationCard.lastUpdateWarning : ALLOCATIONS_CONFIG.allocationCard.lastUpdate}>
                        {hasWarning ? 'A ' : ''}Última atualização: {lastUpdate}
                    </span>
                </div>

                {/* Update button */}
                <div className="flex justify-end">
                    <Button
                        onClick={() => onUpdate(id)}
                        className={ALLOCATIONS_CONFIG.allocationCard.updateButton}
                    >
                        <div className={ALLOCATIONS_CONFIG.allocationCard.updateButtonIcon}></div>
                        <span className={ALLOCATIONS_CONFIG.allocationCard.updateButtonText}>
                            Atualizar
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
