import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata: Metadata = {
  title: 'Visnagar Marathon 2025 - Run for Cervical Cancer',
  description: 'Join us for an unforgettable marathon experience',
  icons: {
    icon: '/icon.jpeg',
    shortcut: '/icon.jpeg',
    apple: '/icon.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  )
}

