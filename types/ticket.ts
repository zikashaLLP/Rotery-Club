export interface Ticket {
  id: string
  name: string
  distance: string
  originalPrice: number
  discountedPrice: number
  discount: number
  description: string
  runnerAmenities?: string
  quantity: number
}

export interface TicketSummary {
  tickets: Ticket[]
  subtotal: number
  discount: number
  total: number
}

export interface DiscountCode {
  code: string
  discount: number
  isValid: boolean
}






