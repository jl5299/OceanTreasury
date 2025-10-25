from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class Coordinates(BaseModel):
    lat: float
    lng: float

class Port(BaseModel):
    id: str
    name: str
    country: str
    region: str
    coordinates: Coordinates
    corruption_index: Optional[float] = None
    reliability_score: Optional[float] = None
    average_delay_days: Optional[float] = None

class Route(BaseModel):
    id: str
    name: str
    origin_port: Port
    destination_port: Port
    distance: float  # nautical miles
    estimated_days: float
    base_cost: float
    risk_cost: float
    p95_cost: float
    expected_margin: float
    disruption_probability: float
    recommendation: str  # 'use', 'avoid', 'caution'
    savings: float

class GangSchedule(BaseModel):
    day_type: str  # 'weekday', 'weekend', 'holiday'
    shift_time: str
    number_of_gangs: int
    cost_per_gang: float
    total_cost: float

class Vessel(BaseModel):
    id: str
    name: str
    tonnage: float  # MT
    discharge: float
    bcmea_rate: float
    dock_cost: float
    bcmea_assurance: float
    under_holding: float
    grand_total: float

class TrendlineDataPoint(BaseModel):
    date: str
    expected: float
    realized: float

class KPIData(BaseModel):
    total_expected_margin: float
    disruption_probability: float
    cost_of_uncertainty: float
    top_ports_by_risk: List[Port]
    trendline_data: List[TrendlineDataPoint]

class PotentialSavings(BaseModel):
    best_case: float
    expected: float
    worst_case: float

class CostDistributionPoint(BaseModel):
    range: str
    frequency: float

class ForecastData(BaseModel):
    baseline_cost: float
    potential_savings: PotentialSavings
    cost_distribution: List[CostDistributionPoint]

class StrategicLever(BaseModel):
    id: str
    type: str  # 'relationship', 'consolidation', 'oversight'
    port: Port
    description: str
    potential_savings: float
    investment_required: float
    roi: float

class SensitivityAnalysis(BaseModel):
    port: Port
    corruption_threshold: float
    current_corruption_rate: float
    is_economical: bool
    break_even_point: float

