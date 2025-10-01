// ============================================================================
// HOOKS CENTRALIZADOS - FINANCIAL PLANNER
// ============================================================================
// Centraliza todos os hooks customizados para gerenciamento de estado

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    SimulationService, 
    AllocationService, 
    MovementService, 
    InsuranceService, 
    ClientService 
} from '../services';
import { CACHE_CONFIG } from '../constants/api';

// ============================================================================
// HOOKS DE SIMULAÇÕES
// ============================================================================

export const useSimulations = () => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.simulations],
        queryFn: SimulationService.getAll,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useSimulation = (id: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.simulations, id],
        queryFn: () => SimulationService.getById(id),
        enabled: !!id,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useCreateSimulation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: SimulationService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.simulations] });
        }
    });
};

export const useUpdateSimulation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => 
            SimulationService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.simulations] });
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.simulations, id] });
        }
    });
};

export const useDeleteSimulation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: SimulationService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.simulations] });
        }
    });
};

export const useDuplicateSimulation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: SimulationService.duplicate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.simulations] });
        }
    });
};

export const useCreateSimulationVersion = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: SimulationService.createVersion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.simulations] });
        }
    });
};

export const useProjections = (simulationId: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.projections, simulationId],
        queryFn: () => SimulationService.getProjections(simulationId),
        enabled: !!simulationId,
        staleTime: CACHE_CONFIG.ttl.short,
        gcTime: CACHE_CONFIG.ttl.medium
    });
};

// ============================================================================
// HOOKS DE ALOÇÕES
// ============================================================================

export const useAllocations = () => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.allocations],
        queryFn: AllocationService.getAll,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useAllocation = (id: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.allocations, id],
        queryFn: () => AllocationService.getById(id),
        enabled: !!id,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useCreateAllocation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: AllocationService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.allocations] });
        }
    });
};

export const useUpdateAllocation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => 
            AllocationService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.allocations] });
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.allocations, id] });
        }
    });
};

export const useDeleteAllocation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: AllocationService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.allocations] });
        }
    });
};

export const useAllocationRecords = (allocationId: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.allocations, allocationId, 'records'],
        queryFn: () => AllocationService.getRecords(allocationId),
        enabled: !!allocationId,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useUpdateAllocationRecord = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, recordId, data }: { id: string; recordId: string; data: any }) => 
            AllocationService.updateRecord(id, recordId, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.allocations, id, 'records'] });
        }
    });
};

// ============================================================================
// HOOKS DE MOVIMENTAÇÕES
// ============================================================================

export const useMovements = () => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.movements],
        queryFn: MovementService.getAll,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useMovement = (id: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.movements, id],
        queryFn: () => MovementService.getById(id),
        enabled: !!id,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useCreateMovement = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: MovementService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.movements] });
        }
    });
};

export const useUpdateMovement = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => 
            MovementService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.movements] });
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.movements, id] });
        }
    });
};

export const useDeleteMovement = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: MovementService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.movements] });
        }
    });
};

export const useMovementsBySimulation = (simulationId: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.movements, 'simulation', simulationId],
        queryFn: () => MovementService.getBySimulation(simulationId),
        enabled: !!simulationId,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

// ============================================================================
// HOOKS DE SEGUROS
// ============================================================================

export const useInsurances = () => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.insurances],
        queryFn: InsuranceService.getAll,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useInsurance = (id: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.insurances, id],
        queryFn: () => InsuranceService.getById(id),
        enabled: !!id,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useCreateInsurance = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: InsuranceService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.insurances] });
        }
    });
};

export const useUpdateInsurance = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => 
            InsuranceService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.insurances] });
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.insurances, id] });
        }
    });
};

export const useDeleteInsurance = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: InsuranceService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.insurances] });
        }
    });
};

export const useInsurancesBySimulation = (simulationId: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.insurances, 'simulation', simulationId],
        queryFn: () => InsuranceService.getBySimulation(simulationId),
        enabled: !!simulationId,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

// ============================================================================
// HOOKS DE CLIENTES
// ============================================================================

export const useClients = () => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.clients],
        queryFn: ClientService.getAll,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useClient = (id: string) => {
    return useQuery({
        queryKey: [CACHE_CONFIG.keys.clients, id],
        queryFn: () => ClientService.getById(id),
        enabled: !!id,
        staleTime: CACHE_CONFIG.ttl.medium,
        gcTime: CACHE_CONFIG.ttl.long
    });
};

export const useCreateClient = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ClientService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.clients] });
        }
    });
};

export const useUpdateClient = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => 
            ClientService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.clients] });
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.clients, id] });
        }
    });
};

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ClientService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CACHE_CONFIG.keys.clients] });
        }
    });
};

// ============================================================================
// HOOKS DE UTILIDADE
// ============================================================================

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue] as const;
};

export const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useAsync = <T, E = string>(
    asyncFunction: () => Promise<T>,
    immediate = true
) => {
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);

    const execute = useCallback(() => {
        setStatus('pending');
        setData(null);
        setError(null);

        return asyncFunction()
            .then((response) => {
                setData(response);
                setStatus('success');
            })
            .catch((error) => {
                setError(error);
                setStatus('error');
            });
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, data, error };
};
