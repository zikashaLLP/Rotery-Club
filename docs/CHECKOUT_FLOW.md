# Checkout Flow Documentation

## Overview

The checkout flow collects participant details for each ticket purchased. Users fill out forms one by one for multiple participants.

## User Journey

```
Ticket Selection → Checkout → Fill Details (Per Participant) → Payment → Confirmation
   (Register)      (Checkout)     (Checkout - Multiple Steps)     (Future)   (Future)
```

## Page Flow

### 1. Register Page (`/register`)
- User selects tickets
- Clicks "Proceed to Checkout"
- Validates at least one ticket is selected
- Navigates to `/checkout`

### 2. Checkout Page (`/checkout`)
- Displays one participant form at a time
- Shows progress indicator
- Collects details for each ticket
- Validates before moving to next participant
- Submits all data when complete

## Components

### CheckoutProgress
Shows current progress through participants:
- Current participant number
- Total participants
- Progress bar
- Step indicators with checkmarks

### ParticipantForm
Collects participant information:
- **Personal Info**: Name, email, phone, DOB, gender
- **Race Info**: T-shirt size, blood group
- **Emergency Contact**: Name and phone
- **Medical Info**: Conditions and allergies

### Navigation
- **Previous**: Go back to previous participant
- **Next**: Validate and go to next participant
- **Complete Registration**: Submit all data (last participant)

## Form Validation

### Required Fields
- ✅ First Name
- ✅ Last Name
- ✅ Email (with format validation)
- ✅ Phone (10 digits)
- ✅ Date of Birth
- ✅ Gender
- ✅ Emergency Contact Name
- ✅ Emergency Contact Phone
- ✅ T-Shirt Size

### Optional Fields
- Blood Group
- Medical Conditions

### Validation Rules
```typescript
Email: /\S+@\S+\.\S+/
Phone: 10 digits (digits only)
All required fields must be non-empty
```

## Data Structure

### ParticipantDetails
```typescript
interface ParticipantDetails {
  ticketId: string
  ticketName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | ''
  emergencyContactName: string
  emergencyContactPhone: string
  tShirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | ''
  bloodGroup: string
  medicalConditions: string
}
```

### CheckoutData (Submitted)
```typescript
interface CheckoutData {
  participants: ParticipantDetails[]
  totalAmount: number
  discountCode?: string
  discountAmount?: number
}
```

## State Management

### useCheckout Hook
Manages checkout state and logic:

```typescript
const {
  participants,              // All participant forms
  currentParticipantIndex,   // Current form index
  currentParticipant,        // Current form data
  totalParticipants,         // Total number of forms
  errors,                    // Validation errors
  isSubmitting,              // Submission state
  updateParticipant,         // Update form field
  goToNext,                  // Next participant
  goToPrevious,              // Previous participant
  submitCheckout,            // Submit all data
  isFirstParticipant,        // Boolean check
  isLastParticipant,         // Boolean check
} = useCheckout(selectedTickets)
```

## Example: Multiple Tickets

### User Selection
```
2x Hope Half Marathon (21.09 KM)
1x Life Sprint 10 KM Run
```

### Checkout Flow
```
Step 1: Fill details for Participant 1 (Hope Half Marathon)
Step 2: Fill details for Participant 2 (Hope Half Marathon)
Step 3: Fill details for Participant 3 (Life Sprint 10 KM)
Step 4: Submit all data
```

## API Integration (Future)

### Submit Checkout
```typescript
POST /api/checkout

Request Body:
{
  participants: [
    {
      ticketId: "1",
      ticketName: "Hope Half Marathon",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "9876543210",
      // ... other fields
    },
    // ... more participants
  ],
  totalAmount: 3375,
  discountCode: "EARLY25",
  discountAmount: 500
}

Response:
{
  success: true,
  orderId: "ORD123456",
  paymentUrl: "https://payment.gateway.com/...",
  message: "Registration successful"
}
```

## Features

### ✅ Implemented
- Multi-step participant forms
- Real-time validation
- Progress tracking
- Navigation between participants
- Error handling per field
- Responsive design
- Order summary display

### 🔜 Future Enhancements
- Save and continue later
- Copy details from first participant
- Bulk upload (CSV)
- Payment gateway integration
- Email confirmation
- SMS notifications
- Digital waiver/terms acceptance

## User Experience

### Smooth Navigation
- Auto-scroll to top on participant change
- Validation before moving forward
- Can go back without validation
- Clear progress indicator

### Error Handling
- Inline field errors
- Scroll to first error
- Clear errors on input change
- Prevent submission with errors

### Visual Feedback
- Progress bar animation
- Checkmarks for completed forms
- Highlighted current step
- Loading state during submission

## Mobile Responsive

### Desktop
- Two-column form layout
- Sticky summary sidebar (future)
- Wide progress indicators

### Mobile
- Single-column layout
- Stacked form fields
- Compact progress steps
- Touch-friendly buttons

## Accessibility

- Proper label associations
- Required field indicators (*)
- Error messages with aria labels
- Keyboard navigation support
- Focus management

## Testing Checklist

### Form Validation
- [ ] All required fields validated
- [ ] Email format validation
- [ ] Phone number validation (10 digits)
- [ ] Error messages display correctly
- [ ] Errors clear on field change

### Navigation
- [ ] Can move to next participant
- [ ] Can go back to previous
- [ ] Cannot skip validation on "Next"
- [ ] Submit button only on last participant
- [ ] Progress updates correctly

### Edge Cases
- [ ] No tickets selected (redirect)
- [ ] Single ticket purchase
- [ ] Multiple same tickets
- [ ] Different ticket types
- [ ] All fields filled correctly

## Code Example

### Using in Page
```typescript
'use client'

import { useCheckout } from '@/hooks/useCheckout'
import { useTickets } from '@/hooks/useTickets'

export default function CheckoutPage() {
  const { selectedTickets } = useTickets()
  const {
    currentParticipant,
    currentParticipantIndex,
    totalParticipants,
    errors,
    updateParticipant,
    goToNext,
    submitCheckout,
  } = useCheckout(selectedTickets)

  return (
    <ParticipantForm
      participant={currentParticipant}
      participantIndex={currentParticipantIndex}
      errors={errors}
      onUpdate={updateParticipant}
    />
  )
}
```

## Summary

The checkout flow provides a smooth, step-by-step experience for users to enter participant details for each ticket. It includes:

- ✅ Clear progress tracking
- ✅ Comprehensive validation
- ✅ Easy navigation
- ✅ Responsive design
- ✅ Error handling
- ✅ API-ready structure
- ✅ Type-safe implementation

Ready for backend integration with clear API endpoints defined!






