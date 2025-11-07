'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Portal() {
  const router = useRouter()
  const [statusLine, setStatusLine] = useState('> syncing frequencies...')
  const [showGlitch, setShowGlitch] = useState(true)

  useEffect(() => {
    // Glitch effect on mount
    setTimeout(() => setShowGlitch(false), 500)
    
    // Status line updates
    const statuses = [
      '> syncing frequencies...',
      '> nodes verified: TRUE',
      '> portal ready.',
      '> frequency sync... nodes online: 149 ... verified: true',
    ]
    
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length
      setStatusLine(statuses[index])
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background z-0" />
      
      {/* Wave animation overlay */}
      <div className="fixed inset-0 z-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C3FF1F" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00FFE1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C3FF1F" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${400 + i * 50} Q 480 ${350 + i * 50 + Math.sin(i) * 30} 960 ${400 + i * 50} T 1920 ${400 + i * 50}`}
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="2"
              animate={{
                d: [
                  `M 0 ${400 + i * 50} Q 480 ${350 + i * 50 + Math.sin(i) * 30} 960 ${400 + i * 50} T 1920 ${400 + i * 50}`,
                  `M 0 ${400 + i * 50} Q 480 ${350 + i * 50 + Math.sin(i + 1) * 30} 960 ${400 + i * 50} T 1920 ${400 + i * 50}`,
                  `M 0 ${400 + i * 50} Q 480 ${350 + i * 50 + Math.sin(i) * 30} 960 ${400 + i * 50} T 1920 ${400 + i * 50}`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo with glitch */}
        <motion.div
          className="mb-12"
          animate={showGlitch ? { x: [0, -2, 2, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="text-6xl md:text-8xl font-mono-title font-bold neon-yellow mb-4">
            WAVE402
          </div>
          <div className="text-sm md:text-base font-mono text-wave-gray uppercase tracking-widest text-center">
            THE VERIFIABLE FREQUENCY PROTOCOL
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-mono-title font-bold text-white mb-4 leading-tight">
            WELCOME TO
            <br />
            THE VERIFIABLE
            <br />
            FREQUENCY
          </h1>
          <p className="text-lg md:text-xl font-mono text-wave-gray mt-6 uppercase tracking-widest">
            A Protocol for Verifiable Social Liquidity
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={() => router.push('/?view=dashboard')}
          className="px-12 py-4 bg-wave-acid-yellow text-black font-mono-title font-bold text-lg uppercase tracking-widest border-2 border-wave-acid-yellow relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ 
            backgroundColor: '#000000',
            color: '#C3FF1F',
            boxShadow: '0 0 30px #C3FF1F',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">LAUNCH WAVE402 PORTAL</span>
          <motion.div
            className="absolute inset-0 bg-wave-acid-yellow opacity-0 group-hover:opacity-20"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>

        {/* Status Line */}
        <motion.div
          className="fixed bottom-8 left-0 right-0 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="font-mono text-sm text-wave-acid-yellow border-t border-wave-dark-gray pt-4">
              <span className="cursor-blink">{statusLine}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

