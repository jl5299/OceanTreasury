// Maritime Operations Types

export interface Port {
  id: string;
  name: string;
  country: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Route {
  id: string;
  name: string;
  originPort: Port;
  destinationPort: Port;
  distance: number; // nautical miles
  estimatedDays: number;
  baseCost: number;
  riskCost: number;
  p95Cost: number;
  expectedMargin: number;
  disruptionProbability: number;
  recommendation: 'use' | 'avoid' | 'caution';
  savings: number;
}

export interface GangSchedule {
  dayType: 'weekday' | 'weekend' | 'holiday';
  shiftTime: string;
  numberOfGangs: number;
  costPerGang: number;
  totalCost: number;
}

export interface Vessel {
  id: string;
  name: string;
  tonnage: number; // MT
  discharge: number;
  bcmeaRate: number;
  dockCost: number;
  bcmeaAssurance: number;
  underHolding: number;
  grandTotal: number;
}

export interface KPIData {
  totalExpectedMargin: number;
  disruptionProbability: number;
  costOfUncertainty: number;
  topPortsByRisk: Port[];
  trendlineData: {
    date: string;
    expected: number;
    realized: number;
  }[];
}

export interface ForecastData {
  baselineCost: number;
  potentialSavings: {
    bestCase: number;
    expected: number;
    worstCase: number;
  };
  costDistribution: {
    range: string;
    frequency: number;
  }[];
}

export interface StrategicLever {
  id: string;
  type: 'relationship' | 'consolidation' | 'oversight';
  port: Port;
  description: string;
  potentialSavings: number;
  investmentRequired: number;
  roi: number;
}

export interface SensitivityAnalysis {
  port: Port;
  corruptionThreshold: number;
  currentCorruptionRate: number;
  isEconomical: boolean;
  breakEvenPoint: number;
}

