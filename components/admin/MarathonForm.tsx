'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'
import RichTextEditor from './RichTextEditor'

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
}

interface MarathonFormProps {
  marathon?: Marathon | null
  onClose: () => void
  onSuccess: () => void
}

export default function MarathonForm({ marathon, onClose, onSuccess }: MarathonFormProps) {
  const { handleUnauthorized } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [routeMapFile, setRouteMapFile] = useState<File | null>(null)

  // Helper function to format time to HH:MM format (removes seconds if present)
  const formatTimeToHHMM = (time: string): string => {
    if (!time) return ''
    // If time is in HH:MM:SS format, convert to HH:MM
    if (time.includes(':') && time.split(':').length === 3) {
      return time.substring(0, 5) // Take only HH:MM
    }
    // If already in HH:MM format, return as is
    return time
  }

  const [formData, setFormData] = useState({
    Name: marathon?.Name || '',
    Description: marathon?.Description || '',
    Track_Length: marathon?.Track_Length || '',
    Date: marathon?.Date || '',
    Reporting_Time: formatTimeToHHMM(marathon?.Reporting_Time || ''),
    Run_Start_Time: formatTimeToHHMM(marathon?.Run_Start_Time || ''),
    Location: marathon?.Location || '',
    Terms_Conditions: marathon?.Terms_Conditions || '',
    How_To_Apply: marathon?.How_To_Apply || '',
    Eligibility_Criteria: marathon?.Eligibility_Criteria || '',
    Rules_Regulations: marathon?.Rules_Regulations || '',
    Runner_Amenities: marathon?.Runner_Amenities || '',
    Price_List: marathon?.Price_List || '',
    Fees_Amount: marathon?.Fees_Amount || '',
  })

  // Update formData when marathon prop changes
  useEffect(() => {
    if (marathon) {
      setFormData({
        Name: marathon.Name || '',
        Description: marathon.Description || '',
        Track_Length: marathon.Track_Length || '',
        Date: marathon.Date || '',
        Reporting_Time: formatTimeToHHMM(marathon.Reporting_Time || ''),
        Run_Start_Time: formatTimeToHHMM(marathon.Run_Start_Time || ''),
        Location: marathon.Location || '',
        Terms_Conditions: marathon.Terms_Conditions || '',
        How_To_Apply: marathon.How_To_Apply || '',
        Eligibility_Criteria: marathon.Eligibility_Criteria || '',
        Rules_Regulations: marathon.Rules_Regulations || '',
        Runner_Amenities: marathon.Runner_Amenities || '',
        Price_List: marathon.Price_List || '',
        Fees_Amount: marathon.Fees_Amount || '',
      })
    }
  }, [marathon])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        // Format time fields to HH:MM format
        if (key === 'Reporting_Time' || key === 'Run_Start_Time') {
          formDataToSend.append(key, formatTimeToHHMM(value))
        } else {
          formDataToSend.append(key, value)
        }
      })
      if (routeMapFile) {
        formDataToSend.append('routeMap', routeMapFile)
      }

      const endpoint = marathon ? `/api/marathon/${marathon.Id}` : '/api/marathon'
      const method = marathon ? 'PUT' : 'POST'

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
        alert(data.message || 'Failed to save marathon')
      }
    } catch (error) {
      console.error('Error saving marathon:', error)
      alert('An error occurred while saving')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#F8C8DC]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-[#F8C8DC] p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-[#640D5F]">
            {marathon ? 'Edit Marathon' : 'Create Marathon'}
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
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Track Length *</label>
              <input
                type="text"
                value={formData.Track_Length}
                onChange={(e) => setFormData({ ...formData, Track_Length: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Date *</label>
              <input
                type="date"
                value={formData.Date}
                onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Location *</label>
              <input
                type="text"
                value={formData.Location}
                onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Reporting Time *</label>
              <input
                type="time"
                value={formData.Reporting_Time}
                onChange={(e) => setFormData({ ...formData, Reporting_Time: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Run Start Time *</label>
              <input
                type="time"
                value={formData.Run_Start_Time}
                onChange={(e) => setFormData({ ...formData, Run_Start_Time: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Fees Amount *</label>
              <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]+(\.[0-9]{1,2})?"
                value={formData.Fees_Amount}
                onChange={(e) => {
                  // Only allow numbers and one decimal point
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  // Ensure only one decimal point
                  const parts = value.split('.')
                  const formattedValue = parts.length > 2 
                    ? parts[0] + '.' + parts.slice(1).join('')
                    : value
                  setFormData({ ...formData, Fees_Amount: formattedValue })
                }}
                required
                placeholder="Enter amount (e.g., 300 or 300.00)"
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#640D5F] mb-2">Route Map</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setRouteMapFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#640D5F] mb-2">Description *</label>
            <textarea
              value={formData.Description}
              onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-2 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#640D5F] mb-2">Terms & Conditions</label>
            <RichTextEditor
              value={formData.Terms_Conditions}
              onChange={(value) => setFormData({ ...formData, Terms_Conditions: value })}
              placeholder="Enter terms and conditions..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#640D5F] mb-2">How to Apply</label>
            <RichTextEditor
              value={formData.How_To_Apply}
              onChange={(value) => setFormData({ ...formData, How_To_Apply: value })}
              placeholder="Enter how to apply instructions..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#640D5F] mb-2">Eligibility Criteria</label>
            <RichTextEditor
              value={formData.Eligibility_Criteria}
              onChange={(value) => setFormData({ ...formData, Eligibility_Criteria: value })}
              placeholder="Enter eligibility criteria..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#640D5F] mb-2">Rules & Regulations</label>
            <RichTextEditor
              value={formData.Rules_Regulations}
              onChange={(value) => setFormData({ ...formData, Rules_Regulations: value })}
              placeholder="Enter rules and regulations..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#640D5F] mb-2">Runner Amenities</label>
            <RichTextEditor
              value={formData.Runner_Amenities}
              onChange={(value) => setFormData({ ...formData, Runner_Amenities: value })}
              placeholder="Enter runner amenities..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#640D5F] mb-2">Price List</label>
            <RichTextEditor
              value={formData.Price_List}
              onChange={(value) => setFormData({ ...formData, Price_List: value })}
              placeholder="Enter price list..."
            />
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
              {isLoading ? 'Saving...' : marathon ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

