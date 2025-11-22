'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, DollarSign, Download, Maximize2, Activity } from 'lucide-react'

const raceData = {
  Name: "Miracle Miles",
  Description: "This ticket entitles you for participation in Miracle Miles - 20 Miler Run (32 KM) and you will get an Event T-Shirt + Finisher Medal + Timing BIB + On-Route Hydration Support + Post-run Refreshment + E-Certificate",
  Track_Length: "32 KM",
  Date: "2025-11-20",
  Reporting_Time: "06:00:00",
  Run_Start_Time: "07:00:00",
  Location: "Ahmedabad",
  Terms_Conditions: "<ul><li>Participants must be 18 years or older</li><li>Medical clearance required</li><li>No refunds after registration</li><li>BIB collection mandatory on event day</li></ul>",
  How_To_Apply: "<ul><li>Fill out the registration form online</li><li>Make payment through secure gateway</li><li>Receive confirmation email with details</li><li>Collect BIB and kit on event day</li></ul>",
  Eligibility_Criteria: "<ul><li>Minimum age: 18 years</li><li>Medical fitness certificate required</li><li>Previous running experience recommended</li><li>Valid ID proof mandatory</li><li>Health insurance recommended</li></ul>",
  Rules_Regulations: "<ul><li>Follow race route markers strictly</li><li>Wear provided BIB at all times during race</li><li>No external assistance allowed</li><li>Respect other participants and volunteers</li><li>Follow traffic rules and marshal instructions</li><li>Complete race within time limit</li></ul>",
  Runner_Amenities: "<p>All participants receive comprehensive race amenities:</p><ol><li>Event T-Shirt (premium quality)</li><li>Finisher Medal (for completing the race)</li><li>Timing BIB with chip</li><li>On-Route Hydration Support (water stations)</li><li>Post-run Refreshment (energy drinks, snacks)</li><li>E-Certificate (downloadable after race)</li><li>Medical Support (on-route and finish line)</li></ol>",
  Route_Map: "/Map.png",
  Price_List: "<table class='w-full border-collapse'><thead><tr class='bg-[#640D5F] text-white'><th class='border border-[#F8C8DC] p-3 text-left'>Category</th><th class='border border-[#F8C8DC] p-3 text-left'>Price</th></tr></thead><tbody><tr class='hover:bg-[#FFF1F5]'><td class='border border-[#F8C8DC] p-3 text-[#2B1341]'>Early Bird</td><td class='border border-[#F8C8DC] p-3 text-[#2B1341] font-semibold'>₹250</td></tr><tr class='hover:bg-[#FFF1F5]'><td class='border border-[#F8C8DC] p-3 text-[#2B1341]'>Regular</td><td class='border border-[#F8C8DC] p-3 text-[#2B1341] font-semibold'>₹300</td></tr><tr class='hover:bg-[#FFF1F5]'><td class='border border-[#F8C8DC] p-3 text-[#2B1341]'>Late Registration</td><td class='border border-[#F8C8DC] p-3 text-[#2B1341] font-semibold'>₹350</td></tr></tbody></table>",
  Fees_Amount: "300.00"
}

export default function RaceDetailsPage() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-0">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#640D5F] mb-2">
                {raceData.Name} – {raceData.Track_Length}
              </h1>
              <p className="text-xl md:text-2xl font-bold text-[#D91656]">
                Premium Race Category • Limited Seats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border-2 border-[#F8C8DC]">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#EB5B00]" />
                  <span className="text-sm font-semibold text-[#640D5F]">Date</span>
                </div>
                <p className="text-lg font-bold text-[#2B1341]">{formatDate(raceData.Date)}</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border-2 border-[#F8C8DC]">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#EB5B00]" />
                  <span className="text-sm font-semibold text-[#640D5F]">Reporting</span>
                </div>
                <p className="text-lg font-bold text-[#2B1341]">{formatTime(raceData.Reporting_Time)}</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border-2 border-[#F8C8DC]">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-[#EB5B00]" />
                  <span className="text-sm font-semibold text-[#640D5F]">Start Time</span>
                </div>
                <p className="text-lg font-bold text-[#2B1341]">{formatTime(raceData.Run_Start_Time)}</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border-2 border-[#FDD48F]">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-[#EB5B00]" />
                  <span className="text-sm font-semibold text-[#640D5F]">Entry Fee</span>
                </div>
                <p className="text-lg font-bold text-[#2B1341]">₹{raceData.Fees_Amount}</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/register"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#D91656] to-[#EB5B00] text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">Race Description</h2>
            <p className="text-lg text-[#2B1341]/80 leading-relaxed">
              {raceData.Description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Activity, label: 'Distance', value: raceData.Track_Length },
              { icon: Calendar, label: 'Date', value: formatDate(raceData.Date) },
              { icon: Clock, label: 'Reporting Time', value: formatTime(raceData.Reporting_Time) },
              { icon: Clock, label: 'Start Time', value: formatTime(raceData.Run_Start_Time) },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#F8C8DC] shadow-lg text-center"
              >
                <div className="w-12 h-12 bg-[#EB5B00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#EB5B00]" />
                </div>
                <p className="text-sm font-semibold text-[#640D5F] mb-2">{item.label}</p>
                <p className="text-lg font-bold text-[#2B1341]">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#EB5B00]/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#EB5B00]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#640D5F] mb-1">Location</p>
                  <p className="text-xl font-bold text-[#2B1341]">{raceData.Location}</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-[#640D5F] text-white font-semibold rounded-xl hover:bg-[#D91656] transition-colors">
                View on Map
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-6">Eligibility Criteria</h2>
            <div 
              className="text-[#2B1341]/80 leading-relaxed prose prose-ul:list-disc prose-li:ml-6"
              dangerouslySetInnerHTML={{ __html: raceData.Eligibility_Criteria }}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-6">How to Apply</h2>
            <div 
              className="text-[#2B1341]/80 leading-relaxed prose prose-ul:list-disc prose-li:ml-6"
              dangerouslySetInnerHTML={{ __html: raceData.How_To_Apply }}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-6">Rules & Regulations</h2>
            <div 
              className="text-[#2B1341]/80 leading-relaxed prose prose-ul:list-disc prose-li:ml-6"
              dangerouslySetInnerHTML={{ __html: raceData.Rules_Regulations }}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-6">Runner Amenities</h2>
            <div 
              className="text-[#2B1341]/80 leading-relaxed prose prose-ol:list-decimal prose-li:ml-6"
              dangerouslySetInnerHTML={{ __html: raceData.Runner_Amenities }}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-6">Route Map</h2>
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-[#F8C8DC] mb-6">
              <Image
                src={raceData.Route_Map}
                alt="Race Route Map"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#640D5F] text-white font-semibold rounded-xl hover:bg-[#D91656] transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button 
                onClick={() => setIsMapModalOpen(true)}
                className="px-6 py-3 bg-[#00A99D] text-white font-semibold rounded-xl hover:bg-[#00A99D]/80 transition-colors flex items-center gap-2"
              >
                <Maximize2 className="w-5 h-5" />
                View Full
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg overflow-x-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-6">Price List</h2>
            <div 
              className="text-[#2B1341]/80"
              dangerouslySetInnerHTML={{ __html: raceData.Price_List }}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[#D91656] to-[#640D5F] rounded-3xl p-12 text-center shadow-2xl"
          >
            <p className="text-white/90 text-lg mb-4">Entry Fee</p>
            <p className="text-5xl md:text-6xl font-black text-white">₹{raceData.Fees_Amount}</p>
          </motion.div>
        </div>
      </section>

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
              className="inline-block px-12 py-4 bg-white text-[#640D5F] font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
            >
              Register Now
            </Link>
          </motion.div>
        </div>
      </section>

      {isMapModalOpen && (
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
                src={raceData.Route_Map}
                alt="Full Race Route Map"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}