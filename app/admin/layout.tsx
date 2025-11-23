'use client'

import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitialized } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Wait for initialization before checking authentication
    if (!isInitialized) return

    // Allow access to login page without authentication
    if (!isAuthenticated && pathname !== '/admin/login' && pathname !== '/admin') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, isInitialized, pathname, router])

  // Show loading state while checking authentication
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D91656] mx-auto"></div>
          <p className="mt-4 text-[#640D5F]">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render protected content if not authenticated (except login page)
  if (!isAuthenticated && pathname !== '/admin/login' && pathname !== '/admin') {
    return null
  }

  return <>{children}</>
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}

