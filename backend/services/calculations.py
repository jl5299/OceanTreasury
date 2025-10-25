import numpy as np
import pandas as pd
from typing import List, Dict, Any
from models.maritime import Route, Vessel, GangSchedule, Port

class MaritimeCalculator:
    """
    Core calculation engine for maritime operations
    """
    
    def __init__(self):
        self.base_cost_per_ton = 150  # Base cost per ton in USD
        self.risk_multiplier = 1.2   # Risk cost multiplier
        self.p95_confidence = 0.95   # P95 confidence level
    
    def calculate_base_cost(self, route: Route) -> float:
        """
        Calculate base cost for a route
        """
        # Base cost calculation based on distance, tonnage, and port factors
        distance_cost = route.distance * 0.5  # $0.5 per nautical mile
        port_cost = self._calculate_port_cost(route.destination_port)
        
        base_cost = distance_cost + port_cost
        return round(base_cost, 2)
    
    def calculate_p95_cost(self, route: Route, risk_cost: float) -> float:
        """
        Calculate P95 cost (95th percentile cost)
        """
        base_cost = self.calculate_base_cost(route)
        
        # P95 cost includes base cost + risk cost + uncertainty buffer
        uncertainty_buffer = base_cost * 0.15  # 15% uncertainty buffer
        p95_cost = base_cost + risk_cost + uncertainty_buffer
        
        return round(p95_cost, 2)
    
    def calculate_potential_savings(self, route: Route, base_cost: float, p95_cost: float) -> float:
        """
        Calculate potential savings compared to current operations
        """
        # Assume current operations have 20% higher costs
        current_cost = p95_cost * 1.2
        potential_savings = current_cost - p95_cost
        
        return round(potential_savings, 2)
    
    def calculate_total_expected_margin(self, historical_data: List[Dict]) -> float:
        """
        Calculate total expected margin per ton shipped
        """
        if not historical_data:
            return 0.0
        
        total_margin = sum(record.get('margin', 0) for record in historical_data)
        total_tonnage = sum(record.get('tonnage', 1) for record in historical_data)
        
        if total_tonnage == 0:
            return 0.0
        
        return round(total_margin / total_tonnage, 2)
    
    def calculate_cost_of_uncertainty(self, historical_data: List[Dict]) -> float:
        """
        Calculate cost of uncertainty (risk premium per ton)
        """
        if not historical_data:
            return 0.0
        
        # Calculate variance in costs
        costs = [record.get('total_cost', 0) for record in historical_data]
        if len(costs) < 2:
            return 0.0
        
        cost_variance = np.var(costs)
        uncertainty_cost = np.sqrt(cost_variance) * 0.1  # 10% of standard deviation
        
        return round(uncertainty_cost, 2)
    
    def calculate_baseline_cost(self, baseline_data: Dict) -> float:
        """
        Calculate baseline cost for forecast
        """
        quarterly_volume = baseline_data.get('quarterly_volume', 1000)
        avg_cost_per_ton = baseline_data.get('avg_cost_per_ton', 200)
        
        baseline_cost = quarterly_volume * avg_cost_per_ton
        return round(baseline_cost, 2)
    
    def calculate_potential_savings_scenarios(self, baseline_data: Dict) -> Dict[str, float]:
        """
        Calculate potential savings under different scenarios
        """
        baseline_cost = self.calculate_baseline_cost(baseline_data)
        
        # Best case: 15% savings
        best_case = baseline_cost * 0.15
        
        # Expected case: 8% savings
        expected = baseline_cost * 0.08
        
        # Worst case: 3% savings
        worst_case = baseline_cost * 0.03
        
        return {
            'best_case': round(best_case, 2),
            'expected': round(expected, 2),
            'worst_case': round(worst_case, 2)
        }
    
    def calculate_gang_costs(self, gang_schedules: List[GangSchedule]) -> Dict[str, float]:
        """
        Calculate total gang costs for different scenarios
        """
        total_weekday_cost = 0
        total_weekend_cost = 0
        total_holiday_cost = 0
        
        for schedule in gang_schedules:
            if schedule.day_type == 'weekday':
                total_weekday_cost += schedule.total_cost
            elif schedule.day_type == 'weekend':
                total_weekend_cost += schedule.total_cost
            elif schedule.day_type == 'holiday':
                total_holiday_cost += schedule.total_cost
        
        return {
            'weekday': round(total_weekday_cost, 2),
            'weekend': round(total_weekend_cost, 2),
            'holiday': round(total_holiday_cost, 2),
            'total': round(total_weekday_cost + total_weekend_cost + total_holiday_cost, 2)
        }
    
    def calculate_vessel_economics(self, vessel: Vessel) -> Dict[str, float]:
        """
        Calculate vessel economics including all cost components
        """
        total_cost = (
            vessel.bcmea_rate +
            vessel.dock_cost +
            vessel.bcmea_assurance +
            vessel.under_holding
        )
        
        cost_per_ton = total_cost / vessel.tonnage if vessel.tonnage > 0 else 0
        
        return {
            'total_cost': round(total_cost, 2),
            'cost_per_ton': round(cost_per_ton, 2),
            'grand_total': round(vessel.grand_total, 2)
        }
    
    def _calculate_port_cost(self, port: Port) -> float:
        """
        Calculate port-specific costs
        """
        base_port_cost = 50  # Base port cost
        
        # Adjust for corruption index
        if port.corruption_index:
            corruption_multiplier = 1 + (port.corruption_index * 0.1)
            base_port_cost *= corruption_multiplier
        
        # Adjust for reliability
        if port.reliability_score:
            reliability_multiplier = 1 - (port.reliability_score * 0.05)
            base_port_cost *= reliability_multiplier
        
        return round(base_port_cost, 2)
    
    def calculate_route_efficiency(self, route: Route) -> Dict[str, float]:
        """
        Calculate route efficiency metrics
        """
        # Cost per nautical mile
        cost_per_mile = route.base_cost / route.distance if route.distance > 0 else 0
        
        # Cost per day
        cost_per_day = route.base_cost / route.estimated_days if route.estimated_days > 0 else 0
        
        # Risk-adjusted efficiency
        risk_adjusted_cost = route.base_cost + route.risk_cost
        risk_adjusted_efficiency = risk_adjusted_cost / route.distance if route.distance > 0 else 0
        
        return {
            'cost_per_mile': round(cost_per_mile, 2),
            'cost_per_day': round(cost_per_day, 2),
            'risk_adjusted_efficiency': round(risk_adjusted_efficiency, 2)
        }

