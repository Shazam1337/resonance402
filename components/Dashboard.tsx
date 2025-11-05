'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResonanceStore } from '@/lib/store'

export default function Dashboard() {
  const {
    vaultEnergy,
    vaultGrowthRate,
    vaultResonanceLevel,
    tradingVolume24h,
    tradingVolumeGrowth,
    volumeToFeeRatio,
    activeNodes,
    nodesGrowth,
    resonanceIndex,
    recentTransactions,
    rewards,
    socialWaves,
    updateVault,
    updateNetwork,
    addTransaction,
    addSocialWave,
    addReward,
  } = useResonanceStore()
  
  const [vaultFlash, setVaultFlash] = useState(false)
  const [dataPoints, setDataPoints] = useState<number[]>([])
  const [wavePoints, setWavePoints] = useState<number[]>([])
  const prevVaultRef = useRef(vaultEnergy)

  // Update vault constantly (every 200ms for faster growth)
  useEffect(() => {
    prevVaultRef.current = vaultEnergy
    
    const interval = setInterval(() => {
      updateVault()
    }, 200)
    
    return () => clearInterval(interval)
  }, [updateVault])
  
  // Separate effect for flash detection
  useEffect(() => {
    if (vaultEnergy - prevVaultRef.current > 0.001) {
      setVaultFlash(true)
      setTimeout(() => setVaultFlash(false), 300)
    }
    prevVaultRef.current = vaultEnergy
  }, [vaultEnergy])

  // Update network metrics (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      updateNetwork()
    }, 3000)
    return () => clearInterval(interval)
  }, [updateNetwork])

  // Add new transactions (every 2-3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const types: ('vault_fee' | 'wave_impact' | 'node_signal')[] = ['vault_fee', 'wave_impact', 'node_signal']
      const descriptions = [
        'Vault fee update',
        `Wave '${socialWaves[0]?.name || 'Nova'}' impact`,
        `Node ${Math.random().toString(36).substring(2, 6)} posted new signal`,
      ]
      const type = types[Math.floor(Math.random() * types.length)]
      
      addTransaction({
        id: Date.now().toString(),
        type,
        amount: Math.random() * 0.05 + 0.001,
        description: descriptions[types.indexOf(type)],
        timestamp: Date.now(),
      })
    }, 2000 + Math.random() * 1000)
    return () => clearInterval(interval)
  }, [addTransaction, socialWaves])

  // Add new social waves (every 3-5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const waveNames = ['SOL Rising', 'Vault Storm', 'Echo Pulse', 'Nova Wave', 'Resonance Peak']
      const name = waveNames[Math.floor(Math.random() * waveNames.length)]
      
      addSocialWave({
        id: Date.now().toString(),
        name,
        volumeGrowth: Math.random() * 5 + 1,
        solImpact: Math.random() * 0.1 + 0.01,
        socialResonance: Math.random() * 10 + 2,
        status: Math.random() > 0.7 ? 'cooling' : 'active',
        timestamp: Date.now(),
      })
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [addSocialWave])

  // Add new rewards (every 4-7 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const usernames = ['@solverse', '@vaultnode', '@wavealpha', '@resonance', '@solflow']
      const username = usernames[Math.floor(Math.random() * usernames.length)]
      
      addReward({
        id: Date.now().toString(),
        username,
        amount: Math.random() * 0.3 + 0.1,
        timestamp: Date.now(),
      })
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(interval)
  }, [addReward])

  // Initialize and update trading volume chart data
  useEffect(() => {
    // Initialize with some data points if empty
    if (dataPoints.length === 0) {
      const initialPoints = Array.from({ length: 30 }, (_, i) => {
        return tradingVolume24h + Math.sin(i / 5) * 2
      })
      setDataPoints(initialPoints)
    }
    
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        if (prev.length === 0) {
          // If still empty, create initial points
          return Array.from({ length: 30 }, (_, i) => {
            return tradingVolume24h + Math.sin(i / 5) * 2
          })
        }
        const newPoint = tradingVolume24h + (Math.random() - 0.3) * 0.2
        return [...prev.slice(-29), newPoint] // Keep last 30 points
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [tradingVolume24h, dataPoints.length])

  // Update resonance wave
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePoints((prev) => {
        const newPoint = 50 + Math.sin(Date.now() / 500) * 20 + (resonanceIndex - 401) * 2
        return [...prev.slice(-49), newPoint] // Keep last 50 points
      })
    }, 100)
    return () => clearInterval(interval)
  }, [resonanceIndex])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative z-20">
      {/* Background Energy Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Network Resonance Index + Vault₄₀₂ - Central Pair */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Network Resonance Index */}
        <motion.div
          className="bg-gray-900/50 border border-resonance-turquoise/30 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            boxShadow: '0 0 30px rgba(0, 255, 246, 0.1), inset 0 0 30px rgba(0, 255, 246, 0.05)',
          }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-resonance-turquoise/5 to-transparent" />
          
          <div className="relative z-10">
            <div className="text-sm text-gray-400 mb-2">Network Resonance Index</div>
            <motion.div
              className="text-4xl font-bold text-resonance-turquoise mb-2"
              animate={{
                scale: [1, 1.02, 1],
                textShadow: [
                  '0 0 10px rgba(0, 255, 246, 0.5)',
                  '0 0 20px rgba(0, 255, 246, 0.8)',
                  '0 0 10px rgba(0, 255, 246, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {resonanceIndex.toFixed(2)} <span className="text-lg text-gray-400">Hz</span>
            </motion.div>
            <div className="text-xs text-gray-500 mb-4">
              Resonance Index = (Social Energy × Volume) / Time
            </div>

            {/* Oscilloscope Wave */}
            <div className="h-24 relative bg-black/30 rounded-lg overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00FFF6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#C77DFF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00FFF6" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {wavePoints.length > 1 && (
                  <motion.path
                    d={`M ${wavePoints.map((point, i) => {
                      const x = (i / (wavePoints.length - 1)) * 200
                      const y = point
                      return `${x} ${y}`
                    }).join(' L ')}`}
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="2"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Vault₄₀₂ - 3D Energy Core */}
        <motion.div
          className="lg:col-span-2 bg-gradient-to-br from-gray-900/60 to-black border border-resonance-gold/30 rounded-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            boxShadow: vaultFlash
              ? [
                  '0 0 60px rgba(255, 215, 0, 0.6)',
                  '0 0 100px rgba(255, 215, 0, 0.8)',
                  '0 0 60px rgba(255, 215, 0, 0.6)',
                ]
              : '0 0 40px rgba(255, 215, 0, 0.3), inset 0 0 40px rgba(255, 215, 0, 0.1)',
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-resonance-gold/10 via-transparent to-resonance-turquoise/5" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
          }} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-glow-gold">Vault₄₀₂</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-resonance-gold animate-pulse" />
                <span className="text-sm text-resonance-turquoise">{vaultResonanceLevel}</span>
              </div>
            </div>

            {/* 3D Energy Core */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-72 h-72">
                {/* Orbital Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-resonance-gold/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-resonance-turquoise/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full border border-resonance-purple/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />

                {/* Central Sphere */}
                <motion.div
                  className="absolute inset-16 rounded-full bg-gradient-to-br from-resonance-gold/20 to-resonance-turquoise/20 flex items-center justify-center border-2 border-resonance-gold/40"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 40px rgba(255, 215, 0, 0.4), inset 0 0 40px rgba(0, 255, 246, 0.2)',
                      '0 0 60px rgba(255, 215, 0, 0.6), inset 0 0 60px rgba(0, 255, 246, 0.3)',
                      '0 0 40px rgba(255, 215, 0, 0.4), inset 0 0 40px rgba(0, 255, 246, 0.2)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-5xl font-bold text-glow-gold mb-1"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {vaultEnergy.toFixed(3)}
                    </motion.div>
                    <div className="text-sm text-resonance-turquoise">SOL</div>
                  </div>
                </motion.div>

                {/* Orbital Particles */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-resonance-gold"
                    style={{
                      top: '50%',
                      left: '50%',
                      originX: 0.5,
                      originY: 0.5,
                    }}
                    animate={{
                      x: [
                        Math.cos((i * Math.PI * 2) / 6 + Date.now() / 2000) * 120,
                        Math.cos((i * Math.PI * 2) / 6 + Date.now() / 2000 + 0.1) * 120,
                      ],
                      y: [
                        Math.sin((i * Math.PI * 2) / 6 + Date.now() / 2000) * 120,
                        Math.sin((i * Math.PI * 2) / 6 + Date.now() / 2000 + 0.1) * 120,
                      ],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>

            {/* Vault Info */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-sm text-gray-400 mb-1">Platform Fees</div>
                <div className="text-lg font-bold text-resonance-gold">Growing</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Resonance Level</div>
                <div className={`text-lg font-bold ${
                  vaultResonanceLevel === 'High' ? 'text-resonance-gold' :
                  vaultResonanceLevel === 'Medium' ? 'text-resonance-turquoise' : 'text-gray-400'
                }`}>
                  {vaultResonanceLevel}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Growth Rate</div>
                <div className="text-lg font-bold text-resonance-turquoise">
                  +{vaultGrowthRate.toFixed(3)} <span className="text-xs">SOL/min</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Metrics Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Energy Flow */}
        <motion.div
          className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.1), inset 0 0 20px rgba(0, 255, 246, 0.05)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-resonance-gold/5 to-resonance-turquoise/5 opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-resonance-turquoise">Energy Flow</h3>
              <div className={`text-sm font-medium flex items-center gap-1 ${
                tradingVolumeGrowth >= 0 ? 'text-resonance-turquoise' : 'text-red-400'
              }`}>
                {tradingVolumeGrowth >= 0 ? '+' : ''}{tradingVolumeGrowth.toFixed(1)}%
              </div>
            </div>
            
            <div className="text-3xl font-bold text-resonance-gold mb-1">
              {tradingVolume24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-lg text-gray-400">SOL</span>
            </div>
            <div className="text-sm text-gray-400 mb-4">Volume 24h</div>

            {/* Trading Volume Chart with Moving Points */}
            <div className="h-32 relative bg-black/30 rounded-lg overflow-hidden">
              {dataPoints.length > 1 ? (
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="volumeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#00FFF6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="lineGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <motion.path
                    d={`M ${dataPoints.map((point, i) => {
                      const x = (i / (dataPoints.length - 1)) * 300
                      const min = Math.min(...dataPoints)
                      const max = Math.max(...dataPoints)
                      const range = max - min || 1
                      const y = 100 - ((point - min) / range) * 80 - 10
                      return `${x} ${y}`
                    }).join(' L ')}`}
                    fill="none"
                    stroke="url(#volumeGradient)"
                    strokeWidth="3"
                    filter="url(#lineGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                  {/* Moving points on line */}
                  {[0, 1, 2].map((i) => {
                    const pointIndex = Math.floor(dataPoints.length * (i + 1) / 4)
                    if (pointIndex >= dataPoints.length) return null
                    const point = dataPoints[pointIndex]
                    const min = Math.min(...dataPoints)
                    const max = Math.max(...dataPoints)
                    const range = max - min || 1
                    const x = (pointIndex / (dataPoints.length - 1)) * 300
                    const y = 100 - ((point - min) / range) * 80 - 10
                    return (
                      <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#00FFF6"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      />
                    )
                  })}
                </svg>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                  Loading chart data...
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Active Nodes */}
        <motion.div
          className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 246, 0.1), inset 0 0 20px rgba(0, 255, 246, 0.05)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-resonance-turquoise/5 to-transparent" />
          
          <div className="relative z-10">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-resonance-turquoise mb-1">Active Nodes</h3>
              <motion.div
                className="text-4xl font-bold text-resonance-gold"
                key={activeNodes}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {activeNodes}
              </motion.div>
              <div className="text-sm text-gray-400">Nodes Synced</div>
            </div>

            {/* Dynamic Radial Ring */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="url(#nodeGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 56 * (1 - activeNodes / 200),
                  }}
                  transition={{ duration: 1 }}
                />
                <defs>
                  <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00FFF6" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-resonance-gold">{activeNodes}</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Growth: +{nodesGrowth} new this hour</div>
              <motion.div
                className="h-1 bg-gray-800 rounded-full overflow-hidden mx-auto max-w-xs"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-resonance-gold to-resonance-turquoise"
                  initial={{ width: 0 }}
                  animate={{ width: `${(nodesGrowth / 10) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Social Waves & Recent Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Waves - Live Feed */}
        <motion.div
          className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            boxShadow: '0 0 20px rgba(199, 125, 255, 0.1), inset 0 0 20px rgba(199, 125, 255, 0.05)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-resonance-purple/5 to-transparent" />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-resonance-turquoise mb-4">Social Waves₄₀₂</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <AnimatePresence>
                {socialWaves.slice(0, 6).map((wave, idx) => (
                  <motion.div
                    key={wave.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-resonance-turquoise/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-resonance-gold">
                          Wave "{wave.name}"
                        </div>
                        <div className="text-xs text-gray-400">
                          +{wave.solImpact.toFixed(3)} SOL Impact
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        wave.status === 'active' ? 'bg-resonance-turquoise/20 text-resonance-turquoise' :
                        wave.status === 'cooling' ? 'bg-resonance-purple/20 text-resonance-purple' :
                        'bg-resonance-gold/20 text-resonance-gold'
                      }`}>
                        {wave.status === 'active' ? 'Active' : wave.status === 'cooling' ? 'Cooling' : 'Completed'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Recent Signals - Scrolling Feed */}
        <motion.div
          className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.1), inset 0 0 20px rgba(255, 215, 0, 0.05)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-resonance-gold/5 to-transparent" />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-resonance-turquoise mb-4">Recent Signals</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <AnimatePresence>
                {recentTransactions.slice(0, 10).map((tx, idx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center justify-between p-2 bg-gray-800/20 rounded border border-gray-700/20 hover:border-resonance-gold/50 transition-colors"
                  >
                    <div className="text-sm text-gray-300">{tx.description}</div>
                    <div className="text-resonance-gold font-medium">+{tx.amount.toFixed(3)} SOL</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
