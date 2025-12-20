'use client'

import React, { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'
import { downloadExcel, downloadStatisticsExcel } from '@/lib/utils'
import { BarChart3, Shirt, DollarSign, Download } from 'lucide-react'

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
  const [downloading, setDownloading] = useState<string | null>(null)
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

  const downloadCompletedPayments = async () => {
    try {
      setDownloading('completed')
      const response = await apiCall(
        '/api/admin/participants-with-payment?paymentStatus=Completed',
        { requireAuth: true },
        handleUnauthorized
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Completed payments response:', data)
      
      // Handle different response formats
      let participantsData: any[] = []
      
      if (Array.isArray(data)) {
        participantsData = data
      } else if (data.success && Array.isArray(data.data)) {
        participantsData = data.data
      } else if (data.data && Array.isArray(data.data)) {
        participantsData = data.data
      } else if (Array.isArray(data.result)) {
        participantsData = data.result
      } else {
        console.error('Invalid data format:', data)
        alert(`Failed to download: Invalid data format. Received: ${JSON.stringify(data).substring(0, 200)}`)
        return
      }
      
      if (participantsData.length === 0) {
        alert('No data available to download')
        return
      }
      
      downloadExcel(participantsData, `completed-payments-${new Date().toISOString().split('T')[0]}.xlsx`, 'Completed Payments')
    } catch (error) {
      console.error('Error downloading completed payments:', error)
      alert(`Failed to download completed payments: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setDownloading(null)
    }
  }

  const downloadAllPayments = async () => {
    try {
      setDownloading('all')
      const response = await apiCall(
        '/api/admin/participants-with-payment?paymentStatus=all',
        { requireAuth: true },
        handleUnauthorized
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('All payments response:', data)
      
      // Handle different response formats
      let participantsData: any[] = []
      
      if (Array.isArray(data)) {
        participantsData = data
      } else if (data.success && Array.isArray(data.data)) {
        participantsData = data.data
      } else if (data.data && Array.isArray(data.data)) {
        participantsData = data.data
      } else if (Array.isArray(data.result)) {
        participantsData = data.result
      } else {
        console.error('Invalid data format:', data)
        alert(`Failed to download: Invalid data format. Received: ${JSON.stringify(data).substring(0, 200)}`)
        return
      }
      
      if (participantsData.length === 0) {
        alert('No data available to download')
        return
      }
      
      downloadExcel(participantsData, `all-payments-${new Date().toISOString().split('T')[0]}.xlsx`, 'All Payments')
    } catch (error) {
      console.error('Error downloading all payments:', error)
      alert(`Failed to download all payments: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setDownloading(null)
    }
  }

  const downloadParticipantGroup = async (groupName: string, gender: string, minAge: number, maxAge: number, downloadKey: string) => {
    try {
      setDownloading(downloadKey)
      const queryParams = new URLSearchParams({
        gender: gender,
        minAge: minAge.toString(),
        maxAge: maxAge.toString()
      })
      
      const response = await apiCall(
        `/api/admin/participants-statistics?${queryParams.toString()}`,
        { requireAuth: true },
        handleUnauthorized
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log(`${groupName} response:`, data)
      
      // Handle response format
      let participantsData: any[] = []
      
      if (data.success && Array.isArray(data.data)) {
        participantsData = data.data
      } else if (Array.isArray(data.data)) {
        participantsData = data.data
      } else if (Array.isArray(data)) {
        participantsData = data
      } else {
        console.error('Invalid data format:', data)
        alert(`Failed to download: Invalid data format. Received: ${JSON.stringify(data).substring(0, 200)}`)
        return
      }
      
      if (participantsData.length === 0) {
        alert('No data available to download')
        return
      }
      
      const filename = `${groupName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`
      downloadExcel(participantsData, filename, groupName)
    } catch (error) {
      console.error(`Error downloading ${groupName}:`, error)
      alert(`Failed to download ${groupName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setDownloading(null)
    }
  }

  const downloadWomenGroup = () => downloadParticipantGroup('Women Group Report', 'Female', 0, 100, 'women')
  const downloadMenGroupA = () => downloadParticipantGroup('Men Group A', 'Male', 0, 30, 'menA')
  const downloadMenGroupB = () => downloadParticipantGroup('Men Group B', 'Male', 31, 45, 'menB')
  const downloadMenGroupC = () => downloadParticipantGroup('Men Group C', 'Male', 46, 100, 'menC')
  const downloadAllParticipants = () => downloadParticipantGroup('All Participants', 'All', 0, 100, 'allParticipants')

  const downloadParticipantStatistics = async () => {
    try {
      setDownloading('statistics')
      const response = await apiCall(
        '/api/admin/reports/participant-statistics',
        { requireAuth: true },
        handleUnauthorized
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Participant statistics response:', data)
      
      if (data.success && data.data) {
        const filename = `participant-statistics-${new Date().toISOString().split('T')[0]}.xlsx`
        downloadStatisticsExcel(data.data, filename)
      } else {
        console.error('Invalid data format:', data)
        alert(`Failed to download: Invalid data format. Received: ${JSON.stringify(data).substring(0, 200)}`)
      }
    } catch (error) {
      console.error('Error downloading participant statistics:', error)
      alert(`Failed to download participant statistics: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setDownloading(null)
    }
  }

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

          {/* Payment Export Buttons */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#F8C8DC] mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#640D5F]">Payment Reports</h2>
                <p className="text-[#2B1341]/70">Download payment data as Excel files</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={downloadCompletedPayments}
                disabled={downloading === 'completed'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading === 'completed' ? 'Downloading...' : 'Download Completed Payments'}
              </button>
              <button
                onClick={downloadAllPayments}
                disabled={downloading === 'all'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading === 'all' ? 'Downloading...' : 'Download All Payments'}
              </button>
            </div>
          </div>

          {/* Participant Group Export Buttons */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#F8C8DC] mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#640D5F]">Participant Group Reports</h2>
                <p className="text-[#2B1341]/70">Download participant data by groups as Excel files</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={downloadWomenGroup}
                disabled={downloading === 'women'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading === 'women' ? 'Downloading...' : 'Women Group Report'}
              </button>
              <button
                onClick={downloadMenGroupA}
                disabled={downloading === 'menA'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading === 'menA' ? 'Downloading...' : 'Men Group A (0-30)'}
              </button>
              <button
                onClick={downloadMenGroupB}
                disabled={downloading === 'menB'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading === 'menB' ? 'Downloading...' : 'Men Group B (31-45)'}
              </button>
              <button
                onClick={downloadMenGroupC}
                disabled={downloading === 'menC'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading === 'menC' ? 'Downloading...' : 'Men Group C (46-100)'}
              </button>
              <button
                onClick={downloadAllParticipants}
                disabled={downloading === 'allParticipants'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading === 'allParticipants' ? 'Downloading...' : 'All Participants'}
              </button>
              <button
                onClick={downloadParticipantStatistics}
                disabled={downloading === 'statistics'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading === 'statistics' ? 'Downloading...' : 'Participant Statistics'}
              </button>
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

