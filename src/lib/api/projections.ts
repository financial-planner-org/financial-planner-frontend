import { API_ENDPOINTS } from '../constants/api';
import { ApiClient } from './apiClient';

type Projection = any; // Replace with proper type

export class ProjectionsAPI extends ApiClient {
  async getBySimulation(simulationId: string): Promise<Projection> {
    return this.get(API_ENDPOINTS.simulations.projections(simulationId));
  }
}

export const projectionsAPI = new ProjectionsAPI();
