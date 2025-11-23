'use client'

import React, { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'
import { Plus, Edit, Trash2, Award, Upload } from 'lucide-react'
import ResultForm from '@/components/admin/ResultForm'

interface Result {
  Id: number
  Marathon_Id: number
  BIB_Number: string
  Name: string
  Gender: string
  Race_Time: string
  Category: string
  Position: string
  Image: string | null
  Image_Url?: string
}

export default function ResultsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingResult, setEditingResult] = useState<Result | null>(null)
  const { handleUnauthorized } = useAuth()

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      setIsLoading(true)
      const response = await apiCall('/api/result', { requireAuth: true }, handleUnauthorized)
      const data = await response.json()

      if (data.success) {
        setResults(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this result?')) return

    try {
      const response = await apiCall(
        `/api/result/${id}`,
        {
          method: 'DELETE',
          requireAuth: true,
        },
        handleUnauthorized
      )

      const data = await response.json()
      if (data.success) {
        fetchResults()
      } else {
        alert('Failed to delete result')
      }
    } catch (error) {
      console.error('Error deleting result:', error)
      alert('An error occurred while deleting')
    }
  }

  const handleEdit = (result: Result) => {
    setEditingResult(result)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingResult(null)
    fetchResults()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] flex">
      <AdminSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-2">Results</h1>
              <p className="text-[#2B1341]/70">Manage marathon results</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-[#640D5F] to-[#D91656] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Result</span>
            </button>
          </div>

          {/* Results Table */}
          {isLoading ? (
            <div className="bg-white rounded-2xl p-8 border-2 border-[#F8C8DC]">
              <div className="text-center text-[#2B1341]/70">Loading results...</div>
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border-2 border-[#F8C8DC] text-center">
              <Award className="w-16 h-16 text-[#F8C8DC] mx-auto mb-4" />
              <p className="text-[#2B1341]/70">No results found. Add your first result!</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-[#F8C8DC] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#640D5F] to-[#D91656] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">BIB Number</th>
                      <th className="px-6 py-4 text-left font-semibold">Name</th>
                      <th className="px-6 py-4 text-left font-semibold">Gender</th>
                      <th className="px-6 py-4 text-left font-semibold">Category</th>
                      <th className="px-6 py-4 text-left font-semibold">Position</th>
                      <th className="px-6 py-4 text-left font-semibold">Race Time</th>
                      <th className="px-6 py-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.Id} className="border-t border-[#F8C8DC] hover:bg-[#FFF1F5]">
                        <td className="px-6 py-4 font-medium text-[#640D5F]">{result.BIB_Number}</td>
                        <td className="px-6 py-4 text-[#2B1341]">{result.Name}</td>
                        <td className="px-6 py-4 text-[#2B1341]/70">{result.Gender}</td>
                        <td className="px-6 py-4 text-[#2B1341]/70">{result.Category}</td>
                        <td className="px-6 py-4 text-[#640D5F] font-semibold">{result.Position}</td>
                        <td className="px-6 py-4 text-[#2B1341]/70">{result.Race_Time}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(result)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(result.Id)}
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

      {/* Result Form Modal */}
      {isFormOpen && (
        <ResultForm
          result={editingResult}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  )
}

