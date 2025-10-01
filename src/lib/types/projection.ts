import { LifeStatus } from './simulation';

/**
 * Tipo de ativo para projeção
 */
export type AssetType = 'financial' | 'real_estate' | 'investments' | 'other_assets';

/**
 * Tipo de passivo para projeção
 */
export type LiabilityType = 'loans' | 'financing' | 'other_liabilities';

/**
 * Detalhes de um item na projeção
 */
export interface ProjectionItem {
  type: AssetType | LiabilityType;
  name: string;
  value: number;
  percentage?: number;
}

/**
 * Resumo da projeção para um ano específico
 */
export interface YearlyProjection {
  year: number;
  age: number;
  lifeStatus: LifeStatus;

  // Ativos
  assets: {
    financial: ProjectionItem[];
    realEstate: ProjectionItem[];
    investments: ProjectionItem[];
    otherAssets: ProjectionItem[];
    total: number;
  };

  // Passivos
  liabilities: {
    loans: ProjectionItem[];
    financing: ProjectionItem[];
    otherLiabilities: ProjectionItem[];
    total: number;
  };

  // Patrimônio Líquido
  netWorth: number;
  netWorthWithoutInsurances: number;

  // Fluxo de Caixa Anual
  cashFlow: {
    income: number;
    expenses: number;
    netCashFlow: number;
  };

  // Seguros
  insurances: {
    premiums: number;
    coverage: number;
  };

  // Metas
  goals?: {
    name: string;
    targetAmount: number;
    currentAmount: number;
    isOnTrack: boolean;
  }[];
}

/**
 * Resultado completo de uma projeção
 */
export interface ProjectionResult {
  simulationId: string;
  simulationName: string;
  startDate: Date | string;
  endDate: Date | string;
  realRate: number;
  lifeStatus: LifeStatus;
  projections: YearlyProjection[];

  // Métricas resumidas
  metrics: {
    peakNetWorth: number;
    yearsToRetirement?: number;
    financialIndependenceNumber?: number;
    yearsToFinancialIndependence?: number;
    safeWithdrawalRate?: number;
    annualSafeWithdrawal?: number;
  };

  // Metas
  goals?: {
    name: string;
    targetAmount: number;
    targetYear: number;
    isAchievable: boolean;
    monthlyContributionNeeded?: number;
  }[];

  // Análise de cenários
  scenarioAnalysis?: {
    name: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
    probability?: number;
    effectOnNetWorth?: number;
    recommendations?: string[];
  }[];

  // Recomendações
  recommendations?: {
    category: 'savings' | 'investments' | 'insurance' | 'debt' | 'tax' | 'retirement' | 'other';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    actionItems: string[];
    potentialImpact: string;
  }[];

  // Metadados
  metadata: {
    generatedAt: Date | string;
    assumptions: Record<string, unknown>;
    version: string;
  };
}

/**
 * Parâmetros para solicitar uma projeção
 */
export interface GetProjectionParams {
  simulationId: string;
  lifeStatus?: LifeStatus;
  realRate?: number;
  includeScenarios?: boolean;
  includeRecommendations?: boolean;
}
