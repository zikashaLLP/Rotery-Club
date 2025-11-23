'use client'

import React, { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'
import { Trophy, Users, DollarSign, Award } from 'lucide-react'

interface DashboardStats {
  totalMarathons: number
  totalParticipants: number
  totalPaidParticipants: number
  totalRevenue: number
  totalResults: number
}

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    totalMarathons: 0,
    totalParticipants: 0,
    totalPaidParticipants: 0,
    totalRevenue: 0,
    totalResults: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const { handleUnauthorized } = useAuth()

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true)

      // Fetch all data in parallel
      const [marathonsRes, participantsRes, resultsRes, paymentStatsRes] = await Promise.all([
        apiCall('/api/marathon', { requireAuth: true }, handleUnauthorized),
        apiCall('/api/admin/participants', { requireAuth: true }, handleUnauthorized),
        apiCall('/api/result', { requireAuth: true }, handleUnauthorized),
        apiCall('/api/admin/reports/payment-statistics', { requireAuth: true }, handleUnauthorized),
      ])

      const marathons = await marathonsRes.json()
      const participants = await participantsRes.json()
      const results = await resultsRes.json()
      const paymentStats = await paymentStatsRes.json()

      setStats({
        totalMarathons: marathons.success ? marathons.count || marathons.data?.length || 0 : 0,
        totalParticipants: participants.success ? participants.count || participants.data?.length || 0 : 0,
        totalPaidParticipants: paymentStats.success ? paymentStats.data?.paidParticipants || 0 : 0,
        totalRevenue: paymentStats.success ? paymentStats.data?.paidAmount || 0 : 0,
        totalResults: results.success ? results.count || results.data?.length || 0 : 0,
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Marathons',
      value: stats.totalMarathons,
      icon: Trophy,
      color: 'from-[#640D5F] to-[#D91656]',
    },
    {
      title: 'Total Participants',
      value: stats.totalParticipants,
      icon: Users,
      color: 'from-[#FFB200] to-[#EB5B00]',
    },
    {
      title: 'Paid Participants',
      value: stats.totalPaidParticipants,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Results',
      value: stats.totalResults,
      icon: Award,
      color: 'from-blue-500 to-blue-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] flex">
      <AdminSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-2">Dashboard</h1>
            <p className="text-[#2B1341]/70">Overview of your marathon management system</p>
          </div>

          {/* Stats Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border-2 border-[#F8C8DC] animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 border-2 border-[#F8C8DC] shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-[#2B1341]/70 mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold text-[#640D5F]">{stat.value.toLocaleString()}</p>
                  </div>
                )
              })}
            </div>
          )}

          {/* Revenue Card */}
          {!isLoading && (
            <div className="bg-gradient-to-r from-[#640D5F] to-[#D91656] rounded-2xl p-6 md:p-8 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 mb-2">Total Revenue</p>
                  <p className="text-4xl md:text-5xl font-bold">₹{stats.totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <DollarSign className="w-16 h-16 text-white/30" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

