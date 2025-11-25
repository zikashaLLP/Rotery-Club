'use client'

import React from 'react'
import Image from 'next/image'

export default function AboutTheRunPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Inner Banner Section - 3 Images Side by Side */}
      <section className="relative overflow-hidden w-full pt-20 md:pt-24 pb-4 md:pb-6">
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/marathon1.jpg"
              alt="Visnagar Marathon 1"
              fill
              className="object-cover"
              priority
              sizes="33vw"
            />
          </div>
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/marathon2.jpg"
              alt="Visnagar Marathon 2"
              fill
              className="object-cover"
              priority
              sizes="33vw"
            />
          </div>
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/marathon3.jpg"
              alt="Visnagar Marathon 3"
              fill
              className="object-cover"
              priority
              sizes="33vw"
            />
          </div>
        </div>
      </section>

      {/* Page Heading with Theme Background */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] opacity-90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#D91656] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB200] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[#EB5B00] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#640D5F] text-center">
            About The Run
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-[#D91656] rounded-full"></div>
            <div className="w-3 h-3 bg-[#FFB200] rounded-full"></div>
            <div className="w-3 h-3 bg-[#EB5B00] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-6">
              Visnagar Marathon 2025 | #Run4CervicalCancerAwareness
            </h2>
            
            <div className="space-y-4 text-base md:text-lg text-[#2B1341]/90 leading-relaxed">
              <p style={{ textAlign: 'justify' }}>
                The Visnagar Marathon 2025 is an annual marathon event organized by Rotary Club of Visnagar, 
                dedicated to raising awareness about cervical cancer prevention and early detection.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                Launched in 2025, the Visnagar Marathon has emerged as a significant community initiative 
                focused on women&apos;s health awareness and empowerment.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                Since its inception, the theme for the event remains #Run4CervicalCancerAwareness, which is 
                an endeavour to honour the importance of women&apos;s health and preventive care. In line with 
                our guiding philosophy, #Run4CervicalCancerAwareness, the Visnagar Marathon is more than just 
                a sporting event—it&apos;s a platform that brings together the community in a shared expression 
                of support for women&apos;s health. A major portion of the registration proceeds goes to cervical 
                cancer awareness programs and health initiatives for women in the community.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                The marathon offers a scenic 5 KM route through the beautiful landscapes of Visnagar. This year, 
                we are organizing only the 5 KM Run, designed to encourage maximum community participation. Over 
                the years, the event has seen growing involvement, making it one of the most anticipated community 
                health-awareness activities in the region.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                The Visnagar Marathon continues to inspire, uniting people from all walks of life in one 
                common mission: to run for women&apos;s health and create awareness about cervical cancer 
                prevention. Through this event, we aim to spread the message that early detection saves lives, 
                and together, we can make a difference in our community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
