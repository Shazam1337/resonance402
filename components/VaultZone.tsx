'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { useResonanceStore } from '@/lib/store'

export default function VaultZone() {
  const { connected } = useWallet()
  const { vaultEnergy } = useResonanceStore()
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractionResult, setExtractionResult] = useState<{ amount: number; success: boolean } | null>(null)
  const [extractionHistory, setExtractionHistory] = useState<Array<{ id: string; date: string; amount: number; status: string }>>([
    { id: '1', date: '04.11.2025', amount: 1.203, status: 'confirmed' },
    { id: '2', date: '04.10.2025', amount: 0.874, status: 'confirmed' },
    { id: '3', date: '04.09.2025', amount: 2.156, status: 'confirmed' },
  ])

  const handleExtractSOL = async () => {
    if (!connected) {
      alert('Vault₄₀₂ link required. Connect your wallet.')
      return
    }

    setIsExtracting(true)
    setExtractionResult(null)

    // Simulate extraction
    setTimeout(() => {
      const amount = Math.random() * 5 + 1 // 1-6 SOL
      const success = Math.random() > 0.1 // 90% success rate
      
      if (success) {
        const claim = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-glow-gold mb-2">Vault₄₀₂</h2>
        <p className="text-resonance-turquoise/70">Platform fees accumulated from trading volume</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Extraction Panel */}
        <div className="lg:col-span-2">
          <motion.div
            className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-2xl font-bold text-resonance-gold mb-6">Vault₄₀₂ Management</h3>

            {/* Vault Display */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <motion.div
                  className="w-48 h-48 rounded-full border-4 border-resonance-gold/30 flex items-center justify-center relative"
                  animate={{
                    scale: isExtracting ? [1, 1.05, 1] : 1,
                    boxShadow: isExtracting
                      ? [
                          '0 0 40px rgba(255, 215, 0, 0.5)',
                          '0 0 60px rgba(255, 215, 0, 0.8)',
                          '0 0 40px rgba(255, 215, 0, 0.5)',
                        ]
                      : '0 0 40px rgba(255, 215, 0, 0.3)',
                  }}
                  transition={{ duration: 1, repeat: isExtracting ? Infinity : 0 }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-glow-gold mb-1">
                      {vaultEnergy.toLocaleString()}
                    </div>
                    <div className="text-sm text-resonance-turquoise">SOL</div>
                  </div>
                  
                  {isExtracting && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-resonance-turquoise"
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </motion.div>
              </div>
            </div>

            {/* Extract Button */}
            <motion.button
              onClick={handleExtractSOL}
              disabled={isExtracting || !connected}
              className={`w-full px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                connected && !isExtracting
                  ? 'bg-resonance-gold/20 text-resonance-gold border-2 border-resonance-gold hover:bg-resonance-gold/30'
                  : 'bg-gray-800/50 text-gray-500 border-2 border-gray-700 cursor-not-allowed'
              }`}
              whileHover={connected && !isExtracting ? { scale: 1.02 } : {}}
              whileTap={connected && !isExtracting ? { scale: 0.98 } : {}}
            >
              {isExtracting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ⚡
                  </motion.span>
                  Syncing with Vault₄₀₂...
                </span>
              ) : (
                'Extract SOL from Vault₄₀₂'
              )}
            </motion.button>

            {/* Result Message */}
            <AnimatePresence>
              {extractionResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-6 p-4 rounded-lg ${
                    extractionResult.success
                      ? 'bg-resonance-turquoise/10 border border-resonance-turquoise/30'
                      : 'bg-red-500/10 border border-red-500/30'
                  }`}
                >
                  <div className={`text-lg font-semibold ${
                    extractionResult.success ? 'text-resonance-turquoise' : 'text-red-400'
                  }`}>
                    {extractionResult.success
                      ? `Extraction complete. +${extractionResult.amount.toFixed(3)} SOL transferred.`
                      : 'Signal interference. Try syncing again.'}
                  </div>
                  {extractionResult.success && (
                    <div className="text-sm text-gray-400 mt-1">SOL flow stabilized.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!connected && (
              <div className="mt-6 text-center text-gray-400 text-sm">
                Connect your wallet to establish Vault₄₀₂ link.
              </div>
            )}
          </motion.div>
        </div>

        {/* Claim History */}
        <div>
          <motion.div
            className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-lg font-semibold text-resonance-turquoise mb-4">Extraction History</h3>
            
            <div className="space-y-3">
              {extractionHistory.slice(0, 5).map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/30"
                >
                  <div>
                    <div className="text-sm text-gray-400">{claim.date}</div>
                    <div className="text-resonance-gold font-medium">
                      +{claim.amount.toFixed(3)} SOL
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    claim.status === 'confirmed'
                      ? 'bg-resonance-turquoise/20 text-resonance-turquoise'
                      : claim.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {claim.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
