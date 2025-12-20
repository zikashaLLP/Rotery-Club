'use client'

import React, { useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/api'
import { downloadExcel } from '@/lib/utils'
import { Upload, Download, FileSpreadsheet, Loader2, CheckCircle2, XCircle } from 'lucide-react'

interface ImportResponse {
  success: boolean
  message: string
  data: Array<{
    Sr_No: number
    BIB_NO: string
    Name: string
    Email: string
    Mobile_No: string
    Gender: string
    City: string
    Pincode: string
    T_Shirt_Size: string
    Birth_Date: string
    Amount: number
  }>
  count: number
  notificationsSent: number
  notificationErrors: Array<{
    participantId: number
    email: string
    mobileNo: string
    error: string
    details: string
  }>
}

export default function ImportExcelPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [importResponse, setImportResponse] = useState<ImportResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { handleUnauthorized } = useAuth()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        '.xlsx',
        '.xls'
      ]
      const isValidType = validTypes.some(type => 
        file.type === type || file.name.toLowerCase().endsWith(type)
      )
      
      if (!isValidType) {
        setError('Please upload a valid Excel file (.xlsx or .xls)')
        setSelectedFile(null)
        return
      }
      
      setSelectedFile(file)
      setError(null)
      setImportResponse(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload')
      return
    }

    try {
      setIsUploading(true)
      setError(null)
      setImportResponse(null)

      // Create FormData
      const formData = new FormData()
      formData.append('excelFile', selectedFile)

      // Get token from localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
      if (!token) {
        handleUnauthorized()
        return
      }

      // Make API call
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://193.203.161.3:5152'
      const response = await fetch(`${API_BASE_URL}/api/admin/import-excel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type, let browser set it with boundary for FormData
        },
        body: formData,
      })

      if (response.status === 401) {
        handleUnauthorized()
        return
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data: ImportResponse = await response.json()
      setImportResponse(data)
    } catch (error) {
      console.error('Error uploading file:', error)
      setError(error instanceof Error ? error.message : 'Failed to upload file. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = async () => {
    if (!importResponse || !importResponse.data || importResponse.data.length === 0) {
      alert('No data available to download')
      return
    }

    try {
      const filename = `imported-participants-${new Date().toISOString().split('T')[0]}.xlsx`
      await downloadExcel(importResponse.data, filename, 'Imported Participants')
    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Failed to download file')
    }
  }

  const handleDownloadErrors = async () => {
    if (!importResponse || !importResponse.notificationErrors || importResponse.notificationErrors.length === 0) {
      alert('No errors to download')
      return
    }

    try {
      const filename = `notification-errors-${new Date().toISOString().split('T')[0]}.xlsx`
      await downloadExcel(importResponse.notificationErrors, filename, 'Notification Errors')
    } catch (error) {
      console.error('Error downloading errors file:', error)
      alert('Failed to download errors file')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] flex">
      <AdminSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-2">Import Excel</h1>
            <p className="text-[#2B1341]/70">Upload Excel file to import participant data</p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#F8C8DC] mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#640D5F]">Upload Excel File</h2>
                <p className="text-[#2B1341]/70">Select and upload an Excel file (.xlsx or .xls)</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* File Input */}
              <div>
                <label className="block text-sm font-semibold text-[#640D5F] mb-2">
                  Select Excel File
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3 px-6 py-4 border-2 border-dashed border-[#F8C8DC] rounded-xl hover:border-[#D91656] transition-colors bg-[#FFF1F5]">
                      <FileSpreadsheet className="w-6 h-6 text-[#640D5F]" />
                      <div className="flex-1">
                        <p className="text-[#640D5F] font-medium">
                          {selectedFile ? selectedFile.name : 'Click to select file or drag and drop'}
                        </p>
                        <p className="text-sm text-[#2B1341]/70">
                          {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Excel files only (.xlsx, .xls)'}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">
                  <XCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading... Please wait</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Upload File</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {isUploading && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#F8C8DC] mb-6">
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 text-[#640D5F] animate-spin mb-4" />
                <p className="text-lg font-semibold text-[#640D5F]">Processing Excel file...</p>
                <p className="text-sm text-[#2B1341]/70 mt-2">Please wait while we import the data</p>
              </div>
            </div>
          )}

          {importResponse && (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#F8C8DC]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#640D5F]">Import Successful</h2>
                    <p className="text-[#2B1341]/70">{importResponse.message}</p>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#640D5F] to-[#D91656] rounded-xl p-6 text-white">
                    <p className="text-sm text-white/80 mb-2">Total Records</p>
                    <p className="text-3xl font-bold">{importResponse.count}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <p className="text-sm text-white/80 mb-2">Notifications Sent</p>
                    <p className="text-3xl font-bold">{importResponse.notificationsSent}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
                    <p className="text-sm text-white/80 mb-2">Notification Errors</p>
                    <p className="text-3xl font-bold">{importResponse.notificationErrors?.length || 0}</p>
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {importResponse.data && importResponse.data.length > 0 && (
                    <button
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Download Imported Data ({importResponse.data.length} records)
                    </button>
                  )}
                  {importResponse.notificationErrors && importResponse.notificationErrors.length > 0 && (
                    <button
                      onClick={handleDownloadErrors}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Download Errors ({importResponse.notificationErrors.length} errors)
                    </button>
                  )}
                </div>
              </div>

              {/* Data Preview */}
              {importResponse.data && importResponse.data.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#F8C8DC]">
                  <h3 className="text-xl font-bold text-[#640D5F] mb-4">Imported Data Preview</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#640D5F] to-[#D91656] text-white">
                          {Object.keys(importResponse.data[0]).map((key) => (
                            <th key={key} className="px-4 py-3 text-left font-semibold border border-white/20">
                              {key.replace(/_/g, ' ')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {importResponse.data.slice(0, 10).map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFF1F5]'}>
                            {Object.values(row).map((value, cellIndex) => (
                              <td key={cellIndex} className="px-4 py-3 border border-[#F8C8DC] text-[#2B1341]">
                                {String(value || '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {importResponse.data.length > 10 && (
                      <p className="text-sm text-[#2B1341]/70 mt-4 text-center">
                        Showing first 10 of {importResponse.data.length} records. Download full data using the button above.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Notification Errors */}
              {importResponse.notificationErrors && importResponse.notificationErrors.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-red-200">
                  <h3 className="text-xl font-bold text-red-600 mb-4">Notification Errors</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-red-100 text-red-800">
                          {Object.keys(importResponse.notificationErrors[0]).map((key) => (
                            <th key={key} className="px-4 py-3 text-left font-semibold border border-red-200">
                              {key.replace(/_/g, ' ')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {importResponse.notificationErrors.map((error, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-red-50'}>
                            <td className="px-4 py-3 border border-red-200 text-[#2B1341]">{error.participantId}</td>
                            <td className="px-4 py-3 border border-red-200 text-[#2B1341]">{error.email}</td>
                            <td className="px-4 py-3 border border-red-200 text-[#2B1341]">{error.mobileNo}</td>
                            <td className="px-4 py-3 border border-red-200 text-red-600 font-medium">{error.error}</td>
                            <td className="px-4 py-3 border border-red-200 text-[#2B1341]">{error.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

