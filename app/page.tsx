'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Portal from '@/components/Portal'
import TopBar from '@/components/TopBar'
import Dashboard from '@/components/Dashboard'
import NetworkMap from '@/components/NetworkMap'
import Transmissions from '@/components/Transmissions'
import Protocol from '@/components/Protocol'
import { useWallet } from '@solana/wallet-adapter-react'
import { motion, AnimatePresence } from 'framer-motion'

function HomeContent() {
  const searchParams = useSearchParams()
  const { connected } = useWallet()
  const [currentView, setCurrentView] = useState<'portal' | 'dashboard' | 'network' | 'transmissions' | 'protocol'>('portal')
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const view = searchParams?.get('view') as typeof currentView
    if (view && ['dashboard', 'network', 'transmissions', 'protocol'].includes(view)) {
      setCurrentView(view)
    } else {
      setCurrentView('portal')
    }
  }, [searchParams])

  useEffect(() => {
    if (connected && !showWelcome) {
      setShowWelcome(true)
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [connected, showWelcome])

  // Show portal by default
  if (currentView === 'portal') {
    return <Portal />
  }

  return (
    <main className="min-h-screen bg-black relative" style={{
      backgroundImage: 'url(/back.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background z-0 opacity-30" />

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
                className="text-6xl font-mono-title font-bold neon-yellow mb-4"
                animate={{ 
                  textShadow: [
                    '0 0 10px #C3FF1F',
                    '0 0 30px #C3FF1F',
                    '0 0 10px #C3FF1F',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                NODE VERIFIED
              </motion.h1>
              <motion.p
                className="text-xl font-mono text-wave-cyan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Frequency sync complete.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            >
              <Dashboard />
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
          {currentView === 'transmissions' && (
            <motion.div
              key="transmissions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Transmissions />
            </motion.div>
          )}
          {currentView === 'protocol' && (
            <motion.div
              key="protocol"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Protocol />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-wave-acid-yellow font-mono">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
