// ============================================================================
// API MODULES INDEX - FINANCIAL PLANNER
// ============================================================================
// Centraliza as exportações de todos os módulos da API

export { default as apiClient } from './client';
export { default as HttpClient } from './http';

export * from './allocations';
export * from './clients';
export * from './health';
export * from './insurances';
export * from './movements';
export * from './projections';
export * from './simulations';

export { API_ENDPOINTS, HTTP_STATUS, API_ERROR_MESSAGES } from '../constants/api';
