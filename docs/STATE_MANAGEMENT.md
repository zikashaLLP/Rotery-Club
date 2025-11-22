# State Management - Cart Context

## Problem

When clicking "Proceed to Checkout", the navigation was working but the selected tickets were being lost because each page had its own isolated state from the `useTickets` hook.

## Solution

Implemented **React Context API** to share cart state across all pages.

## Architecture

```
App Layout
  └─ CartProvider (Context)
      ├─ Header
      ├─ Register Page → uses useCart()
      ├─ Checkout Page → uses useCart()
      └─ Footer
```

## Files Created/Modified

### New: `context/CartContext.tsx`
Global cart state provider that wraps the entire application.

```typescript
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS)
  
  // Cart operations
  const addTicket = ...
  const removeTicket = ...
  const clearCart = ...
  
  return (
    <CartContext.Provider value={{ tickets, selectedTickets, totalAmount, ... }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

### Modified: `app/layout.tsx`
Wrapped app with CartProvider:

```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
```

### Modified: `app/register/page.tsx`
Changed from `useTickets()` to `useCart()`:

```typescript
// Before
import { useTickets } from '@/hooks/useTickets'
const { tickets, selectedTickets, ... } = useTickets()

// After
import { useCart } from '@/context/CartContext'
const { tickets, selectedTickets, ... } = useCart()
```

### Modified: `app/checkout/page.tsx`
Same change - now uses `useCart()`:

```typescript
import { useCart } from '@/context/CartContext'
const { selectedTickets, totalAmount } = useCart()
```

## Benefits

### ✅ Persistent Cart State
- Cart data persists across page navigation
- No data loss when switching between register and checkout

### ✅ Single Source of Truth
- One centralized cart state
- No sync issues between pages

### ✅ Easy to Use
- Simple hook: `const { tickets, addTicket, ... } = useCart()`
- Same API as before, just different source

### ✅ Future Ready
- Can add cart to Header (show count)
- Can add cart persistence to localStorage
- Can sync with backend API

## Usage Example

### In Any Component/Page

```typescript
'use client'

import { useCart } from '@/context/CartContext'

export default function MyComponent() {
  const {
    tickets,           // All available tickets
    selectedTickets,   // Tickets with quantity > 0
    totalAmount,       // Total cart value
    addTicket,         // Add ticket
    removeTicket,      // Remove ticket
    clearCart,         // Clear all
  } = useCart()

  return (
    <div>
      <p>Cart Total: ₹{totalAmount}</p>
      <p>Items: {selectedTickets.length}</p>
    </div>
  )
}
```

## Migration Notes

### Old Hook (hooks/useTickets.ts)
- Still exists but not used
- Can be removed or kept for reference
- Logic moved to CartContext

### New Hook (context/CartContext.tsx)
- Global state management
- Persists across navigation
- Used by all pages

## Future Enhancements

### 1. LocalStorage Persistence
```typescript
// Save cart to localStorage
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(tickets))
}, [tickets])

// Load cart from localStorage
useEffect(() => {
  const saved = localStorage.getItem('cart')
  if (saved) setTickets(JSON.parse(saved))
}, [])
```

### 2. Backend Sync
```typescript
// Sync cart with backend
useEffect(() => {
  if (userId) {
    fetch(`/api/cart/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ tickets })
    })
  }
}, [tickets, userId])
```

### 3. Cart in Header
```typescript
// Show cart count in header
function Header() {
  const { selectedTickets, totalAmount } = useCart()
  
  return (
    <header>
      <CartIcon count={selectedTickets.length} />
      <span>₹{totalAmount}</span>
    </header>
  )
}
```

## Testing

### Test Cart Persistence
1. Go to `/register`
2. Add tickets (e.g., 2x Half Marathon)
3. Click "Proceed to Checkout"
4. ✅ Verify tickets are still selected
5. ✅ Verify total amount is correct
6. Go back to `/register`
7. ✅ Verify cart is still intact

### Test Cart Operations
1. Add tickets → verify count increases
2. Remove tickets → verify count decreases
3. Navigate between pages → verify data persists
4. Clear cart → verify all quantities reset to 0

## Summary

The cart state is now **globally managed** using React Context API, ensuring data persists across all pages throughout the user's session.

**Before:** Each page had its own isolated state ❌
**After:** Shared global state across entire app ✅






