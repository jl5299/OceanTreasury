import React, { useState, useEffect } from 'react';
import { Route, KPIData, ForecastData, StrategicLever, SensitivityAnalysis } from '../types/maritime';
import RouteScorecard from './RouteScorecard';
import KPICards from './KPICards';
import ForecastSection from './ForecastSection';
import StrategicLevers from './StrategicLevers';
import CostDistributionChart from './CostDistributionChart';
import TrendlineChart from './TrendlineChart';
import ExcelCalculator from './ExcelCalculator';
import { apiService } from '../services/api';

const Dashboard: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [strategicLevers, setStrategicLevers] = useState<StrategicLever[]>([]);
  const [sensitivityAnalysis, setSensitivityAnalysis] = useState<SensitivityAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all dashboard data in parallel
      const [kpiResponse, forecastResponse, portsResponse] = await Promise.all([
        apiService.calculateKPIs(),
        apiService.generateForecast(),
        apiService.getPorts()
      ]);

      // Set KPI data
      if (kpiResponse) {
        setKpiData(kpiResponse);
      }

      // Set forecast data
      if (forecastResponse) {
        setForecastData(forecastResponse);
      }

      // Load strategic levers if we have ports
      if (portsResponse?.ports) {
        const strategicResponse = await apiService.analyzeStrategicLevers({
          ports: portsResponse.ports
        });
        
        if (strategicResponse?.strategic_levers) {
          setStrategicLevers(strategicResponse.strategic_levers);
        }
      }

      // Mock route data for demonstration
      const mockRoutes: Route[] = [
        {
          id: '1',
          name: 'Port X',
          originPort: { id: '1', name: 'Singapore', country: 'Singapore', region: 'Asia', coordinates: { lat: 1.3521, lng: 103.8198 } },
          destinationPort: { id: '2', name: 'Port X', country: 'Country X', region: 'Region X', coordinates: { lat: 0, lng: 0 } },
          distance: 1200,
          estimatedDays: 16.1,
          baseCost: 206000,
          riskCost: 9000,
          p95Cost: 235000,
          expectedMargin: 15000,
          disruptionProbability: 25,
          recommendation: 'avoid',
          savings: -5000
        },
        {
          id: '2',
          name: 'Port Y',
          originPort: { id: '1', name: 'Singapore', country: 'Singapore', region: 'Asia', coordinates: { lat: 1.3521, lng: 103.8198 } },
          destinationPort: { id: '3', name: 'Port Y', country: 'Country Y', region: 'Region Y', coordinates: { lat: 0, lng: 0 } },
          distance: 1100,
          estimatedDays: 15.4,
          baseCost: 201000,
          riskCost: 4000,
          p95Cost: 217000,
          expectedMargin: 18000,
          disruptionProbability: 12,
          recommendation: 'use',
          savings: 5000
        }
      ];

      setRoutes(mockRoutes);
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="dashboard-card">
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '24px', color: '#00517D' }}>Loading dashboard data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-content">
        <div className="dashboard-card">
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '24px', color: '#dc2626', marginBottom: '20px' }}>Error</div>
            <div style={{ fontSize: '16px', color: '#666' }}>{error}</div>
            <button 
              onClick={loadDashboardData}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#00517D',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      {/* Header */}
      <div className="dashboard-header">
        <img src="/assets/logo.webp" alt="Ocean Treasury Logo" className="dashboard-logo" />
        <h1 className="dashboard-title">Parcel Optimizer</h1>
      </div>

      {/* Port Discharge Plan */}
      <div className="dashboard-card">
        <h2 className="card-title">Port Discharge Plan</h2>
        <ExcelCalculator />
      </div>

      {/* Route Scorecard */}
      <div className="dashboard-card">
        <h2 className="card-title">Route Scorecard</h2>
        <RouteScorecard routes={routes} />
      </div>

      {/* Key KPIs */}
      <div className="dashboard-card">
        <h2 className="card-title">Key Performance Indicators</h2>
        {kpiData && <KPICards data={kpiData} />}
      </div>

      {/* Forecast Section */}
      <div className="dashboard-card">
        <h2 className="card-title">Cost Exposure Forecast</h2>
        {forecastData && <ForecastSection data={forecastData} />}
      </div>

      {/* Visualizations */}
      <div className="grid-2">
        <div className="dashboard-card">
          <h3 className="card-title">Cost Distribution Analysis</h3>
          {forecastData && <CostDistributionChart data={forecastData.costDistribution} />}
        </div>
        
        <div className="dashboard-card">
          <h3 className="card-title">Performance Trendline</h3>
          {kpiData && <TrendlineChart data={kpiData.trendlineData} />}
        </div>
      </div>

      {/* Operations Tasks */}
      <div className="dashboard-card">
        <h2 className="card-title">Operations Tasks</h2>
        <StrategicLevers levers={strategicLevers} />
      </div>
    </div>
  );
};

export default Dashboard;