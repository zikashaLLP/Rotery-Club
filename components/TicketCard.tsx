import React from 'react'
import { Ticket } from '@/types/ticket'
import { Plus, Minus } from 'lucide-react'

interface TicketCardProps {
  ticket: Ticket
  onAdd: (ticketId: string) => void
  onRemove: (ticketId: string) => void
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onAdd, onRemove }) => {
  return (
    <div className="p-6 hover:bg-gradient-to-r hover:from-[#FFF7EB] hover:to-[#FFF1F5] transition-all duration-300">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#640D5F] mb-2">
              {ticket.name}{' '}
              {ticket.distance && (
                <span className="text-[#D91656] font-semibold">({ticket.distance})</span>
              )}
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {ticket.originalPrice > ticket.discountedPrice ? (
                  <>
                    <span className="text-sm line-through text-[#2B1341]/60">
                      ₹{ticket.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xl font-bold text-[#640D5F]">
                      ₹{ticket.discountedPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-[#640D5F]">
                    ₹{ticket.discountedPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {ticket.discount > 0 && (
                <span className="bg-gradient-to-r from-[#D91656] to-[#EB5B00] text-white px-2 py-1 rounded-full text-xs font-bold">
                  {ticket.discount}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            {ticket.quantity === 0 ? (
              <button
                onClick={() => onAdd(ticket.id)}
                className="w-20 h-9 bg-[#640D5F] text-white rounded-lg font-semibold hover:bg-[#D91656] hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 text-xs"
              >
                <Plus className="w-3 h-3" />
                ADD
              </button>
            ) : (
              <div className="w-20 h-9 bg-white border-2 border-[#640D5F] rounded-lg font-bold flex items-center justify-between px-2 text-sm shadow-sm">
                <button
                  onClick={() => onRemove(ticket.id)}
                  aria-label="Remove ticket"
                  className="w-4 h-4 bg-[#640D5F] text-white rounded flex items-center justify-center text-xs hover:bg-[#D91656] transition-colors"
                >
                  &minus;
                </button>
                <span className="text-xs text-[#640D5F] font-bold">{ticket.quantity}</span>
                <button
                  onClick={() => onAdd(ticket.id)}
                  aria-label="Add ticket"
                  className="w-4 h-4 bg-[#640D5F] text-white rounded flex items-center justify-center text-xs hover:bg-[#D91656] transition-colors"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Full width description for mobile */}
        <p className="text-sm text-[#2B1341]/80 leading-relaxed bg-[#FFF7EB]/50 p-3 rounded-lg border-l-4 border-[#FFB200] w-full">
          {ticket.description}
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
            <h3 className="font-bold text-xl text-[#640D5F]">
              {ticket.name}{' '}
              {ticket.distance && (
                <span className="text-[#D91656] font-semibold">({ticket.distance})</span>
              )}
            </h3>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              {ticket.originalPrice > ticket.discountedPrice ? (
                <>
                  <span className="text-sm line-through text-[#2B1341]/60">
                    ₹{ticket.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold text-[#640D5F]">
                    ₹{ticket.discountedPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-[#640D5F]">
                  ₹{ticket.discountedPrice.toFixed(2)}
                </span>
              )}
            </div>
            {ticket.discount > 0 && (
              <span className="bg-gradient-to-r from-[#D91656] to-[#EB5B00] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {ticket.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-sm text-[#2B1341]/80 leading-relaxed w-10/12 bg-[#FFF7EB]/50 p-3 rounded-lg border-l-4 border-[#FFB200]">
            {ticket.description}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          {ticket.quantity === 0 ? (
            <button
              onClick={() => onAdd(ticket.id)}
              className="w-28 h-11 bg-[#640D5F] text-white rounded-lg font-semibold hover:bg-[#D91656] hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              ADD
            </button>
          ) : (
            <div className="w-28 h-11 bg-white border-2 border-[#640D5F] rounded-lg font-bold flex items-center justify-between px-4 text-lg shadow-sm">
              <button
                onClick={() => onRemove(ticket.id)}
                aria-label="Remove ticket"
                className="w-6 h-6 bg-[#640D5F] text-white rounded-md flex items-center justify-center text-sm hover:bg-[#D91656] transition-colors"
              >
                &minus;
              </button>
              <span className="text-base text-[#640D5F] font-bold">{ticket.quantity}</span>
              <button
                onClick={() => onAdd(ticket.id)}
                aria-label="Add ticket"
                className="w-6 h-6 bg-[#640D5F] text-white rounded-md flex items-center justify-center text-sm hover:bg-[#D91656] transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketCard


