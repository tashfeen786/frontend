'use client';

import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export default function PriceCard({ data }) {
  if (!data) return null;

  const cards = [
    {
      title: 'Current Price',
      value: `$${data.price.toFixed(6)}`,
      icon: DollarSign,
      color: 'purple',
      bgGradient: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/50',
      iconColor: 'text-purple-400',
    },
    {
      title: '24h Change',
      value: `${data.price_change_24h >= 0 ? '+' : ''}${data.price_change_24h.toFixed(2)}%`,
      icon: data.price_change_24h >= 0 ? TrendingUp : TrendingDown,
      color: data.price_change_24h >= 0 ? 'green' : 'red',
      bgGradient: data.price_change_24h >= 0 ? 'from-green-500/20 to-green-600/20' : 'from-red-500/20 to-red-600/20',
      borderColor: data.price_change_24h >= 0 ? 'border-green-500/50' : 'border-red-500/50',
      iconColor: data.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400',
      valueColor: data.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400',
    },
    {
      title: '24h Volume',
      value: `$${(data.volume_24h / 1000000).toFixed(2)}M`,
      icon: Activity,
      color: 'blue',
      bgGradient: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/50',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Liquidity',
      value: `$${(data.liquidity / 1000000).toFixed(2)}M`,
      icon: DollarSign,
      color: 'orange',
      bgGradient: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-500/50',
      iconColor: 'text-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.bgGradient} backdrop-blur-md rounded-xl p-5 border-2 ${card.borderColor} shadow-lg hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-300 text-sm font-medium">{card.title}</p>
              <Icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <p className={`text-2xl font-bold ${card.valueColor || 'text-white'}`}>
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}