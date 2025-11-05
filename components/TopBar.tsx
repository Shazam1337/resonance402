'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { motion, AnimatePresence } from 'framer-motion'

interface TopBarProps {
  onViewChange: (view: 'dashboard' | 'waves' | 'network' | 'vault') => void
  currentView: 'dashboard' | 'waves' | 'network' | 'vault'
}

export default function TopBar({ onViewChange, currentView }: TopBarProps) {
  const { connected, publicKey, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [networkStatus, setNetworkStatus] = useState<'Connected' | 'Offline'>('Connected')
  const [showConnectionMessage, setShowConnectionMessage] = useState(false)

  useEffect(() => {
    // Simulate network status
    const interval = setInterval(() => {
      setNetworkStatus(Math.random() > 0.1 ? 'Connected' : 'Offline')
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleConnect = () => {
    if (connected) {
      disconnect()
    } else {
      setVisible(true)
    }
  }

  useEffect(() => {
    if (connected) {
      setShowConnectionMessage(true)
      const timer = setTimeout(() => setShowConnectionMessage(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [connected])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-resonance-purple/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <motion.div
              className="w-14 h-14 flex items-center justify-center relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Image 
                src="/logo.png" 
                alt="RESONANCE₄₀₂ Logo" 
                width={56}
                height={56}
                className="drop-shadow-[0_0_10px_rgba(0,255,246,0.5)]"
                priority
              />
            </motion.div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-glow-gold">RESONANCE₄₀₂</h1>
            <p className="text-xs text-resonance-turquoise/70">The Social Liquidity Engine</p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentView === 'dashboard'
                ? 'text-resonance-gold text-glow-gold bg-resonance-gold/10'
                : 'text-gray-400 hover:text-resonance-turquoise'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onViewChange('waves')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentView === 'waves'
                ? 'text-resonance-gold text-glow-gold bg-resonance-gold/10'
                : 'text-gray-400 hover:text-resonance-turquoise'
            }`}
          >
            Waves₄₀₂
          </button>
          <button
            onClick={() => onViewChange('network')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentView === 'network'
                ? 'text-resonance-gold text-glow-gold bg-resonance-gold/10'
                : 'text-gray-400 hover:text-resonance-turquoise'
            }`}
          >
            Network Map
          </button>
          <button
            onClick={() => onViewChange('vault')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentView === 'vault'
                ? 'text-resonance-gold text-glow-gold bg-resonance-gold/10'
                : 'text-gray-400 hover:text-resonance-turquoise'
            }`}
          >
            Vault₄₀₂
          </button>
        </nav>

        {/* Status and Actions */}
        <div className="flex items-center gap-4">
          {/* Network Status */}
          <div className="hidden md:flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              networkStatus === 'Connected' ? 'bg-resonance-turquoise glow-turquoise' : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-400">
              Network₄₀₂: <span className={networkStatus === 'Connected' ? 'text-resonance-turquoise' : 'text-red-500'}>{networkStatus}</span>
            </span>
          </div>

          {/* Wallet Button */}
          <motion.button
            onClick={handleConnect}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              connected
                ? 'bg-resonance-turquoise/20 text-resonance-turquoise border border-resonance-turquoise/50'
                : 'bg-resonance-gold/20 text-resonance-gold border border-resonance-gold/50 glow-gold'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {connected
              ? `${publicKey?.toString().slice(0, 4)}...${publicKey?.toString().slice(-4)}`
              : 'Connect Wallet'}
          </motion.button>

          {/* Twitter Link */}
          <motion.a
            href="https://x.com/resonance402"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900/50 hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Connection Message */}
      <AnimatePresence>
        {showConnectionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-resonance-gold/20 border-b border-resonance-gold/50 py-2 px-6 text-center"
          >
            <p className="text-resonance-gold text-glow-gold">
              Vault₄₀₂ link established.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

