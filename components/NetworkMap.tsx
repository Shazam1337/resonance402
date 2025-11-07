'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useWaveStore, Node } from '@/lib/store'

export default function NetworkMap() {
  const { nodes, addNode } = useWaveStore()
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayNodes, setDisplayNodes] = useState<Node[]>([])

  // Initialize nodes if empty
  useEffect(() => {
    if (nodes.length === 0) {
      const initialNodes: Node[] = Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * Math.PI * 2
        const radius = 200 + Math.random() * 150
        return {
          id: `node-${i}`,
          address: `0x${Math.random().toString(16).substring(2, 8)}`,
          status: Math.random() > 0.2 ? 'active' : 'syncing',
          frequency: 400 + Math.random() * 5,
          proof: Math.random() > 0.1 ? 'valid' : 'pending',
          x: 50 + (radius * Math.cos(angle)) / 10,
          y: 50 + (radius * Math.sin(angle)) / 10,
        }
      })
      initialNodes.forEach(node => addNode(node))
    }
  }, [nodes.length, addNode])

  useEffect(() => {
    setDisplayNodes(nodes)
  }, [nodes])

  // Update node positions slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayNodes((prev) =>
        prev.map((node) => ({
          ...node,
          x: node.x + (Math.random() - 0.5) * 0.5,
          y: node.y + (Math.random() - 0.5) * 0.5,
          frequency: 400 + Math.random() * 5,
        }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen p-6 md:p-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-mono-title font-bold neon-yellow mb-2 uppercase tracking-widest">
            NETWORK MAP
          </h1>
          <p className="font-mono text-wave-gray text-sm uppercase tracking-widest">
            SOL Flow Visualization — {displayNodes.length} Nodes Active
          </p>
        </div>

        {/* Network Visualization */}
        <div
          ref={containerRef}
          className="relative w-full h-[600px] border border-wave-dark-gray bg-black overflow-hidden"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 grid-background opacity-20" />

          {/* Center - Wave Core */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px #C3FF1F',
                '0 0 40px #C3FF1F, 0 0 60px #C3FF1F',
                '0 0 20px #C3FF1F',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-16 h-16 rounded-full bg-wave-acid-yellow flex items-center justify-center">
              <div className="text-xs font-mono-title font-bold text-black uppercase">
                CORE
              </div>
            </div>
          </motion.div>

          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full z-0">
            {displayNodes.map((node) => {
              const centerX = (containerRef.current?.offsetWidth || 0) / 2
              const centerY = (containerRef.current?.offsetHeight || 0) / 2
              const nodeX = (node.x / 100) * (containerRef.current?.offsetWidth || 0)
              const nodeY = (node.y / 100) * (containerRef.current?.offsetHeight || 0)
              
              return (
                <motion.line
                  key={`line-${node.id}`}
                  x1={centerX}
                  y1={centerY}
                  x2={nodeX}
                  y2={nodeY}
                  stroke={node.status === 'active' ? '#00FFE1' : '#202020'}
                  strokeWidth={node.status === 'active' ? 1 : 0.5}
                  strokeOpacity={node.status === 'active' ? 0.3 : 0.1}
                  animate={{
                    strokeOpacity: node.status === 'active' ? [0.3, 0.6, 0.3] : 0.1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {displayNodes.map((node) => {
            const nodeX = (node.x / 100) * (containerRef.current?.offsetWidth || 0)
            const nodeY = (node.y / 100) * (containerRef.current?.offsetHeight || 0)
            
            return (
              <motion.div
                key={node.id}
                className="absolute z-20 cursor-pointer"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                animate={{
                  scale: hoveredNode?.id === node.id ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className={`w-4 h-4 rounded-full border-2 ${
                    node.status === 'active'
                      ? 'bg-wave-cyan border-wave-cyan'
                      : node.status === 'syncing'
                      ? 'bg-wave-acid-yellow border-wave-acid-yellow'
                      : 'bg-wave-dark-gray border-wave-dark-gray'
                  }`}
                  animate={{
                    boxShadow: node.status === 'active'
                      ? ['0 0 10px #00FFE1', '0 0 20px #00FFE1', '0 0 10px #00FFE1']
                      : node.status === 'syncing'
                      ? ['0 0 10px #C3FF1F', '0 0 20px #C3FF1F', '0 0 10px #C3FF1F']
                      : [],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Node Info Panel */}
        {hoveredNode && (
          <motion.div
            className="mt-8 terminal-block p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-4">
              NODE_{hoveredNode.address}
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center justify-between">
                <span className="text-wave-gray">Status:</span>
                <span className={`${
                  hoveredNode.status === 'active' ? 'text-wave-cyan' : 
                  hoveredNode.status === 'syncing' ? 'text-wave-acid-yellow' : 
                  'text-wave-gray'
                }`}>
                  {hoveredNode.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-wave-gray">Frequency:</span>
                <span className="text-white">{hoveredNode.frequency.toFixed(2)} Hz</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-wave-gray">Proof:</span>
                <span className={`${
                  hoveredNode.proof === 'valid' ? 'text-wave-acid-yellow' : 
                  hoveredNode.proof === 'pending' ? 'text-wave-cyan' : 
                  'text-red-500'
                }`}>
                  {hoveredNode.proof.toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="terminal-block p-6">
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-2">
              ACTIVE NODES
            </div>
            <div className="text-3xl font-mono font-bold text-white">
              {displayNodes.filter(n => n.status === 'active').length}
            </div>
          </div>
          <div className="terminal-block p-6">
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-2">
              SYNCING NODES
            </div>
            <div className="text-3xl font-mono font-bold text-wave-cyan">
              {displayNodes.filter(n => n.status === 'syncing').length}
            </div>
          </div>
          <div className="terminal-block p-6">
            <div className="font-mono-title text-xs text-wave-acid-yellow uppercase tracking-widest mb-2">
              VALID PROOFS
            </div>
            <div className="text-3xl font-mono font-bold text-wave-acid-yellow">
              {displayNodes.filter(n => n.proof === 'valid').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
