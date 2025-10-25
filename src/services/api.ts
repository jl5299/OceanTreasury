import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface RouteAnalysisRequest {
  routes: any[];
  vessels: any[];
  gang_schedules: any[];
}

export interface KPICalculationRequest {
  time_period?: string;
  include_forecast?: boolean;
}

export interface StrategicAnalysisRequest {
  ports: any[];
  budget_constraint?: number;
}

export const apiService = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Route analysis
  analyzeRoutes: async (request: RouteAnalysisRequest) => {
    const response = await api.post('/api/routes/analyze', request);
    return response.data;
  },

  // KPI calculations
  calculateKPIs: async (request: KPICalculationRequest = {}) => {
    const response = await api.post('/api/kpis/calculate', request);
    return response.data;
  },

  // Forecast generation
  generateForecast: async (request: KPICalculationRequest = {}) => {
    const response = await api.post('/api/forecast/generate', request);
    return response.data;
  },

  // Strategic analysis
  analyzeStrategicLevers: async (request: StrategicAnalysisRequest) => {
    const response = await api.post('/api/strategic/analyze', request);
    return response.data;
  },

  // Sensitivity analysis
  analyzeSensitivity: async (ports: any[]) => {
    const response = await api.post('/api/sensitivity/analyze', ports);
    return response.data;
  },

  // Get ports
  getPorts: async () => {
    const response = await api.get('/api/ports');
    return response.data;
  },

  // Get vessels
  getVessels: async () => {
    const response = await api.get('/api/vessels');
    return response.data;
  },
};

export default api;

