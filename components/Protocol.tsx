'use client'

import { motion } from 'framer-motion'

export default function Protocol() {
  const sections = [
    {
      title: 'PROOF OF RESONANCE',
      description: 'A verification mechanism that translates social activity into measurable frequency metrics. Each node interaction generates verifiable proof of resonance, creating an on-chain record of network participation.',
      details: [
        'Social signals converted to frequency data',
        'On-chain verification of node activity',
        'Immutable proof of resonance generation',
      ],
    },
    {
      title: 'SOCIAL LIQUIDITY LAYER',
      description: 'The protocol measures how social engagement influences trading volume and platform fees. This creates a direct correlation between community activity and network value accumulation.',
      details: [
        'Real-time social engagement tracking',
        'Volume-to-fee ratio calculation',
        'Dynamic SOL accumulation in Wave Core',
      ],
    },
    {
      title: 'ON-CHAIN VALIDATION',
      description: 'Built on Solana blockchain, WAVE402 ensures all frequency data and proofs are verifiable on-chain. The protocol integrates with Solana wallets and smart contracts for transparent validation.',
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
          <h1 className="text-5xl font-mono-title font-bold neon-yellow mb-4 uppercase tracking-widest">
            PROTOCOL
          </h1>
          <p className="font-mono text-wave-gray text-sm uppercase tracking-widest">
            The Verifiable Frequency Protocol — Technical Documentation
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
              <h2 className="font-mono-title text-2xl text-wave-acid-yellow uppercase tracking-widest mb-4">
                {section.title}
              </h2>
              <p className="font-mono text-wave-gray mb-6 leading-relaxed">
                {section.description}
              </p>
              <ul className="space-y-2">
                {section.details.map((detail, i) => (
                  <li key={i} className="font-mono text-sm text-white flex items-start">
                    <span className="text-wave-acid-yellow mr-3">></span>
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
          <div className="font-mono-title text-lg text-wave-acid-yellow uppercase tracking-widest mb-2">
            WAVE402
          </div>
          <div className="font-mono text-sm text-wave-gray uppercase tracking-widest">
            THE VERIFIABLE FREQUENCY PROTOCOL
          </div>
          <div className="font-mono text-xs text-wave-gray mt-4">
            Built on Solana • Open Source • Community Driven
          </div>
        </motion.div>
      </div>
    </div>
  )
}

