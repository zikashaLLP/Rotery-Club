import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata: Metadata = {
  title: 'Marathon Event - Run for a Cause',
  description: 'Join us for an unforgettable marathon experience',
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

