'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWaveStore } from '@/lib/store'

export default function WaveCore() {
  const { connected } = useWallet()
  const { waveCore, waveCoreGrowth, updateWaveCore } = useWaveStore()
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractionResult, setExtractionResult] = useState<{ amount: number; success: boolean } | null>(null)
  const [extractionHistory, setExtractionHistory] = useState<Array<{ id: string; date: string; amount: number; status: string }>>([
    { id: '1', date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }), amount: 1.203, status: 'confirmed' },
    { id: '2', date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }), amount: 0.874, status: 'confirmed' },
  ])

  // Update wave core
  useEffect(() => {
    const interval = setInterval(() => {
      updateWaveCore()
    }, 200)
    return () => clearInterval(interval)
  }, [updateWaveCore])

  const handleExtract = async () => {
    if (!connected) {
      alert('Node verification required. Connect your wallet.')
      return
    }

    setIsExtracting(true)
    setExtractionResult(null)

    setTimeout(() => {
      const amount = Math.random() * 5 + 1
      const success = Math.random() > 0.1
      
      if (success) {
        const claim = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
          amount: parseFloat(amount.toFixed(3)),
          status: 'confirmed',
        }
        setExtractionHistory([claim, ...extractionHistory].slice(0, 10))
        setExtractionResult({ amount: claim.amount, success: true })
      } else {
        setExtractionResult({ amount: 0, success: false })
      }
      
      setIsExtracting(false)
      setTimeout(() => setExtractionResult(null), 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-mono-title font-bold neon-yellow mb-4 uppercase tracking-widest">
            WAVE CORE
          </h1>
          <p className="font-mono text-wave-gray text-sm uppercase tracking-widest">
            Central Energy Reservoir — SOL Accumulation
          </p>
        </div>

        {/* Main Core Visualization */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer rings */}
            {[1, 2, 3].map((ring) => (
              <div
                key={ring}
                className="absolute w-full h-full rounded-full border border-wave-acid-yellow"
                style={{
                  width: `${100 - ring * 15}%`,
                  height: `${100 - ring * 15}%`,
                  opacity: 0.3 / ring,
                }}
              />
            ))}

            {/* Core circle */}
            <div
              className="absolute w-32 h-32 rounded-full bg-wave-acid-yellow flex flex-col items-center justify-center"
              style={{ boxShadow: '0 0 20px rgba(195, 255, 31, 0.5)' }}
            >
              <div className="text-center">
                <div className="text-xs font-mono-title font-bold text-black uppercase mb-1">
                  WAVE CORE
                </div>
                <div className="text-xs font-mono-title font-bold text-black uppercase">
                  ACTIVE
                </div>
              </div>
            </div>
          </div>

          {/* Core Stats */}
          <div className="mt-8 text-center space-y-4">
            <div className="text-4xl font-mono font-bold text-white">
              {waveCore.toFixed(6)} <span className="text-2xl text-wave-gray">SOL</span>
            </div>
            <div className="text-lg font-mono text-wave-cyan">
              {waveCoreGrowth.toFixed(3)} SOL / min
            </div>
            <div className="text-sm font-mono text-wave-gray uppercase tracking-widest">
              Growth Rate: <span className="text-wave-acid-yellow">+{((waveCoreGrowth / waveCore) * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Extract Button */}
        <div className="flex justify-center mb-12">
          <motion.button
            onClick={handleExtract}
            disabled={isExtracting || !connected}
            className={`px-12 py-4 font-mono-title font-bold text-lg uppercase tracking-widest border-2 transition-all ${
              connected && !isExtracting
                ? 'bg-wave-acid-yellow text-black border-wave-acid-yellow hover:bg-black hover:text-wave-acid-yellow'
                : 'bg-wave-dark-gray text-wave-gray border-wave-dark-gray cursor-not-allowed'
            }`}
            whileHover={connected && !isExtracting ? { scale: 1.05 } : {}}
            whileTap={connected && !isExtracting ? { scale: 0.95 } : {}}
          >
            {isExtracting ? 'EXTRACTING...' : 'EXTRACT SOL FROM WAVE CORE'}
          </motion.button>
        </div>

        {/* Extraction Result */}
        <AnimatePresence>
          {extractionResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`terminal-block p-6 mb-8 text-center ${
                extractionResult.success ? 'border-wave-acid-yellow' : 'border-red-500'
              }`}
            >
              <div className={`font-mono-title text-lg uppercase tracking-widest mb-2 ${
                extractionResult.success ? 'text-wave-acid-yellow' : 'text-red-500'
              }`}>
                {extractionResult.success ? 'EXTRACTION COMPLETE' : 'EXTRACTION FAILED'}
              </div>
              {extractionResult.success && (
                <div className="font-mono text-2xl font-bold text-white">
                  +{extractionResult.amount.toFixed(3)} SOL transferred
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Extraction History */}
        <div className="terminal-block p-6">
          <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-4">
            EXTRACTION HISTORY
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 font-mono text-xs text-wave-gray uppercase tracking-widest border-b border-wave-dark-gray pb-2 mb-2">
              <div>DATE</div>
              <div>AMOUNT (SOL)</div>
              <div>STATUS</div>
            </div>
            {extractionHistory.map((item) => (
              <motion.div
                key={item.id}
                className="grid grid-cols-3 gap-4 font-mono text-sm border-b border-wave-dark-gray pb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="text-wave-gray">{item.date}</div>
                <div className="text-wave-acid-yellow">+{item.amount.toFixed(3)}</div>
                <div className="text-wave-cyan uppercase">{item.status}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

