import React from 'react'
import { Check } from 'lucide-react'

interface CheckoutProgressProps {
  currentIndex: number
  totalParticipants: number
  participantName: string
  ticketName: string
}

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({
  currentIndex,
  totalParticipants,
  participantName,
  ticketName,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Participant {currentIndex + 1} of {totalParticipants}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {ticketName}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#683592]">
            {currentIndex + 1}/{totalParticipants}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${((currentIndex + 1) / totalParticipants) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#683592] transition-all duration-300"
          />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalParticipants }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < currentIndex
                  ? 'bg-green-500 text-white'
                  : i === currentIndex
                  ? 'bg-[#683592] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < currentIndex ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <div className="text-xs text-gray-500 mt-1 hidden md:block">
              P{i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckoutProgress






