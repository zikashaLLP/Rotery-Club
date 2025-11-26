'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { API_BASE_URL } from '@/lib/config'

interface PaymentVerifyResponse {
  success: boolean
  message?: string
  data?: {
    merchantOrderId?: string
    paymentStatus?: string
    state?: string
    transactionId?: string
    participantCount?: number
    payments?: Array<{
      Id: number
      Amount: string
      Payment_Status: string
      Participant?: {
        ParticipantDetails?: {
          Full_Name?: string
        }
        Marathon?: {
          Name?: string
        }
      }
    }>
  }
}

interface PaymentStatusResultClientProps {
  merchantOrderId: string | null
}

const PaymentStatusResultClient: React.FC<PaymentStatusResultClientProps> = ({
  merchantOrderId,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PaymentVerifyResponse['data'] | null>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      if (!merchantOrderId) {
        setError('No payment reference found. Please start from the payment flow.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/payment/verify?merchantOrderId=${merchantOrderId}`,
          {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Unable to verify payment. Please try again.')
        }

        const data: PaymentVerifyResponse = await response.json()

        if (!data.success) {
          throw new Error(data.message || 'Payment verification failed.')
        }

        setResult(data.data ?? null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred.')
      } finally {
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [merchantOrderId])

  const renderPayments = () => {
    if (!result?.payments?.length) return null

    return (
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Participants</h3>
        {result.payments.map((payment) => (
          <div
            key={payment.Id}
            className="border border-secondary-2 rounded-md p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between text-sm">
              <span className="font-medium text-text-primary">
                {payment.Participant?.ParticipantDetails?.Full_Name || 'Participant'}
              </span>
              <span className="text-text-secondary">₹{payment.Amount}</span>
            </div>
            <p className="text-xs text-text-secondary">
              Marathon:{' '}
              <span className="text-text-primary font-medium">
                {payment.Participant?.Marathon?.Name || 'N/A'}
              </span>
            </p>
          </div>
        ))}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Note:</span> We have sent your receipts via WhatsApp and email. Please check them at your convenience.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 pt-24 md:pt-32">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-text-secondary">Verifying your payment...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <XCircle className="w-12 h-12 text-error" />
            <p className="text-text-primary font-semibold">Verification Failed</p>
            <p className="text-text-secondary text-sm">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-md"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              {result?.paymentStatus === 'Success' ? (
                <CheckCircle className="w-12 h-12 text-success" />
              ) : (
                <XCircle className="w-12 h-12 text-error" />
              )}
              <div>
                <p className="text-sm uppercase text-text-secondary tracking-wide">
                  Payment Status
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {result?.paymentStatus || 'Unknown'}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-text-secondary">
              <div className="py-0.5">
                <span className="font-semibold text-text-primary">Merchant Order ID:</span>{' '}
                {result?.merchantOrderId || merchantOrderId}
              </div>
              <div className="py-0.5">
                <span className="font-semibold text-text-primary">Transaction ID:</span>{' '}
                {result?.transactionId || 'Pending'}
              </div>
              <div className="py-0.5">
                <span className="font-semibold text-text-primary">Participants:</span>{' '}
                {result?.participantCount ?? result?.payments?.length ?? 0}
              </div>
              <div className="py-0.5">
                <span className="font-semibold text-text-primary">State:</span>{' '}
                {result?.state || 'Pending'}
              </div>
            </div>

            {renderPayments()}

            <button
              onClick={() => router.push('/')}
              className="mt-8 w-full py-3 bg-primary text-white rounded-md font-semibold"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentStatusResultClient


