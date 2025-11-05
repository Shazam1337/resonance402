'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Node } from '@/lib/store'

const ranks = ['Echo', 'Harmonic', 'Carrier', 'Conductor', 'Source₄₀₂'] as const
const rankColors: Record<string, string> = {
  'Echo': '#00FFF6',
  'Harmonic': '#C77DFF',
  'Carrier': '#FFD700',
  'Conductor': '#FF6B9D',
  'Source₄₀₂': '#FFFFFF',
}

// Generate mock nodes with SOL data
const generateMockNodes = (): Node[] => {
  return Array.from({ length: 40 }, (_, i) => {
    const address = `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 4)}`
    const rank = ranks[Math.floor(Math.random() * ranks.length)]
    const solResonance = Math.random() * 0.1 // 0-0.1 SOL/s
    const totalSOL = Math.random() * 50 + 1 // 1-51 SOL
    const lastSync = Math.floor(Math.random() * 60) // 0-60 seconds
    
    return {
      id: `node-${i}`,
      address,
      rank,
      solResonance,
      totalSOL,
      lastSync,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
    }
  })
}

export default function NetworkMap() {
  const [nodes, setNodes] = useState<Node[]>(generateMockNodes())
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          solResonance: Math.max(0, Math.min(0.1, node.solResonance + (Math.random() - 0.5) * 0.01)),
          lastSync: Math.max(0, Math.min(60, node.lastSync + (Math.random() > 0.5 ? 1 : -1))),
        }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Generate connections between nodes (flow lines)
  const connections = nodes.slice(0, 20).map((node, i) => {
    const targetIndex = (i + 1) % nodes.length
    const target = nodes[targetIndex]
    const flowVolume = Math.min(node.solResonance, target.solResonance) * 1000 // Scale for visualization
    
    return {
      from: node,
      to: target,
      volume: flowVolume,
      color: rankColors[node.rank],
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-glow-gold mb-2">Network Map</h2>
        <p className="text-resonance-turquoise/70">SOL Flow Visualization — Token Energy Map</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Node Info Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm sticky top-24">
            <h3 className="text-xl font-bold text-resonance-turquoise mb-4">Node Ranks</h3>
            <div className="space-y-3 mb-6">
              {ranks.map((rank) => (
                <div key={rank} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: rankColors[rank] }}
                  />
                  <span className="text-sm text-gray-300">{rank}</span>
                </div>
              ))}
            </div>
            
            {hoveredNode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-gray-800 pt-4 mt-4"
              >
                <h4 className="text-lg font-semibold text-resonance-gold mb-3">
                  Node Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Node:</span>
                    <div className="text-resonance-turquoise font-mono text-xs">{hoveredNode.address}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Resonance:</span>
                    <div className="text-resonance-gold">
                      {hoveredNode.solResonance.toFixed(3)} <span className="text-xs">SOL/s</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Total SOL:</span>
                    <div className="text-resonance-gold">
                      {hoveredNode.totalSOL.toFixed(2)} <span className="text-xs">SOL</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Last sync:</span>
                    <div className="text-resonance-turquoise">{hoveredNode.lastSync}s ago</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Rank:</span>
                    <div className="text-white" style={{ color: rankColors[hoveredNode.rank] }}>
                      {hoveredNode.rank}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {!hoveredNode && (
              <div className="text-xs text-gray-500 mt-4">
                Hover over nodes to see details
              </div>
            )}
          </div>
        </div>

        {/* Network Visualization */}
        <div className="lg:col-span-3">
          <div
            ref={containerRef}
            className="relative bg-gray-900/50 border border-resonance-turquoise/30 rounded-xl p-8 h-[600px] overflow-hidden backdrop-blur-sm"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 246, 0.1), inset 0 0 40px rgba(0, 255, 246, 0.05)',
            }}
          >
            {/* Background depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-resonance-turquoise/5 to-transparent" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 246, 0.1) 0%, transparent 70%)',
            }} />
            <svg className="absolute inset-0 w-full h-full z-10">
              {/* SOL Flow Lines - thickness based on volume, color based on frequency */}
              {connections.map((conn, i) => {
                const frequency = Math.max(conn.from.solResonance, conn.to.solResonance) * 10
                const thickness = Math.max(1, Math.min(4, conn.volume / 10))
                const opacity = Math.min(0.6, Math.max(0.1, frequency / 10))
                
                return (
                  <motion.line
                    key={`${conn.from.id}-${conn.to.id}`}
                    x1={`${conn.from.x}%`}
                    y1={`${conn.from.y}%`}
                    x2={`${conn.to.x}%`}
                    y2={`${conn.to.y}%`}
                    stroke={conn.color}
                    strokeWidth={thickness}
                    strokeOpacity={opacity}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: opacity,
                    }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                  />
                )
              })}
              
              {/* Vault pulls lines effect */}
              {nodes.slice(0, 5).map((node, i) => {
                const centerX = 50
                const centerY = 50
                return (
                  <motion.line
                    key={`vault-${node.id}`}
                    x1={`${centerX}%`}
                    y1={`${centerY}%`}
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    stroke={rankColors[node.rank]}
                    strokeWidth="1"
                    strokeOpacity="0.2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{
                      pathLength: 1,
                      strokeDashoffset: [0, -8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.2,
                    }}
                  />
                )
              })}
            </svg>

            {/* Nodes */}
            <div className="relative z-20">
            {nodes.map((node) => {
              const nodeSize = 4 + node.solResonance * 40 // Size based on resonance
              
              return (
                <motion.div
                  key={node.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onHoverStart={() => setHoveredNode(node)}
                  onHoverEnd={() => setHoveredNode(null)}
                  whileHover={{ scale: 1.5, zIndex: 10 }}
                  animate={{
                    x: Math.sin(Date.now() / 2000 + node.id.charCodeAt(0)) * 2,
                    y: Math.cos(Date.now() / 2000 + node.id.charCodeAt(0)) * 2,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="relative">
                    {/* Aura - brighter for higher resonance */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: rankColors[node.rank],
                        opacity: 0.3 + node.solResonance * 5,
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3 + node.solResonance * 5, 0.6 + node.solResonance * 5, 0.3 + node.solResonance * 5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Node */}
                    <div
                      className="relative rounded-full border-2"
                      style={{
                        width: `${nodeSize}px`,
                        height: `${nodeSize}px`,
                        backgroundColor: rankColors[node.rank],
                        borderColor: rankColors[node.rank],
                        boxShadow: `0 0 ${nodeSize * 2}px ${rankColors[node.rank]}, 0 0 ${nodeSize * 4}px ${rankColors[node.rank]}`,
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
            </div>

            {/* Center Vault₄₀₂ */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.div
                className="relative w-24 h-24 rounded-full border-2 border-resonance-gold flex items-center justify-center bg-black/70 backdrop-blur-md"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                  boxShadow: [
                    '0 0 30px rgba(255, 215, 0, 0.6)',
                    '0 0 50px rgba(255, 215, 0, 0.9)',
                    '0 0 30px rgba(255, 215, 0, 0.6)',
                  ],
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  boxShadow: { duration: 2, repeat: Infinity },
                }}
              >
                <span className="text-resonance-gold font-bold text-glow-gold text-lg">₄₀₂</span>
              </motion.div>
              {/* Orbital rings around vault */}
              <motion.div
                className="absolute inset-0 rounded-full border border-resonance-gold/30"
                animate={{ rotate: -360, scale: [1.2, 1.3, 1.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm">
              <div className="bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-800">
                <span className="text-gray-400">Total Nodes: </span>
                <span className="text-resonance-turquoise font-bold">{nodes.length}</span>
              </div>
              <div className="bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-800">
                <span className="text-gray-400">Active Flows: </span>
                <span className="text-resonance-gold font-bold">{connections.length}</span>
              </div>
              <div className="bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-800">
                <span className="text-gray-400">Total SOL Flow: </span>
                <span className="text-resonance-purple font-bold">
                  {connections.reduce((sum, c) => sum + c.volume, 0).toFixed(2)} SOL/s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
