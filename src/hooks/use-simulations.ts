import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Simulation, CreateSimulation, UpdateSimulation } from '@/lib/validations/simulation'

export function useSimulations() {
    return useQuery({
        queryKey: ['simulations'],
        queryFn: async (): Promise<Simulation[]> => {
            const response = await api.get('/simulations')
            return response.data
        },
    })
}

export function useSimulation(id: string) {
    return useQuery({
        queryKey: ['simulations', id],
        queryFn: async (): Promise<Simulation> => {
            const response = await api.get(`/simulations/${id}`)
            return response.data
        },
        enabled: !!id,
    })
}

export function useCreateSimulation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateSimulation): Promise<Simulation> => {
            const response = await api.post('/simulations', data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['simulations'] })
        },
    })
}

export function useUpdateSimulation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateSimulation }): Promise<Simulation> => {
            const response = await api.put(`/simulations/${id}`, data)
            return response.data
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['simulations'] })
            queryClient.invalidateQueries({ queryKey: ['simulations', id] })
        },
    })
}

export function useDeleteSimulation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string): Promise<void> => {
            await api.delete(`/simulations/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['simulations'] })
        },
    })
}

export function useCreateSimulationVersion() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string): Promise<Simulation> => {
            const response = await api.post(`/simulations/${id}/version`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['simulations'] })
        },
    })
}
