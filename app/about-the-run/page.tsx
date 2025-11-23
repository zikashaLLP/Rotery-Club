'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Award, Users, Heart, Activity, Target, Shield } from 'lucide-react'

export default function AboutTheRunPage() {
  return (
    <div className="min-h-screen bg-white pt-20 md:pt-0">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] py-8 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#640D5F] leading-tight">
                About the Run
              </h1>
              <p className="text-xl md:text-3xl font-bold text-[#D91656]">
                A movement for Cervical Cancer Awareness
              </p>
              <p className="text-base md:text-lg text-[#2B1341]/80 leading-relaxed">
                The Visnagar Marathon 2025 is more than a race — it is an initiative by Rotary Club of Visnagar to raise awareness about cervical cancer, encourage early screening, and bring our community together for a healthier future.
              </p>
            </motion.div>

            {/* Right Poster */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-3 md:p-4 border-2 border-[#F8C8DC] shadow-xl">
                <div className="relative w-full min-h-[300px] md:h-[500px] rounded-2xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/poster.jpeg"
                    alt="Visnagar Marathon 2025 Poster"
                    width={600}
                    height={800}
                    className="object-contain w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WHY WE ARE ORGANIZING THIS RUN */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-[#640D5F] mb-12"
          >
            Why We Are Organizing This Run
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: 'Cervical Cancer Awareness',
                description: 'Raising awareness about cervical cancer prevention and the importance of regular screening for early detection.',
              },
              {
                icon: Users,
                title: 'Early Screening Saves Lives',
                description: 'Promoting early screening programs that can detect cervical cancer at treatable stages, saving countless lives.',
              },
              {
                icon: Activity,
                title: 'Healthy Community Initiative',
                description: 'Bringing together our community to support women\'s health and create a healthier, more informed society.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 border-2 border-[#F8C8DC] shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-[#EB5B00]/10 rounded-full flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-[#EB5B00]" />
                </div>
                <h3 className="text-xl font-bold text-[#640D5F] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#2B1341]/80 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STORY SECTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-[#00A99D] rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#640D5F] mb-6">
              Every Step Saves Lives
            </h2>
            <p className="text-lg text-[#2B1341]/80 leading-relaxed">
              Cervical cancer is preventable, yet thousands of women suffer due to lack of awareness. Through this run, we spread the message — &apos;Take action today to save lives tomorrow.&apos; Your participation supports Rotary&apos;s health programs dedicated to protecting women&apos;s lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. EVENT DETAILS */}
      <section className="py-20 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-[#640D5F] mb-12"
          >
            Event Details
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                title: 'Distances',
                content: ['3K', '5K', '10K', '21K'],
              },
              {
                icon: Calendar,
                title: 'Date',
                content: ['28 December 2025', 'Reporting 5:30 AM'],
              },
              {
                icon: MapPin,
                title: 'Location',
                content: ['Visnagar City'],
              },
              {
                icon: Award,
                title: 'What You Get',
                content: ['T-Shirt', 'Medal', 'Certificate', 'Hydration', 'Medical Support'],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#F8C8DC] shadow-lg cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#EB5B00]/10 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#EB5B00]" />
                </div>
                <h3 className="text-lg font-bold text-[#640D5F] mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.content.map((line, i) => (
                    <li key={i} className="text-sm text-[#2B1341]/80">
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RIBBON + RUNNER + MESSAGE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Ribbon Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full h-64 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A99D] to-[#00A99D]/70 rounded-3xl transform rotate-12"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A99D]/50 to-[#00A99D]/30 rounded-3xl transform -rotate-6"></div>
                <div className="absolute inset-4 bg-white rounded-2xl flex items-center justify-center">
                  <Activity className="w-24 h-24 text-[#00A99D]" />
                </div>
              </div>
            </motion.div>

            {/* Right - Message */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#640D5F]">
                Run With Purpose
              </h2>
              <p className="text-lg text-[#2B1341]/80 leading-relaxed">
                When you run, you carry forward a message of hope, awareness, and early prevention for women.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. ROTARY IMPACT SECTION */}
      <section className="py-20 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Rotary Icon */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="w-48 h-48 bg-[#EB5B00]/10 rounded-full flex items-center justify-center">
                <Shield className="w-32 h-32 text-[#EB5B00]" />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#640D5F]">
                Why Rotary Leads This Mission
              </h2>
              <p className="text-lg text-[#2B1341]/80 leading-relaxed">
                Rotary Club of Visnagar has always served society. This marathon continues our mission toward women&apos;s health, awareness, and impactful community initiatives.
              </p>
              <ul className="space-y-3">
                {[
                  'Free cervical cancer awareness camps',
                  'Women empowerment programs',
                  'Youth fitness initiatives',
                  'Community education drives',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EB5B00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-[#2B1341]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. PAST INITIATIVES GALLERY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-[#640D5F] mb-12"
          >
            Past Initiatives
          </motion.h2>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item * 0.1 }}
                  className="flex-shrink-0 w-64 h-48 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5] rounded-xl border-2 border-[#F8C8DC] shadow-lg flex items-center justify-center"
                >
                  <div className="text-center">
                    <Target className="w-12 h-12 text-[#EB5B00] mx-auto mb-2" />
                    <p className="text-sm text-[#2B1341]/60">Rotary Initiative {item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA: JOIN THE MOVEMENT */}
      <section className="py-20 bg-gradient-to-r from-[#D91656] to-[#640D5F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Be a Part of the Change
            </h2>
            <p className="text-xl text-white/90">
              Your step can save someone&apos;s life.
            </p>
            <Link
              href="/register"
              className="inline-block mt-8 px-12 py-4 bg-white text-[#640D5F] font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
            >
              Register Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
