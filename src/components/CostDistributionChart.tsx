import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CostDistributionData {
  range: string;
  frequency: number;
}

interface CostDistributionChartProps {
  data: CostDistributionData[];
}

const CostDistributionChart: React.FC<CostDistributionChartProps> = ({ data }) => {
  const formatTooltip = (value: any, name: string) => {
    return [`${value}%`, 'Frequency'];
  };

  return (
    <div className="cost-distribution-chart">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          Route Cost Distribution
        </h4>
        <p className="text-sm text-gray-600">
          Histogram showing how risky ports widen cost distribution tails
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="range" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
              label={{ value: 'Frequency (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={formatTooltip}
              labelStyle={{ color: '#333' }}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Bar 
              dataKey="frequency" 
              fill="#00517D" 
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-800">
          <strong>Analysis:</strong> The distribution shows cost volatility across different route scenarios. 
          Wider tails indicate higher risk and potential for significant cost variations.
        </div>
      </div>
    </div>
  );
};

export default CostDistributionChart;

