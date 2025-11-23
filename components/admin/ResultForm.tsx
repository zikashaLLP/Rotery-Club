'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'

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
}

interface Marathon {
  Id: number
  Name: string
}

interface ResultFormProps {
  result?: Result | null
  onClose: () => void
  onSuccess: () => void
}

export default function ResultForm({ result, onClose, onSuccess }: ResultFormProps) {
  const { handleUnauthorized } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [marathons, setMarathons] = useState<Marathon[]>([])
  const [formData, setFormData] = useState({
    Marathon_Id: result?.Marathon_Id || 0,
    BIB_Number: result?.BIB_Number || '',
    Name: result?.Name || '',
    Gender: result?.Gender || 'Male',
    Race_Time: result?.Race_Time || '',
    Category: result?.Category || 'Open',
    Position: result?.Position || 'First',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchMarathons()
  }, [])

  const fetchMarathons = async () => {
    try {
      const response = await apiCall('/api/marathon', { requireAuth: true }, handleUnauthorized)
      const data = await response.json()
      if (data.success) {
        setMarathons(data.data || [])
        if (data.data?.length > 0 && !result) {
          setFormData({ ...formData, Marathon_Id: data.data[0].Id })
        }
      }
    } catch (error) {
      console.error('Error fetching marathons:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('Marathon_Id', formData.Marathon_Id.toString())
      formDataToSend.append('BIB_Number', formData.BIB_Number)
      formDataToSend.append('Name', formData.Name)
      formDataToSend.append('Gender', formData.Gender)
      formDataToSend.append('Race_Time', formData.Race_Time)
      formDataToSend.append('Category', formData.Category)
      formDataToSend.append('Position', formData.Position)
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      const endpoint = result ? `/api/result/${result.Id}` : '/api/result'
      const method = result ? 'PUT' : 'POST'

      const response = await apiCall(
        endpoint,
        {
          method,
          requireAuth: true,
          body: formDataToSend,
        },
        handleUnauthorized
      )

      const data = await response.json()
      if (data.success) {
        onSuccess()
      } else {
        alert(data.message || 'Failed to save result')
      }
    } catch (error) {
      console.error('Error saving result:', error)
      alert('An error occurred while saving')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#F8C8DC]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-[#F8C8DC] p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-[#640D5F]">
            {result ? 'Edit Result' : 'Create Result'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FFF1F5] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#640D5F]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Marathon *</label>
              <select
                value={formData.Marathon_Id}
                onChange={(e) => setFormData({ ...formData, Marathon_Id: parseInt(e.target.value) })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              >
                <option value={0}>Select Marathon</option>
                {marathons.map((marathon) => (
                  <option key={marathon.Id} value={marathon.Id}>
                    {marathon.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">BIB Number *</label>
              <input
                type="text"
                value={formData.BIB_Number}
                onChange={(e) => setFormData({ ...formData, BIB_Number: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Name *</label>
              <input
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Gender *</label>
              <select
                value={formData.Gender}
                onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Category *</label>
              <select
                value={formData.Category}
                onChange={(e) => setFormData({ ...formData, Category: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              >
                <option value="Open">Open</option>
                <option value="Defence">Defence</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Position *</label>
              <select
                value={formData.Position}
                onChange={(e) => setFormData({ ...formData, Position: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              >
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Race Time *</label>
              <input
                type="text"
                value={formData.Race_Time}
                onChange={(e) => setFormData({ ...formData, Race_Time: e.target.value })}
                placeholder="HH:MM:SS"
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t-2 border-[#F8C8DC]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#F8C8DC] text-[#640D5F] font-bold rounded-xl hover:bg-[#FFF1F5] transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#640D5F] to-[#D91656] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : result ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

