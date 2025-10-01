// ============================================================================
// TIPOS CENTRALIZADOS - FINANCIAL PLANNER
// ============================================================================
// Reexporta todos os tipos para facilitar a importação

import * as core from './core';
import * as simulation from './simulation';
import * as allocation from './allocation';
import * as movement from './movement';
import * as insurance from './insurance';
import * as projection from './projection';

export { core, simulation, allocation, movement, insurance, projection };

// Reexport types for easier access
export type {
  LifeStatus,
  SimulationStatus,
  Simulation,
  CreateSimulationDto,
  UpdateSimulationDto,
  CreateSimulationVersionDto,
  FinancialProjection,
  ProjectionParams,
  ProjectionResponse,
} from './simulation';

export type {
  AllocationType,
  FinancingDetails,
  AllocationRecord,
  Allocation,
  CreateAllocationDto,
  UpdateAllocationDto,
  CreateAllocationRecordDto,
  UpdateAllocationRecordDto,
} from './allocation';

export type {
  MovementType,
  MovementFrequency,
  Movement,
  CreateMovementDto,
  UpdateMovementDto,
  FindMovementsParams,
} from './movement';

export type {
  InsuranceType,
  InsuranceStatus,
  Insurance,
  CreateInsuranceDto,
  UpdateInsuranceDto,
  FindInsurancesParams,
} from './insurance';

export type {
  AssetType,
  LiabilityType,
  ProjectionItem,
  YearlyProjection,
  ProjectionResult,
  GetProjectionParams,
} from './projection';
