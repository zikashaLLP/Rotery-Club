'use client'

import React, { useRef, useState, KeyboardEvent, ChangeEvent } from 'react'
import { cn } from '@/lib/utils'

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
  className?: string
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, className }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if all fields are filled
    if (newOtp.every((digit) => digit !== '')) {
      const otpString = newOtp.join('')
      onComplete?.(otpString)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (pastedData.length === length && /^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      inputRefs.current[length - 1]?.focus()
      onComplete?.(pastedData)
    }
  }

  return (
    <div className={cn('flex gap-2 justify-center', className)} onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        />
      ))}
    </div>
  )
}

export default OTPInput

