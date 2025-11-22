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
      router.replace('/')
      return
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('latestMerchantOrderId', merchantOrderId)
    }

    router.replace('/payment/status/result')
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


