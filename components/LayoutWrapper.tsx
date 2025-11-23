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
  const isPaymentStatusPage = pathname === '/payment/status'
  const isAdminPage = pathname?.startsWith('/admin')
  
  const hideHeaderFooter = isPaymentStatusPage || isAdminPage

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="min-h-screen">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}
