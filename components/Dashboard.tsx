'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useWaveStore } from '@/lib/store'

export default function Dashboard() {
  const {
    frequencyIndex,
    frequencyVerified,
    waveCore,
    waveCoreGrowth,
    waveCoreGrowthRate,
    pulseStream,
    pulseStreamGrowth,
    syncedNodes,
    nodesGrowth,
    transmissions,
    signals,
    updateFrequency,
    updateWaveCore,
    removeOldTransmissions,
    removeOldSignals,
  } = useWaveStore()
  
  const [dataPoints, setDataPoints] = useState<number[]>([])
  const [radialProgress, setRadialProgress] = useState(0)
  const dataPointsInitialized = useRef(false)
  const transmissionUpdateRef = useRef<NodeJS.Timeout | null>(null)
  const signalUpdateRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize data points once
  useEffect(() => {
    if (!dataPointsInitialized.current && pulseStream > 0) {
      const initialPoints = Array.from({ length: 30 }, (_, i) => {
        return pulseStream + Math.sin(i / 5) * 0.5
      })
      setDataPoints(initialPoints)
      dataPointsInitialized.current = true
    }
  }, [pulseStream])

  // Update frequency (smooth, every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      updateFrequency()
    }, 3000)
    return () => clearInterval(interval)
  }, [updateFrequency])

  // Update wave core (smooth, every 500ms)
  useEffect(() => {
    const interval = setInterval(() => {
      updateWaveCore()
    }, 500)
    return () => clearInterval(interval)
  }, [updateWaveCore])

  // Update pulse stream chart (smooth, every 3 seconds)
  useEffect(() => {
    if (dataPoints.length === 0) return
    
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        if (prev.length === 0) return prev
        const newPoint = Math.max(0, pulseStream + (Math.random() - 0.3) * 0.05)
        return [...prev.slice(-29), newPoint]
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [pulseStream])

  // Update radial progress for nodes (smooth transition)
  useEffect(() => {
    const target = Math.min(100, (syncedNodes / 200) * 100)
    setRadialProgress((prev) => {
      const diff = target - prev
      return prev + diff * 0.1 // Smooth transition
    })
  }, [syncedNodes])

  // Clean up old transmissions and signals periodically
  useEffect(() => {
    const interval = setInterval(() => {
      removeOldTransmissions()
      removeOldSignals()
    }, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [removeOldTransmissions, removeOldSignals])

  // Add new transmissions (controlled, every 6-8 seconds)
  useEffect(() => {
    if (transmissionUpdateRef.current) {
      clearTimeout(transmissionUpdateRef.current)
    }

    const scheduleNext = () => {
      const delay = 6000 + Math.random() * 2000 // 6-8 seconds
      transmissionUpdateRef.current = setTimeout(() => {
        const types: ('node_signal' | 'frequency_update' | 'verification')[] = ['node_signal', 'frequency_update', 'verification']
        const descriptions = [
          'Node 0xA17 verified',
          'Frequency sync complete',
          'Verification proof validated',
          'Node resonance increasing',
          'Wave transmission received',
        ]
        const type = types[Math.floor(Math.random() * types.length)]
        
        useWaveStore.getState().addTransmission({
          id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          type,
          amount: Math.random() * 0.008 + 0.002, // 0.002 - 0.01 SOL
          description: descriptions[Math.floor(Math.random() * descriptions.length)],
          timestamp: Date.now(),
          verified: true,
        })
        
        scheduleNext()
      }, delay)
    }

    scheduleNext()

    return () => {
      if (transmissionUpdateRef.current) {
        clearTimeout(transmissionUpdateRef.current)
      }
    }
  }, [])

  // Add new signals (controlled, every 7-9 seconds)
  useEffect(() => {
    if (signalUpdateRef.current) {
      clearTimeout(signalUpdateRef.current)
    }

    const scheduleNext = () => {
      const delay = 7000 + Math.random() * 2000 // 7-9 seconds
      signalUpdateRef.current = setTimeout(() => {
        const nodeAddresses = ['0xA17', '0xB42', '0xC89', '0xD12', '0xE56', '0xF23']
        const node = nodeAddresses[Math.floor(Math.random() * nodeAddresses.length)]
        
        useWaveStore.getState().addSignal({
          id: `sig-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          node,
          frequency: 400 + Math.random() * 5,
          solImpact: Math.random() * 0.008 + 0.002, // 0.002 - 0.01 SOL
          status: 'verified',
          timestamp: Date.now(),
        })
        
        scheduleNext()
      }, delay)
    }

    scheduleNext()

    return () => {
      if (signalUpdateRef.current) {
        clearTimeout(signalUpdateRef.current)
      }
    }
  }, [])

  const TerminalBlock = ({ title, children, className = '' }: { title: string, children: React.ReactNode, className?: string }) => (
    <div className={`terminal-block p-6 ${className}`}>
      <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-4">
        {title}
      </div>
      {children}
    </div>
  )

  // Calculate max amount for bar height
  const maxTransmissionAmount = transmissions.length > 0 
    ? Math.max(...transmissions.map(t => t.amount))
    : 0.01
  const maxSignalAmount = signals.length > 0
    ? Math.max(...signals.map(s => s.solImpact))
    : 0.01

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout 2x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* FREQUENCY_INDEX */}
          <TerminalBlock title="FREQUENCY_INDEX" className="lg:col-span-1">
            <div className="space-y-4">
              <div className="text-4xl font-mono font-bold text-white">
                {frequencyIndex.toFixed(2)} <span className="text-2xl text-wave-gray">Hz</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1">
                  {['V', 'E', 'R', 'I', 'F', 'I', 'E', 'D'].map((letter, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-wave-acid-yellow"
                      style={{ opacity: frequencyVerified ? 1 : 0.3 }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <div className="flex-1 h-16 border-l border-wave-dark-gray ml-4 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M 0,50 Q 25,45 50,50 T 100,50"
                      fill="none"
                      stroke="#00FFE1"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-xs font-mono text-wave-gray uppercase">
                {frequencyVerified ? 'VERIFIED' : 'PENDING'}
              </div>
            </div>
          </TerminalBlock>

          {/* VAULT_CORE */}
          <TerminalBlock title="VAULT_CORE" className="lg:col-span-1">
            <div className="space-y-4">
              <div className="text-3xl font-mono font-bold text-white">
                {waveCore.toFixed(6)} <span className="text-xl text-wave-gray">SOL</span>
              </div>
              <div className="text-sm font-mono text-wave-cyan">
                {waveCoreGrowth.toFixed(3)} SOL / min
              </div>
              <div className="text-xs font-mono text-wave-gray">
                Growth: <span className="text-wave-acid-yellow">+{waveCoreGrowthRate.toFixed(3)}</span>
              </div>
              <div className="relative w-full h-2 bg-wave-dark-gray">
                <div
                  className="absolute top-0 left-0 h-full bg-wave-acid-yellow"
                  style={{ width: `${Math.min((waveCore / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
          </TerminalBlock>

          {/* PULSE_STREAM */}
          <TerminalBlock title="PULSE_STREAM" className="lg:col-span-1">
            <div className="space-y-4">
              <div className="text-2xl font-mono font-bold text-white">
                Volume 24h: {pulseStream.toFixed(1)} <span className="text-lg text-wave-gray">SOL</span>
              </div>
              <div className="text-sm font-mono text-wave-cyan">
                <span className="text-wave-acid-yellow">+{pulseStreamGrowth.toFixed(1)}%</span> Growth
              </div>
              <div className="h-24 relative">
                {dataPoints.length > 0 ? (
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C3FF1F" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#00FFE1" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={`M ${dataPoints.map((point, i) => {
                        const x = (i / (dataPoints.length - 1)) * 100
                        const y = 100 - ((point / 15) * 100)
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                      }).join(' ')}`}
                      fill="none"
                      stroke="url(#pulseGradient)"
                      strokeWidth="2"
                    />
                    {dataPoints.map((point, i) => {
                      const x = (i / (dataPoints.length - 1)) * 100
                      const y = 100 - ((point / 15) * 100)
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="1.5"
                          fill="#C3FF1F"
                          opacity="0.8"
                        />
                      )
                    })}
                  </svg>
                ) : (
                  <div className="text-xs font-mono text-wave-gray">Loading chart data...</div>
                )}
              </div>
            </div>
          </TerminalBlock>

          {/* SYNCED_NODES */}
          <TerminalBlock title="SYNCED_NODES" className="lg:col-span-1">
            <div className="space-y-4">
              <div className="text-4xl font-mono font-bold text-white">
                {syncedNodes} <span className="text-2xl text-wave-gray">nodes</span>
              </div>
              <div className="text-sm font-mono text-wave-cyan">
                +{nodesGrowth} new this hour
              </div>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#202020"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#C3FF1F"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={2 * Math.PI * 56 * (1 - radialProgress / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-wave-acid-yellow">
                      {Math.round(radialProgress)}%
                    </div>
                    <div className="text-xs font-mono text-wave-gray">SYNCED</div>
                  </div>
                </div>
              </div>
            </div>
          </TerminalBlock>

          {/* TRANSMISSION_LOG */}
          <TerminalBlock title="TRANSMISSION_LOG" className="lg:col-span-1">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transmissions.slice(0, 8).map((tx) => {
                const barHeight = (tx.amount / maxTransmissionAmount) * 100
                return (
                  <div
                    key={tx.id}
                    className="text-xs font-mono border-b border-wave-dark-gray pb-2 relative"
                  >
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-wave-cyan uppercase whitespace-nowrap">
                            {tx.type.replace('_', ' ')}
                          </span>
                          <span className="text-wave-acid-yellow whitespace-nowrap">
                            +{tx.amount.toFixed(4)} SOL
                          </span>
                        </div>
                        <div className="text-white text-[11px] leading-tight">
                          {tx.description}
                        </div>
                        <div className="text-wave-gray text-[10px] mt-1">
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-1 h-12 bg-wave-dark-gray relative ml-2">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-wave-acid-yellow"
                          style={{ 
                            height: `${Math.max(barHeight, 8)}%`,
                            minHeight: '4px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TerminalBlock>

          {/* SIGNAL_FEED */}
          <TerminalBlock title="SIGNAL_FEED" className="lg:col-span-1">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {signals.slice(0, 8).map((signal) => {
                const barHeight = (signal.solImpact / maxSignalAmount) * 100
                return (
                  <div
                    key={signal.id}
                    className="text-xs font-mono border-b border-wave-dark-gray pb-2 relative"
                  >
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-wave-cyan">Node {signal.node}</span>
                          <span className={`text-xs uppercase ${
                            signal.status === 'verified' ? 'text-wave-acid-yellow' : 'text-wave-gray'
                          }`}>
                            {signal.status}
                          </span>
                        </div>
                        <div className="text-white text-[11px] leading-tight">
                          Frequency: {signal.frequency.toFixed(2)} Hz
                        </div>
                        <div className="text-wave-acid-yellow text-[11px] mt-1">
                          +{signal.solImpact.toFixed(4)} SOL Impact
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-1 h-12 bg-wave-dark-gray relative ml-2">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-wave-acid-yellow"
                          style={{ 
                            height: `${Math.max(barHeight, 8)}%`,
                            minHeight: '4px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TerminalBlock>
        </div>
      </div>
    </div>
  )
}
