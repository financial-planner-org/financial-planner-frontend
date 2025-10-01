// ============================================================================
// SERVIÇOS CENTRALIZADOS - FINANCIAL PLANNER
// ============================================================================
// Centraliza toda a lógica de negócio e transformação de dados

import { apiClient } from '../api';
import { DATA_TRANSFORMATIONS } from '../constants/data';
import { SimulationFormData, AllocationFormData, MovementFormData, InsuranceFormData, ClientFormData } from '../validations';

// ============================================================================
// SERVIÇO DE SIMULAÇÕES
// ============================================================================

export class SimulationService {
    static async getAll() {
        try {
            const data = await apiClient.getSimulations() as any[];
            return this.transformSimulations(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar simulações');
        }
    }

    static async getById(id: string) {
        try {
            const data = await apiClient.getSimulation(id);
            return this.transformSimulation(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar simulação');
        }
    }

    static async create(data: SimulationFormData) {
        try {
            const transformedData = this.transformSimulationForAPI(data);
            const result = await apiClient.createSimulation(transformedData);
            return this.transformSimulation(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao criar simulação');
        }
    }

    static async update(id: string, data: Partial<SimulationFormData>) {
        try {
            const transformedData = this.transformSimulationForAPI(data);
            const result = await apiClient.updateSimulation(id, transformedData);
            return this.transformSimulation(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao atualizar simulação');
        }
    }

    static async delete(id: string) {
        try {
            await apiClient.deleteSimulation(id);
            return true;
        } catch (error) {
            throw this.handleError(error, 'Erro ao deletar simulação');
        }
    }

    static async duplicate(id: string) {
        try {
            const result = await apiClient.duplicateSimulation(id);
            return this.transformSimulation(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao duplicar simulação');
        }
    }

    static async createVersion(id: string) {
        try {
            const result = await apiClient.createSimulationVersion(id);
            return this.transformSimulation(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao criar versão da simulação');
        }
    }

    static async getProjections(id: string) {
        try {
            const data = await apiClient.getProjections(id);
            return this.transformProjections(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar projeções');
        }
    }

    // Métodos de transformação
    private static transformSimulations(data: any[]) {
        return data.map(simulation => this.transformSimulation(simulation));
    }

    private static transformSimulation(data: any) {
        return {
            ...data,
            startDate: DATA_TRANSFORMATIONS.date.fromAPI(data.startDate),
            createdAt: DATA_TRANSFORMATIONS.date.fromAPI(data.createdAt),
            updatedAt: DATA_TRANSFORMATIONS.date.fromAPI(data.updatedAt)
        };
    }

    private static transformSimulationForAPI(data: any) {
        return {
            ...data,
            startDate: DATA_TRANSFORMATIONS.date.toAPI(data.startDate)
        };
    }

    private static transformProjections(data: any) {
        return data.map((projection: any) => ({
            ...projection,
            financialAssets: DATA_TRANSFORMATIONS.currency.toDisplay(projection.financialAssets),
            realEstateAssets: DATA_TRANSFORMATIONS.currency.toDisplay(projection.realEstateAssets),
            totalAssets: DATA_TRANSFORMATIONS.currency.toDisplay(projection.totalAssets),
            totalAssetsWithoutInsurance: DATA_TRANSFORMATIONS.currency.toDisplay(projection.totalAssetsWithoutInsurance),
            insuranceValue: DATA_TRANSFORMATIONS.currency.toDisplay(projection.insuranceValue),
            income: DATA_TRANSFORMATIONS.currency.toDisplay(projection.income),
            expenses: DATA_TRANSFORMATIONS.currency.toDisplay(projection.expenses),
            netWorth: DATA_TRANSFORMATIONS.currency.toDisplay(projection.netWorth)
        }));
    }

    private static handleError(error: any, message: string) {
        console.error(message, error);
        return new Error(`${message}: ${error.message || 'Erro desconhecido'}`);
    }
}

// ============================================================================
// SERVIÇO DE ALOÇÕES
// ============================================================================

export class AllocationService {
    static async getAll() {
        try {
            const data = await apiClient.getAllocations() as any[];
            return this.transformAllocations(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar alocações');
        }
    }

    static async getById(id: string) {
        try {
            const data = await apiClient.getAllocation(id);
            return this.transformAllocation(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar alocação');
        }
    }

    static async create(data: AllocationFormData) {
        try {
            const transformedData = this.transformAllocationForAPI(data);
            const result = await apiClient.createAllocation(transformedData);
            return this.transformAllocation(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao criar alocação');
        }
    }

    static async update(id: string, data: Partial<AllocationFormData>) {
        try {
            const transformedData = this.transformAllocationForAPI(data);
            const result = await apiClient.updateAllocation(id, transformedData);
            return this.transformAllocation(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao atualizar alocação');
        }
    }

    static async delete(id: string) {
        try {
            await apiClient.deleteAllocation(id);
            return true;
        } catch (error) {
            throw this.handleError(error, 'Erro ao deletar alocação');
        }
    }

    static async getRecords(id: string) {
        try {
            const data = await apiClient.getAllocationRecords(id) as any[];
            return this.transformAllocationRecords(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar registros da alocação');
        }
    }

    static async updateRecord(id: string, recordId: string, data: any) {
        try {
            const transformedData = this.transformAllocationRecordForAPI(data);
            const result = await apiClient.updateAllocationRecord(id, recordId, transformedData);
            return this.transformAllocationRecord(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao atualizar registro da alocação');
        }
    }

    // Métodos de transformação
    private static transformAllocations(data: any[]) {
        return data.map(allocation => this.transformAllocation(allocation));
    }

    private static transformAllocation(data: any) {
        return {
            ...data,
            value: DATA_TRANSFORMATIONS.currency.toDisplay(data.value),
            date: DATA_TRANSFORMATIONS.date.fromAPI(data.date),
            createdAt: DATA_TRANSFORMATIONS.date.fromAPI(data.createdAt),
            updatedAt: DATA_TRANSFORMATIONS.date.fromAPI(data.updatedAt),
            financing: data.financing ? {
                ...data.financing,
                startDate: DATA_TRANSFORMATIONS.date.fromAPI(data.financing.startDate),
                interestRate: DATA_TRANSFORMATIONS.percentage.toDisplay(data.financing.interestRate),
                downPayment: DATA_TRANSFORMATIONS.currency.toDisplay(data.financing.downPayment)
            } : undefined
        };
    }

    private static transformAllocationForAPI(data: any) {
        return {
            ...data,
            value: DATA_TRANSFORMATIONS.currency.fromInput(data.value),
            date: DATA_TRANSFORMATIONS.date.toAPI(data.date),
            financing: data.financing ? {
                ...data.financing,
                startDate: DATA_TRANSFORMATIONS.date.toAPI(data.financing.startDate),
                interestRate: DATA_TRANSFORMATIONS.percentage.fromInput(data.financing.interestRate),
                downPayment: DATA_TRANSFORMATIONS.currency.fromInput(data.financing.downPayment)
            } : undefined
        };
    }

    private static transformAllocationRecords(data: any[]) {
        return data.map(record => this.transformAllocationRecord(record));
    }

    private static transformAllocationRecord(data: any) {
        return {
            ...data,
            value: DATA_TRANSFORMATIONS.currency.toDisplay(data.value),
            date: DATA_TRANSFORMATIONS.date.fromAPI(data.date),
            createdAt: DATA_TRANSFORMATIONS.date.fromAPI(data.createdAt),
            updatedAt: DATA_TRANSFORMATIONS.date.fromAPI(data.updatedAt)
        };
    }

    private static transformAllocationRecordForAPI(data: any) {
        return {
            ...data,
            value: DATA_TRANSFORMATIONS.currency.fromInput(data.value),
            date: DATA_TRANSFORMATIONS.date.toAPI(data.date)
        };
    }

    private static handleError(error: any, message: string) {
        console.error(message, error);
        return new Error(`${message}: ${error.message || 'Erro desconhecido'}`);
    }
}

// ============================================================================
// SERVIÇO DE MOVIMENTAÇÕES
// ============================================================================

export class MovementService {
    static async getAll() {
        try {
            const data = await apiClient.getMovements() as any[];
            return this.transformMovements(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar movimentações');
        }
    }

    static async getById(id: string) {
        try {
            const data = await apiClient.getMovement(id);
            return this.transformMovement(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar movimentação');
        }
    }

    static async create(data: MovementFormData) {
        try {
            const transformedData = this.transformMovementForAPI(data);
            const result = await apiClient.createMovement(transformedData);
            return this.transformMovement(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao criar movimentação');
        }
    }

    static async update(id: string, data: Partial<MovementFormData>) {
        try {
            const transformedData = this.transformMovementForAPI(data);
            const result = await apiClient.updateMovement(id, transformedData);
            return this.transformMovement(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao atualizar movimentação');
        }
    }

    static async delete(id: string) {
        try {
            await apiClient.deleteMovement(id);
            return true;
        } catch (error) {
            throw this.handleError(error, 'Erro ao deletar movimentação');
        }
    }

    static async getBySimulation(simulationId: string) {
        try {
            const data = await apiClient.getMovementsBySimulation(simulationId) as any[];
            return this.transformMovements(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar movimentações da simulação');
        }
    }

    // Métodos de transformação
    private static transformMovements(data: any[]) {
        return data.map(movement => this.transformMovement(movement));
    }

    private static transformMovement(data: any) {
        return {
            ...data,
            value: DATA_TRANSFORMATIONS.currency.toDisplay(data.value),
            startDate: DATA_TRANSFORMATIONS.date.fromAPI(data.startDate),
            endDate: data.endDate ? DATA_TRANSFORMATIONS.date.fromAPI(data.endDate) : undefined,
            createdAt: DATA_TRANSFORMATIONS.date.fromAPI(data.createdAt),
            updatedAt: DATA_TRANSFORMATIONS.date.fromAPI(data.updatedAt)
        };
    }

    private static transformMovementForAPI(data: any) {
        return {
            ...data,
            value: DATA_TRANSFORMATIONS.currency.fromInput(data.value),
            startDate: DATA_TRANSFORMATIONS.date.toAPI(data.startDate),
            endDate: data.endDate ? DATA_TRANSFORMATIONS.date.toAPI(data.endDate) : undefined
        };
    }

    private static handleError(error: any, message: string) {
        console.error(message, error);
        return new Error(`${message}: ${error.message || 'Erro desconhecido'}`);
    }
}

// ============================================================================
// SERVIÇO DE SEGUROS
// ============================================================================

export class InsuranceService {
    static async getAll() {
        try {
            const data = await apiClient.getInsurances() as any[];
            return this.transformInsurances(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar seguros');
        }
    }

    static async getById(id: string) {
        try {
            const data = await apiClient.getInsurance(id);
            return this.transformInsurance(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar seguro');
        }
    }

    static async create(data: InsuranceFormData) {
        try {
            const transformedData = this.transformInsuranceForAPI(data);
            const result = await apiClient.createInsurance(transformedData);
            return this.transformInsurance(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao criar seguro');
        }
    }

    static async update(id: string, data: Partial<InsuranceFormData>) {
        try {
            const transformedData = this.transformInsuranceForAPI(data);
            const result = await apiClient.updateInsurance(id, transformedData);
            return this.transformInsurance(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao atualizar seguro');
        }
    }

    static async delete(id: string) {
        try {
            await apiClient.deleteInsurance(id);
            return true;
        } catch (error) {
            throw this.handleError(error, 'Erro ao deletar seguro');
        }
    }

    static async getBySimulation(simulationId: string) {
        try {
            const data = await apiClient.getInsurancesBySimulation(simulationId) as any[];
            return this.transformInsurances(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar seguros da simulação');
        }
    }

    // Métodos de transformação
    private static transformInsurances(data: any[]) {
        return data.map(insurance => this.transformInsurance(insurance));
    }

    private static transformInsurance(data: any) {
        return {
            ...data,
            premium: DATA_TRANSFORMATIONS.currency.toDisplay(data.premium),
            insuredValue: DATA_TRANSFORMATIONS.currency.toDisplay(data.insuredValue),
            startDate: DATA_TRANSFORMATIONS.date.fromAPI(data.startDate),
            createdAt: DATA_TRANSFORMATIONS.date.fromAPI(data.createdAt),
            updatedAt: DATA_TRANSFORMATIONS.date.fromAPI(data.updatedAt)
        };
    }

    private static transformInsuranceForAPI(data: any) {
        return {
            ...data,
            premium: DATA_TRANSFORMATIONS.currency.fromInput(data.premium),
            insuredValue: DATA_TRANSFORMATIONS.currency.fromInput(data.insuredValue),
            startDate: DATA_TRANSFORMATIONS.date.toAPI(data.startDate)
        };
    }

    private static handleError(error: any, message: string) {
        console.error(message, error);
        return new Error(`${message}: ${error.message || 'Erro desconhecido'}`);
    }
}

// ============================================================================
// SERVIÇO DE CLIENTES
// ============================================================================

export class ClientService {
    static async getAll() {
        try {
            const data = await apiClient.getClients() as any[];
            return this.transformClients(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar clientes');
        }
    }

    static async getById(id: string) {
        try {
            const data = await apiClient.getClient(id);
            return this.transformClient(data);
        } catch (error) {
            throw this.handleError(error, 'Erro ao buscar cliente');
        }
    }

    static async create(data: ClientFormData) {
        try {
            const result = await apiClient.createClient(data);
            return this.transformClient(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao criar cliente');
        }
    }

    static async update(id: string, data: Partial<ClientFormData>) {
        try {
            const result = await apiClient.updateClient(id, data);
            return this.transformClient(result);
        } catch (error) {
            throw this.handleError(error, 'Erro ao atualizar cliente');
        }
    }

    static async delete(id: string) {
        try {
            await apiClient.deleteClient(id);
            return true;
        } catch (error) {
            throw this.handleError(error, 'Erro ao deletar cliente');
        }
    }

    // Métodos de transformação
    private static transformClients(data: any[]) {
        return data.map(client => this.transformClient(client));
    }

    private static transformClient(data: any) {
        return {
            ...data,
            createdAt: DATA_TRANSFORMATIONS.date.fromAPI(data.createdAt),
            updatedAt: DATA_TRANSFORMATIONS.date.fromAPI(data.updatedAt)
        };
    }

    private static handleError(error: any, message: string) {
        console.error(message, error);
        return new Error(`${message}: ${error.message || 'Erro desconhecido'}`);
    }
}

// ============================================================================
// EXPORTAÇÕES
// ============================================================================

// As classes já são exportadas individualmente acima
