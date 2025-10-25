import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TrendlineData {
  date: string;
  expected: number;
  realized: number;
}

interface TrendlineChartProps {
  data: TrendlineData[];
}

const TrendlineChart: React.FC<TrendlineChartProps> = ({ data }) => {
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltip = (value: any, name: string) => {
    const label = name === 'expected' ? 'Expected' : 'Realized';
    return [formatCurrency(value), label];
  };

  const formatXAxisLabel = (tickItem: string) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  return (
    <div className="trendline-chart">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          Expected vs. Realized Performance
        </h4>
        <p className="text-sm text-gray-600">
          Track if corruption or weather patterns are worsening over time
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
              tickFormatter={formatXAxisLabel}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              label={{ value: 'Cost ($K)', angle: -90, position: 'insideLeft' }}
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
            <Legend />
            <Line 
              type="monotone" 
              dataKey="expected" 
              stroke="#00517D" 
              strokeWidth={3}
              dot={{ fill: '#00517D', strokeWidth: 2, r: 4 }}
              name="Expected"
            />
            <Line 
              type="monotone" 
              dataKey="realized" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Realized"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>Expected Performance:</strong> Model predictions based on historical data and risk factors
          </div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-sm text-green-800">
            <strong>Realized Performance:</strong> Actual costs incurred, showing model accuracy
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendlineChart;

