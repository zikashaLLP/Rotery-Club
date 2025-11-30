'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const PaymentStatusContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const merchantOrderIdParam = searchParams?.get('merchantOrderId') ?? ''
  const merchantOrderId = merchantOrderIdParam?.split(',')[0] ?? ''

  useEffect(() => {
    if (!merchantOrderId) {
      // Add a small delay before redirecting to home to avoid iOS redirect issues
      setTimeout(() => {
        router.replace('/')
      }, 100)
      return
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('latestMerchantOrderId', merchantOrderId)
    }

    // Add a small delay before redirecting to result page for better iOS compatibility
    setTimeout(() => {
      router.replace('/payment/status/result')
    }, 100)
  }, [merchantOrderId, router])

  return null
}

const PaymentStatusLanding = () => {
  return (
    <Suspense fallback={null}>
      <PaymentStatusContent />
    </Suspense>
  )
}

export default PaymentStatusLanding


