export interface ParticipantDetails {
  ticketId: string
  ticketName: string
  // Legacy fields (kept for compatibility, not used in new UI)
  firstName: string
  lastName: string
  // New attendee details fields
  fullName: string
  email: string
  confirmEmail: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | ''
  address: string
  city: string
  pincode: string
  state: string
  tShirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | ''
  bloodGroup: string
  runningClub: string
  disclaimerAccepted: string // 'yes' when the waiver checkbox is ticked, '' otherwise
}

export interface CheckoutData {
  participants: ParticipantDetails[]
  totalAmount: number
  discountCode?: string
  discountAmount?: number
}

export interface CheckoutFormErrors {
  [key: string]: {
    [field: string]: string
  }
}





