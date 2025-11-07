import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from '@/components/WalletProvider'

export const metadata: Metadata = {
  title: 'WAVE402 — The Verifiable Frequency Protocol',
  description: 'A Protocol for Verifiable Social Liquidity - The Internet speaks in waves. WAVE402 makes them verifiable.',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}

