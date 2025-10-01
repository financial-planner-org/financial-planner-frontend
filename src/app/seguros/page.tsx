'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSimulations } from '@/hooks/api/useSimulations';
import { useInsurances } from '@/hooks/api/useInsurances';
import { InsuranceAddModal } from '@/components/modals/insurance-add-modal';
import {
    MoreVertical,
    Plus,
    Shield,
    Edit,
    Trash2,
    Calendar,
    DollarSign,
    Clock,
    Heart,
    Home,
    Car,
    FileText
} from 'lucide-react';
import { toast } from 'sonner';

// Tipos para seguros
interface Insurance {
    id: number;
    simulationId: number;
    name: string;
    type: 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO';
    startDate: string;
    durationMonths: number;
    premium: number;
    insuredValue: number;
    createdAt: string;
    updatedAt: string;
}

// Usar o tipo da API
import type { Simulation } from '@/lib/types/api';

// Componente de card de seguro
function InsuranceCard({
    insurance,
    onEdit,
    onDelete
}: {
    insurance: Insurance;
    onEdit: (insurance: Insurance) => void;
    onDelete: (insurance: Insurance) => void;
}) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'VIDA': return <Heart className="w-4 h-4 text-red-400" />;
            case 'RESIDENCIAL': return <Home className="w-4 h-4 text-blue-400" />;
            case 'AUTOMOVEL': return <Car className="w-4 h-4 text-green-400" />;
            default: return <FileText className="w-4 h-4 text-gray-400" />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'VIDA': return 'Vida';
            case 'RESIDENCIAL': return 'Residencial';
            case 'AUTOMOVEL': return 'Automóvel';
            case 'OUTRO': return 'Outro';
            default: return type;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'VIDA': return 'bg-red-400/10 text-red-400 border-red-400/20';
            case 'RESIDENCIAL': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
            case 'AUTOMOVEL': return 'bg-green-400/10 text-green-400 border-green-400/20';
            default: return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
        }
    };

    // Calcular data de término
    const endDate = new Date(insurance.startDate);
    endDate.setMonth(endDate.getMonth() + insurance.durationMonths);

    // Calcular total pago
    const totalPaid = insurance.premium * insurance.durationMonths;

    return (
        <Card className="bg-[#101010] border-[#434343] shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                            {getTypeIcon(insurance.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-[#9F9F9F] font-medium text-lg truncate">
                                    {insurance.name}
                                </h3>
                                <Badge
                                    className={`text-xs ${getTypeColor(insurance.type)}`}
                                >
                                    {getTypeLabel(insurance.type)}
                                </Badge>
                            </div>

                            <div className="space-y-1 text-sm text-[#B1B1B1]">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="font-semibold text-lg text-[#9F9F9F]">
                                        {formatCurrency(insurance.insuredValue)}
                                    </span>
                                    <span className="text-[#B1B1B1]">valor segurado</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-[#B1B1B1]">
                                        Prêmio: {formatCurrency(insurance.premium)}/mês
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {formatDate(insurance.startDate)} - {formatDate(endDate.toISOString())}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>
                                        {insurance.durationMonths} meses ({Math.floor(insurance.durationMonths / 12)} anos)
                                    </span>
                                </div>

                                <div className="text-[#9F9F9F] font-medium">
                                    Total a pagar: {formatCurrency(totalPaid)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 ml-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#9F9F9F] hover:text-[#B1B1B1] hover:bg-[#434343] opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#434343] border-[#454545] text-[#9F9F9F]">
                                <DropdownMenuItem
                                    onClick={() => onEdit(insurance)}
                                    className="hover:bg-[#454545]"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onDelete(insurance)}
                                    className="text-red-400 hover:bg-[#454545]"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Deletar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function SegurosPage() {
    const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
    const [filterType, setFilterType] = useState<'TODOS' | 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO'>('TODOS');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { data: simulations = [] } = useSimulations();
    const { data: insurances = [], isLoading: isLoadingInsurances } = useInsurances(selectedSimulation?.id);

    // Filtrar apenas simulações ativas
    const activeSimulations = simulations.filter(sim =>
        sim.status === 'ATIVO' && !sim.isLegacy
    );

    // Filtrar seguros
    const filteredInsurances = insurances.filter(insurance => {
        if (filterType !== 'TODOS' && insurance.type !== filterType) return false;
        return true;
    });

    const handleSimulationSelect = (simulationId: string) => {
        const simulation = activeSimulations.find(sim => sim.id === Number(simulationId));
        setSelectedSimulation(simulation || null);
    };

    const handleAddInsurance = () => {
        if (!selectedSimulation) {
            toast.error('Selecione uma simulação primeiro');
            return;
        }
        setIsAddModalOpen(true);
    };

    const handleEditInsurance = () => {
        // TODO: Implementar modal de editar seguro
        toast.info('Funcionalidade em desenvolvimento');
    };

    const handleDeleteInsurance = () => {
        // TODO: Implementar confirmação e deletar seguro
        toast.info('Funcionalidade em desenvolvimento');
    };

    // Calcular totais
    const totalInsuredValue = filteredInsurances.reduce((sum, insurance) => sum + insurance.insuredValue, 0);
    const totalMonthlyPremium = filteredInsurances.reduce((sum, insurance) => sum + insurance.premium, 0);
    const totalInsurances = filteredInsurances.length;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="min-h-screen bg-[#101010] p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header da página */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-[#9F9F9F] text-xl sm:text-2xl md:text-3xl font-semibold font-['Inter'] leading-tight mb-2">
                        Seguros
                    </h1>
                    <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
                        Gerencie os seguros das simulações
                    </p>
                </div>

                {/* Controles */}
                <Card className="bg-[#101010] border-[#434343] shadow-xl mb-6">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 sm:gap-6">
                            <div className="flex-1">
                                <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl md:text-2xl font-semibold font-['Inter'] leading-tight mb-2">
                                    Configurações
                                </CardTitle>
                                <p className="text-[#B1B1B1] text-sm sm:text-base font-normal font-['ABeeZee'] leading-relaxed">
                                    Selecione a simulação e configure os filtros
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full xl:w-auto">
                                <Button
                                    onClick={handleAddInsurance}
                                    className="w-full sm:w-auto h-10 px-4 sm:px-6 py-3 bg-[#434343] hover:bg-[#454545] text-[#B1B1B1] rounded-[40px] inline-flex justify-center items-center gap-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="text-sm sm:text-base font-medium font-['ABeeZee'] leading-loose">
                                        Adicionar Seguro
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Seleção de Simulação */}
                            <div className="space-y-2">
                                <label className="text-[#9F9F9F] text-sm font-medium">Simulação</label>
                                <Select onValueChange={handleSimulationSelect}>
                                    <SelectTrigger className="bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors">
                                        <SelectValue placeholder="Selecione uma simulação" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#434343] border-[#454545]">
                                        {activeSimulations.map((simulation) => (
                                            <SelectItem
                                                key={simulation.id}
                                                value={simulation.id.toString()}
                                                className="text-[#9F9F9F] hover:bg-[#454545]"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {simulation.isCurrentSituation && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Situação Atual
                                                        </Badge>
                                                    )}
                                                    <span>{simulation.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Filtro por Tipo */}
                            <div className="space-y-2">
                                <label className="text-[#9F9F9F] text-sm font-medium">Tipo de Seguro</label>
                                <Select value={filterType} onValueChange={(value: 'TODOS' | 'VIDA' | 'RESIDENCIAL' | 'AUTOMOVEL' | 'OUTRO') => setFilterType(value)}>
                                    <SelectTrigger className="bg-[#434343] border-[#454545] text-[#9F9F9F] hover:bg-[#454545] transition-colors">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#434343] border-[#454545]">
                                        <SelectItem value="TODOS" className="text-[#9F9F9F] hover:bg-[#454545]">Todos</SelectItem>
                                        <SelectItem value="VIDA" className="text-[#9F9F9F] hover:bg-[#454545]">Vida</SelectItem>
                                        <SelectItem value="RESIDENCIAL" className="text-[#9F9F9F] hover:bg-[#454545]">Residencial</SelectItem>
                                        <SelectItem value="AUTOMOVEL" className="text-[#9F9F9F] hover:bg-[#454545]">Automóvel</SelectItem>
                                        <SelectItem value="OUTRO" className="text-[#9F9F9F] hover:bg-[#454545]">Outro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Resumo dos Seguros */}
                {selectedSimulation && (
                    <Card className="bg-[#101010] border-[#434343] shadow-xl mb-6">
                        <CardHeader>
                            <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl font-semibold font-['Inter'] leading-tight">
                                Resumo dos Seguros - {selectedSimulation.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-blue-400/10 rounded-lg border border-blue-400/20">
                                    <div className="text-blue-400 text-2xl font-bold">
                                        {totalInsurances}
                                    </div>
                                    <div className="text-[#9F9F9F] text-sm">Total de Seguros</div>
                                </div>

                                <div className="text-center p-4 bg-green-400/10 rounded-lg border border-green-400/20">
                                    <div className="text-green-400 text-2xl font-bold">
                                        {formatCurrency(totalInsuredValue)}
                                    </div>
                                    <div className="text-[#9F9F9F] text-sm">Valor Total Segurado</div>
                                </div>

                                <div className="text-center p-4 bg-orange-400/10 rounded-lg border border-orange-400/20">
                                    <div className="text-orange-400 text-2xl font-bold">
                                        {formatCurrency(totalMonthlyPremium)}
                                    </div>
                                    <div className="text-[#9F9F9F] text-sm">Prêmio Mensal Total</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Lista de Seguros */}
                <Card className="bg-[#101010] border-[#434343] shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-[#9F9F9F] text-lg sm:text-xl font-semibold font-['Inter'] leading-tight">
                            Seguros
                            {selectedSimulation && ` - ${selectedSimulation.name}`}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!selectedSimulation ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <Shield className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
                                    <p className="text-[#9F9F9F] text-lg font-medium">Selecione uma simulação</p>
                                    <p className="text-[#B1B1B1] text-sm">Escolha uma simulação para ver os seguros</p>
                                </div>
                            </div>
                        ) : isLoadingInsurances ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-[#434343] border-t-[#9F9F9F] rounded-full animate-spin"></div>
                                    <div className="text-[#9F9F9F] text-sm font-medium">Carregando seguros...</div>
                                </div>
                            </div>
                        ) : filteredInsurances.length === 0 ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <Shield className="w-16 h-16 text-[#9F9F9F] mx-auto mb-4" />
                                    <p className="text-[#9F9F9F] text-lg font-medium">Nenhum seguro encontrado</p>
                                    <p className="text-[#B1B1B1] text-sm">Adicione seu primeiro seguro</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredInsurances.map((insurance) => (
                                    <InsuranceCard
                                        key={insurance.id}
                                        insurance={insurance}
                                        onEdit={handleEditInsurance}
                                        onDelete={handleDeleteInsurance}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Modal */}
                {selectedSimulation && (
                    <InsuranceAddModal
                        simulationId={selectedSimulation.id}
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
