'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface Admin {
  Id: number
  Mobile_Number: string
}

interface AuthContextType {
  token: string | null
  admin: Admin | null
  isAuthenticated: boolean
  isInitialized: boolean
  login: (mobileNumber: string, password: string) => Promise<boolean>
  logout: () => void
  getAuthHeaders: () => HeadersInit
  handleUnauthorized: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Load token from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('admin_token')
      const storedAdmin = localStorage.getItem('admin_data')
      if (storedToken) {
        setToken(storedToken)
        if (storedAdmin) {
          setAdmin(JSON.parse(storedAdmin))
        }
      }
      setIsInitialized(true)
    } else {
      setIsInitialized(true)
    }
  }, [])

  const login = async (mobileNumber: string, password: string): Promise<boolean> => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://193.203.161.3:5152'
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, password }),
      })

      const data = await response.json()

      if (data.success && data.data?.token) {
        const accessToken = data.data.token
        setToken(accessToken)
        setAdmin(data.data.admin)
        if (typeof window !== 'undefined') {
          // Store access token in localStorage
          localStorage.setItem('admin_token', accessToken)
          localStorage.setItem('admin_data', JSON.stringify(data.data.admin))
        }
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setToken(null)
    setAdmin(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_data')
    }
  }

  const handleUnauthorized = () => {
    logout()
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login'
    }
  }

  const getAuthHeaders = (): HeadersInit => {
    const currentToken = token || (typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null)
    return {
      'Authorization': `Bearer ${currentToken}`,
      'Content-Type': 'application/json',
    }
  }

  // Check if authenticated - check both state and localStorage
  const checkIsAuthenticated = (): boolean => {
    if (token) return true
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('admin_token')
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        isAuthenticated: checkIsAuthenticated(),
        isInitialized,
        login,
        logout,
        getAuthHeaders,
        handleUnauthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

