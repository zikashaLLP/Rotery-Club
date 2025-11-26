import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { Ticket } from '@/types/ticket'
import Button from '@/components/ui/Button'

interface TicketSummaryCardProps {
  selectedTickets: Ticket[]
  totalAmount: number
  onCheckout: () => void
}

const TicketSummaryCard: React.FC<TicketSummaryCardProps> = ({
  selectedTickets,
  totalAmount,
  onCheckout,
}) => {
  if (selectedTickets.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center text-center px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-[#FFB200] to-[#EB5B00] rounded-full flex items-center justify-center mb-4 shadow-lg">
          <ShoppingBag className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
        <span className="text-lg font-semibold text-[#640D5F] tracking-wide">
          No Items Added
        </span>
        <p className="text-sm text-[#2B1341]/60 mt-2">
          Select registration receipts to see your summary
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-[#D91656] to-[#EB5B00] rounded-full flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold text-xl text-[#640D5F] leading-none flex items-center pt-[1px]">
          Registration Receipt Summary
        </h3>
      </div>
      
      <div className="space-y-4 mb-6">
        {selectedTickets.map(ticket => (
          <div key={ticket.id} className="bg-gradient-to-r from-[#FFF7EB] to-[#FFF1F5] p-4 rounded-xl border border-[#F8C8DC]">
            <div className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <p className="font-bold text-[#640D5F] mb-1">{ticket.name}</p>
                <p className="text-[#2B1341]/70 text-xs">
                  ₹{ticket.discountedPrice} × {ticket.quantity}
                </p>
              </div>
              <span className="font-bold text-[#D91656] text-lg">
                ₹{ticket.discountedPrice * ticket.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-[#640D5F] p-4 rounded-xl mb-6">
        <div className="flex justify-between items-center text-white">
          <span className="font-semibold text-lg">Total Amount</span>
          <span className="font-bold text-2xl">₹{totalAmount}</span>
        </div>
      </div>
      
      <Button 
        onClick={onCheckout}
        variant="primary"
        className="w-full py-4 bg-[#D91656] hover:bg-[#EB5B00] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        size="lg"
      >
        Proceed to Checkout
      </Button>
    </div>
  )
}

export default TicketSummaryCard


