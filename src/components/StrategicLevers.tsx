import React from 'react';
import { StrategicLever } from '../types/maritime';
import { Users, Package, Eye, TrendingUp } from 'lucide-react';

interface StrategicLeversProps {
  levers: StrategicLever[];
}

const StrategicLevers: React.FC<StrategicLeversProps> = ({ levers }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getLeverIcon = (type: string) => {
    switch (type) {
      case 'relationship':
        return <Users className="text-blue-600" size={20} />;
      case 'consolidation':
        return <Package className="text-green-600" size={20} />;
      case 'oversight':
        return <Eye className="text-purple-600" size={20} />;
      default:
        return <TrendingUp className="text-gray-600" size={20} />;
    }
  };

  const getLeverColor = (type: string) => {
    switch (type) {
      case 'relationship':
        return 'text-blue-600 bg-blue-50';
      case 'consolidation':
        return 'text-green-600 bg-green-50';
      case 'oversight':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getLeverTitle = (type: string) => {
    switch (type) {
      case 'relationship':
        return 'Relationship Investment';
      case 'consolidation':
        return 'Volume Consolidation';
      case 'oversight':
        return 'Enhanced Oversight';
      default:
        return 'Strategic Initiative';
    }
  };

  // Mock data for demonstration
  const mockLevers: StrategicLever[] = [
    {
      id: '1',
      type: 'relationship',
      port: {
        id: '1',
        name: 'Port X',
        country: 'Country X',
        region: 'Region X',
        coordinates: { lat: 0, lng: 0 }
      },
      description: 'Invest in local relationships to reduce bribe frequency',
      potentialSavings: 15000,
      investmentRequired: 5000,
      roi: 200
    },
    {
      id: '2',
      type: 'consolidation',
      port: {
        id: '2',
        name: 'Port Y',
        country: 'Country Y',
        region: 'Region Y',
        coordinates: { lat: 0, lng: 0 }
      },
      description: 'Consolidate volume with alternate carriers for better reliability',
      potentialSavings: 25000,
      investmentRequired: 8000,
      roi: 212.5
    },
    {
      id: '3',
      type: 'oversight',
      port: {
        id: '3',
        name: 'Port Z',
        country: 'Country Z',
        region: 'Region Z',
        coordinates: { lat: 0, lng: 0 }
      },
      description: 'Implement enhanced oversight to reduce corruption costs',
      potentialSavings: 12000,
      investmentRequired: 3000,
      roi: 300
    }
  ];

  const displayLevers = levers.length > 0 ? levers : mockLevers;

  return (
    <div className="strategic-levers">
      
      <div className="space-y-4">
        {displayLevers.map((lever) => (
          <div key={lever.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${getLeverColor(lever.type).split(' ')[1]} border border-gray-200`}>
                  {getLeverIcon(lever.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {getLeverTitle(lever.type)}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {lever.port.name}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {lever.description}
                  </p>
                  <div className="grid-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Potential Savings</div>
                      <div className="text-lg font-semibold text-green-600">
                        {formatCurrency(lever.potentialSavings)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Investment Required</div>
                      <div className="text-lg font-semibold text-blue-600">
                        {formatCurrency(lever.investmentRequired)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">ROI</div>
                      <div className="text-lg font-semibold text-purple-600">
                        {formatPercentage(lever.roi)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Priority Score</div>
                <div className="text-2xl font-bold text-gray-800">
                  {Math.round((lever.potentialSavings / lever.investmentRequired) * 10)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {displayLevers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No strategic levers identified
        </div>
      )}
    </div>
  );
};

export default StrategicLevers;
