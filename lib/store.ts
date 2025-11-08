import { create } from 'zustand'

export interface Transmission {
  id: string
  type: 'node_signal' | 'frequency_update' | 'verification'
  amount: number // SOL
  description: string
  timestamp: number
  verified: boolean
}

export interface Signal {
  id: string
  node: string
  frequency: number
  solImpact: number
  status: 'active' | 'verified' | 'expired'
  timestamp: number
}

export interface Node {
  id: string
  address: string
  status: 'active' | 'syncing' | 'offline'
  frequency: number
  proof: 'valid' | 'pending' | 'invalid'
  x: number
  y: number
}

interface WaveStore {
  // Frequency metrics
  frequencyIndex: number // Hz
  frequencyVerified: boolean
  
  // Wave Core (Vault)
  waveCore: number // SOL
  waveCoreGrowth: number // SOL per minute
  waveCoreGrowthRate: number
  
  // Pulse Stream (Trading Volume)
  pulseStream: number // SOL volume 24h
  pulseStreamGrowth: number // % growth
  
  // Synced Nodes
  syncedNodes: number
  nodesGrowth: number // new nodes this hour
  
  // Transmissions
  transmissions: Transmission[]
  signals: Signal[]
  nodes: Node[]
  
  // Update flags to prevent unnecessary re-renders
  lastTransmissionUpdate: number
  lastSignalUpdate: number
  
  // Actions
  addTransmission: (tx: Transmission) => void
  addSignal: (signal: Signal) => void
  addNode: (node: Node) => void
  updateFrequency: () => void
  updateWaveCore: () => void
  removeOldTransmissions: () => void
  removeOldSignals: () => void
}

export const useWaveStore = create<WaveStore>((set, get) => ({
  frequencyIndex: 200.255,
  frequencyVerified: true,
  
  waveCore: 0.0016915,
  waveCoreGrowth: 0.0035,
  waveCoreGrowthRate: 0.076,
  
  pulseStream: 4.6,
  pulseStreamGrowth: 1.4,
  
  syncedNodes: 74,
  nodesGrowth: 1,
  
  transmissions: [
    {
      id: '1',
      type: 'node_signal',
      amount: 0.00295,
      description: 'Node resonance increasing',
      timestamp: Date.now() - 15000,
      verified: true,
    },
    {
      id: '2',
      type: 'node_signal',
      amount: 0.00465,
      description: 'Verification proof validated',
      timestamp: Date.now() - 22000,
      verified: true,
    },
    {
      id: '3',
      type: 'frequency_update',
      amount: 0.0011,
      description: 'Node 0xA17 verified',
      timestamp: Date.now() - 30000,
      verified: true,
    },
    {
      id: '4',
      type: 'node_signal',
      amount: 0.00425,
      description: 'Wave transmission received',
      timestamp: Date.now() - 38000,
      verified: true,
    },
  ],
  
  signals: [
    {
      id: '1',
      node: '0xC89',
      frequency: 202.04,
      solImpact: 0.0035,
      status: 'verified',
      timestamp: Date.now() - 12000,
    },
    {
      id: '2',
      node: '0xE56',
      frequency: 201.805,
      solImpact: 0.0037,
      status: 'verified',
      timestamp: Date.now() - 18000,
    },
    {
      id: '3',
      node: '0xE56',
      frequency: 201.205,
      solImpact: 0.0016,
      status: 'verified',
      timestamp: Date.now() - 25000,
    },
    {
      id: '4',
      node: '0xA17',
      frequency: 201.30,
      solImpact: 0.0025,
      status: 'verified',
      timestamp: Date.now() - 32000,
    },
  ],
  
  nodes: [],
  lastTransmissionUpdate: Date.now(),
  lastSignalUpdate: Date.now(),
  
  addTransmission: (tx) => set((state) => {
    // Prevent duplicate IDs
    if (state.transmissions.some(t => t.id === tx.id)) {
      return state
    }
    return {
      transmissions: [tx, ...state.transmissions].slice(0, 20),
      lastTransmissionUpdate: Date.now(),
    }
  }),
  
  addSignal: (signal) => set((state) => {
    // Prevent duplicate IDs
    if (state.signals.some(s => s.id === signal.id)) {
      return state
    }
    return {
      signals: [signal, ...state.signals].slice(0, 15),
      lastSignalUpdate: Date.now(),
    }
  }),
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node],
  })),
  
  removeOldTransmissions: () => set((state) => {
    const now = Date.now()
    const maxAge = 5 * 60 * 1000 // 5 minutes
    return {
      transmissions: state.transmissions.filter(tx => now - tx.timestamp < maxAge),
    }
  }),
  
  removeOldSignals: () => set((state) => {
    const now = Date.now()
    const maxAge = 5 * 60 * 1000 // 5 minutes
    return {
      signals: state.signals.filter(s => now - s.timestamp < maxAge),
    }
  }),
  
  updateFrequency: () => {
    set((state) => ({
      frequencyIndex: 400 + Math.sin(Date.now() / 10000) * 0.5 + Math.random() * 0.1,
      frequencyVerified: Math.random() > 0.05, // 95% verified
    }))
  },
  
  updateWaveCore: () => {
    set((state) => {
      const growthPerSecond = state.waveCoreGrowth / 60
      const growthPerUpdate = growthPerSecond * 0.5 // Update every 500ms
      
      // Smooth pulse stream updates (only grow, slower)
      const pulseStreamChange = Math.max(0, (Math.random() - 0.2) * 0.02) // Only positive, smaller changes
      const newPulseStream = state.pulseStream + pulseStreamChange
      
      // Smooth growth rate updates
      const growthChange = (Math.random() - 0.5) * 0.01
      const newGrowth = Math.max(0, state.pulseStreamGrowth + growthChange)
      
      return {
        waveCore: state.waveCore + growthPerUpdate,
        pulseStream: newPulseStream,
        pulseStreamGrowth: Math.max(0, Math.min(10, newGrowth)), // Clamp between 0 and 10%
      }
    })
  },
}))
