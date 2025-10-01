// ============================================================================
// VALIDAÇÕES CENTRALIZADAS - FINANCIAL PLANNER
// ============================================================================
// Reexporta todos os schemas de validação

import * as base from './base';
import * as simulation from './simulation';
import * as allocation from './allocation';
import * as movement from './movement';
import * as insurance from './insurance';
import * as projection from './projection';

export { base, simulation, allocation, movement, insurance, projection };

// Reexport types for easier access
export type {
  CreateSimulationInput,
  UpdateSimulationInput,
  CreateSimulationVersionInput,
  SimulationFiltersInput,
} from './simulation';

export type {
  CreateAllocationInput,
  UpdateAllocationInput,
  CreateAllocationRecordInput,
  UpdateAllocationRecordInput,
  AllocationFiltersInput,
} from './allocation';

export type { CreateMovementInput, UpdateMovementInput, MovementFiltersInput } from './movement';

export type {
  CreateInsuranceInput,
  UpdateInsuranceInput,
  InsuranceFiltersInput,
} from './insurance';

export type {
  ProjectionParamsInput,
  ProjectionHistoryFiltersInput,
  SaveProjectionInput,
} from './projection';
