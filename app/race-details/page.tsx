'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, DollarSign, Download, Maximize2, Activity, ChevronDown, ChevronUp } from 'lucide-react'
import { API_BASE_URL } from '@/lib/config'

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

export default function RaceDetailsPage() {
  const [marathons, setMarathons] = useState<Marathon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [activeSection, setActiveSection] = useState<{ [key: number]: string }>({})
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [selectedMap, setSelectedMap] = useState<string>('')

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/marathon`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch marathon data')
        }

        const data = await response.json()
        if (data.success && data.data && Array.isArray(data.data)) {
          setMarathons(data.data)
          // Set first section as active for first marathon
          if (data.data.length > 0) {
            setActiveSection({ 0: 'Info' })
          }
        }
      } catch (error) {
        console.error('Error fetching marathon data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMarathons()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const toggleSection = (marathonIndex: number, section: string) => {
    setActiveSection(prev => ({
      ...prev,
      [marathonIndex]: prev[marathonIndex] === section ? '' : section,
    }))
  }

  const isSectionActive = (marathonIndex: number, section: string) => {
    return activeSection[marathonIndex] === section
  }

  const openMapModal = (routeMap: string) => {
    setSelectedMap(routeMap)
    setIsMapModalOpen(true)
  }

  const getRouteMapUrl = (routeMap: string) => {
    if (!routeMap) return '/Map.png'
    if (routeMap.startsWith('http')) return routeMap
    // If it starts with /public, it's from the API, prepend API_BASE_URL
    if (routeMap.startsWith('/public')) return `${API_BASE_URL}${routeMap}`
    // If it starts with /, it's a local path
    if (routeMap.startsWith('/')) return routeMap
    // Otherwise, prepend API_BASE_URL
    return `${API_BASE_URL}/${routeMap}`
  }

  const sections = [
    { id: 'Info', label: 'Info' },
    { id: 'Announcement', label: 'Announcement' },
    { id: 'How_To_Apply', label: 'How to Apply' },
    { id: 'Eligibility_Criteria', label: 'Eligibility Criteria' },
    { id: 'Rules_Regulations', label: 'Rules and Regulations' },
    { id: 'Runner_Amenities', label: 'Runner amenities' },
    { id: 'Route_Map', label: 'Route Map' },
    { id: 'Price_List', label: 'Prize List' },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D91656] mx-auto"></div>
          <p className="mt-4 text-[#640D5F]">Loading race details...</p>
        </div>
      </div>
    )
  }

  if (marathons.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-[#640D5F]">No marathon data available</p>
        </div>
      </div>
    )
  }

  const currentMarathon = marathons[activeTab]

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-0">
      {/* Banner Section */}
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src="/run.jpg"
          alt="Race Banner"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </section>

      {/* Race Info Section with Tabs */}
      <section className="py-12 md:py-20 bg-white" id="RaceKmInfo" style={{ paddingTop: '80px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Marathon Tabs with Announcement */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 border-b-2 border-[#F8C8DC]">
                {marathons.map((marathon, index) => (
                  <button
                    key={marathon.Id}
                    onClick={() => {
                      setActiveTab(index)
                      setActiveSection({ [index]: 'Info' })
                    }}
                    className={`px-6 py-3 font-semibold transition-colors ${
                      activeTab === index && !isSectionActive(activeTab, 'Announcement')
                        ? 'bg-[#D91656] text-white border-b-4 border-[#D91656]'
                        : 'text-[#640D5F] hover:bg-[#FFF1F5]'
                    }`}
                  >
                    {marathon.Name}
                  </button>
                ))}
                {currentMarathon && (
                  <button
                    onClick={() => {
                      setActiveSection({ [activeTab]: 'Announcement' })
                    }}
                    className={`px-6 py-3 font-semibold transition-colors ${
                      isSectionActive(activeTab, 'Announcement')
                        ? 'bg-[#D91656] text-white border-b-4 border-[#D91656]'
                        : 'text-[#640D5F] hover:bg-[#FFF1F5]'
                    }`}
                  >
                    Announcement
                  </button>
                )}
              </div>
            </div>

            {/* Tab Content */}
            {currentMarathon && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Sidebar Navigation - Hidden */}
                <div className="md:col-span-4 hidden">
                  <div className="bg-white rounded-2xl p-6 border-2 border-[#F8C8DC] shadow-lg sticky top-24">
                    <ul className="space-y-2">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <button
                            onClick={() => toggleSection(activeTab, section.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                              isSectionActive(activeTab, section.id)
                                ? 'bg-[#D91656] text-white'
                                : 'text-[#640D5F] hover:bg-[#FFF1F5]'
                            }`}
                          >
                            <span>{section.label}</span>
                            {isSectionActive(activeTab, section.id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Content Area - Full Width */}
                <div className="md:col-span-12">
                  <div className="bg-white rounded-2xl p-8 border-2 border-[#F8C8DC] shadow-lg">
                    {/* Info Section */}
                    {isSectionActive(activeTab, 'Info') && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-[#640D5F] mb-4">
                          {currentMarathon.Name} ({currentMarathon.Track_Length})
                        </h3>
                        <div className="border-2 border-[#F8C8DC] rounded-lg p-6">
                          <h4 className="text-xl font-bold text-[#640D5F] mb-4">
                            Participation Through Physical Run
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 text-[#EB5B00] mt-1 flex-shrink-0" />
                              <span className="text-[#2B1341]">
                                <strong>Date:</strong> {formatDate(currentMarathon.Date)}
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#EB5B00] mt-1 flex-shrink-0" />
                              <span className="text-[#2B1341]">
                                <strong>Venue:</strong> {currentMarathon.Location}
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Clock className="w-5 h-5 text-[#EB5B00] mt-1 flex-shrink-0" />
                              <span className="text-[#2B1341]">
                                <strong>Reporting Time:</strong> {formatTime(currentMarathon.Reporting_Time)}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-6">
                          <div
                            className="text-[#2B1341]/80 prose prose-ul:list-disc prose-li:ml-6 max-w-none"
                            dangerouslySetInnerHTML={{ __html: currentMarathon.Runner_Amenities }}
                          />
                        </div>
                        {currentMarathon.Terms_Conditions && (
                          <div className="mt-6">
                            <h5 className="text-xl font-bold text-[#640D5F] mb-3">Terms & Conditions</h5>
                            <div
                              className="text-[#2B1341]/80 prose prose-ul:list-disc prose-li:ml-6 max-w-none"
                              dangerouslySetInnerHTML={{ __html: currentMarathon.Terms_Conditions }}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Announcement Section */}
                    {isSectionActive(activeTab, 'Announcement') && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-[#640D5F] mb-4">
                          {currentMarathon.Name} ({currentMarathon.Track_Length})
                        </h3>
                        <div className="border-2 border-[#F8C8DC] rounded-lg p-6">
                          <h4 className="text-xl font-bold text-[#640D5F] mb-4">
                            COLLECT YOUR RUNNING NUMBER & T-SHIRT
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 text-[#EB5B00] mt-1 flex-shrink-0" />
                              <span className="text-[#2B1341]">
                                <strong>Date:</strong> 25/12/2025 and 26/12/2025
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Clock className="w-5 h-5 text-[#EB5B00] mt-1 flex-shrink-0" />
                              <span className="text-[#2B1341]">
                                <strong>Time:</strong> 9:00 AM to 1:00 PM and 3:00 PM to 6:00 PM
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#EB5B00] mt-1 flex-shrink-0" />
                              <span className="text-[#2B1341]">
                                <strong>Venue:</strong> Rotary Club of Visnagar Rotary Bhavan, Opp. Nootan School, Visnagar – 384315
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-6">
                          <h5 className="text-xl font-bold text-[#640D5F] mb-3">Important Instructions</h5>
                          <ul className="space-y-2 text-lg text-[#2B1341]">
                            <li className="flex items-start gap-3">
                              <span className="text-[#EB5B00] mt-1">•</span>
                              <span>Participants must show the Email or WhatsApp message containing their BIB / Confirmation Number at the time of collection.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#EB5B00] mt-1">•</span>
                              <span>Participants are requested to carry a valid original ID proof (with Photo and Date of Birth) for T-shirt and BIB collection.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#EB5B00] mt-1">•</span>
                              <span>No T-shirt exchange will be allowed.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#EB5B00] mt-1">•</span>
                              <span>Participants will not be allowed on Race Day without their T-shirt and BIB.</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-6">
                          <h5 className="text-xl font-bold text-[#640D5F] mb-3">Unable to collect your BIB?</h5>
                          <p className="text-lg text-[#2B1341] mb-3">
                            You may authorize someone to collect it on your behalf.
                          </p>
                          <p className="text-lg text-[#2B1341] mb-3">
                            Please provide an Authorization Letter signed by the registered runner.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* How to Apply Section */}
                    {isSectionActive(activeTab, 'How_To_Apply') && (
                      <div>
                        <h3 className="text-3xl font-bold text-[#640D5F] mb-6">
                          {currentMarathon.Name} ({currentMarathon.Track_Length})
                        </h3>
                        <div
                          className="text-[#2B1341]/80 prose prose-ul:list-disc prose-li:ml-6 max-w-none"
                          dangerouslySetInnerHTML={{ __html: currentMarathon.How_To_Apply }}
                        />
                      </div>
                    )}

                    {/* Eligibility Criteria Section */}
                    {isSectionActive(activeTab, 'Eligibility_Criteria') && (
                      <div>
                        <h3 className="text-3xl font-bold text-[#640D5F] mb-6">
                          {currentMarathon.Name} ({currentMarathon.Track_Length})
                        </h3>
                        <div
                          className="text-[#2B1341]/80 prose prose-ul:list-disc prose-li:ml-6 max-w-none"
                          dangerouslySetInnerHTML={{ __html: currentMarathon.Eligibility_Criteria }}
                        />
                      </div>
                    )}

                    {/* Rules and Regulations Section */}
                    {isSectionActive(activeTab, 'Rules_Regulations') && (
                      <div>
                        <h3 className="text-3xl font-bold text-[#640D5F] mb-6">
                          {currentMarathon.Name} ({currentMarathon.Track_Length})
                        </h3>
                        <div
                          className="text-[#2B1341]/80 prose prose-ul:list-disc prose-li:ml-6 max-w-none"
                          dangerouslySetInnerHTML={{ __html: currentMarathon.Rules_Regulations }}
                        />
                      </div>
                    )}

                    {/* Runner Amenities Section */}
                    {isSectionActive(activeTab, 'Runner_Amenities') && (
                      <div>
                        <h3 className="text-3xl font-bold text-[#640D5F] mb-6">
                          {currentMarathon.Name} ({currentMarathon.Track_Length})
                        </h3>
                        <div
                          className="text-[#2B1341]/80 prose prose-ol:list-decimal prose-li:ml-6 max-w-none"
                          dangerouslySetInnerHTML={{ __html: currentMarathon.Runner_Amenities }}
                        />
                      </div>
                    )}

                    {/* Route Map Section */}
                    {isSectionActive(activeTab, 'Route_Map') && (
                      <div>
                        <h3 className="text-3xl font-bold text-[#640D5F] mb-6">
                          {currentMarathon.Name} ({currentMarathon.Track_Length})
                        </h3>
                        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-[#F8C8DC] mb-6">
                          <Image
                            src={getRouteMapUrl(currentMarathon.Route_Map)}
                            alt={`${currentMarathon.Name} Route Map`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 80vw"
                          />
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => openMapModal(currentMarathon.Route_Map)}
                            className="px-6 py-3 bg-[#640D5F] text-white font-semibold rounded-xl hover:bg-[#D91656] transition-colors flex items-center gap-2"
                          >
                            <Maximize2 className="w-5 h-5" />
                            View Full
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Prize List Section */}
                    {isSectionActive(activeTab, 'Price_List') && (
                      <div>
                        <h3 className="text-3xl font-bold text-[#640D5F] mb-6">
                          {currentMarathon.Name} ({currentMarathon.Track_Length})
                        </h3>
                        <div className="overflow-x-auto">
                          <div
                            className="text-[#2B1341]/80 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: currentMarathon.Price_List }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-[#640D5F] to-[#D91656]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Ready to Run?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of runners in this amazing journey
            </p>
            <Link
              href="/register"
              className="inline-block px-12 py-4 bg-gradient-to-r from-[#FFB200] to-[#EB5B00] text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 tracking-wide relative overflow-hidden group animate-pulse-glow animate-button-shine hover:from-[#EB5B00] hover:to-[#D91656]"
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Map Modal */}
      {isMapModalOpen && selectedMap && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsMapModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMapModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <span className="text-2xl text-[#640D5F]">×</span>
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={getRouteMapUrl(selectedMap)}
                alt="Full Race Route Map"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <div className="p-4 bg-white border-t border-[#F8C8DC]">
              <button 
                onClick={async () => {
                  try {
                    const mapUrl = getRouteMapUrl(selectedMap)
                    const response = await fetch(mapUrl)
                    const blob = await response.blob()
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `${currentMarathon.Name.replace(/\s+/g, '-')}-Route-Map.png`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    window.URL.revokeObjectURL(url)
                  } catch (error) {
                    console.error('Error downloading map:', error)
                    // Fallback: open in new tab
                    window.open(getRouteMapUrl(selectedMap), '_blank')
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#D91656] transition mx-auto"
              >
                <Download className="w-4 h-4" />
                Download Map
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
