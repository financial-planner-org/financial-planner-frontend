'use client';

import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClient } from '@/contexts/ClientContext';
import { useClients } from '@/hooks/api/use-clients';
import { cn } from '@/lib/utils';

/**
 * Seletor de Cliente - Conforme Design do Figma
 * 
 * Implementa o seletor de clientes com:
 * - Design dark mode conforme Figma
 * - Integração com ClientContext
 * - Gradiente laranja-amarelo conforme design
 */
export function ClientSelector() {
    const { selectedClientId, setSelectedClientId } = useClient();
    const { data: clients, isLoading, error } = useClients();

    useEffect(() => {
        if (clients && clients.length > 0 && selectedClientId === null) {
            setSelectedClientId(clients[0].id);
        }
    }, [clients, selectedClientId, setSelectedClientId]);

    if (isLoading) {
        return (
            <div className="h-10 w-48 animate-pulse rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                Carregando clientes...
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-10 w-48 rounded-full bg-red-800 text-white flex items-center justify-center">
                Erro ao carregar clientes
            </div>
        );
    }

    if (!clients || clients.length === 0) {
        return (
            <div className="h-10 w-48 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center">
                Nenhum cliente disponível
            </div>
        );
    }

    return (
        <Select
            value={selectedClientId?.toString() || ''}
            onValueChange={(value) => setSelectedClientId(Number(value))}
        >
            <SelectTrigger
                className={cn(
                    "w-[200px] h-10 rounded-full border-2 border-transparent",
                    "bg-gradient-to-r from-orange-500 to-yellow-500",
                    "text-white font-medium",
                    "hover:from-orange-600 hover:to-yellow-600",
                    "focus:ring-2 focus:ring-offset-2 focus:ring-orange-500",
                    "data-[state=open]:from-orange-600 data-[state=open]:to-yellow-600"
                )}
            >
                <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-700 text-white">
                {clients.map((client) => (
                    <SelectItem
                        key={client.id}
                        value={client.id.toString()}
                        className="focus:bg-gray-800 focus:text-white"
                    >
                        {client.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}


