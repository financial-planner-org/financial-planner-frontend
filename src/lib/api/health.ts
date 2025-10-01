import { ApiClient } from './apiClient';

type HealthStatus = {
  status: string;
  timestamp: string;
  version: string;
  environment: string;
};

export class HealthAPI extends ApiClient {
  async check(): Promise<HealthStatus> {
    return this.get('/health');
  }
}

export const healthAPI = new HealthAPI();
