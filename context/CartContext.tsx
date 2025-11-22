'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { Ticket } from '@/types/ticket'
import { API_BASE_URL } from '@/lib/config'

interface CartContextType {
  tickets: Ticket[]
  selectedTickets: Ticket[]
  totalAmount: number
  addTicket: (ticketId: string) => void
  removeTicket: (ticketId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const FALLBACK_TICKETS: Ticket[] = [
  {
    id: '1',
    name: 'Miracle Miles - 20 Miler',
    distance: '32 KM',
    originalPrice: 2100,
    discountedPrice: 1575,
    discount: 25,
    description: 'This ticket entitles you for participation in Miracle Miles - 20 Miler Run (32 KM) and you will get an Event T-Shirt + Finisher Medal + Timing BIB + On-Route Hydration Support + Post-run Refreshment + E-Certificate',
    quantity: 0,
  },
  {
    id: '2',
    name: 'Hope Half Marathon',
    distance: '21.09 KM',
    originalPrice: 1600,
    discountedPrice: 1200,
    discount: 25,
    description: 'This ticket entitles you for participation in Hope Half Marathon (21.0975 KM) and you will get an Event T-Shirt + Finisher Medal + Timing BIB + On-Route Hydration Support + Post-run Refreshment + E-Certificate',
    quantity: 0,
  },
  {
    id: '3',
    name: 'Life Sprint 10 KM Run',
    distance: '10 KM',
    originalPrice: 1200,
    discountedPrice: 900,
    discount: 25,
    description: 'This ticket entitles you for participation in Life Sprint 10K Run and you will get an Event T-Shirt + Finisher Medal + Timing BIB + On-Route Hydration Support + Post-run Refreshment + E-Certificate',
    quantity: 0,
  },
  {
    id: '4',
    name: 'Save A Life - 5 KM',
    distance: '5 KM',
    originalPrice: 750,
    discountedPrice: 562.5,
    discount: 25,
    description: 'This ticket entitles you for participation in Save A Life 5KM Run and you will get an Event T-Shirt + Finisher Medal + BIB + On-Route Hydration Support + Post-run Refreshment + E-Certificate',
    quantity: 0,
  },
]

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/marathon`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          cache: 'no-store',
        })
        if (!response.ok) {
          throw new Error('Failed to load marathon categories')
        }
        const payload = await response.json()
        if (payload?.success && Array.isArray(payload.data)) {
          const apiTickets: Ticket[] = payload.data.map((item: any) => ({
            id: String(item.Id),
            name: item.Name,
            distance: item.Track_Length ?? '',
            originalPrice: Number(item.Fees_Amount) || 0,
            discountedPrice: Number(item.Fees_Amount) || 0,
            discount: 0,
            description: item.Description ?? '',
            quantity: 0,
          }))
          setTickets(apiTickets)
        }
      } catch (error) {
        console.error('Unable to fetch marathon categories', error)
        if (tickets.length === 0) {
          setTickets(FALLBACK_TICKETS)
        }
      }
    }

    loadTickets()
  }, [])

  const addTicket = useCallback((ticketId: string) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, quantity: ticket.quantity + 1 }
          : ticket
      )
    )
  }, [])

  const removeTicket = useCallback((ticketId: string) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId && ticket.quantity > 0
          ? { ...ticket, quantity: ticket.quantity - 1 }
          : ticket
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setTickets(prevTickets =>
      prevTickets.map(ticket => ({ ...ticket, quantity: 0 }))
    )
  }, [])

  const selectedTickets = tickets.filter(ticket => ticket.quantity > 0)
  const totalAmount = selectedTickets.reduce(
    (sum, ticket) => sum + ticket.discountedPrice * ticket.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        tickets,
        selectedTickets,
        totalAmount,
        addTicket,
        removeTicket,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}





