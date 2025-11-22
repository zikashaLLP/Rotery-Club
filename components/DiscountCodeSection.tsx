import React from 'react'
import { Tag } from 'lucide-react'

interface DiscountCodeSectionProps {
  discountCode: string
  onDiscountCodeChange: (code: string) => void
  onApplyDiscount: () => void
}

const DiscountCodeSection: React.FC<DiscountCodeSectionProps> = ({
  discountCode,
  onDiscountCodeChange,
  onApplyDiscount,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border-2 border-[#F8C8DC] overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-[#FFF7EB] to-[#FFF1F5]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#FFB200] to-[#EB5B00] rounded-full flex items-center justify-center">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-[#640D5F]">
            Apply Discount Code
          </span>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => onDiscountCodeChange(e.target.value)}
            placeholder="ENTER DISCOUNT CODE"
            className="w-full px-4 py-3 border-2 border-[#F8C8DC] rounded-xl focus:outline-none focus:border-[#D91656] focus:ring-2 focus:ring-[#D91656]/20 uppercase font-semibold text-[#640D5F] placeholder:text-[#2B1341]/40 placeholder:text-sm bg-white"
          />
          <button 
            onClick={onApplyDiscount}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#640D5F] text-white font-semibold text-sm uppercase px-4 py-2 rounded-lg hover:bg-[#D91656] hover:shadow-md transition-all duration-200"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiscountCodeSection


