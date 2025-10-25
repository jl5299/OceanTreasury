from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import asyncio
from models.maritime import Port, Route, GangSchedule, Vessel, KPIData, ForecastData, StrategicLever, SensitivityAnalysis
from services.calculations import MaritimeCalculator
from services.data_processor import DataProcessor
from services.risk_analyzer import RiskAnalyzer

app = FastAPI(
    title="Ocean Treasury API",
    description="Steel Discharge Optimization API for Maritime Operations",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
calculator = MaritimeCalculator()
data_processor = DataProcessor()
risk_analyzer = RiskAnalyzer()

# Request/Response Models
class RouteAnalysisRequest(BaseModel):
    routes: List[Route]
    vessels: List[Vessel]
    gang_schedules: List[GangSchedule]

class KPICalculationRequest(BaseModel):
    time_period: str = "quarterly"
    include_forecast: bool = True

class StrategicAnalysisRequest(BaseModel):
    ports: List[Port]
    budget_constraint: Optional[float] = None

# API Endpoints

@app.get("/")
async def root():
    return {"message": "Ocean Treasury API - Steel Discharge Optimization"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/routes/analyze")
async def analyze_routes(request: RouteAnalysisRequest):
    """
    Analyze routes for cost optimization and risk assessment
    """
    try:
        analysis_results = []
        
        for route in request.routes:
            # Calculate base costs
            base_cost = calculator.calculate_base_cost(route)
            
            # Calculate risk costs
            risk_cost = risk_analyzer.calculate_risk_cost(route)
            
            # Calculate P95 cost
            p95_cost = calculator.calculate_p95_cost(route, risk_cost)
            
            # Determine recommendation
            recommendation = risk_analyzer.get_route_recommendation(route, risk_cost)
            
            # Calculate savings
            savings = calculator.calculate_potential_savings(route, base_cost, p95_cost)
            
            route_analysis = {
                "id": route.id,
                "name": route.name,
                "base_cost": base_cost,
                "risk_cost": risk_cost,
                "p95_cost": p95_cost,
                "expected_margin": route.expected_margin,
                "disruption_probability": route.disruption_probability,
                "recommendation": recommendation,
                "savings": savings,
                "estimated_days": route.estimated_days
            }
            
            analysis_results.append(route_analysis)
        
        return {"routes": analysis_results}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/kpis/calculate")
async def calculate_kpis(request: KPICalculationRequest):
    """
    Calculate key performance indicators
    """
    try:
        # Get historical data
        historical_data = await data_processor.get_historical_data(request.time_period)
        
        # Calculate KPIs
        total_expected_margin = calculator.calculate_total_expected_margin(historical_data)
        disruption_probability = risk_analyzer.calculate_avg_disruption_probability(historical_data)
        cost_of_uncertainty = calculator.calculate_cost_of_uncertainty(historical_data)
        top_ports_by_risk = risk_analyzer.get_top_risk_ports(historical_data)
        
        # Generate trendline data
        trendline_data = data_processor.generate_trendline_data(historical_data)
        
        kpi_data = KPIData(
            total_expected_margin=total_expected_margin,
            disruption_probability=disruption_probability,
            cost_of_uncertainty=cost_of_uncertainty,
            top_ports_by_risk=top_ports_by_risk,
            trendline_data=trendline_data
        )
        
        return kpi_data.model_dump()
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/forecast/generate")
async def generate_forecast(request: KPICalculationRequest):
    """
    Generate cost exposure forecast
    """
    try:
        # Get baseline data
        baseline_data = await data_processor.get_baseline_data()
        
        # Calculate baseline cost
        baseline_cost = calculator.calculate_baseline_cost(baseline_data)
        
        # Calculate potential savings scenarios
        potential_savings = calculator.calculate_potential_savings_scenarios(baseline_data)
        
        # Generate cost distribution
        cost_distribution = risk_analyzer.generate_cost_distribution(baseline_data)
        
        forecast_data = ForecastData(
            baseline_cost=baseline_cost,
            potential_savings=potential_savings,
            cost_distribution=cost_distribution
        )
        
        return forecast_data.model_dump()
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/strategic/analyze")
async def analyze_strategic_levers(request: StrategicAnalysisRequest):
    """
    Analyze strategic optimization levers
    """
    try:
        strategic_levers = []
        
        for port in request.ports:
            # Analyze relationship investment opportunities
            relationship_lever = risk_analyzer.analyze_relationship_investment(port)
            if relationship_lever:
                strategic_levers.append(relationship_lever)
            
            # Analyze volume consolidation opportunities
            consolidation_lever = risk_analyzer.analyze_volume_consolidation(port)
            if consolidation_lever:
                strategic_levers.append(consolidation_lever)
            
            # Analyze oversight opportunities
            oversight_lever = risk_analyzer.analyze_oversight_investment(port)
            if oversight_lever:
                strategic_levers.append(oversight_lever)
        
        # Filter by budget constraint if provided
        if request.budget_constraint:
            strategic_levers = [
                lever for lever in strategic_levers 
                if lever.investment_required <= request.budget_constraint
            ]
        
        # Sort by ROI
        strategic_levers.sort(key=lambda x: x.roi, reverse=True)
        
        return {"strategic_levers": [lever.model_dump() for lever in strategic_levers]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/sensitivity/analyze")
async def analyze_sensitivity(ports: List[Port]):
    """
    Perform sensitivity analysis for corruption thresholds
    """
    try:
        sensitivity_results = []
        
        for port in ports:
            analysis = risk_analyzer.analyze_corruption_sensitivity(port)
            sensitivity_results.append(analysis.dict())
        
        return {"sensitivity_analysis": sensitivity_results}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ports")
async def get_ports():
    """
    Get list of available ports
    """
    try:
        ports = await data_processor.get_all_ports()
        return {"ports": [port.model_dump() for port in ports]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/vessels")
async def get_vessels():
    """
    Get list of vessels
    """
    try:
        vessels = await data_processor.get_all_vessels()
        return {"vessels": [vessel.model_dump() for vessel in vessels]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
