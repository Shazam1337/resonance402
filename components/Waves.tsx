'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResonanceStore, SocialWave } from '@/lib/store'

export default function Waves() {
  const { socialWaves, addSocialWave } = useResonanceStore()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [waveName, setWaveName] = useState('')

  // Auto-add new waves periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const waveNames = ['SOL Rising', 'Vault Storm', 'Echo Pulse', 'Nova Wave', 'Resonance Peak', 'Liquidity Flow']
      const name = waveNames[Math.floor(Math.random() * waveNames.length)]
      
      addSocialWave({
        id: Date.now().toString(),
        name,
        volumeGrowth: Math.random() * 5 + 1,
        solImpact: Math.random() * 1 + 0.2,
        socialResonance: Math.random() * 10 + 2,
        status: Math.random() > 0.7 ? 'cooling' : 'active',
        timestamp: Date.now(),
      })
    }, 5000 + Math.random() * 5000)
    return () => clearInterval(interval)
  }, [addSocialWave])

  const handleCreateWave = () => {
    if (!waveName.trim()) return
    
    addSocialWave({
      id: Date.now().toString(),
      name: waveName,
      volumeGrowth: Math.random() * 5 + 1,
      solImpact: Math.random() * 1 + 0.2,
      socialResonance: Math.random() * 10 + 2,
      status: 'active',
      timestamp: Date.now(),
    })
    setWaveName('')
    setShowCreateForm(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-4xl font-bold text-glow-gold mb-2">Social Waves₄₀₂</h2>
            <p className="text-resonance-turquoise/70">Live feed of active social campaigns impacting trading volume</p>
          </div>
          <motion.button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 rounded-lg bg-resonance-gold/20 text-resonance-gold border border-resonance-gold/50 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Wave
          </motion.button>
        </div>
      </motion.div>

      {/* Create Wave Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-gray-900/40 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-resonance-turquoise mb-4">Initiate New Social Wave</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Wave Name</label>
                <input
                  type="text"
                  value={waveName}
                  onChange={(e) => setWaveName(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-resonance-turquoise/30 rounded-lg focus:outline-none focus:border-resonance-turquoise text-white"
                  placeholder="Enter wave name..."
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateWave()}
                />
              </div>
              <div className="flex gap-4">
                <motion.button
                  onClick={handleCreateWave}
                  className="px-6 py-2 rounded-lg bg-resonance-turquoise/20 text-resonance-turquoise border border-resonance-turquoise/50 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Signal received.
                </motion.button>
                <motion.button
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 rounded-lg bg-gray-800/50 text-gray-400 border border-gray-700 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Waves Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {socialWaves.map((wave, idx) => (
            <motion.div
              key={wave.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gradient-to-br from-gray-900/40 to-black/50 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.02, borderColor: 'rgba(255, 215, 0, 0.3)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-glow-gold mb-2">Wave '{wave.name}'</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Status: <span className={`${
                      wave.status === 'active' ? 'text-resonance-turquoise' :
                      wave.status === 'cooling' ? 'text-yellow-500' : 'text-gray-500'
                    }`}>{wave.status}</span></span>
                    <span>•</span>
                    <span>
                      {Math.floor((Date.now() - wave.timestamp) / 1000)}s ago
                    </span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg ${
                  wave.status === 'active'
                    ? 'bg-resonance-turquoise/20 text-resonance-turquoise border border-resonance-turquoise/30'
                    : wave.status === 'cooling'
                    ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700'
                }`}>
                  {wave.status === 'active' ? 'Active' : wave.status === 'cooling' ? 'Cooling' : 'Complete'}
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-resonance-gold mb-1">
                    +{wave.volumeGrowth.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Volume Growth</div>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-resonance-turquoise mb-1">
                    +{wave.solImpact.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400">SOL Impact</div>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-resonance-purple mb-1">
                    +{wave.socialResonance.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Social Resonance</div>
                </div>
              </div>

              {/* Wave Visualization */}
              <div className="h-24 relative overflow-hidden rounded-lg bg-black/50 mb-4">
                <svg className="w-full h-full" viewBox="0 0 400 100">
                  <defs>
                    <linearGradient id={`waveGradient${wave.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00FFF6" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#C77DFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={`M 0 50 Q 100 ${50 + Math.sin(idx * 0.5) * 20} 200 50 T 400 50`}
                    fill="none"
                    stroke={`url(#waveGradient${wave.id})`}
                    strokeWidth="3"
                    animate={{
                      d: [
                        `M 0 50 Q 100 ${50 + Math.sin(idx * 0.5) * 20} 200 50 T 400 50`,
                        `M 0 50 Q 100 ${50 + Math.sin(idx * 0.5 + 1) * 20} 200 50 T 400 50`,
                        `M 0 50 Q 100 ${50 + Math.sin(idx * 0.5) * 20} 200 50 T 400 50`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>
              </div>

              {/* Impact Description */}
              <div className="text-sm text-gray-400">
                <p>
                  Social activity → <span className="text-resonance-turquoise">+{wave.volumeGrowth.toFixed(1)}% trading volume</span> → 
                  <span className="text-resonance-gold"> +{wave.solImpact.toFixed(2)} SOL to Vault₄₀₂</span>
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {socialWaves.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No active waves detected.</p>
          <p className="text-sm mt-2">New social waves will appear here as they impact trading volume.</p>
        </div>
      )}
    </div>
  )
}
