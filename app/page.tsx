'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, PhoneCall, Mail, Map, X, Download, Heart, Users, Activity } from 'lucide-react'
import PosterAwarenessSection from '@/components/PosterAwarenessSection'

const marathonDate = new Date('2025-12-28T05:00:00+05:30')

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

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
                  Organized by Rotary Club Visnagar
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

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link
                  href="/register"
                  className="px-8 py-4 bg-gradient-to-r from-[#D91656] to-[#EB5B00] text-white font-bold rounded-full shadow-lg shadow-[#D91656]/50 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  Register Now
                </Link>
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

      {/* 4. ROUTE MAP TEASER */}
      <section id="route" className="py-14 md:py-20 bg-[#FFF7EB]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="flex-1 space-y-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#640D5F] mb-4">Route Map</h2>
            <p className="text-[#2B1341]/80 max-w-xl">
              Check the official marathon route, hydration points, aid stations, and important road
              details.
            </p>
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="px-6 py-3 bg-[#D91656] text-white font-semibold rounded-full shadow-lg hover:-translate-y-1 transition"
            >
              View Full Route
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="h-64 md:h-72 rounded-3xl bg-gradient-to-br from-[#FFB200] via-[#EB5B00] to-[#D91656] relative overflow-hidden shadow-xl">
              <div className="absolute inset-4 rounded-2xl border-2 border-white/70 overflow-hidden shadow-inner">
                <Image
                  src="/Map.png"
                  alt="Marathon Route Map"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
                  <Image
                    src="/Map.png"
                    alt="Full Marathon Route Map"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
                <div className="p-4 bg-white border-t border-[#F8C8DC]">
                  <button 
                    onClick={async () => {
                      try {
                        const response = await fetch('/Map.png')
                        const blob = await response.blob()
                        const url = window.URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = 'Marathon-Route-Map.png'
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        window.URL.revokeObjectURL(url)
                      } catch (error) {
                        console.error('Error downloading map:', error)
                        // Fallback: open in new tab
                        window.open('/Map.png', '_blank')
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#D91656] transition mx-auto"
                  >
                    <Download className="w-4 h-4" />
                    Download Map
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
