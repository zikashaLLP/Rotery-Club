'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PaymentStatusResultClient from '@/components/PaymentStatusResultClient'

export default function PaymentStatusResultPage() {
  const router = useRouter()
  const [merchantOrderId, setMerchantOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedOrderId = sessionStorage.getItem('latestMerchantOrderId')
    if (!storedOrderId) {
      router.replace('/')
      return
    }

    setMerchantOrderId(storedOrderId)
  }, [router])

  if (!merchantOrderId) {
    return null
  }

  return <PaymentStatusResultClient merchantOrderId={merchantOrderId} />
}


