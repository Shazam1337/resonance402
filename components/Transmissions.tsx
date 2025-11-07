'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWaveStore } from '@/lib/store'

export default function Transmissions() {
  const { transmissions, signals, addTransmission, addSignal } = useWaveStore()

  // Add new transmissions
  useEffect(() => {
    const interval = setInterval(() => {
      const types: ('node_signal' | 'frequency_update' | 'verification')[] = ['node_signal', 'frequency_update', 'verification']
      const descriptions = [
        `Node ${Math.random().toString(36).substring(2, 6)} verified`,
        'Frequency sync complete',
        'Verification proof validated',
        'Node resonance increasing',
        'Wave transmission received',
      ]
      const type = types[Math.floor(Math.random() * types.length)]
      
      addTransmission({
        id: Date.now().toString(),
        type,
        amount: Math.random() * 0.01 + 0.001,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        timestamp: Date.now(),
        verified: Math.random() > 0.1,
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [addTransmission])

  // Add new signals
  useEffect(() => {
    const interval = setInterval(() => {
      const nodeAddresses = ['0xA17', '0xB42', '0xC89', '0xD12', '0xE56', '0xF23']
      const node = nodeAddresses[Math.floor(Math.random() * nodeAddresses.length)]
      
      addSignal({
        id: Date.now().toString(),
        node,
        frequency: 400 + Math.random() * 5,
        solImpact: Math.random() * 0.01 + 0.001,
        status: Math.random() > 0.2 ? 'verified' : 'active',
        timestamp: Date.now(),
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [addSignal])

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-mono-title font-bold neon-yellow mb-2 uppercase tracking-widest">
            TRANSMISSIONS
          </h1>
          <p className="font-mono text-wave-gray text-sm uppercase tracking-widest">
            Live Signal Feed — Network Activity Log
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transmission Log */}
          <div className="terminal-block p-6">
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-4">
              TRANSMISSION_LOG
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {transmissions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  className="border-b border-wave-dark-gray pb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs uppercase tracking-widest ${
                      tx.type === 'node_signal' ? 'text-wave-cyan' :
                      tx.type === 'frequency_update' ? 'text-wave-acid-yellow' :
                      'text-white'
                    }`}>
                      {tx.type.replace('_', ' ')}
                    </span>
                    <span className={`font-mono text-xs ${
                      tx.verified ? 'text-wave-acid-yellow' : 'text-wave-gray'
                    }`}>
                      {tx.verified ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-white mb-1">
                    {tx.description}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-wave-gray">
                      {new Date(tx.timestamp).toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-wave-acid-yellow">
                      +{tx.amount.toFixed(4)} SOL
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Signal Feed */}
          <div className="terminal-block p-6">
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-4">
              SIGNAL_FEED
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {signals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  className="border-b border-wave-dark-gray pb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-wave-cyan uppercase tracking-widest">
                      Node {signal.node}
                    </span>
                    <span className={`font-mono text-xs uppercase ${
                      signal.status === 'verified' ? 'text-wave-acid-yellow' :
                      signal.status === 'active' ? 'text-wave-cyan' :
                      'text-wave-gray'
                    }`}>
                      {signal.status}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-white mb-1">
                    Frequency: {signal.frequency.toFixed(2)} Hz
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-wave-gray">
                      {new Date(signal.timestamp).toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-wave-acid-yellow">
                      +{signal.solImpact.toFixed(4)} SOL Impact
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="terminal-block p-6">
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-2">
              TOTAL TRANSMISSIONS
            </div>
            <div className="text-3xl font-mono font-bold text-white">
              {transmissions.length}
            </div>
          </div>
          <div className="terminal-block p-6">
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-2">
              VERIFIED SIGNALS
            </div>
            <div className="text-3xl font-mono font-bold text-wave-acid-yellow">
              {signals.filter(s => s.status === 'verified').length}
            </div>
          </div>
          <div className="terminal-block p-6">
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-2">
              ACTIVE NODES
            </div>
            <div className="text-3xl font-mono font-bold text-wave-cyan">
              {new Set(signals.map(s => s.node)).size}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

