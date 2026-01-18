'use client';

import { useState } from 'react';
import { Search, RefreshCw, Zap } from 'lucide-react';

export default function TokenInput({ onFetch, loading }) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!tokenAddress.trim()) {
      setError('Please enter a token address');
      return;
    }

    if (tokenAddress.length < 32) {
      setError('Invalid Solana address');
      return;
    }

    setError('');
    onFetch(tokenAddress);
  };

  const popularTokens = [
    { name: 'SOL', address: 'So11111111111111111111111111111111111111112', icon: '◎' },
    { name: 'USDC', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', icon: '$' },
    { name: 'BONK', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', icon: '🐕' },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-2xl p-6 border border-slate-600 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Zap className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Token Analysis</h2>
          <p className="text-gray-400 text-sm">Enter Solana token address for AI predictions</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Token Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Enter Solana token address..."
              className="w-full px-4 py-3 pl-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
          {error && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span> {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Analyzing...' : 'Get AI Predictions'}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Quick select popular tokens:
        </p>
        <div className="flex flex-wrap gap-2">
          {popularTokens.map((token) => (
            <button
              key={token.address}
              onClick={() => setTokenAddress(token.address)}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/70 border border-slate-600 hover:border-purple-500/50 rounded-lg text-sm text-gray-300 transition-all flex items-center gap-2"
            >
              <span className="text-lg">{token.icon}</span>
              <span className="font-medium">{token.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}