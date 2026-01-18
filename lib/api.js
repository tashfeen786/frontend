'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Zap, Brain, Target, Shield, Clock, ArrowRight, Sparkles, AlertCircle, BarChart3, Waves, Rocket, Cpu, Database } from 'lucide-react';
import { fetchPredictions, fetchHistory } from '@/lib/api';

export default function UltraModernDashboard() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeToken, setActiveToken] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [priceData, setPriceData] = useState([]);

  // Fix hydration error - update time only on client
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnalyze = async () => {
    if (!tokenAddress.trim()) {
      setError('Please enter a token address');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Fetch REAL predictions from backend
      const response = await fetchPredictions(tokenAddress);
      
      console.log('API Response:', response);
      
      // Set predictions from real API
      setPredictions(response.predictions);
      
      // Set active token data
      setActiveToken({
        price: response.current_data.price,
        change24h: response.current_data.price_change_24h,
        volume: response.current_data.volume_24h / 1000000, // Convert to millions
        liquidity: response.current_data.liquidity / 1000000, // Convert to millions
      });

      // Process OHLCV data for charts
      if (response.current_data.ohlcv && response.current_data.ohlcv.length > 0) {
        const chartData = response.current_data.ohlcv.slice(-24).map(item => ({
          time: new Date(item.unixTime * 1000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          price: item.c,
          volume: item.v / 1000000,
        }));
        setPriceData(chartData);
      }

      // Try to fetch historical predictions
      try {
        const history = await fetchHistory(tokenAddress, 24);
        console.log('Historical data:', history);
      } catch (histErr) {
        console.log('No historical data yet');
      }

    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.detail || 
        'Failed to fetch predictions. Make sure backend is running on port 8000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const quickTokens = [
    { name: 'SOL', icon: '◎', gradient: 'from-purple-500 to-violet-600', address: 'So11111111111111111111111111111111111111112' },
    { name: 'USDC', icon: '$', gradient: 'from-blue-500 to-cyan-600', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
    { name: 'BONK', icon: '🐕', gradient: 'from-orange-500 to-red-600', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Gradient Orbs */}
      <div className="fixed top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="fixed top-0 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="fixed -bottom-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
        {/* Top Navigation Bar */}
        <nav className="flex items-center justify-between mb-12 p-4 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Brain className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">ML Predictor</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentTime || '--:--:--'}</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-zinc-400">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Trading
            </span>
            <br />
            <span className="text-white">Intelligence</span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Predict market movements with machine learning precision
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { value: '99.2%', label: 'Accuracy', icon: Target },
              { value: '3', label: 'Models', icon: Cpu },
              { value: '24/7', label: 'Active', icon: Database },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="p-4 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl">
                  <Icon className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-zinc-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Input Card */}
        <div className="mb-8 bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Token Analysis</h2>
              <p className="text-sm text-zinc-400">Enter token address for instant predictions</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Paste Solana token address..."
                className="w-full bg-black/50 border border-zinc-800 focus:border-purple-500 rounded-2xl px-6 py-5 pr-32 text-white placeholder-zinc-600 focus:outline-none transition-all"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-zinc-700 disabled:to-zinc-800 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-zinc-500">Quick select:</span>
              {quickTokens.map((token) => (
                <button
                  key={token.name}
                  onClick={() => setTokenAddress(token.address)}
                  className={`px-4 py-2 bg-gradient-to-r ${token.gradient} rounded-xl text-white font-medium hover:scale-105 transition-transform flex items-center gap-2`}
                >
                  <span className="text-lg">{token.icon}</span>
                  <span>{token.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Market Data Cards */}
        {activeToken && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Price', value: `$${activeToken.price.toFixed(6)}`, icon: Activity, color: 'purple' },
              { label: '24h Change', value: `${activeToken.change24h >= 0 ? '+' : ''}${activeToken.change24h.toFixed(2)}%`, icon: activeToken.change24h >= 0 ? TrendingUp : TrendingDown, color: activeToken.change24h >= 0 ? 'green' : 'red' },
              { label: 'Volume', value: `$${activeToken.volume.toFixed(2)}M`, icon: BarChart3, color: 'blue' },
              { label: 'Liquidity', value: `$${activeToken.liquidity.toFixed(2)}M`, icon: Waves, color: 'pink' },
            ].map((item, i) => {
              const Icon = item.icon;
              const colorMap = {
                purple: 'text-purple-400',
                green: 'text-green-400',
                red: 'text-red-400',
                blue: 'text-blue-400',
                pink: 'text-pink-400',
              };
              return (
                <div key={i} className="group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all hover:scale-105">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-zinc-500">{item.label}</span>
                    <Icon className={`w-5 h-5 ${colorMap[item.color]}`} />
                  </div>
                  <div className={`text-3xl font-bold ${colorMap[item.color]}`}>{item.value}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Predictions Grid - REAL DATA */}
        {predictions && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* ATR Regime - REAL */}
              <div className="group relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 hover:border-purple-500/50 rounded-3xl p-8 transition-all hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <Activity className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">ATR Regime</h3>
                      <p className="text-xs text-zinc-500">Volatility Analysis</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {predictions.atr_regime.value}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Confidence</span>
                      <span className="text-2xl font-bold text-white">{predictions.atr_regime.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000"
                        style={{ width: `${predictions.atr_regime.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trend Label - REAL */}
              <div className="group relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 hover:border-green-500/50 rounded-3xl p-8 transition-all hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Trend Label</h3>
                      <p className="text-xs text-zinc-500">Market Direction</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {predictions.trend_label.value}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Confidence</span>
                      <span className="text-2xl font-bold text-white">{predictions.trend_label.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full transition-all duration-1000"
                        style={{ width: `${predictions.trend_label.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trend Inversion - REAL */}
              <div className="group relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 hover:border-cyan-500/50 rounded-3xl p-8 transition-all hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-500/20 rounded-xl">
                      <AlertCircle className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Trend Inversion</h3>
                      <p className="text-xs text-zinc-500">Reversal Risk</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {predictions.trend_inversion.value}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Confidence</span>
                      <span className="text-2xl font-bold text-white">{predictions.trend_inversion.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${predictions.trend_inversion.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section - REAL DATA */}
            {priceData.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Price Chart */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    Price Action (24h)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={priceData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="time" stroke="#71717a" />
                      <YAxis stroke="#71717a" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#18181b', 
                          border: '1px solid #27272a',
                          borderRadius: '12px' 
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#a855f7" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Volume Chart */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    Volume Analysis (24h)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={priceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="time" stroke="#71717a" />
                      <YAxis stroke="#71717a" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#18181b', 
                          border: '1px solid #27272a',
                          borderRadius: '12px' 
                        }} 
                      />
                      <Bar 
                        dataKey="volume" 
                        fill="url(#colorVolume)" 
                        radius={[8, 8, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="text-center py-8 border-t border-zinc-900">
          <div className="flex items-center justify-center gap-3 text-zinc-500 text-sm">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Powered by Machine Learning</span>
            <span>•</span>
            <span>Real-time Data from Birdeye.so</span>
          </div>
        </footer>
      </div>
    </div>
  );
}