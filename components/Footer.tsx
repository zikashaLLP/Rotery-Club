'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import veloxGroupLogo from '@/assets/images/logos/Velox Group - TM.png'

const Footer = () => {
  return (
    <footer className="bg-[#640D5F] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Copyright */}
        <div className="text-center text-white/60 text-sm">
          <p>Copyright © Rotary Club of Visnagar {new Date().getFullYear()}. All rights reserved.</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span>Powered by</span>
            <Link 
              href="https://veloxgroup.co.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative w-20 h-6 hover:opacity-80 transition-opacity"
            >
              <Image
                src={veloxGroupLogo}
                alt="Velox Group"
                fill
                className="object-contain"
                sizes="80px"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
