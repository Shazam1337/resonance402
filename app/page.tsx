'use client'

import { useState, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import Dashboard from '@/components/Dashboard'
import Waves from '@/components/Waves'
import NetworkMap from '@/components/NetworkMap'
import VaultZone from '@/components/VaultZone'
import { useWallet } from '@solana/wallet-adapter-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { connected } = useWallet()
  const [showWelcome, setShowWelcome] = useState(false)
  const [currentView, setCurrentView] = useState<'dashboard' | 'waves' | 'network' | 'vault'>('dashboard')
  

  useEffect(() => {
    if (connected && !showWelcome) {
      setShowWelcome(true)
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [connected, showWelcome])

  return (
    <main className="min-h-screen bg-black relative" style={{
      backgroundImage: 'url(/back.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      {/* Welcome overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="text-center"
            >
              <motion.h1
                className="text-6xl font-bold text-glow-gold mb-4"
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(255, 215, 0, 0.8)',
                    '0 0 30px rgba(255, 215, 0, 1)',
                    '0 0 10px rgba(255, 215, 0, 0.8)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Welcome, Node₄₀₂
              </motion.h1>
              <motion.p
                className="text-xl text-resonance-turquoise"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Vault₄₀₂ link established.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background effects - Soft glowing orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ zIndex: 1 }}>
        {/* Left purple/indigo glow */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(199, 125, 255, 0.15) 0%, rgba(199, 125, 255, 0.05) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Right turquoise/green-yellow glow */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 246, 0.15) 0%, rgba(0, 255, 246, 0.05) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [20, -20, 20],
            y: [20, -20, 20],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        
        {/* Subtle gold accent */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <TopBar onViewChange={setCurrentView} currentView={currentView} />

      <div className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ minHeight: '100vh' }}
            >
              <Dashboard />
            </motion.div>
          )}
          {currentView === 'waves' && (
            <motion.div
              key="waves"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Waves />
            </motion.div>
          )}
          {currentView === 'network' && (
            <motion.div
              key="network"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <NetworkMap />
            </motion.div>
          )}
          {currentView === 'vault' && (
            <motion.div
              key="vault"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <VaultZone />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

