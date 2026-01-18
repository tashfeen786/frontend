'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartComponent({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl flex items-center justify-center h-64">
        <p className="text-gray-400">No historical data available yet</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl p-4 shadow-xl">
          <p className="text-white font-semibold mb-2">{payload[0].payload.time}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value.toFixed(4)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Price History & Analysis</h3>
        <span className="text-xs text-gray-400 bg-slate-700/50 px-3 py-1 rounded-full">
          Last {data.length} hours
        </span>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF" 
            style={{ fontSize: '12px' }}
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#8b5cf6' }}
            activeDot={{ r: 6 }}
            name="Price ($)" 
          />
          <Line 
            type="monotone" 
            dataKey="volume" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ r: 3, fill: '#10b981' }}
            name="Volume (M)" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}