'use client'

import React, { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'
import { Users, Search, Filter } from 'lucide-react'

interface Participant {
  Id: number
  BIB_Number: string
  Marathon_Type: string
  Is_Payment_Completed: boolean
  ParticipantDetails: {
    Full_Name: string
    Email: string
    Contact_Number: string
    Gender: string
    City: string
    State: string
    Tshirt_Size: string
  }
  Marathon: {
    Id: number
    Name: string
  }
}

export default function ParticipantsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    marathonId: '',
    marathonType: '',
    isPaymentCompleted: '',
    gender: '',
    city: '',
    tshirtSize: '',
  })
  const { handleUnauthorized } = useAuth()

  useEffect(() => {
    fetchParticipants()
  }, [filters])

  const fetchParticipants = async () => {
    try {
      setIsLoading(true)
      const queryParams = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value)
        }
      })

      const endpoint = `/api/admin/participants${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      const response = await apiCall(endpoint, { requireAuth: true }, handleUnauthorized)
      const data = await response.json()

      if (data.success) {
        setParticipants(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching participants:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    setFilters({
      marathonId: '',
      marathonType: '',
      isPaymentCompleted: '',
      gender: '',
      city: '',
      tshirtSize: '',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] flex">
      <AdminSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-2">Participants</h1>
            <p className="text-[#2B1341]/70">View and filter participant registrations</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border-2 border-[#F8C8DC] mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-[#640D5F]" />
              <h3 className="font-semibold text-[#640D5F] text-base md:text-lg">Filters</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2B1341] mb-1">Marathon Type</label>
                <select
                  value={filters.marathonType}
                  onChange={(e) => handleFilterChange('marathonType', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#F8C8DC] rounded-lg focus:outline-none focus:border-[#D91656]"
                >
                  <option value="">All</option>
                  <option value="Open">Open</option>
                  <option value="Defence">Defence</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B1341] mb-1">Payment Status</label>
                <select
                  value={filters.isPaymentCompleted}
                  onChange={(e) => handleFilterChange('isPaymentCompleted', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#F8C8DC] rounded-lg focus:outline-none focus:border-[#D91656]"
                >
                  <option value="">All</option>
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B1341] mb-1">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#F8C8DC] rounded-lg focus:outline-none focus:border-[#D91656]"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B1341] mb-1">City</label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  placeholder="Enter city"
                  className="w-full px-3 py-2 border-2 border-[#F8C8DC] rounded-lg focus:outline-none focus:border-[#D91656]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B1341] mb-1">T-Shirt Size</label>
                <select
                  value={filters.tshirtSize}
                  onChange={(e) => handleFilterChange('tshirtSize', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#F8C8DC] rounded-lg focus:outline-none focus:border-[#D91656]"
                >
                  <option value="">All</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-[#FFF1F5] text-[#640D5F] font-medium rounded-lg hover:bg-[#F8C8DC] transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Participants Table */}
          {isLoading ? (
            <div className="bg-white rounded-2xl p-4 md:p-8 border-2 border-[#F8C8DC]">
              <div className="text-center text-sm md:text-base text-[#2B1341]/70">Loading participants...</div>
            </div>
          ) : participants.length === 0 ? (
            <div className="bg-white rounded-2xl p-4 md:p-8 border-2 border-[#F8C8DC] text-center">
              <Users className="w-12 h-12 md:w-16 md:h-16 text-[#F8C8DC] mx-auto mb-4" />
              <p className="text-sm md:text-base text-[#2B1341]/70">No participants found</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-2xl border-2 border-[#F8C8DC] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-[#640D5F] to-[#D91656] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">BIB Number</th>
                        <th className="px-6 py-4 text-left font-semibold">Name</th>
                        <th className="px-6 py-4 text-left font-semibold">Email</th>
                        <th className="px-6 py-4 text-left font-semibold">Contact</th>
                        <th className="px-6 py-4 text-left font-semibold">Marathon</th>
                        <th className="px-6 py-4 text-left font-semibold">Type</th>
                        <th className="px-6 py-4 text-left font-semibold">T-Shirt</th>
                        <th className="px-6 py-4 text-center font-semibold">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant) => (
                        <tr key={participant.Id} className="border-t border-[#F8C8DC] hover:bg-[#FFF1F5]">
                          <td className="px-6 py-4 font-medium text-[#640D5F]">{participant.BIB_Number}</td>
                          <td className="px-6 py-4 text-[#2B1341]">{participant.ParticipantDetails.Full_Name}</td>
                          <td className="px-6 py-4 text-[#2B1341]/70 text-sm">{participant.ParticipantDetails.Email}</td>
                          <td className="px-6 py-4 text-[#2B1341]/70">{participant.ParticipantDetails.Contact_Number}</td>
                          <td className="px-6 py-4 text-[#2B1341]/70">{participant.Marathon.Name}</td>
                          <td className="px-6 py-4 text-[#2B1341]/70">{participant.Marathon_Type}</td>
                          <td className="px-6 py-4 text-[#2B1341]/70">{participant.ParticipantDetails.Tshirt_Size}</td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                participant.Is_Payment_Completed
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {participant.Is_Payment_Completed ? 'Paid' : 'Unpaid'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden space-y-4">
                {participants.map((participant) => (
                  <div
                    key={participant.Id}
                    className="bg-white rounded-2xl border-2 border-[#F8C8DC] p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-base text-[#2B1341]">{participant.ParticipantDetails.Full_Name}</h3>
                        <p className="text-sm text-[#640D5F] font-medium mt-1">BIB: {participant.BIB_Number}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                          participant.Is_Payment_Completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {participant.Is_Payment_Completed ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#2B1341]/70">Email:</span>
                        <span className="text-[#2B1341] font-medium text-xs break-all">{participant.ParticipantDetails.Email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2B1341]/70">Contact:</span>
                        <span className="text-[#2B1341] font-medium">{participant.ParticipantDetails.Contact_Number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2B1341]/70">Marathon:</span>
                        <span className="text-[#2B1341] font-medium text-right">{participant.Marathon.Name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2B1341]/70">Type:</span>
                        <span className="text-[#2B1341] font-medium">{participant.Marathon_Type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2B1341]/70">T-Shirt:</span>
                        <span className="text-[#2B1341] font-medium">{participant.ParticipantDetails.Tshirt_Size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

