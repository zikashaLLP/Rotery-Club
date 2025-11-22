'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  // Pages that should not have header and footer
  const isRegisterPage = pathname === '/register'
  const isCheckoutPage = pathname === '/checkout'
  const isPaymentPage = pathname.startsWith('/payment')
  
  const hideHeaderFooter = isRegisterPage || isCheckoutPage || isPaymentPage

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="min-h-screen">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}
