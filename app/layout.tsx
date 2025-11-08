import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from '@/components/WalletProvider'

export const metadata: Metadata = {
  title: 'CRYOVOLT402 — Frozen Frequency Protocol',
  description: 'A Protocol for Frozen Frequency Verification - Cryo-signal precision. CRYOVOLT402 verifies with frozen accuracy.',
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
      <body className="bg-gray-100 text-cryo-bg overflow-x-hidden">
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}

