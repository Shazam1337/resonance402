'use client'

import { motion } from 'framer-motion'

export default function Protocol() {
  const sections = [
    {
      title: 'FROZEN FREQUENCY VERIFICATION',
      description: 'A cryo-precision verification mechanism that calibrates frequency data with frozen accuracy. Each node interaction generates verifiable proof, creating an immutable on-chain record of network state.',
      details: [
        'Cryo-signal precision calibration',
        'On-chain frequency verification',
        'Immutable proof generation',
      ],
    },
    {
      title: 'ENERGY RESERVE PROTOCOL',
      description: 'The protocol measures frequency impact and accumulates energy in the reserve. This creates a direct correlation between network activity and energy accumulation with frozen precision.',
      details: [
        'Real-time frequency monitoring',
        'Energy accumulation calculation',
        'Dynamic SOL reserve management',
      ],
    },
    {
      title: 'ON-CHAIN VALIDATION',
      description: 'Built on Solana blockchain, CRYOVOLT402 ensures all frequency data and proofs are verifiable on-chain. The protocol integrates with Solana wallets and smart contracts for transparent validation.',
      details: [
        'Solana blockchain integration',
        'Wallet-based node verification',
        'Smart contract validation',
      ],
    },
  ]

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-mono-title font-bold cryo-glow-blue mb-4 uppercase tracking-widest">
            PROTOCOL
          </h1>
          <p className="font-mono text-cryo-bg/70 text-sm uppercase tracking-widest">
            Frozen Frequency Protocol — Technical Documentation
          </p>
        </div>

        {/* Protocol Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="terminal-block p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h2 className="font-mono-title text-2xl text-cryo-electric-blue uppercase tracking-widest mb-4 cryo-glow-blue">
                {section.title}
              </h2>
              <p className="font-mono text-cryo-bg/80 mb-6 leading-relaxed">
                {section.description}
              </p>
              <ul className="space-y-2">
                {section.details.map((detail, i) => (
                  <li key={i} className="font-mono text-sm text-cryo-bg flex items-start">
                    <span className="text-cryo-electric-blue mr-3">{'>'}</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          className="mt-12 terminal-block p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="font-mono-title text-lg text-cryo-electric-blue uppercase tracking-widest mb-2 cryo-glow-blue">
            CRYOVOLT402
          </div>
          <div className="font-mono text-sm text-cryo-bg/70 uppercase tracking-widest">
            FROZEN FREQUENCY PROTOCOL
          </div>
          <div className="font-mono text-xs text-cryo-bg/60 mt-4">
            Built on Solana • Open Source • Community Driven
          </div>
        </motion.div>
      </div>
    </div>
  )
}

