import React from 'react';
import { Route } from '../types/maritime';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface RouteScorecardProps {
  routes: Route[];
}

const RouteScorecard: React.FC<RouteScorecardProps> = ({ routes }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'use':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'avoid':
        return <XCircle className="text-red-500" size={20} />;
      case 'caution':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      default:
        return null;
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'use':
        return '✅ Use';
      case 'avoid':
        return '⚠️ Avoid';
      case 'caution':
        return '⚠️ Caution';
      default:
        return '';
    }
  };

  const getSavingsColor = (savings: number) => {
    return savings >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getSavingsSign = (savings: number) => {
    return savings >= 0 ? '+' : '';
  };

  return (
    <div className="route-scorecard">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-lg">Route</th>
              <th className="text-right py-4 px-6 font-semibold text-lg">Avg Cost</th>
              <th className="text-right py-4 px-6 font-semibold text-lg">Risk Cost</th>
              <th className="text-right py-4 px-6 font-semibold text-lg">P95 Cost</th>
              <th className="text-right py-4 px-6 font-semibold text-lg">Expected Days</th>
              <th className="text-center py-4 px-6 font-semibold text-lg">Recommendation</th>
              <th className="text-right py-4 px-6 font-semibold text-lg">Savings vs. Current</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="font-medium text-lg">{route.name}</div>
                  <div className="text-sm text-gray-500">
                    {route.originPort.name} → {route.destinationPort.name}
                  </div>
                </td>
                <td className="text-right py-4 px-6 font-medium text-lg">
                  {formatCurrency(route.baseCost)}
                </td>
                <td className="text-right py-4 px-6 text-lg">
                  {formatCurrency(route.riskCost)}
                </td>
                <td className="text-right py-4 px-6 font-medium text-lg">
                  {formatCurrency(route.p95Cost)}
                </td>
                <td className="text-right py-4 px-6 text-lg">
                  {route.estimatedDays.toFixed(1)}
                </td>
                <td className="text-center py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    {getRecommendationIcon(route.recommendation)}
                    <span className="text-sm font-medium">
                      {getRecommendationText(route.recommendation)}
                    </span>
                  </div>
                </td>
                <td className={`text-right py-4 px-6 font-medium text-lg ${getSavingsColor(route.savings)}`}>
                  {getSavingsSign(route.savings)}{formatCurrency(Math.abs(route.savings))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {routes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No route data available
        </div>
      )}
    </div>
  );
};

export default RouteScorecard;

