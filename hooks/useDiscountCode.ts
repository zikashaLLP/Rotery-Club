import { useState, useCallback } from 'react'

interface DiscountCodeResult {
  isValid: boolean
  discount: number
  message: string
}

export const useDiscountCode = () => {
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCodeResult | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  // TODO: Replace with API call
  const applyDiscountCode = useCallback(async (code: string) => {
    if (!code.trim()) {
      return
    }

    setIsApplying(true)
    try {
      // Simulate API call
      // const response = await fetch('/api/discount/validate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code }),
      // })
      // const result = await response.json()
      
      // Mock validation for now
      const mockResult: DiscountCodeResult = {
        isValid: false,
        discount: 0,
        message: 'Invalid discount code',
      }

      setAppliedDiscount(mockResult)
      
      if (!mockResult.isValid) {
        // Clear code if invalid
        setTimeout(() => setAppliedDiscount(null), 3000)
      }
    } catch (error) {
      console.error('Error applying discount code:', error)
      setAppliedDiscount({
        isValid: false,
        discount: 0,
        message: 'Failed to apply discount code',
      })
    } finally {
      setIsApplying(false)
    }
  }, [])

  const removeDiscount = useCallback(() => {
    setDiscountCode('')
    setAppliedDiscount(null)
  }, [])

  return {
    discountCode,
    setDiscountCode,
    appliedDiscount,
    isApplying,
    applyDiscountCode,
    removeDiscount,
  }
}






