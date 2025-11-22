import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface EventHeaderProps {
  eventName: string
  eventDate: string
  eventTime: string
  eventVenue: string
  onBack: () => void
}

const EventHeader: React.FC<EventHeaderProps> = ({
  eventName,
  eventDate,
  eventTime,
  eventVenue,
  onBack,
}) => {
  return (
    <div className="bg-white shadow-lg border-b-2 border-[#F8C8DC]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Layout - Compact */}
        <div className="flex md:hidden items-center py-3">
          <button 
            onClick={onBack}
            className="bg-white border-2 border-[#640D5F] rounded-full w-8 h-8 flex items-center justify-center mr-3 hover:bg-[#640D5F] hover:border-[#640D5F] transition-colors flex-shrink-0 group"
          >
            <ArrowLeft className="w-4 h-4 text-[#640D5F] group-hover:text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-[#640D5F] truncate">
              {eventName}
            </h1>
            <div className="flex items-center gap-1 text-xs text-[#2B1341]/70">
              <div className="w-2 h-2 bg-[#D91656] rounded-full"></div>
              <span>{eventDate}</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Full */}
        <div className="hidden md:flex items-center py-8">
          <button 
            onClick={onBack}
            className="bg-gradient-to-r from-[#FFB200] to-[#EB5B00] rounded-full w-12 h-12 flex items-center justify-center mr-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-wide text-[#640D5F] mb-3">
              {eventName}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-base text-[#2B1341]/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#D91656] rounded-full"></div>
                <span className="font-medium">{eventDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFB200] rounded-full"></div>
                <span className="font-medium">{eventTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#EB5B00] rounded-full"></div>
                <span className="font-medium">{eventVenue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventHeader






