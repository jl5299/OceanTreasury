export interface Port {
  name: string;
  gangs: number;
  costPerGang: number;
  bcmeaRate: number;
  dischargeDays: number;
  dockCost: number;
}

export interface Vessel {
  name: string;
  tonnage: number;
}

export const ports: Port[] = [
  { name: "Santos", gangs: 5, costPerGang: 13500, bcmeaRate: 3.27, dischargeDays: 5, dockCost: 0.25 },
  { name: "Buenos Aires", gangs: 4, costPerGang: 14000, bcmeaRate: 3.15, dischargeDays: 4.5, dockCost: 0.22 },
  { name: "Valparaíso", gangs: 6, costPerGang: 15000, bcmeaRate: 3.45, dischargeDays: 6, dockCost: 0.28 },
  { name: "Callao", gangs: 3, costPerGang: 16000, bcmeaRate: 3.60, dischargeDays: 3, dockCost: 0.30 },
  { name: "Guayaquil", gangs: 4, costPerGang: 13000, bcmeaRate: 3.10, dischargeDays: 4, dockCost: 0.20 },
  { name: "Cartagena", gangs: 7, costPerGang: 14500, bcmeaRate: 3.35, dischargeDays: 7, dockCost: 0.26 },
  { name: "Manzanillo", gangs: 5, costPerGang: 15500, bcmeaRate: 3.50, dischargeDays: 5, dockCost: 0.29 },
  { name: "Puerto Limón", gangs: 4, costPerGang: 13500, bcmeaRate: 3.25, dischargeDays: 4, dockCost: 0.24 },
  { name: "Rio de Janeiro", gangs: 6, costPerGang: 14200, bcmeaRate: 3.40, dischargeDays: 6, dockCost: 0.27 },
  { name: "Montevideo", gangs: 3, costPerGang: 13800, bcmeaRate: 3.20, dischargeDays: 3, dockCost: 0.23 }
];

export const vessels: Vessel[] = [
  { name: "Steel Carrier Alpha", tonnage: 20520 },
  { name: "Steel Carrier Beta", tonnage: 18500 },
  { name: "Ocean Explorer", tonnage: 22500 },
  { name: "Maritime Express", tonnage: 19500 },
  { name: "Pacific Voyager", tonnage: 21500 },
  { name: "Atlantic Navigator", tonnage: 17500 },
  { name: "Global Trader", tonnage: 23500 },
  { name: "Cargo Master", tonnage: 18500 }
];

