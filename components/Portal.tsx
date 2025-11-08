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
      '> cryo frequency calibrating...',
      '> nodes verified: STABLE',
      '> protocol ready.',
      '> frequency frozen... nodes active: 149 ... status: STABLE',
    ]
    
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length
      setStatusLine(statuses[index])
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 cryo-grid z-0" />
      
      {/* Cryo wave animation overlay */}
      <div className="fixed inset-0 z-0 opacity-15">
        <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cryoWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4DE1FF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00BFA6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4DE1FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${400 + i * 50} Q 480 ${350 + i * 50 + Math.sin(i) * 30} 960 ${400 + i * 50} T 1920 ${400 + i * 50}`}
              fill="none"
              stroke="url(#cryoWaveGradient)"
              strokeWidth="1.5"
              animate={{
                d: [
                  `M 0 ${400 + i * 50} Q 480 ${350 + i * 50 + Math.sin(i) * 30} 960 ${400 + i * 50} T 1920 ${400 + i * 50}`,
                  `M 0 ${400 + i * 50} Q 480 ${350 + i * 50 + Math.sin(i + 1) * 30} 960 ${400 + i * 50} T 1920 ${400 + i * 50}`,
                  `M 0 ${400 + i * 50} Q 480 ${350 + i * 50 + Math.sin(i) * 30} 960 ${400 + i * 50} T 1920 ${400 + i * 50}`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
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
          <div className="text-6xl md:text-8xl font-mono-title font-bold cryo-glow-blue mb-4">
            CRYOVOLT402
          </div>
          <div className="text-sm md:text-base font-mono text-cryo-bg uppercase tracking-widest text-center">
            FROZEN FREQUENCY PROTOCOL
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-mono-title font-bold text-cryo-bg mb-4 leading-tight">
            ENTER CRYOVOLT402
            <br />
            FROZEN FREQUENCY
            <br />
            ACTIVE
          </h1>
          <p className="text-lg md:text-xl font-mono text-cryo-bg/70 mt-6 uppercase tracking-widest">
            A Protocol for Frozen Frequency Verification
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={() => router.push('/?view=dashboard')}
          className="px-12 py-4 bg-cryo-electric-blue text-cryo-bg font-mono-title font-bold text-lg uppercase tracking-widest border-2 border-cryo-electric-blue relative overflow-hidden group glow-cryo-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ 
            backgroundColor: '#00BFA6',
            borderColor: '#00BFA6',
            boxShadow: '0 0 30px rgba(77, 225, 255, 0.5)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">INITIATE PROTOCOL</span>
        </motion.button>

        {/* Status Line */}
        <motion.div
          className="fixed bottom-8 left-0 right-0 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="font-mono text-sm text-cryo-electric-blue border-t border-cryo-steel/30 pt-4">
              <span className="cursor-blink">{statusLine}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

