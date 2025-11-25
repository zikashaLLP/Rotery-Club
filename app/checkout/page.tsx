'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import ParticipantForm from '@/components/ParticipantForm'
import Button from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { useCheckout } from '@/hooks/useCheckout'
import { cn } from '@/lib/utils'

export default function CheckoutPage() {
  const router = useRouter()
  const { selectedTickets, totalAmount } = useCart()

  const {
    currentParticipant,
    currentParticipantIndex,
    totalParticipants,
    errors,
    getErrorsForParticipant,
    isSubmitting,
    updateParticipant,
    goToNext,
    submitCheckout,
    validateParticipantAtIndex,
    isLastParticipant,
    participants,
  } = useCheckout(selectedTickets)

  const [expandedParticipant, setExpandedParticipant] = useState<number>(0)
  const [filledParticipants, setFilledParticipants] = useState<Set<number>>(new Set())

  // Redirect if no tickets selected
  useEffect(() => {
    if (selectedTickets.length === 0) {
      router.push('/register')
    }
  }, [selectedTickets, router])

  // Check if a participant form is complete
  const isParticipantComplete = (participant: any) => {
    return (
      participant.fullName?.trim() &&
      participant.email?.trim() &&
      participant.confirmEmail?.trim() &&
      participant.confirmEmail === participant.email &&
      participant.phone?.trim() &&
      participant.gender &&
      participant.tShirtSize &&
      participant.dateOfBirth &&
      participant.city?.trim() &&
      participant.pincode?.trim() &&
      participant.disclaimerAccepted === 'yes'
    )
  }

  const handleAddNext = () => {
    // Validate current participant - this will set errors if validation fails
    const isValid = validateParticipantAtIndex(expandedParticipant)
    
    if (!isValid) {
      // Validation failed - errors are already set, form stays open
      // Scroll to first error field after a brief delay to ensure DOM is updated
      setTimeout(() => {
        const firstErrorField = document.querySelector('.error, input.error, select.error, textarea.error')
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    // Mark current as filled
    setFilledParticipants(prev => new Set(prev).add(expandedParticipant))

    if (expandedParticipant === participants.length - 1) {
      // Last participant - submit (which will validate all)
      handleSubmit()
    } else {
      // Move to next participant
      goToNext()
      setExpandedParticipant(expandedParticipant + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    // Validate all participants first
    let firstInvalidIndex = -1
    for (let i = 0; i < participants.length; i++) {
      if (!validateParticipantAtIndex(i)) {
        firstInvalidIndex = i
        break
      }
    }

    if (firstInvalidIndex !== -1) {
      // Expand the first participant with errors
      setExpandedParticipant(firstInvalidIndex)
      // Scroll to it
      setTimeout(() => {
        const firstErrorField = document.querySelector('.error, input.error, select.error, textarea.error')
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    // All valid, proceed with submission
    const success = await submitCheckout()
    if (success) {
      // Navigate to payment instead of showing alert
      router.push('/payment/status')
    }
  }

  const toggleParticipant = (index: number) => {
    // Can only open if it's the current one being filled OR already filled
    const canOpen = index === expandedParticipant || 
                    filledParticipants.has(index) ||
                    (index === 0 && filledParticipants.size === 0) ||
                    (index > 0 && filledParticipants.has(index - 1))
    
    if (canOpen) {
      setExpandedParticipant(expandedParticipant === index ? -1 : index)
    }
  }

  if (selectedTickets.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      {/* Back Button */}
      <div className="sticky top-0 z-40 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => router.push('/register')}
            className="flex items-center gap-2 text-[#640D5F] hover:text-[#D91656] transition-colors font-bold text-lg md:text-xl"
          >
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 md:py-8 px-4">
        <div className="md:flex md:gap-6 lg:gap-8 justify-center">
          {/* Left Section - Form */}
          <div className="section-left mb-6 md:mb-0 w-full md:min-w-[600px] md:max-w-[800px]">
            {/* Grouped by Registration Receipt Type */}
            {Array.from(new Set(participants.map(p => p.ticketName))).map((ticketName) => {
              const ticketParticipants = participants.filter(p => p.ticketName === ticketName)
              
              return (
                <div key={ticketName} className="mb-8">
                  {/* Registration Receipt Type Header */}
                  <div className="text-lg font-bold leading-none mb-4 text-text-primary">
                    {ticketName}
                  </div>

                  {/* Participant Cards */}
                  {ticketParticipants.map((participant, idx) => {
                    const globalIndex = participants.indexOf(participant)
                    const isExpanded = expandedParticipant === globalIndex
                    const isFilled = filledParticipants.has(globalIndex)
                    const isCompleted = isParticipantComplete(participant)
                    const canOpen = globalIndex === 0 || 
                                   filledParticipants.has(globalIndex - 1) || 
                                   isFilled
                    
                    return (
                      <div key={globalIndex} className="mb-4" id={`attendeeContainer${globalIndex + 1}`}>
                        {/* Participant Header - Collapsible */}
                        <button
                          onClick={() => toggleParticipant(globalIndex)}
                          disabled={!canOpen}
                          className={cn(
                            "w-full p-3 flex items-center justify-between transition-colors",
                            isExpanded 
                              ? "bg-secondary-3 rounded-t md:rounded-t" 
                              : "bg-secondary-3 rounded-none md:rounded",
                            canOpen 
                              ? "hover:bg-secondary-2/50 cursor-pointer" 
                              : "opacity-60 cursor-not-allowed"
                          )}
                        >
                          {isFilled && !isExpanded ? (
                            // Completed state - show teal checkmark, name, email, and edit icon
                            <>
                              <div className="flex items-center gap-3 flex-1">
                                {/* Teal oval with white checkmark */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success flex items-center justify-center">
                                  <i className="mdi mdi-check text-white text-lg"></i>
                                </div>
                                {/* Participant name and email */}
                                <div className="flex flex-col flex-1 min-w-0">
                                  <span className="font-medium text-text-primary text-sm truncate">
                                  {participant.fullName || participant.email}
                                  </span>
                                  <span className="text-xs text-text-secondary truncate">
                                    {participant.email}
                                  </span>
                                </div>
                              </div>
                              {/* Edit icon */}
                              <i className="mdi mdi-pencil text-text-secondary text-lg flex-shrink-0"></i>
                            </>
                          ) : (
                            // Incomplete or expanded state - show default header
                            <>
                              <div className="flex items-center gap-2">
                                <i className="mdi mdi-account-edit text-primary text-xl"></i>
                                <span className="font-medium text-text-primary">
                                  Enter Participant {globalIndex + 1} Details
                                </span>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-text-secondary" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-text-secondary" />
                              )}
                            </>
                          )}
                        </button>

                        {/* Participant Form - Expandable */}
                        <div 
                          className={cn(
                            "transition-all duration-300 overflow-hidden",
                            isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                          )}
                        >
                          {isExpanded && (
                            <div className="bg-white rounded-none md:rounded-b border border-t-0 border-secondary-2 p-4 md:p-6">
                              <ParticipantForm
                                participant={participant}
                                participantIndex={globalIndex}
                                errors={getErrorsForParticipant(globalIndex)}
                                onUpdate={updateParticipant}
                              />

                              {/* Action Button */}
                              <div className="mt-6 pt-6 border-t border-secondary-2">
                                <div className="flex justify-end">
                                  <Button
                                    onClick={handleAddNext}
                                    disabled={isSubmitting}
                                    variant="primary"
                                    className="min-w-[140px] uppercase font-bold"
                                  >
                                    {globalIndex === participants.length - 1 
                                      ? (isSubmitting ? 'SUBMITTING...' : 'SUBMIT') 
                                      : 'ADD NEXT'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {/* Right Section - Sticky Summary */}
          <div className="section-right self-start sticky top-8">
            <div className="border border-secondary-2 rounded bg-white shadow-z2">
              {/* Summary Header */}
              <div className="p-4">
                <div className="mb-4 tracking-wider uppercase opacity-75 font-bold text-sm">
                  SUMMARY
                </div>
                
                {/* Price Breakdown */}
                <div className="flex items-center justify-between opacity-75 text-sm mb-2">
                  <span>Price ({selectedTickets.reduce((sum, t) => sum + t.quantity, 0)} items)</span>
                  <span className="flex items-center">
                    <i className="mr-1 tsi tsi-currency-inr"></i>
                    <span>{totalAmount}</span>
                  </span>
                </div>

                {/* Discount (if any) */}
                {selectedTickets.some(t => t.discount > 0) && (
                  <div className="flex items-center justify-between text-success text-sm">
                    <span>Discount</span>
                    <span className="flex items-center">
                      <span className="mr-1">-</span>
                      <i className="mr-1 tsi tsi-currency-inr"></i>
                      <span>0</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Total Amount */}
              <div className="p-4 border-t border-secondary-2">
                <div className="flex justify-between font-bold text-lg text-primary">
                  <span>Total Amount</span>
                  <span className="flex items-center">
                    <i className="mr-1 tsi tsi-currency-inr"></i>
                    <span>{totalAmount}</span>
                  </span>
                </div>
                <div className="text-xs text-secondary-1 mt-2 hidden md:block">
                  Prices are excluding GST and Booking Fees
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

