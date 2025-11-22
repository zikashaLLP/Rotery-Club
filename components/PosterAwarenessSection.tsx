'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const PosterAwarenessSection = () => {
  const awarenessPoints = [
    '🎗 Cervical Cancer Awareness Campaign',
    '🏥 Encouraging Early Screening for Women',
    '🧡 Community Health & Social Responsibility',
    '🏃‍♀️ Promoting Fitness Across All Age Groups',
  ]

  const floatingDots = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }))

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7EB] to-[#FFF1F5]" />
      
      {/* Dotted pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #640D5F 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Floating animated dots */}
      {floatingDots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute w-2 h-2 bg-[#D91656]/20 rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-12 shadow-inner border border-white/40"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT SIDE - POSTER */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ rotate: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative bg-white rounded-3xl p-4 border-4 border-[#FDD48F] shadow-2xl"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(217, 22, 86, 0.25), 0 0 0 2px #F8C8DC',
                }}
              >
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl">
                  <Image
                    src="/poster.jpeg"
                    alt="Cervical Cancer Awareness Marathon Poster"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - AWARENESS INFO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative space-y-6"
            >
              {/* Purple ribbon shape behind text */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#640D5F]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#D91656]/10 rounded-full blur-xl" />

              <div className="relative z-10">
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#640D5F] mb-3"
                >
                  About This Initiative
                </motion.h2>

                {/* Subheading */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-xl md:text-2xl font-semibold text-[#D91656] mb-6"
                >
                  Every Step Saves Lives
                </motion.h3>

                {/* Paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-[#2B1341]/80 leading-relaxed mb-8 text-sm md:text-base"
                >
                  Visnagar Marathon 2025 is dedicated to raising awareness about Cervical Cancer and 
                  encouraging early screening among women. Rotary Club of Visnagar is committed to 
                  saving lives through education, community health programs, and impactful awareness 
                  drives. This marathon is more than a run — it's a movement toward a healthier future.
                </motion.p>

                {/* Points */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="space-y-3 mb-8"
                >
                  {awarenessPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="flex items-center text-[#2B1341] text-sm md:text-base"
                    >
                      <span className="mr-3 text-lg">{point.split(' ')[0]}</span>
                      <span className="font-medium">{point.substring(2)}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px -12px rgba(255, 178, 0, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-[#D91656] to-[#EB5B00] text-white font-semibold px-8 py-4 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    Learn More About Our Mission
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PosterAwarenessSection
