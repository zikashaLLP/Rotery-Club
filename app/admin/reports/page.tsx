'use client'

import React, { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'
import { BarChart3, Shirt, DollarSign } from 'lucide-react'

interface TShirtSizeReport {
  'XS 34': number
  'S 36': number
  'M 38': number
  'L 40': number
  'XL 42': number
  'XXL 44': number
  '3XL 46': number
  total: number
}

interface PaymentStatistics {
  totalParticipants: number
  paidParticipants: number
  pendingParticipants: number
  totalRevenue: number
}

interface Marathon {
  Id: number
  Name: string
}

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [tshirtReport, setTshirtReport] = useState<TShirtSizeReport | null>(null)
  const [paymentStats, setPaymentStats] = useState<PaymentStatistics | null>(null)
  const [marathons, setMarathons] = useState<Marathon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMarathonId, setSelectedMarathonId] = useState('')
  const { handleUnauthorized } = useAuth()

  useEffect(() => {
    fetchMarathons()
  }, [])

  const fetchMarathons = async () => {
    try {
      const response = await apiCall('/api/marathon', { requireAuth: true }, handleUnauthorized)
      const data = await response.json()
      if (data.success) {
        setMarathons(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching marathons:', error)
    }
  }

  const fetchReports = async () => {
    try {
      setIsLoading(true)
      const queryParams = selectedMarathonId ? `?marathonId=${selectedMarathonId}` : ''

      const [tshirtRes, paymentRes] = await Promise.all([
        apiCall(`/api/admin/reports/tshirt-size${queryParams}`, { requireAuth: true }, handleUnauthorized),
        apiCall(`/api/admin/reports/payment-statistics${queryParams}`, { requireAuth: true }, handleUnauthorized),
      ])

      const tshirtData = await tshirtRes.json()
      const paymentData = await paymentRes.json()

      if (tshirtData.success) {
        setTshirtReport(tshirtData.data)
      } else {
        setTshirtReport(null)
      }
      if (paymentData.success) {
        setPaymentStats(paymentData.data)
      } else {
        setPaymentStats(null)
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
      setTshirtReport(null)
      setPaymentStats(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMarathons()
  }, [])

  useEffect(() => {
    fetchReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarathonId])

  const tshirtSizes = ['XS 34', 'S 36', 'M 38', 'L 40', 'XL 42', 'XXL 44', '3XL 46']
  const maxTshirtCount = tshirtReport
    ? Math.max(...tshirtSizes.map((size) => tshirtReport[size as keyof TShirtSizeReport] as number))
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] flex">
      <AdminSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-2">Reports</h1>
                <p className="text-[#2B1341]/70">View analytics and statistics</p>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-[#640D5F]">Filter by Marathon:</label>
                <select
                  value={selectedMarathonId}
                  onChange={(e) => setSelectedMarathonId(e.target.value)}
                  className="px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656] bg-white text-[#640D5F] font-medium min-w-[200px]"
                >
                  <option value="">All Marathons</option>
                  {marathons.map((marathon) => (
                    <option key={marathon.Id} value={marathon.Id}>
                      {marathon.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* T-Shirt Size Report */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#F8C8DC] mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB200] to-[#EB5B00] flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#640D5F]">T-Shirt Size Distribution</h2>
                <p className="text-[#2B1341]/70">Breakdown by size</p>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-[#2B1341]/70">Loading...</div>
            ) : tshirtReport ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {tshirtSizes.map((size) => {
                    const count = tshirtReport[size as keyof TShirtSizeReport] as number
                    const percentage = tshirtReport.total > 0 ? (count / tshirtReport.total) * 100 : 0
                    return (
                      <div key={size} className="text-center">
                        <div className="bg-[#FFF1F5] rounded-xl p-4 mb-2">
                          <p className="text-2xl font-bold text-[#640D5F]">{count}</p>
                          <p className="text-sm text-[#2B1341]/70 mt-1">{size}</p>
                        </div>
                        <p className="text-xs text-[#2B1341]/50">{percentage.toFixed(1)}%</p>
                      </div>
                    )
                  })}
                </div>
                <div className="pt-4 border-t-2 border-[#F8C8DC]">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#640D5F]">Total</span>
                    <span className="text-2xl font-bold text-[#640D5F]">{tshirtReport.total}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[#2B1341]/70">No data available</div>
            )}
          </div>

          {/* Payment Statistics */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#F8C8DC]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#640D5F] to-[#D91656] flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#640D5F]">Payment Statistics</h2>
                <p className="text-[#2B1341]/70">Payment overview and revenue</p>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-[#2B1341]/70">Loading...</div>
            ) : paymentStats ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-[#640D5F] to-[#D91656] rounded-xl p-6 text-white">
                    <p className="text-sm text-white/80 mb-2">Total Participants</p>
                    <p className="text-3xl font-bold">{paymentStats.totalParticipants ?? 0}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <p className="text-sm text-white/80 mb-2">Paid Participants</p>
                    <p className="text-3xl font-bold">{paymentStats.paidParticipants ?? 0}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
                    <p className="text-sm text-white/80 mb-2">Pending Participants</p>
                    <p className="text-3xl font-bold">{paymentStats.pendingParticipants ?? 0}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#FFB200] to-[#EB5B00] rounded-xl p-6 text-white">
                    <p className="text-sm text-white/80 mb-2">Total Revenue</p>
                    <p className="text-3xl font-bold">
                      ₹{paymentStats.totalRevenue
                        ? paymentStats.totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : '0.00'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[#2B1341]/70">No data available</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

