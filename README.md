# Ocean Treasury - Steel Discharge Optimization Dashboard

A comprehensive React/TypeScript dashboard for steel discharge optimization in maritime operations, designed for General Managers of steel shipping companies.

## Features

### 🚢 Operational Dashboard
- **Route Scorecard**: Compare routes by cost, risk, and recommendations
- **Key Performance Indicators**: Track margins, disruption probability, and uncertainty costs
- **Cost Exposure Forecast**: "If we do nothing" scenario analysis
- **Strategic Levers**: Investment opportunities for cost reduction

### 📊 Analytics & Visualizations
- **Cost Distribution Analysis**: Histogram showing route cost volatility
- **Performance Trendline**: Expected vs. realized cost tracking
- **Risk Assessment**: Quantified uncertainty as dollars
- **Sensitivity Analysis**: Corruption threshold analysis

### 🎯 Strategic Insights
- **Port Risk Ranking**: Top 5 ports by risk-adjusted cost
- **Investment ROI**: Strategic levers with quantified returns
- **Savings Potential**: Best case, expected, and worst case scenarios
- **Contract Negotiation Support**: Data-driven pricing decisions

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Recharts** for data visualization
- **Lucide React** for icons
- **Axios** for API communication
- **CSS3** with responsive design

### Backend
- **FastAPI** (Python) for REST API
- **Pandas & NumPy** for data processing
- **Scikit-learn** for risk analysis
- **Pydantic** for data validation

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start API server
python main.py
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Dashboard Sections

### 1. Route Scorecard
Compare different shipping routes with:
- Average cost per route
- Risk cost assessment
- P95 cost (95th percentile)
- Expected transit days
- Recommendations (Use/Avoid/Caution)
- Potential savings vs. current operations

### 2. Key Performance Indicators
- **Total Expected Margin**: Per ton shipped
- **Disruption Probability**: Average across all routes
- **Cost of Uncertainty**: Risk premium per ton
- **Top Risk Ports**: Ports requiring attention

### 3. Cost Exposure Forecast
- **Baseline Cost**: Expected total cost next quarter
- **Potential Savings**: Best case, expected, and worst case scenarios
- **Risk-Adjusted ROI**: Return on investment calculations
- **Savings Range**: Minimum to maximum potential savings

### 4. Strategic Optimization Levers
Investment opportunities including:
- **Relationship Investment**: Reduce bribe frequency
- **Volume Consolidation**: Improve reliability with alternate carriers
- **Enhanced Oversight**: Reduce corruption costs
- **ROI Analysis**: Quantified returns on investments

## API Endpoints

### Core Analytics
- `POST /api/routes/analyze` - Analyze route costs and risks
- `POST /api/kpis/calculate` - Calculate key performance indicators
- `POST /api/forecast/generate` - Generate cost exposure forecast

### Strategic Analysis
- `POST /api/strategic/analyze` - Analyze strategic optimization levers
- `POST /api/sensitivity/analyze` - Corruption threshold sensitivity analysis

### Data Access
- `GET /api/ports` - Get available ports
- `GET /api/vessels` - Get vessel information

## Business Value

### For General Managers
1. **Quantifies Uncertainty**: Converts vague risk into dollar amounts
2. **Supports Defensible Decisions**: Data-driven routing choices
3. **Improves Contract Negotiations**: Risk-adjusted pricing
4. **Enables Accountability**: Track model accuracy over time
5. **Feeds Pricing Strategy**: Risk-adjusted cost calculations

### Key Benefits
- **Risk Quantification**: "Port X adds $12,000 expected risk cost per shipment"
- **ROI Trade-offs**: Clear investment decisions with quantified returns
- **Contract Leverage**: Negotiate better rates with shipping lines and insurers
- **Margin Control**: Risk-adjusted pricing for freight
- **Performance Tracking**: Monitor if predictions match reality

## Data Models

### Core Entities
- **Port**: Location with corruption index and reliability scores
- **Route**: Origin-destination with cost and risk calculations
- **Vessel**: Ship specifications and operational costs
- **Gang Schedule**: Port operations with cost per gang

### Analytics Models
- **KPIData**: Performance indicators and trendline data
- **ForecastData**: Cost exposure and savings scenarios
- **StrategicLever**: Investment opportunities with ROI
- **SensitivityAnalysis**: Corruption threshold analysis

## Development

### Project Structure
```
OceanTreasury/
├── src/
│   ├── components/          # React components
│   ├── services/           # API services
│   ├── types/              # TypeScript interfaces
│   └── App.tsx             # Main application
├── backend/
│   ├── models/             # Data models
│   ├── services/           # Business logic
│   └── main.py             # FastAPI application
├── assets/                 # Images and static files
└── public/                # Public assets
```

### Key Components
- **Dashboard**: Main dashboard container
- **RouteScorecard**: Route comparison table
- **KPICards**: Performance indicator cards
- **ForecastSection**: Cost exposure analysis
- **StrategicLevers**: Investment opportunities
- **Charts**: Cost distribution and trendline visualizations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for Ocean Treasury maritime operations.

## Support

For technical support or questions:
- Email: contact@oceantreasury.com
- Documentation: See API docs at `/docs` endpoint