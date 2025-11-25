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
  tShirtSize: 'XS-34' | 'S-36' | 'M-38' | 'L-40' | 'XL-42' | 'XXL-44' | '3XL-46' | ''
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





