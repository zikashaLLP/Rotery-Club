'use client'

import React from 'react'
import Image from 'next/image'

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src="/banner.png"
          alt="Marathon Event Banner"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
    </section>
  )
}

export default HeroBanner

