'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ClientContextType {
    selectedClientId: number | null;
    setSelectedClientId: (id: number | null) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

    return (
        <ClientContext.Provider value={{ selectedClientId, setSelectedClientId }}>
            {children}
        </ClientContext.Provider>
    );
}

export function useClient() {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error('useClient must be used within a ClientProvider');
    }
    return context;
}
