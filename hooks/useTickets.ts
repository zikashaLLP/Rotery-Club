import { useState, useCallback } from 'react'
import { Ticket } from '@/types/ticket'

// This will be replaced with API calls later
const INITIAL_TICKETS: Ticket[] = [
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

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // TODO: Replace with API call
  const fetchTickets = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      // const response = await fetch('/api/tickets')
      // const data = await response.json()
      // setTickets(data)
      
      // For now, use initial data
      setTickets(INITIAL_TICKETS)
    } catch (err) {
      setError('Failed to fetch tickets')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
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

  return {
    tickets,
    selectedTickets,
    totalAmount,
    isLoading,
    error,
    addTicket,
    removeTicket,
    clearCart,
    fetchTickets,
  }
}
