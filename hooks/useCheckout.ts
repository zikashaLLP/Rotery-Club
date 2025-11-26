import { useState, useCallback } from 'react'
import { ParticipantDetails, CheckoutFormErrors } from '@/types/participant'
import { Ticket } from '@/types/ticket'
import { API_BASE_URL } from '@/lib/config'

export const useCheckout = (selectedTickets: Ticket[]) => {
  // Initialize participant forms for each ticket quantity
  const initializeParticipants = (): ParticipantDetails[] => {
    const participants: ParticipantDetails[] = []
    selectedTickets.forEach(ticket => {
      for (let i = 0; i < ticket.quantity; i++) {
        participants.push({
          ticketId: ticket.id,
          ticketName: ticket.name,
          // Legacy (unused) name fields
          firstName: '',
          lastName: '',
          // New attendee details
          fullName: '',
          email: '',
          confirmEmail: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          address: '',
          city: '',
          pincode: '',
          state: '',
          tShirtSize: '',
          bloodGroup: '',
          runningClub: '',
          disclaimerAccepted: '',
        })
      }
    })
    return participants
  }

  const [participants, setParticipants] = useState<ParticipantDetails[]>(initializeParticipants())
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0)
  const [errors, setErrors] = useState<CheckoutFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateParticipant = useCallback((index: number, field: keyof ParticipantDetails, value: string) => {
    setParticipants(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
    
    // Clear error for this field
    setErrors(prev => {
      const updated = { ...prev }
      if (updated[index]) {
        delete updated[index][field]
      }
      return updated
    })
  }, [])

  const validateParticipant = useCallback((index: number): boolean => {
    const participant = participants[index]
    const newErrors: { [field: string]: string } = {}

    if (!participant.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!participant.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(participant.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!participant.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Please confirm your email'
    } else if (participant.confirmEmail !== participant.email) {
      newErrors.confirmEmail = 'Email addresses do not match'
    }
    if (!participant.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(participant.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }
    if (!participant.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }
    if (!participant.gender) {
      newErrors.gender = 'Gender is required'
    }
    if (!participant.tShirtSize) {
      newErrors.tShirtSize = 'T-shirt size is required'
    }
    if (!participant.city.trim()) {
      newErrors.city = 'City is required'
    }
    if (!participant.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    }
    if (participant.disclaimerAccepted !== 'yes') {
      newErrors.disclaimerAccepted = 'You must accept the disclaimer to continue'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, [index]: newErrors }))
      return false
    }

    return true
  }, [participants])

  const goToNext = useCallback(() => {
    if (validateParticipant(currentParticipantIndex)) {
      if (currentParticipantIndex < participants.length - 1) {
        setCurrentParticipantIndex(prev => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [currentParticipantIndex, participants.length, validateParticipant])

  const goToPrevious = useCallback(() => {
    if (currentParticipantIndex > 0) {
      setCurrentParticipantIndex(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentParticipantIndex])

  const submitCheckout = useCallback(async () => {
    // Validate all participants
    let allValid = true
    for (let i = 0; i < participants.length; i++) {
      if (!validateParticipant(i)) {
        allValid = false
        if (allValid === false) {
          setCurrentParticipantIndex(i)
          break
        }
      }
    }

    if (!allValid) {
      return false
    }

    setIsSubmitting(true)
    try {
      const registrations = participants.map(participant => {
        const genderValue =
          participant.gender === 'male'
            ? 'Male'
            : participant.gender === 'female'
              ? 'Female'
              : participant.gender

        const participantData: Record<string, any> = {
          Full_Name: participant.fullName,
          Email: participant.email,
          Contact_Number: `91${participant.phone}`,
          Gender: genderValue,
          Date_of_Birth: participant.dateOfBirth,
          Address: '',
          City: participant.city,
          Pincode: participant.pincode,
          State: '',
          Tshirt_Size: participant.tShirtSize,
          Blood_Group: '',
          Is_Terms_Condition_Accepted: participant.disclaimerAccepted === 'yes',
        }

        if (participant.runningClub?.trim()) {
          participantData.Running_Group = participant.runningClub.trim()
        }

        return {
          marathonId: Number(participant.ticketId) || 0,
          participantData,
        }
      })

      const response = await fetch(`${API_BASE_URL}/api/participant/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ registrations }),
      })

      if (!response.ok) {
        let message = 'Failed to submit registrations'
        try {
          const errorBody = await response.json()
          if (errorBody?.message) {
            message = errorBody.message
          }
        } catch {
          const text = await response.text()
          if (text) {
            message = text
          }
        }
        throw new Error(message)
      }

      const registrationResult = await response.json()
      const participantIdsRaw = registrationResult?.data?.participantIds
      const totalAmountRaw = registrationResult?.data?.totalAmount

      let participantIds: number[] = []
      if (Array.isArray(participantIdsRaw)) {
        participantIds = participantIdsRaw.map((id: any) => Number(id)).filter(id => !Number.isNaN(id))
      } else if (typeof participantIdsRaw === 'string') {
        participantIds = participantIdsRaw
          .split(',')
          .map(part => Number(part.trim()))
          .filter(id => !Number.isNaN(id))
      }

      const totalAmount = Number(totalAmountRaw)

      if (participantIds.length === 0 || Number.isNaN(totalAmount)) {
        throw new Error('Registration response missing participant IDs or total amount')
      }

      const paymentResponse = await fetch(`${API_BASE_URL}/api/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          participantIds,
          totalAmount,
        }),
      })

      if (!paymentResponse.ok) {
        let message = 'Failed to create payment'
        try {
          const errorBody = await paymentResponse.json()
          if (errorBody?.message) {
            message = errorBody.message
          }
        } catch {
          const text = await paymentResponse.text()
          if (text) {
            message = text
          }
        }
        throw new Error(message)
      }

      const paymentResult = await paymentResponse.json()
      const paymentUrl = paymentResult?.data?.paymentUrl

      if (paymentUrl) {
        window.location.href = paymentUrl
      }

      return true
    } catch (error) {
      console.error('Checkout error:', error)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [participants, validateParticipant])

  const validateParticipantAtIndex = useCallback((index: number): boolean => {
    return validateParticipant(index)
  }, [validateParticipant])

  const getErrorsForParticipant = useCallback((index: number) => {
    return errors[index] || {}
  }, [errors])

  return {
    participants,
    currentParticipantIndex,
    currentParticipant: participants[currentParticipantIndex],
    totalParticipants: participants.length,
    errors: errors[currentParticipantIndex] || {},
    allErrors: errors,
    getErrorsForParticipant,
    isSubmitting,
    updateParticipant,
    goToNext,
    goToPrevious,
    submitCheckout,
    validateParticipantAtIndex,
    isFirstParticipant: currentParticipantIndex === 0,
    isLastParticipant: currentParticipantIndex === participants.length - 1,
  }
}





