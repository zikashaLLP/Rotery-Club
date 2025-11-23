'use client'

import React, { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'
import { Plus, Edit, Trash2, Trophy } from 'lucide-react'
import MarathonForm from '@/components/admin/MarathonForm'

interface Marathon {
  Id: number
  Name: string
  Description: string
  Track_Length: string
  Date: string
  Reporting_Time: string
  Run_Start_Time: string
  Location: string
  Terms_Conditions: string
  How_To_Apply: string
  Eligibility_Criteria: string
  Rules_Regulations: string
  Runner_Amenities: string
  Route_Map: string
  Price_List: string
  Fees_Amount: string
  Created_At?: string
}

export default function MarathonsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [marathons, setMarathons] = useState<Marathon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMarathon, setEditingMarathon] = useState<Marathon | null>(null)
  const { handleUnauthorized } = useAuth()

  useEffect(() => {
    fetchMarathons()
  }, [])

  const fetchMarathons = async () => {
    try {
      setIsLoading(true)
      const response = await apiCall('/api/marathon', { requireAuth: true }, handleUnauthorized)
      const data = await response.json()

      if (data.success) {
        setMarathons(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching marathons:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this marathon?')) return

    try {
      const response = await apiCall(
        `/api/marathon/${id}`,
        {
          method: 'DELETE',
          requireAuth: true,
        },
        handleUnauthorized
      )

      const data = await response.json()
      if (data.success) {
        fetchMarathons()
      } else {
        alert('Failed to delete marathon')
      }
    } catch (error) {
      console.error('Error deleting marathon:', error)
      alert('An error occurred while deleting')
    }
  }

  const handleEdit = (marathon: Marathon) => {
    setEditingMarathon(marathon)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingMarathon(null)
    fetchMarathons()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] flex">
      <AdminSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-2">Marathons</h1>
              <p className="text-[#2B1341]/70">Manage marathon events</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-[#640D5F] to-[#D91656] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Marathon</span>
            </button>
          </div>

          {/* Marathons Table */}
          {isLoading ? (
            <div className="bg-white rounded-2xl p-8 border-2 border-[#F8C8DC]">
              <div className="text-center text-[#2B1341]/70">Loading marathons...</div>
            </div>
          ) : marathons.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border-2 border-[#F8C8DC] text-center">
              <Trophy className="w-16 h-16 text-[#F8C8DC] mx-auto mb-4" />
              <p className="text-[#2B1341]/70">No marathons found. Create your first marathon!</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-[#F8C8DC] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#640D5F] to-[#D91656] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Name</th>
                      <th className="px-6 py-4 text-left font-semibold">Track Length</th>
                      <th className="px-6 py-4 text-left font-semibold">Date</th>
                      <th className="px-6 py-4 text-left font-semibold">Location</th>
                      <th className="px-6 py-4 text-left font-semibold">Fees</th>
                      <th className="px-6 py-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marathons.map((marathon) => (
                      <tr key={marathon.Id} className="border-t border-[#F8C8DC] hover:bg-[#FFF1F5]">
                        <td className="px-6 py-4 font-medium text-[#2B1341]">{marathon.Name}</td>
                        <td className="px-6 py-4 text-[#2B1341]/70">{marathon.Track_Length}</td>
                        <td className="px-6 py-4 text-[#2B1341]/70">
                          {new Date(marathon.Date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-[#2B1341]/70">{marathon.Location}</td>
                        <td className="px-6 py-4 text-[#640D5F] font-semibold">
                          ₹{parseFloat(marathon.Fees_Amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(marathon)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(marathon.Id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Marathon Form Modal */}
      {isFormOpen && (
        <MarathonForm
          marathon={editingMarathon}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  )
}

