'use client'

import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#640D5F] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Copyright */}
        <div className="text-center text-white/60 text-sm">
          <p>Copyright © Rotary Club of Visnagar {new Date().getFullYear()}. All rights reserved.</p>
          <p className="mt-2">Powered by Velox Group</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
