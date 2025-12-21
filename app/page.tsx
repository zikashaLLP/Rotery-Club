'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, XCircle, MapPin, PhoneCall, Mail, Map, X, Download, Heart, Users, Activity, Trophy, Award, Medal, Target } from 'lucide-react'
import PosterAwarenessSection from '@/components/PosterAwarenessSection'

const marathonDate = new Date('2025-12-28T05:00:00+05:30')

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

// Function to check if registration is closed
const isRegistrationClosed = () => {
  const registrationDeadline = getRegistrationDeadline()
  const now = new Date().getTime()
  return now > registrationDeadline.getTime()
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isRegistrationClosedState, setIsRegistrationClosedState] = useState(isRegistrationClosed())
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  // Marathon countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = marathonDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Check registration status periodically
  useEffect(() => {
    const checkStatus = () => {
      setIsRegistrationClosedState(isRegistrationClosed())
    }
    
    checkStatus() // Initial check
    const timer = setInterval(checkStatus, 1000) // Check every second

    return () => clearInterval(timer)
  }, [])

  const countdownItems = useMemo(
    () => [
      { label: 'Days', value: timeLeft.days },
      { label: 'Hours', value: timeLeft.hours },
      { label: 'Minutes', value: timeLeft.minutes },
      { label: 'Seconds', value: timeLeft.seconds },
    ],
    [timeLeft]
  )

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#2B1341]">
      {/* 1. HERO SECTION */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '90vh',
          backgroundImage:
            "linear-gradient(110deg, rgba(255, 247, 235, 0.95), rgba(255, 178, 0, 0.55), rgba(255, 255, 255, 0.8)), url('/banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        id="hero"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 md:pt-40 pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-[#640D5F]"
              >
                Visnagar Marathon 2025
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-2"
              >
                <p className="text-xl md:text-2xl font-semibold text-[#D91656]">
                  Run for Cervical Cancer Awareness
                </p>
                <p className="text-2xl md:text-3xl font-bold text-[#2B1341]">
                  Organized by Rotary Club of Visnagar
                </p>
              </motion.div>

              {/* Date Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-3 rounded-full border-2 border-[#640D5F] shadow-lg">
                  <Calendar className="w-5 h-5 text-[#640D5F]" />
                  <span className="font-bold text-[#640D5F]">28/12/2025</span>
                </div>
                
                {/* Floating Medal Icon - Mobile Only */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#FFB200] to-[#EB5B00] rounded-full flex items-center justify-center shadow-2xl md:hidden"
                >
                  <Activity className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="grid grid-cols-4 gap-3 pt-4"
              >
                {countdownItems.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/80 backdrop-blur rounded-2xl p-3 text-center border border-white/40 shadow-lg"
                  >
                    <div className="text-2xl md:text-3xl font-black text-[#FFB200]">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="uppercase text-xs tracking-wide text-[#2B1341] mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Registration Status Notice */}
              {isRegistrationClosedState ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 px-6 py-5 rounded-2xl shadow-2xl border-4 border-gray-400"
                >
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <XCircle className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-white text-center md:text-left">
                      <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">Registration Closed</div>
                      <div className="text-base md:text-lg">
                        Online registration for Visnagar Marathon 2025 has been closed.
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                {isRegistrationClosedState ? (
                  <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full px-10 py-4 text-lg font-bold whitespace-nowrap opacity-60 cursor-not-allowed">
                    Registration Closed
                  </div>
                ) : (
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-[#D91656] to-[#EB5B00] text-white rounded-full hover:from-[#EB5B00] hover:to-[#D91656] hover:scale-105 active:scale-95 transition-all duration-300 font-bold whitespace-nowrap px-10 py-4 text-lg shadow-lg hover:shadow-xl tracking-wide relative overflow-hidden group animate-pulse-glow animate-button-shine hover:-translate-y-1"
                  >
                    <span className="relative z-10">Register Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                )}
                <Link
                  href="/race-details"
                  className="px-8 py-4 border-2 border-[#640D5F] text-[#640D5F] font-semibold rounded-full hover:bg-[#640D5F] hover:text-white transition"
                >
                  Race Details
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden md:block"
            >
              <div className="relative w-full h-96">
                {/* Teal Ribbon Shape Background */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-3xl"
                />
                {/* Floating Medal Icon - Desktop */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-[#FFB200] to-[#EB5B00] rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Activity className="w-12 h-12 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WHY WE ARE ORGANIZING THIS EVENT */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFF1F5] rounded-full mb-4">
              <Heart className="w-8 h-8 text-[#D91656]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-6">
              Why This Marathon Matters
            </h2>
            <p className="text-lg text-[#2B1341]/80 leading-relaxed max-w-3xl mx-auto">
              Rotary Club of Visnagar is organizing this marathon to raise Cervical Cancer Awareness
              and encourage early screening among women. This event unites our community to promote
              fitness, women's health education, and social responsibility. Every step you take
              supports a meaningful cause and helps save lives.
            </p>
          </motion.div>

          {/* Three Column Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Heart, title: 'Cervical Cancer Awareness', color: '#D91656' },
              { icon: Users, title: 'Community Health Initiative', color: '#640D5F' },
              { icon: Activity, title: 'Promoting Fitness & Unity', color: '#EB5B00' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#F8C8DC] shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFF1F5] rounded-full mb-4">
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#2B1341]">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POSTER AWARENESS SECTION */}
      <PosterAwarenessSection />

      {/* RACE GROUPS/CATEGORIES SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-4">
              Race Categories
            </h2>
            <p className="text-lg text-[#2B1341]/80 max-w-2xl mx-auto">
              Four groups competing for excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Women's Category */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-[#D91656] shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto border-2 border-[#D91656]">
                <span className="text-3xl font-light text-[#D91656]">♀</span>
              </div>
              <h3 className="text-xl font-bold text-[#640D5F] text-center mb-2">
                Women's Category
              </h3>
              <p className="text-center text-[#2B1341] font-semibold text-lg">
                All Ages
              </p>
            </motion.div>

            {/* Men's Category 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-[#640D5F] shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto border-2 border-[#EB5B00]">
                <span className="text-3xl font-light text-[#EB5B00]">♂</span>
              </div>
              <h3 className="text-xl font-bold text-[#640D5F] text-center mb-2">
                Men's Group 1
              </h3>
              <p className="text-center text-[#2B1341] font-semibold text-lg">
                Till 30 Years
              </p>
            </motion.div>

            {/* Men's Category 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-[#EB5B00] shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto border-2 border-[#640D5F]">
                <span className="text-3xl font-light text-[#640D5F]">♂</span>
              </div>
              <h3 className="text-xl font-bold text-[#640D5F] text-center mb-2">
                Men's Group 2
              </h3>
              <p className="text-center text-[#2B1341] font-semibold text-lg">
                31 to 45 Years
              </p>
            </motion.div>

            {/* Men's Category 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-[#FFB200] shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto border-2 border-[#FFB200]">
                <span className="text-3xl font-light text-[#FFB200]">♂</span>
              </div>
              <h3 className="text-xl font-bold text-[#640D5F] text-center mb-2">
                Men's Group 3
              </h3>
              <p className="text-center text-[#2B1341] font-semibold text-lg">
                Above 46 Years
              </p>
            </motion.div>
          </div>

          {/* Age Cut-off Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FFB200]/20 to-[#EB5B00]/20 border-2 border-[#FFB200] px-6 py-4 rounded-xl">
              <Calendar className="w-5 h-5 text-[#EB5B00] flex-shrink-0 self-center" />
              <span className="text-[#2B1341] font-semibold">
                <span className="text-[#640D5F] font-bold">Note:</span> Age cut-off will be counted from{' '}
                <span className="text-[#D91656] font-bold">01/12/2025</span>
              </span>
            </div>
          </motion.div>

          {/* Winners Prizes Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-br from-[#640D5F] to-[#D91656] rounded-3xl p-8 shadow-2xl border-4 border-[#FFB200]">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Trophy className="w-8 h-8 text-yellow-300" />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    વિજેતાઓ માટે વિવિધ ગૃપ પ્રમાણે આકર્ષક ઈનામો
                  </h3>
                  <Trophy className="w-8 h-8 text-yellow-300" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '🏆', prize: 'આકર્ષક ટ્રોફી', detail: '(પ્રથમ, દ્રિતીય, તૃતીય)' },
                  { icon: '🎁', prize: 'કભી-બી, વિસનગર તરફથી', detail: 'દરેક વિજેતાને ગીફ્ટ હેમ્પર' },
                  { icon: '💪', prize: 'રોયલ જીમ તરફથી', detail: 'પ્રથમ ત્રણ વિજેતા બહેનો તથા ત્રણેય ગૃપના પ્રથમ ભાઈઓને ૧ વર્ષની ફ્રી મેમ્બરશીપ' },
                  { icon: '💄', prize: 'આર્યમા બ્યુટીકેર તરફથી', detail: 'દરેક વિજેતાને ડીસ્કાઉન્ટ કુપન' },
                  { icon: '🎉', prize: 'ઈનર સર્કલ તરફથી', detail: 'પ્રથમ ત્રણ વિજેતા બહેનોને રૂા.૫૦૦૦ સુધીના આકર્ષક પેકેજ' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="bg-white/95 backdrop-blur rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FFB200] to-[#EB5B00] rounded-full flex items-center justify-center text-2xl shadow-md">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#640D5F] text-base md:text-lg mb-1">
                          {item.prize}
                        </h4>
                        <p className="text-[#2B1341] text-sm md:text-base">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRIZES AND DISCOUNTS SECTION */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Main Heading - Lucky Draw */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block bg-gradient-to-r from-[#D91656] to-[#EB5B00] text-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-yellow-300 mb-6"
              style={{
                boxShadow: '0 0 40px rgba(217, 22, 86, 0.5), 0 0 60px rgba(235, 91, 0, 0.4)',
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <Trophy className="w-8 h-8 text-yellow-300" />
                <h2 className="text-3xl md:text-4xl font-black text-yellow-300">લકી ડ્રો</h2>
                <Trophy className="w-8 h-8 text-yellow-300" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-yellow-300">
                રૂપિયા ૧ લાખના આકર્ષક ઈનામો
              </p>
            </motion.div>
          </motion.div>

          {/* Discount Coupons Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border-2 border-[#FFB200]"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Award className="w-6 h-6 text-[#D91656]" />
              <h3 className="text-2xl md:text-3xl font-bold text-[#640D5F] text-center">
                ઉપરાંત વિસનગરના વિવિધ અગ્રણી સ્ટોર્સની ડિસ્કાઉન્ટ કુપન
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {[
                { store: 'વંદન ડીસ્ટ્રીબ્યુટર તરફથી', offer: 'ORA Tooh Paste મળશે', discount: '🎁' },
                { store: 'પ્રકાશ મોબાઈલ માંથી', offer: 'ખરીદી પર', discount: '૫% ડીસ્કાઉન્ટ' },
                { store: 'Sankalp - The Food Café', offer: 'તરફથી', discount: '૧૦% ડીસ્કાઉન્ટ' },
                { store: 'આર.કે.જવેલર્સ', offer: 'ઘડામણ પર', discount: '૩૦% ડીસ્કાઉન્ટ' },
                { store: 'Fab Dubai', offer: 'લેડીઝ લોન્જરી પર', discount: '૧૦% ડીસ્કાઉન્ટ' },
                { store: 'નવયુગ વસ્ત્રાલય', offer: 'માંથી ખરીદી પર', discount: '૧૦% ડીસ્કાઉન્ટ' },
                { store: 'Hiltop Fashion', offer: 'માંથી ખરીદી પર', discount: '૧૦% ડીસ્કાઉન્ટ' },
                { store: 'Canine Nutrition', offer: 'Dog Biscuitની ખરીદી પર', discount: '૧૦% ડીસ્કાઉન્ટ' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border-2 border-[#F8C8DC] hover:border-[#D91656] transition-all hover:shadow-md"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D91656] to-[#640D5F] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.discount === '🎁' ? '🎁' : item.discount.match(/\d+/)?.[0] || '✓'}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#640D5F] text-sm md:text-base">{item.store}</p>
                    <p className="text-[#2B1341] text-xs md:text-sm">
                      {item.offer} <span className="font-bold text-[#D91656]">{item.discount}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. ROUTE MAP TEASER */}
      <section id="route" className="py-14 md:py-20 bg-[#FFF7EB]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="flex-[1.2] space-y-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#640D5F] mb-4">Route Map</h2>
            <p className="text-[#2B1341]/80 max-w-xl">
              Check the official marathon route, hydration points, aid stations, and important road
              details on our interactive map.
            </p>
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="px-6 py-3 bg-[#D91656] text-white font-semibold rounded-full shadow-lg hover:-translate-y-1 transition"
            >
              View Interactive Map
            </button>
          </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-[0.8] w-full"
            >
             <div className="h-80 md:h-96 rounded-3xl bg-gradient-to-br from-[#FFB200] via-[#EB5B00] to-[#D91656] relative overflow-hidden shadow-xl">
                <div className="absolute inset-4 rounded-2xl border-2 border-white/70 overflow-hidden shadow-inner">
                 <iframe
                   src="https://www.google.com/maps/d/u/0/embed?mid=1aoktNSX-GLJTsMj4QeAcelYw88LLrvg&ll=23.690552363278883%2C72.54499999999999&z=14"
                    width="130%"
                    height="150%"
                    style={{ border: 0, marginTop: '-80px', marginBottom: '-50px', marginLeft: '-50px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Marathon Route Map"
                    className="rounded-xl"
                  />
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CONTACT DETAILS SECTION */}
      <section id="contact" className="py-16 bg-[#FFF7EB]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-[#640D5F] text-center">Contact Us</h2>
          
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Contact Persons */}
            <div className="bg-white border-2 border-[#FDD48F] rounded-2xl px-4 py-4 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-[#640D5F]/70 mb-4">Contact Persons</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-[#EB5B00] flex-shrink-0" />
                    <span className="text-base font-semibold text-[#2B1341]">Rtn. Gajendra Doshi</span>
                  </div>
                  <a href="tel:+919328291321" className="text-base font-semibold text-[#640D5F] hover:text-[#D91656] transition-colors">9328291321</a>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-[#EB5B00] flex-shrink-0" />
                    <span className="text-base font-semibold text-[#2B1341]">Rtn. Hitesh Raval</span>
                  </div>
                  <a href="tel:+919898980978" className="text-base font-semibold text-[#640D5F] hover:text-[#D91656] transition-colors">9898980978</a>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-[#EB5B00] flex-shrink-0" />
                    <span className="text-base font-semibold text-[#2B1341]">Rtn. Shailesh Patel</span>
                  </div>
                  <a href="tel:+919898129810" className="text-base font-semibold text-[#640D5F] hover:text-[#D91656] transition-colors">9898129810</a>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-[#EB5B00] flex-shrink-0" />
                    <span className="text-base font-semibold text-[#2B1341]">Rtn. Sanjay Patel</span>
                  </div>
                  <a href="tel:+919825100599" className="text-base font-semibold text-[#640D5F] hover:text-[#D91656] transition-colors">9825100599</a>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-[#EB5B00] flex-shrink-0" />
                    <span className="text-base font-semibold text-[#2B1341]">Rtn. Rakesh Patel</span>
                  </div>
                  <a href="tel:+919824515174" className="text-base font-semibold text-[#640D5F] hover:text-[#D91656] transition-colors">9824515174</a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border-2 border-[#FDD48F] rounded-2xl px-4 pt-2 pb-1 shadow-sm flex items-center gap-4">
              <MapPin className="w-5 h-5 text-[#EB5B00] flex-shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#640D5F]/70 mb-0.5">Address</p>
                <p className="text-base font-semibold text-[#2B1341] mb-0">Rotary Club of Visnagar<br />"Rotary Bhavan" Opp: Nootan School<br />Visnagar – 384315</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border-2 border-[#FDD48F] rounded-2xl px-4 py-2 shadow-sm flex items-center gap-4">
              <Mail className="w-5 h-5 text-[#EB5B00] flex-shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#640D5F]/70 mb-0.5">Email</p>
                <a href="mailto:rotaryvisnagar@gmail.com" className="text-base font-semibold text-[#640D5F] hover:text-[#D91656] transition-colors mb-0 block">rotaryvisnagar@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Modal */}
      <AnimatePresence>
        {isMapModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
              onClick={() => setIsMapModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsMapModalOpen(false)}
            >
              <div
                className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsMapModalOpen(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-[#640D5F]" />
                </button>
                <div className="relative w-full h-[80vh]">
                  <iframe
                    src="https://www.google.com/maps/d/u/0/embed?mid=1aoktNSX-GLJTsMj4QeAcelYw88LLrvg&ll=23.690552363278883%2C72.54499999999999&z=15"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Full Marathon Route Map"
                    className="rounded-xl"
                  />
                </div>
                <div className="p-4 bg-white border-t border-[#F8C8DC]">
                  <button 
                    onClick={() => {
                      window.open('https://www.google.com/maps/d/u/0/viewer?mid=1aoktNSX-GLJTsMj4QeAcelYw88LLrvg&ll=23.690552363278883%2C72.54499999999999&z=17', '_blank')
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#D91656] transition mx-auto"
                  >
                    <Map className="w-4 h-4" />
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
