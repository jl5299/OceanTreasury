import React from 'react';
import { KPIData } from '../types/maritime';
import { TrendingUp, AlertTriangle, DollarSign, MapPin } from 'lucide-react';

interface KPICardsProps {
  data: KPIData;
}

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number | undefined) => {
    if (value === undefined || value === null) return '0.0%';
    return `${value.toFixed(1)}%`;
  };

  const kpiCards = [
    {
      title: 'Total Expected Margin',
      value: formatCurrency(data?.totalExpectedMargin || 0),
      subtitle: 'Per ton shipped',
      icon: <DollarSign className="text-blue-600" size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Disruption Probability',
      value: formatPercentage(data?.disruptionProbability),
      subtitle: 'Average across all routes',
      icon: <AlertTriangle className="text-orange-600" size={24} />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Cost of Uncertainty',
      value: formatCurrency(data?.costOfUncertainty || 0),
      subtitle: 'Risk premium per ton',
      icon: <TrendingUp className="text-red-600" size={24} />,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Top Risk Ports',
      value: (data?.topPortsByRisk?.length || 0).toString(),
      subtitle: 'Ports requiring attention',
      icon: <MapPin className="text-purple-600" size={24} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid-4">
      {kpiCards.map((kpi, index) => (
        <div key={index} className={`${kpi.bgColor} rounded-xl p-6 border border-gray-200`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${kpi.bgColor} border border-gray-200`}>
              {kpi.icon}
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${kpi.color}`}>
                {kpi.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {kpi.subtitle}
              </div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">
            {kpi.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
