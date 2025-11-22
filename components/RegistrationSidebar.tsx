'use client'

import React, { useState, useEffect } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import OTPInput from './ui/OTPInput'
import { cn } from '@/lib/utils'

interface RegistrationSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const RegistrationSidebar: React.FC<RegistrationSidebarProps> = ({ isOpen, onClose }) => {
  const [isInternational, setIsInternational] = useState(false)
  const [step, setStep] = useState<'login' | 'verify'>('login')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpCountdown, setOtpCountdown] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [otpCountdown])

  const handleRequestOTP = () => {
    setError('')
    const value = isInternational ? email : mobile

    if (!value) {
      setError(`Please enter your ${isInternational ? 'email' : 'mobile number'}`)
      return
    }

    if (isInternational) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address')
        return
      }
    } else {
      const mobileRegex = /^[0-9]{10}$/
      if (!mobileRegex.test(mobile)) {
        setError('Please enter a valid 10-digit mobile number')
        return
      }
    }

    // TODO: Connect to backend API to request OTP
    console.log('Requesting OTP for:', value)
    setStep('verify')
    setOtpCountdown(20)
    // Simulate API call
    alert('OTP will be sent via backend integration')
  }

  const handleVerifyOTP = (otpValue: string) => {
    setOtp(otpValue)
    if (otpValue.length === 6) {
      // TODO: Connect to backend API to verify OTP
      console.log('Verifying OTP:', otpValue)
      alert('OTP verification will be connected to backend')
    }
  }

  const handleResendOTP = () => {
    if (otpCountdown > 0) return
    handleRequestOTP()
  }

  const handleGoBack = () => {
    setStep('login')
    setOtp('')
    setError('')
    setOtpCountdown(0)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-primary">Register for Marathon</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Logo Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-400">M</span>
            </div>
          </div>

          {/* Login Step */}
          {step === 'login' && (
            <div>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">Start your Registration</h1>
                <p className="text-gray-600">
                  Register using your {isInternational ? 'email address' : 'mobile number'}. You
                  will receive a One-Time Password to verify your identity.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleRequestOTP()
                }}
                className="space-y-4"
              >
                {/* Participant Type */}
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="participant-type"
                      checked={!isInternational}
                      onChange={() => setIsInternational(false)}
                      className="w-4 h-4 text-accent"
                    />
                    <span className="text-sm">Domestic Participant</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="participant-type"
                      checked={isInternational}
                      onChange={() => setIsInternational(true)}
                      className="w-4 h-4 text-accent"
                    />
                    <span className="text-sm">International Participant</span>
                  </label>
                </div>

                {/* Mobile/Email Input */}
                {!isInternational ? (
                  <Input
                    type="tel"
                    label="Mobile Number"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    required
                  />
                ) : (
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" variant="default" className="w-full" size="lg">
                  Request OTP
                </Button>
              </form>
            </div>
          )}

          {/* Verify Step */}
          {step === 'verify' && (
            <div>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">
                  Verify your {isInternational ? 'email address' : 'mobile number'}
                </h1>
                <p className="text-gray-600">
                  Enter the OTP sent to the registered {isInternational ? 'email address' : 'mobile number'}.{' '}
                  <br /> Do not share the OTP with anyone.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (otp.length === 6) {
                    handleVerifyOTP(otp)
                  }
                }}
                className="space-y-6"
              >
                <OTPInput
                  length={6}
                  onComplete={handleVerifyOTP}
                  className="justify-center"
                />

                {/* Resend OTP */}
                <div className="text-center">
                  {otpCountdown > 0 ? (
                    <p className="text-sm text-gray-600">
                      Resend OTP in <span className="font-semibold">{otpCountdown}</span> seconds
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-sm text-accent hover:text-accent-dark font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="default"
                  className="w-full"
                  size="lg"
                  disabled={otp.length !== 6}
                >
                  Verify
                </Button>

                <button
                  type="button"
                  onClick={handleGoBack}
                  className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Go Back
                </button>
              </form>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistrationSidebar

