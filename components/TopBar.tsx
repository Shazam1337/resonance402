'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface TopBarProps {
  onViewChange: (view: 'portal' | 'dashboard' | 'transmissions' | 'protocol') => void
  currentView: 'portal' | 'dashboard' | 'transmissions' | 'protocol'
}

export default function TopBar({ onViewChange, currentView }: TopBarProps) {
  const { connected, publicKey, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [networkStatus, setNetworkStatus] = useState<'Connected' | 'Offline'>('Connected')

  useEffect(() => {
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

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'transmissions', label: 'TRANSMISSIONS' },
    { id: 'protocol', label: 'PROTOCOL' },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-gray-100/95 backdrop-blur-sm border-b border-cryo-steel/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => onViewChange('portal')}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center relative">
                <Image 
                  src="/logo.png" 
                  alt="CRYOVOLT402 Logo" 
                  width={48}
                  height={48}
                  className="drop-shadow-[0_0_10px_rgba(77,225,255,0.5)]"
                  priority
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-mono-title font-bold text-cryo-electric-blue">CRYOVOLT402</h1>
              <p className="text-xs font-mono text-cryo-bg uppercase tracking-widest">FROZEN FREQUENCY</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as typeof currentView)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all border ${
                  currentView === item.id
                    ? 'bg-cryo-electric-blue text-cryo-bg border-cryo-electric-blue glow-cryo-blue'
                    : 'text-cryo-bg border-cryo-steel/30 hover:text-cryo-electric-blue hover:border-cryo-electric-blue/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Network Status */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-cryo-bg">
              <div className={`w-2 h-2 rounded-full ${networkStatus === 'Connected' ? 'bg-cryo-electric-blue' : 'bg-red-500'}`} />
              <span className="uppercase tracking-widest">Network: {networkStatus}</span>
            </div>

            {/* Connect Wallet */}
            <motion.button
              onClick={handleConnect}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${
                connected
                  ? 'bg-cryo-electric-blue/20 text-cryo-electric-blue border-cryo-electric-blue/50'
                  : 'bg-cryo-electric-blue text-cryo-bg border-cryo-electric-blue hover:bg-cryo-turquoise hover:border-cryo-turquoise'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {connected
                ? `${publicKey?.toString().slice(0, 4)}...${publicKey?.toString().slice(-4)}`
                : 'CONNECT'}
            </motion.button>

            {/* Twitter */}
            <Link
              href="https://x.com/cryovolt402"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-cryo-steel/30 hover:border-cryo-electric-blue transition-colors"
            >
              <svg className="w-5 h-5 text-cryo-bg hover:text-cryo-electric-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
