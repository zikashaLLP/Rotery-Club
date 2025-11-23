'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Trophy, Medal, Award } from 'lucide-react'
import { API_BASE_URL } from '@/lib/config'

interface ResultData {
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
  Created_At: string
  Updated_At: string
}

interface ApiResponse {
  success: boolean
  data: ResultData[]
  count: number
}

export default function ResultPage() {
  const [results, setResults] = useState<ResultData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<'Open' | 'Defence'>('Open')
  const [activeGender, setActiveGender] = useState<'Men' | 'Women'>('Men')

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${API_BASE_URL}/api/result`, {
          headers: {
            'accept': '*/*',
            'ngrok-skip-browser-warning': 'true',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch results')
        }

        const data: ApiResponse = await response.json()
        if (data.success && data.data) {
          setResults(data.data)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [])

  // Filter results based on active category and gender
  const filteredResults = results.filter(
    (result) =>
      result.Category === activeCategory &&
      (result.Gender === 'Male' && activeGender === 'Men' ||
       result.Gender === 'Female' && activeGender === 'Women')
  )

  // Sort by position (First, Second, Third)
  const sortedResults = [...filteredResults].sort((a, b) => {
    const positionOrder: { [key: string]: number } = {
      'First': 1,
      'Second': 2,
      'Third': 3,
    }
    return (positionOrder[a.Position] || 999) - (positionOrder[b.Position] || 999)
  })

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'First':
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 'Second':
        return <Medal className="w-6 h-6 text-gray-400" />
      case 'Third':
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  const getImageUrl = (result: ResultData) => {
    // Prioritize Image_Url if available
    if (result.Image_Url) {
      return result.Image_Url
    }
    // Handle Image field
    if (result.Image) {
      // If it's already a full URL, return as is
      if (result.Image.startsWith('http')) {
        return result.Image
      }
      // If it starts with /public, remove /public prefix and use API_BASE_URL
      if (result.Image.startsWith('/public')) {
        return `${API_BASE_URL}${result.Image}`
      }
      // Otherwise, prepend API_BASE_URL
      return `${API_BASE_URL}${result.Image.startsWith('/') ? '' : '/'}${result.Image}`
    }
    // Fallback to a placeholder or default image
    return '/placeholder-winner.jpg'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB]">
      {/* Banner Section */}
      <section className="relative overflow-hidden py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/result.png"
                alt="Results Banner"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D91656]"></div>
                <p className="mt-4 text-[#640D5F] font-semibold">Loading results...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-600 font-semibold text-lg">Error loading results</p>
                <p className="text-[#2B1341]/80 mt-2">{error}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Main Category Tabs */}
              <div className="mb-8">
                <div className="flex justify-center gap-4 border-b-2 border-[#F8C8DC]">
                  <button
                    onClick={() => setActiveCategory('Open')}
                    className={`px-6 py-3 font-semibold text-lg transition-all duration-300 ${
                      activeCategory === 'Open'
                        ? 'text-[#D91656] border-b-4 border-[#D91656] -mb-[2px]'
                        : 'text-[#2B1341]/60 hover:text-[#D91656]'
                    }`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => setActiveCategory('Defence')}
                    className={`px-6 py-3 font-semibold text-lg transition-all duration-300 ${
                      activeCategory === 'Defence'
                        ? 'text-[#D91656] border-b-4 border-[#D91656] -mb-[2px]'
                        : 'text-[#2B1341]/60 hover:text-[#D91656]'
                    }`}
                  >
                    Defence
                  </button>
                </div>
              </div>

              {/* Gender Sub-Tabs */}
              <div className="mb-8">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setActiveGender('Men')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      activeGender === 'Men'
                        ? 'bg-[#D91656] text-white shadow-lg'
                        : 'bg-white text-[#2B1341]/60 hover:bg-[#F8C8DC]'
                    }`}
                  >
                    Men
                  </button>
                  <button
                    onClick={() => setActiveGender('Women')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      activeGender === 'Women'
                        ? 'bg-[#D91656] text-white shadow-lg'
                        : 'bg-white text-[#2B1341]/60 hover:bg-[#F8C8DC]'
                    }`}
                  >
                    Women
                  </button>
                </div>
              </div>

              {/* Results Grid */}
              {sortedResults.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[#2B1341]/60 text-lg">No results found for {activeCategory} - {activeGender}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {sortedResults.map((result, index) => (
                    <motion.div
                      key={result.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-[#F8C8DC]"
                    >
                      {/* Winner Image */}
                      <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden bg-gradient-to-br from-[#F8C8DC] to-[#FFF1F5]">
                        <Image
                          src={getImageUrl(result)}
                          alt={result.Name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized={result.Image?.startsWith('http') || result.Image_Url?.startsWith('http')}
                        />
                        {/* Position Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                          {getPositionIcon(result.Position)}
                        </div>
                      </div>

                      {/* Winner Details */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-[#640D5F] mb-2">{result.Position}</h3>
                          <p className="text-sm font-semibold text-[#D91656] uppercase tracking-wide mb-1">
                            {result.Position} Position
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p className="candidate-detail">
                            <span className="font-semibold text-[#2B1341]">Name:</span>{' '}
                            <span className="text-[#640D5F]">{result.Name}</span>
                          </p>
                          <p className="candidate-detail">
                            <span className="font-semibold text-[#2B1341]">Race Time:</span>{' '}
                            <span className="text-[#640D5F]">{result.Race_Time}</span>
                          </p>
                          <p className="candidate-detail">
                            <span className="font-semibold text-[#2B1341]">BIB:</span>{' '}
                            <span className="text-[#640D5F]">{result.BIB_Number}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

