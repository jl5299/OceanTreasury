import numpy as np
import pandas as pd
from typing import List, Dict, Any, Optional
from models.maritime import Port, Route, StrategicLever, SensitivityAnalysis

class RiskAnalyzer:
    """
    Risk analysis engine for maritime operations
    """
    
    def __init__(self):
        self.corruption_risk_weight = 0.4
        self.weather_risk_weight = 0.3
        self.operational_risk_weight = 0.3
        self.base_risk_cost = 5000  # Base risk cost in USD
    
    def calculate_risk_cost(self, route: Route) -> float:
        """
        Calculate risk cost for a route based on various risk factors
        """
        # Port corruption risk
        corruption_risk = self._calculate_corruption_risk(route.destination_port)
        
        # Weather risk (based on region)
        weather_risk = self._calculate_weather_risk(route.destination_port.region)
        
        # Operational risk (based on distance and complexity)
        operational_risk = self._calculate_operational_risk(route)
        
        # Total risk cost
        total_risk_cost = (
            corruption_risk * self.corruption_risk_weight +
            weather_risk * self.weather_risk_weight +
            operational_risk * self.operational_risk_weight
        )
        
        return round(total_risk_cost, 2)
    
    def get_route_recommendation(self, route: Route, risk_cost: float) -> str:
        """
        Get route recommendation based on risk analysis
        """
        risk_threshold_high = 15000
        risk_threshold_medium = 8000
        
        if risk_cost > risk_threshold_high:
            return 'avoid'
        elif risk_cost > risk_threshold_medium:
            return 'caution'
        else:
            return 'use'
    
    def calculate_avg_disruption_probability(self, historical_data: List[Dict]) -> float:
        """
        Calculate average disruption probability across all routes
        """
        if not historical_data:
            return 0.0
        
        probabilities = [record.get('disruption_probability', 0) for record in historical_data]
        avg_probability = np.mean(probabilities)
        
        return round(avg_probability, 2)
    
    def get_top_risk_ports(self, historical_data: List[Dict]) -> List[Port]:
        """
        Get top ports by risk level
        """
        if not historical_data:
            return []
        
        # Calculate risk scores for each port
        port_risks = {}
        for record in historical_data:
            port_id = record.get('port_id')
            if port_id:
                if port_id not in port_risks:
                    port_risks[port_id] = []
                port_risks[port_id].append(record.get('risk_score', 0))
        
        # Calculate average risk for each port
        port_avg_risks = {
            port_id: np.mean(risks) 
            for port_id, risks in port_risks.items()
        }
        
        # Sort by risk and return top 5
        top_ports = sorted(port_avg_risks.items(), key=lambda x: x[1], reverse=True)[:5]
        
        # Convert to Port objects (simplified for demo)
        return [
            Port(
                id=port_id,
                name=f"Port {port_id}",
                country="Unknown",
                region="Unknown",
                coordinates={"lat": 0, "lng": 0}
            )
            for port_id, _ in top_ports
        ]
    
    def generate_cost_distribution(self, baseline_data: Dict) -> List[Dict[str, Any]]:
        """
        Generate cost distribution for visualization
        """
        # Generate normal distribution with some skew for risk
        base_cost = baseline_data.get('avg_cost_per_ton', 200)
        std_dev = base_cost * 0.15  # 15% standard deviation
        
        # Create cost ranges
        ranges = [
            {'range': '180K-200K', 'frequency': 15},
            {'range': '200K-220K', 'frequency': 35},
            {'range': '220K-240K', 'frequency': 30},
            {'range': '240K-260K', 'frequency': 15},
            {'range': '260K-280K', 'frequency': 5}
        ]
        
        return ranges
    
    def analyze_relationship_investment(self, port: Port) -> Optional[StrategicLever]:
        """
        Analyze relationship investment opportunities
        """
        if not port.corruption_index or port.corruption_index < 0.3:
            return None
        
        # Calculate potential savings from relationship investment
        potential_savings = port.corruption_index * 20000  # $20K per corruption point
        investment_required = 5000  # $5K investment
        roi = (potential_savings / investment_required) * 100 if investment_required > 0 else 0
        
        return StrategicLever(
            id=f"relationship_{port.id}",
            type="relationship",
            port=port,
            description=f"Invest in local relationships to reduce bribe frequency at {port.name}",
            potential_savings=potential_savings,
            investment_required=investment_required,
            roi=roi
        )
    
    def analyze_volume_consolidation(self, port: Port) -> Optional[StrategicLever]:
        """
        Analyze volume consolidation opportunities
        """
        if not port.reliability_score or port.reliability_score > 0.7:
            return None
        
        # Calculate potential savings from volume consolidation
        potential_savings = (1 - port.reliability_score) * 30000  # $30K per reliability point
        investment_required = 8000  # $8K investment
        roi = (potential_savings / investment_required) * 100 if investment_required > 0 else 0
        
        return StrategicLever(
            id=f"consolidation_{port.id}",
            type="consolidation",
            port=port,
            description=f"Consolidate volume with alternate carriers for better reliability at {port.name}",
            potential_savings=potential_savings,
            investment_required=investment_required,
            roi=roi
        )
    
    def analyze_oversight_investment(self, port: Port) -> Optional[StrategicLever]:
        """
        Analyze oversight investment opportunities
        """
        if not port.corruption_index or port.corruption_index < 0.2:
            return None
        
        # Calculate potential savings from oversight investment
        potential_savings = port.corruption_index * 15000  # $15K per corruption point
        investment_required = 3000  # $3K investment
        roi = (potential_savings / investment_required) * 100 if investment_required > 0 else 0
        
        return StrategicLever(
            id=f"oversight_{port.id}",
            type="oversight",
            port=port,
            description=f"Implement enhanced oversight to reduce corruption costs at {port.name}",
            potential_savings=potential_savings,
            investment_required=investment_required,
            roi=roi
        )
    
    def analyze_corruption_sensitivity(self, port: Port) -> SensitivityAnalysis:
        """
        Analyze corruption sensitivity for a port
        """
        current_corruption_rate = port.corruption_index or 0.5
        corruption_threshold = 0.3  # 30% corruption threshold
        
        # Calculate break-even point
        break_even_point = corruption_threshold
        
        # Determine if port is economical
        is_economical = current_corruption_rate <= corruption_threshold
        
        return SensitivityAnalysis(
            port=port,
            corruption_threshold=corruption_threshold,
            current_corruption_rate=current_corruption_rate,
            is_economical=is_economical,
            break_even_point=break_even_point
        )
    
    def _calculate_corruption_risk(self, port: Port) -> float:
        """
        Calculate corruption risk for a port
        """
        if not port.corruption_index:
            return self.base_risk_cost
        
        # Corruption risk scales with corruption index
        corruption_multiplier = 1 + (port.corruption_index * 2)
        return self.base_risk_cost * corruption_multiplier
    
    def _calculate_weather_risk(self, region: str) -> float:
        """
        Calculate weather risk based on region
        """
        weather_risk_multipliers = {
            'Asia': 1.2,
            'Africa': 1.5,
            'South America': 1.3,
            'Europe': 1.0,
            'North America': 1.1
        }
        
        multiplier = weather_risk_multipliers.get(region, 1.0)
        return self.base_risk_cost * multiplier
    
    def _calculate_operational_risk(self, route: Route) -> float:
        """
        Calculate operational risk based on route characteristics
        """
        # Risk increases with distance
        distance_risk = route.distance * 0.1
        
        # Risk increases with estimated days
        time_risk = route.estimated_days * 100
        
        return distance_risk + time_risk

