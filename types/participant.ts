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
  tShirtSize: 'XXS-34' | 'XS-36' | 'S-38' | 'M-40' | 'L-42' | 'XL-44' | 'XXL-46' | 'Child Size 10 to 12 Years - 32' | ''
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





