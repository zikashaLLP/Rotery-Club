'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Users, Heart, Clock } from 'lucide-react'
import TicketCard from '@/components/TicketCard'
import TicketSummaryCard from '@/components/TicketSummaryCard'
import { useCart } from '@/context/CartContext'

// Function to get the registration deadline based on current time
const getRegistrationDeadline = () => {
  const cutoffDate = new Date('2025-12-21T06:00:00+05:30') // 21/12/2025 6 AM
  const now = new Date()
  
  // If current time is after 21/12/2025 6 AM, set deadline to 21/12/2025 end of day
  if (now >= cutoffDate) {
    return new Date('2025-12-21T23:59:59+05:30')
  }
  // Otherwise, use 20/12/2025 end of day
  return new Date('2025-12-20T23:59:59+05:30')
}

// Function to get the display date string
const getDisplayDate = () => {
  const cutoffDate = new Date('2025-12-21T06:00:00+05:30')
  const now = new Date()
  
  if (now >= cutoffDate) {
    return '21/12/2025'
  }
  return '20/12/2025'
}

// Function to calculate registration time left
const calculateRegistrationTimeLeft = () => {
  const registrationDeadline = getRegistrationDeadline()
  const now = new Date().getTime()
  const distance = registrationDeadline.getTime() - now
  
  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const {
    tickets,
    selectedTickets,
    totalAmount,
    addTicket,
    removeTicket,
  } = useCart()

  const [registrationTimeLeft, setRegistrationTimeLeft] = useState(calculateRegistrationTimeLeft())
  const [displayDate, setDisplayDate] = useState(getDisplayDate())

  // Registration deadline countdown timer
  useEffect(() => {
    // Calculate immediately on mount
    const updateTimer = () => {
      setDisplayDate(getDisplayDate())
      setRegistrationTimeLeft(calculateRegistrationTimeLeft())
    }
    
    updateTimer() // Initial calculation

    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  // Temporary flag to control registration availability
  const REGISTRATION_OPEN = true

  const handleCheckout = () => {
    if (selectedTickets.length === 0) {
      alert('Please select at least one registration receipt')
      return
    }
    // Navigate to checkout page
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] relative overflow-hidden pt-28 md:pt-24">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-[#FFB200]/20 to-[#EB5B00]/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
          className="absolute top-40 left-20 w-16 h-16 bg-gradient-to-br from-[#D91656]/20 to-[#640D5F]/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-[#640D5F]/15 to-[#D91656]/15 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-0 md:px-4 py-3 md:py-8 relative z-10">
        {/* Page Title - Compact for Mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-8"
        >
          {/* Mobile Title - Simplified */}
          <div className="block md:hidden px-4">
            <h1 className="text-xl font-bold text-[#640D5F] mb-2">
              Register for the Run
            </h1>
            <p className="text-[#2B1341]/80 text-sm">
              Join the Visnagar Marathon 2025, 5 KM Cervical Cancer Awareness Run.
            </p>
          </div>

          {/* Desktop Title - Full Version */}
          <div className="hidden md:block">
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-12 h-12 bg-gradient-to-br from-[#D91656] to-[#EB5B00] rounded-full flex items-center justify-center"
              >
                <Activity className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#640D5F]">
                Register for the Run
              </h1>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 2 }}
                className="w-12 h-12 bg-gradient-to-br from-[#FFB200] to-[#EB5B00] rounded-full flex items-center justify-center"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <p className="text-[#2B1341]/80 text-lg">
              Join the Visnagar Marathon 2025, 5 KM Cervical Cancer Awareness Run.
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 bg-[#D91656] rounded-full"></div>
              <div className="w-2 h-2 bg-[#FFB200] rounded-full"></div>
              <div className="w-2 h-2 bg-[#EB5B00] rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {!REGISTRATION_OPEN ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-8 md:mt-12 text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#F8C8DC] px-6 py-10 md:px-10 md:py-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
              Registrations Opening Soon
            </h2>
            <p className="text-[#2B1341]/80 text-base md:text-lg mb-4">
              Online registration for <span className="font-semibold">Visnagar Marathon 2025</span> will start soon.
            </p>
            <p className="text-[#2B1341]/70 text-sm md:text-base">
              Please check back here shortly for updates, or follow Rotary Club of Visnagar on social media for the latest announcements.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Registration Deadline Countdown */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl mx-auto mb-6 md:mb-8"
            >
              <div className="bg-gradient-to-r from-red-600 via-[#D91656] to-red-600 px-4 md:px-6 py-4 rounded-2xl shadow-xl border-4 border-yellow-300"
                style={{
                  boxShadow: '0 0 20px rgba(217, 22, 86, 0.5), 0 0 40px rgba(255, 178, 0, 0.3)',
                }}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
                  </motion.div>
                  
                  <div className="text-white text-center md:text-left">
                    <div className="text-xs font-bold text-yellow-300 uppercase tracking-wider mb-1">⚡ Last Chance to Register!</div>
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm font-semibold">Last Date: </span>
                        <span className="text-lg md:text-xl font-black text-yellow-300 tracking-wide">{displayDate}</span>
                      </div>
                      <span className="hidden md:inline text-yellow-300">•</span>
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs font-semibold text-yellow-300">Time Left:</span>
                        <div className="flex items-center gap-1 md:gap-2">
                          {registrationTimeLeft.days > 0 && (
                            <span className="bg-yellow-300/20 px-2 py-1 rounded text-yellow-300 font-bold text-xs md:text-sm">
                              {String(registrationTimeLeft.days).padStart(2, '0')}d
                            </span>
                          )}
                          <span className="bg-yellow-300/20 px-2 py-1 rounded text-yellow-300 font-bold text-xs md:text-sm">
                            {String(registrationTimeLeft.hours).padStart(2, '0')}h
                          </span>
                          <span className="bg-yellow-300/20 px-2 py-1 rounded text-yellow-300 font-bold text-xs md:text-sm">
                            {String(registrationTimeLeft.minutes).padStart(2, '0')}m
                          </span>
                          <span className="bg-yellow-300/20 px-2 py-1 rounded text-yellow-300 font-bold text-xs md:text-sm animate-pulse">
                            {String(registrationTimeLeft.seconds).padStart(2, '0')}s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="md:flex md:gap-6 lg:gap-8">
              {/* Left Section - Registration Receipts */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-[62%] lg:w-[60%] mb-6 md:mb-0"
              >
                <div className="bg-white rounded-none md:rounded-3xl shadow-xl border-0 md:border-2 border-[#F8C8DC] overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {tickets.map((ticket, index) => (
                    <motion.div 
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={index !== tickets.length - 1 ? 'border-b border-[#F8C8DC]' : ''}
                    >
                      <TicketCard
                        ticket={ticket}
                        onAdd={addTicket}
                        onRemove={removeTicket}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile spacing for sticky bar */}
                <div className="h-20 md:hidden"></div>
              </motion.div>
              
              {/* Right Section - Summary (Desktop Only) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden md:block md:w-[35%] lg:w-[30%]"
              >
                <div className="bg-white rounded-3xl shadow-xl border-2 border-[#F8C8DC] overflow-hidden sticky top-24 hover:shadow-2xl transition-all duration-300">
                  <TicketSummaryCard
                    selectedTickets={selectedTickets}
                    totalAmount={totalAmount}
                    onCheckout={handleCheckout}
                  />
                </div>
              </motion.div>
            </div>

            {/* Mobile Sticky Checkout Bar - One Line */}
            <AnimatePresence>
              {selectedTickets.length > 0 && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#F8C8DC] shadow-2xl z-50 md:hidden"
                >
                  <div className="flex items-center justify-between px-4 py-4">
                    {/* Left: Amount */}
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#640D5F]">₹{totalAmount}</span>
                      <div className="w-px h-6 bg-[#F8C8DC]"></div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#640D5F]" />
                        <span className="text-sm font-medium text-[#2B1341]/80">
                          {selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Right: Proceed Button */}
                    <button
                      onClick={handleCheckout}
                      className="bg-[#D91656] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#EB5B00] transition-colors shadow-md flex items-center gap-2"
                    >
                      Proceed
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

