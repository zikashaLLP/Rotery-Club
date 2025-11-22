import React from 'react'
import Link from 'next/link'
import Button from './ui/Button'

const Run4OurSoldiers = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Video Thumbnail */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/run4oursoldiers.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Fallback if video doesn't load */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <p className="text-white text-lg">#Run4OurSoldiers</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              #Run4OurSoldiers
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Join the movement with #Run4OurSoldiers - a heartfelt tribute to the brave men and
              women in uniform. <br className="hidden md:block" /> Honour the strength and spirit
              of our soldiers with every step you take. Let your run be a message of gratitude for
              those who protect, serve, and inspire us every day.
            </p>
            <Link href="/race-categories">
              <Button size="lg" variant="primary">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Run4OurSoldiers

