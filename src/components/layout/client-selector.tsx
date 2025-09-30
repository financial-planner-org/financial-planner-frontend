'use client';

import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClient } from '@/contexts/ClientContext';
import { useClients } from '@/hooks/api/use-clients';
import { cn } from '@/lib/utils';

/**
 * Seletor de Cliente - Usando ShadCN/UI padrão
 * 
 * Implementa o seletor de clientes com:
 * - Design dark mode usando ShadCN/UI
 * - Integração com ClientContext
 * - Estilo consistente com o design system
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
            <div className="h-10 w-48 animate-pulse rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                Carregando clientes...
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-10 w-48 rounded-md bg-destructive text-destructive-foreground flex items-center justify-center">
                Erro ao carregar clientes
            </div>
        );
    }

    if (!clients || clients.length === 0) {
        return (
            <div className="h-10 w-48 rounded-md bg-muted text-muted-foreground flex items-center justify-center">
                Nenhum cliente disponível
            </div>
        );
    }

    return (
        <Select
            value={selectedClientId?.toString() || ''}
            onValueChange={(value) => setSelectedClientId(Number(value))}
        >
            <SelectTrigger className="w-[200px] h-10">
                <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
                {clients.map((client) => (
                    <SelectItem
                        key={client.id}
                        value={client.id.toString()}
                    >
                        {client.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}


