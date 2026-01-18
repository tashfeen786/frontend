'use client';

import { Activity, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function PredictionCard({ title, subtitle, prediction, iconType }) {
  if (!prediction) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gray-500/20 rounded-lg">
            {iconType === 'activity' && <Activity className="w-6 h-6 text-gray-400" />}
            {iconType === 'trend' && <TrendingUp className="w-6 h-6 text-gray-400" />}
            {iconType === 'alert' && <AlertCircle className="w-6 h-6 text-gray-400" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-20">
          <p className="text-gray-500">Awaiting prediction...</p>
        </div>
      </div>
    );
  }

  const getColors = (value) => {
    if (value === 'Bullish' || value === 'High Volatility' || value === 'Likely') {
      return {
        text: 'text-green-400',
        bg: 'from-green-500/20 to-green-600/20',
        border: 'border-green-500/50',
        icon: 'text-green-400',
        progress: 'bg-green-500',
      };
    }
    if (value === 'Bearish' || value === 'Low Volatility' || value === 'Unlikely') {
      return {
        text: 'text-red-400',
        bg: 'from-red-500/20 to-red-600/20',
        border: 'border-red-500/50',
        icon: 'text-red-400',
        progress: 'bg-red-500',
      };
    }
    return {
      text: 'text-yellow-400',
      bg: 'from-yellow-500/20 to-yellow-600/20',
      border: 'border-yellow-500/50',
      icon: 'text-yellow-400',
      progress: 'bg-yellow-500',
    };
  };

  const colors = getColors(prediction.value);

  return (
    <div className={`bg-gradient-to-br ${colors.bg} backdrop-blur-md rounded-2xl p-6 border-2 ${colors.border} shadow-xl hover:scale-105 transition-transform duration-300`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-slate-800/50 rounded-lg">
          {iconType === 'activity' && <Activity className={`w-6 h-6 ${colors.icon}`} />}
          {iconType === 'trend' && (prediction.value === 'Bullish' ? 
            <TrendingUp className={`w-6 h-6 ${colors.icon}`} /> : 
            <TrendingDown className={`w-6 h-6 ${colors.icon}`} />
          )}
          {iconType === 'alert' && <AlertCircle className={`w-6 h-6 ${colors.icon}`} />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">Prediction</p>
          <p className={`text-3xl font-bold ${colors.text}`}>
            {prediction.value}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Confidence:</span>
          <span className="text-lg font-semibold text-white">{prediction.confidence.toFixed(1)}%</span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full ${colors.progress} transition-all duration-1000 ease-out`}
            style={{ width: `${prediction.confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}