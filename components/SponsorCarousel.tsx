'use client'

import React from 'react'
import Carousel from './ui/Carousel'

interface Sponsor {
  name: string
  image: string
  alt: string
  link?: string
}

interface SponsorCarouselProps {
  sponsors: Sponsor[]
  title?: string
}

const SponsorCarousel: React.FC<SponsorCarouselProps> = ({ sponsors, title }) => {
  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          {title}
        </h2>
      )}
      <Carousel autoPlay={true} autoPlayInterval={4000} showDots={true} showArrows={true}>
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="flex-[0_0_auto] min-w-0 px-2 md:px-4"
            style={{ width: 'calc(100% / 3)' }}
          >
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow h-full flex items-center justify-center">
              {sponsor.link ? (
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <div className="relative w-full h-24 md:h-32 bg-gray-100 rounded flex items-center justify-center">
                    <img
                      src={sponsor.image}
                      alt={sponsor.alt}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="100"%3E%3Crect fill="%23ddd" width="200" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="14"%3E' + sponsor.name + '%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  </div>
                </a>
              ) : (
                <div className="relative w-full h-24 md:h-32 bg-gray-100 rounded flex items-center justify-center">
                  <img
                    src={sponsor.image}
                    alt={sponsor.alt}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="100"%3E%3Crect fill="%23ddd" width="200" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="14"%3E' + sponsor.name + '%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default SponsorCarousel

