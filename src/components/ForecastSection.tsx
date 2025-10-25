import React from 'react';
import { ForecastData } from '../types/maritime';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface ForecastSectionProps {
  data: ForecastData;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const forecastCards = [
    {
      title: 'Baseline Cost Exposure',
      value: formatCurrency(data?.baselineCost || 0),
      subtitle: 'Expected total cost next quarter',
      icon: <DollarSign className="text-blue-600" size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Best Case Savings',
      value: formatCurrency(data?.potentialSavings?.bestCase || 0),
      subtitle: 'If switching to optimal routes',
      icon: <TrendingUp className="text-green-600" size={24} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Expected Savings',
      value: formatCurrency(data?.potentialSavings?.expected || 0),
      subtitle: 'Most likely scenario',
      icon: <TrendingUp className="text-blue-600" size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Worst Case Savings',
      value: formatCurrency(data?.potentialSavings?.worstCase || 0),
      subtitle: 'Conservative estimate',
      icon: <TrendingDown className="text-orange-600" size={24} />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="forecast-section">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          "If we do nothing" forecast
        </h3>
        <p className="text-gray-600">
          Expected cost exposure and potential savings from route optimization
        </p>
      </div>
      
      <div className="grid-4">
        {forecastCards.map((card, index) => (
          <div key={index} className={`${card.bgColor} rounded-xl p-6 border border-gray-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor} border border-gray-200`}>
                {card.icon}
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {card.subtitle}
                </div>
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 text-lg">
              {card.title}
            </h4>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Key Insights
        </h4>
        <div className="grid-2 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">Risk-Adjusted ROI</div>
            <div className="text-2xl font-bold text-green-600">
              {data?.baselineCost && data?.potentialSavings?.expected 
                ? ((data.potentialSavings.expected / data.baselineCost) * 100).toFixed(1)
                : '0.0'
              }%
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Savings Range</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(data?.potentialSavings?.worstCase || 0)} - {formatCurrency(data?.potentialSavings?.bestCase || 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastSection;
