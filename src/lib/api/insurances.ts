import { API_ENDPOINTS } from '../constants/api';
import { ApiClient } from './apiClient';

type Insurance = any; // Replace with proper type

export class InsurancesAPI extends ApiClient {
  async getAll(): Promise<Insurance[]> {
    return this.get(API_ENDPOINTS.insurances.list);
  }

  async getById(id: string): Promise<Insurance> {
    return this.get(API_ENDPOINTS.insurances.get(id));
  }

  async create(data: Partial<Insurance>): Promise<Insurance> {
    return this.post(API_ENDPOINTS.insurances.create, data);
  }

  async update(id: string, data: Partial<Insurance>): Promise<Insurance> {
    return this.put(API_ENDPOINTS.insurances.update(id), data);
  }

  async remove(id: string): Promise<void> {
    return this.delete(API_ENDPOINTS.insurances.delete(id));
  }

  async getBySimulation(simulationId: string): Promise<Insurance[]> {
    return this.get(API_ENDPOINTS.insurances.bySimulation(simulationId));
  }
}

export const insurancesAPI = new InsurancesAPI();
