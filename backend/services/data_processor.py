import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from models.maritime import Port, Vessel, TrendlineDataPoint

class DataProcessor:
    """
    Data processing service for maritime operations
    """
    
    def __init__(self):
        self.mock_ports = self._create_mock_ports()
        self.mock_vessels = self._create_mock_vessels()
    
    async def get_historical_data(self, time_period: str = "quarterly") -> List[Dict]:
        """
        Get historical data for analysis
        """
        # Mock historical data - replace with actual database queries
        historical_data = [
            {
                'date': '2024-01-01',
                'port_id': 'port_1',
                'route_id': 'route_1',
                'total_cost': 195000,
                'tonnage': 1000,
                'margin': 15000,
                'disruption_probability': 0.25,
                'risk_score': 0.7
            },
            {
                'date': '2024-02-01',
                'port_id': 'port_2',
                'route_id': 'route_2',
                'total_cost': 210000,
                'tonnage': 1200,
                'margin': 18000,
                'disruption_probability': 0.15,
                'risk_score': 0.4
            },
            {
                'date': '2024-03-01',
                'port_id': 'port_1',
                'route_id': 'route_1',
                'total_cost': 202000,
                'tonnage': 1100,
                'margin': 16000,
                'disruption_probability': 0.20,
                'risk_score': 0.6
            },
            {
                'date': '2024-04-01',
                'port_id': 'port_3',
                'route_id': 'route_3',
                'total_cost': 198000,
                'tonnage': 950,
                'margin': 14000,
                'disruption_probability': 0.18,
                'risk_score': 0.5
            },
            {
                'date': '2024-05-01',
                'port_id': 'port_2',
                'route_id': 'route_2',
                'total_cost': 205000,
                'tonnage': 1150,
                'margin': 17000,
                'disruption_probability': 0.12,
                'risk_score': 0.3
            },
            {
                'date': '2024-06-01',
                'port_id': 'port_1',
                'route_id': 'route_1',
                'total_cost': 208000,
                'tonnage': 1050,
                'margin': 15500,
                'disruption_probability': 0.22,
                'risk_score': 0.65
            }
        ]
        
        return historical_data
    
    async def get_baseline_data(self) -> Dict:
        """
        Get baseline data for forecasting
        """
        return {
            'quarterly_volume': 1000,  # tons
            'avg_cost_per_ton': 200,    # USD per ton
            'historical_variance': 0.15, # 15% variance
            'risk_factors': {
                'corruption': 0.3,
                'weather': 0.2,
                'operational': 0.1
            }
        }
    
    def generate_trendline_data(self, historical_data: List[Dict]) -> List[TrendlineDataPoint]:
        """
        Generate trendline data for visualization
        """
        trendline_data = []
        
        for record in historical_data:
            # Calculate expected cost (base cost + risk buffer)
            base_cost = record.get('total_cost', 0)
            risk_buffer = base_cost * 0.1  # 10% risk buffer
            expected_cost = base_cost + risk_buffer
            
            # Realized cost (actual cost with some variance)
            realized_cost = base_cost * (1 + np.random.normal(0, 0.05))  # 5% variance
            
            trendline_data.append(TrendlineDataPoint(
                date=record.get('date', ''),
                expected=expected_cost,
                realized=realized_cost
            ))
        
        return trendline_data
    
    async def get_all_ports(self) -> List[Port]:
        """
        Get all available ports
        """
        return self.mock_ports
    
    async def get_all_vessels(self) -> List[Vessel]:
        """
        Get all vessels
        """
        return self.mock_vessels
    
    def _create_mock_ports(self) -> List[Port]:
        """
        Create mock port data
        """
        return [
            Port(
                id="port_1",
                name="Port X",
                country="Country X",
                region="Asia",
                coordinates={"lat": 1.3521, "lng": 103.8198},
                corruption_index=0.7,
                reliability_score=0.4,
                average_delay_days=3.2
            ),
            Port(
                id="port_2",
                name="Port Y",
                country="Country Y",
                region="Europe",
                coordinates={"lat": 51.5074, "lng": -0.1278},
                corruption_index=0.2,
                reliability_score=0.8,
                average_delay_days=1.5
            ),
            Port(
                id="port_3",
                name="Port Z",
                country="Country Z",
                region="Africa",
                coordinates={"lat": -26.2041, "lng": 28.0473},
                corruption_index=0.5,
                reliability_score=0.6,
                average_delay_days=2.8
            )
        ]
    
    def _create_mock_vessels(self) -> List[Vessel]:
        """
        Create mock vessel data
        """
        return [
            {
                "id": "vessel_1",
                "name": "Steel Carrier Alpha",
                "tonnage": 20520,
                "discharge": 5,
                "bcmea_rate": 3.27,
                "dock_cost": 0.25,
                "bcmea_assurance": 0.15,
                "under_holding": 0.08,
                "grand_total": 3.75
            },
            {
                "id": "vessel_2",
                "name": "Steel Carrier Beta",
                "tonnage": 18500,
                "discharge": 4.5,
                "bcmea_rate": 3.15,
                "dock_cost": 0.22,
                "bcmea_assurance": 0.12,
                "under_holding": 0.06,
                "grand_total": 3.55
            }
        ]
    
    def process_gang_schedule_data(self, raw_data: List[Dict]) -> List[Dict]:
        """
        Process gang schedule data from spreadsheet
        """
        processed_schedules = []
        
        for record in raw_data:
            # Calculate total cost
            total_cost = record.get('number_of_gangs', 0) * record.get('cost_per_gang', 0)
            
            processed_schedule = {
                'day_type': record.get('day_type', 'weekday'),
                'shift_time': record.get('shift_time', '08:00'),
                'number_of_gangs': record.get('number_of_gangs', 0),
                'cost_per_gang': record.get('cost_per_gang', 0),
                'total_cost': total_cost
            }
            
            processed_schedules.append(processed_schedule)
        
        return processed_schedules
    
    def calculate_port_statistics(self, port_data: List[Dict]) -> Dict[str, Any]:
        """
        Calculate statistics for a port
        """
        if not port_data:
            return {}
        
        costs = [record.get('total_cost', 0) for record in port_data]
        delays = [record.get('delay_days', 0) for record in port_data]
        
        return {
            'avg_cost': np.mean(costs),
            'cost_std': np.std(costs),
            'avg_delay': np.mean(delays),
            'delay_std': np.std(delays),
            'total_shipments': len(port_data),
            'reliability_score': 1 - (np.mean(delays) / 10)  # Normalize to 0-1
        }
    
    def generate_cost_forecast(self, historical_data: List[Dict], months_ahead: int = 3) -> List[Dict]:
        """
        Generate cost forecast for future months
        """
        if not historical_data:
            return []
        
        # Calculate trend
        costs = [record.get('total_cost', 0) for record in historical_data]
        dates = [record.get('date', '') for record in historical_data]
        
        # Simple linear trend (replace with more sophisticated forecasting)
        if len(costs) > 1:
            trend = (costs[-1] - costs[0]) / len(costs)
        else:
            trend = 0
        
        forecast = []
        base_date = datetime.now()
        
        for i in range(1, months_ahead + 1):
            forecast_date = base_date + timedelta(days=30 * i)
            forecast_cost = costs[-1] + (trend * i)
            
            forecast.append({
                'date': forecast_date.strftime('%Y-%m-%d'),
                'predicted_cost': forecast_cost,
                'confidence_interval': {
                    'lower': forecast_cost * 0.9,
                    'upper': forecast_cost * 1.1
                }
            })
        
        return forecast

