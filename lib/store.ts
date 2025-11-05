import { create } from 'zustand'

export interface SocialWave {
  id: string
  name: string
  volumeGrowth: number // % growth
  solImpact: number // SOL impact
  socialResonance: number // % resonance
  status: 'active' | 'cooling' | 'complete'
  timestamp: number
}

export interface Transaction {
  id: string
  type: 'vault_fee' | 'wave_impact' | 'node_signal'
  amount: number // SOL
  description: string
  timestamp: number
}

export interface Reward {
  id: string
  username: string
  amount: number // SOL earned
  timestamp: number
}

export interface Node {
  id: string
  address: string
  rank: 'Echo' | 'Harmonic' | 'Carrier' | 'Conductor' | 'Source₄₀₂'
  solResonance: number
  totalSOL: number
  lastSync: number
  x: number
  y: number
}

interface ResonanceStore {
  // Vault metrics - constantly growing
  vaultEnergy: number // SOL in Vault₄₀₂ (platform fees)
  vaultGrowthRate: number // SOL per minute
  vaultResonanceLevel: 'Low' | 'Medium' | 'High'
  
  // Trading metrics
  tradingVolume24h: number // SOL volume
  tradingVolumeGrowth: number // % growth
  volumeToFeeRatio: number // % of volume going to Vault
  
  // Network metrics
  activeNodes: number
  nodesGrowth: number // new nodes this hour
  resonanceIndex: number // Hz - network health
  
  // Social impact
  socialWaves: SocialWave[]
  recentTransactions: Transaction[]
  rewards: Reward[]
  
  // Actions
  addSocialWave: (wave: SocialWave) => void
  addTransaction: (tx: Transaction) => void
  addReward: (reward: Reward) => void
  updateVault: () => void
  updateNetwork: () => void
}

export const useResonanceStore = create<ResonanceStore>((set, get) => ({
  vaultEnergy: 0,
  vaultGrowthRate: 0.15, // Increased from 0.035 to 0.15 SOL per minute
  vaultResonanceLevel: 'High',
  
  tradingVolume24h: 7.0,
  tradingVolumeGrowth: 2.8,
  volumeToFeeRatio: 0.15,
  
  activeNodes: 149,
  nodesGrowth: 3,
  resonanceIndex: 401.07,
  
  socialWaves: [
    {
      id: '1',
      name: 'SOL Rising',
      volumeGrowth: 4.2,
      solImpact: 0.82,
      socialResonance: 8.5,
      status: 'active',
      timestamp: Date.now() - 300000,
    },
    {
      id: '2',
      name: 'Vault Storm',
      volumeGrowth: 3.1,
      solImpact: 0.65,
      socialResonance: 6.2,
      status: 'active',
      timestamp: Date.now() - 600000,
    },
    {
      id: '3',
      name: 'Echo Pulse',
      volumeGrowth: 1.4,
      solImpact: 0.31,
      socialResonance: 4.8,
      status: 'cooling',
      timestamp: Date.now() - 900000,
    },
  ],
  
  recentTransactions: [
    {
      id: '1',
      type: 'vault_fee',
      amount: 0.032,
      description: 'Vault fee update',
      timestamp: Date.now() - 5000,
    },
    {
      id: '2',
      type: 'wave_impact',
      amount: 0.005,
      description: "Wave 'Nova' impact",
      timestamp: Date.now() - 12000,
    },
    {
      id: '3',
      type: 'node_signal',
      amount: 0.001,
      description: 'Node 0xA17 posted new signal',
      timestamp: Date.now() - 18000,
    },
  ],
  
  rewards: [
    { id: '1', username: '@solverse', amount: 0.22, timestamp: Date.now() - 10000 },
    { id: '2', username: '@vaultnode', amount: 0.19, timestamp: Date.now() - 20000 },
    { id: '3', username: '@wavealpha', amount: 0.17, timestamp: Date.now() - 30000 },
  ],
  
  addSocialWave: (wave) => set((state) => ({
    socialWaves: [wave, ...state.socialWaves].slice(0, 10), // Keep last 10
  })),
  
  addTransaction: (tx) => set((state) => ({
    recentTransactions: [tx, ...state.recentTransactions].slice(0, 20), // Keep last 20
  })),
  
  addReward: (reward) => set((state) => ({
    rewards: [reward, ...state.rewards].slice(0, 10), // Keep last 10
  })),
  
  updateVault: () => {
    set((state) => {
      // Vault constantly grows based on growth rate (faster updates)
      const growthPerSecond = state.vaultGrowthRate / 60
      // Since we update every 200ms, multiply by 0.2 (200ms / 1000ms)
      const growthPerUpdate = growthPerSecond * 0.2
      const newVault = state.vaultEnergy + growthPerUpdate
      
      // More frequent larger spikes (simulating fee batches)
      const shouldAddFee = Math.random() > 0.85 // Increased from 0.95 to 0.85 (15% chance vs 5%)
      const feeAmount = shouldAddFee ? Math.random() * 0.05 + 0.01 : 0
      
      return {
        vaultEnergy: newVault + feeAmount,
        vaultGrowthRate: state.vaultGrowthRate + (Math.random() - 0.5) * 0.002,
        tradingVolume24h: state.tradingVolume24h + Math.random() * 0.2, // Only grows, slower (0.2 instead of 1)
        tradingVolumeGrowth: Math.max(0, state.tradingVolumeGrowth + (Math.random() - 0.3) * 0.001), // Only positive growth, slower
        resonanceIndex: 401 + Math.sin(Date.now() / 10000) * 0.5 + Math.random() * 0.1,
      }
    })
  },
  
  updateNetwork: () => {
    set((state) => ({
      activeNodes: Math.floor(145 + Math.random() * 10),
      nodesGrowth: Math.floor(2 + Math.random() * 3),
    }))
  },
}))
