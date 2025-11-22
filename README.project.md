# Marathon Registration System - Developer Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit: `http://localhost:3000/register`

## 📁 Project Structure

```
├── app/
│   ├── register/page.tsx         # Ticket selection page
│   └── ...
├── components/
│   ├── ui/                       # Base UI components
│   ├── EventHeader.tsx           # Event header
│   ├── TicketCard.tsx            # Ticket card
│   ├── TicketSummaryCard.tsx     # Cart summary
│   └── DiscountCodeSection.tsx   # Discount input
├── hooks/
│   ├── useTickets.ts             # Ticket management
│   └── useDiscountCode.ts        # Discount logic
├── types/
│   └── ticket.ts                 # Type definitions
└── docs/
    ├── ARCHITECTURE.md           # Architecture guide
    └── REFACTORING_SUMMARY.md    # Refactoring details
```

## 🎯 Current Features

### ✅ Marathon Ticket Selection
- View 4 different marathon categories
- Add/remove tickets with quantity controls
- Real-time price calculation
- Responsive design (mobile & desktop)

### ✅ Shopping Cart
- Dynamic cart summary
- Empty cart state with icon
- Total amount calculation
- Sticky sidebar on desktop

### ✅ Discount Codes
- Discount code input
- Ready for API validation
- Error messaging (to be implemented)

## 🔧 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📝 Coding Standards

### Component Example
```typescript
import React from 'react'

interface MyComponentProps {
  title: string
  onAction: () => void
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  )
}

export default MyComponent
```

### Hook Example
```typescript
import { useState, useCallback } from 'react'

export const useMyHook = () => {
  const [state, setState] = useState(initialValue)

  const action = useCallback(() => {
    // Logic here
  }, [])

  return { state, action }
}
```

## 🔌 API Integration (Future)

All hooks are prepared for API integration with clear TODO markers:

### Fetch Tickets
```typescript
// hooks/useTickets.ts
const fetchTickets = async () => {
  const response = await fetch('/api/tickets')
  const data = await response.json()
  setTickets(data)
}
```

### Validate Discount
```typescript
// hooks/useDiscountCode.ts
const applyDiscountCode = async (code: string) => {
  const response = await fetch('/api/discount/validate', {
    method: 'POST',
    body: JSON.stringify({ code })
  })
  const result = await response.json()
  return result
}
```

## 🎨 Design System

### Colors
```typescript
Primary Purple: #683592
Secondary Pink: #b83280
Background Gray: #f1f1f1
Border Gray: #cbd5e0
Accent Pink BG: #fff0f4
```

### Component Classes
```typescript
// Primary Button
className="bg-[#683592] hover:bg-[#552a76] text-white"

// Discount Badge
className="bg-[#fff0f4] text-[#b83280]"

// Add Button
className="border-2 border-[#683592] text-[#683592]"
```

## 📦 Components Usage

### Using TicketCard
```typescript
import TicketCard from '@/components/TicketCard'

<TicketCard
  ticket={{
    id: '1',
    name: 'Marathon Name',
    distance: '10 KM',
    originalPrice: 1000,
    discountedPrice: 750,
    discount: 25,
    description: 'Description...',
    quantity: 0
  }}
  onAdd={(id) => console.log('Add', id)}
  onRemove={(id) => console.log('Remove', id)}
/>
```

### Using Hooks
```typescript
import { useTickets } from '@/hooks/useTickets'

const MyComponent = () => {
  const { tickets, addTicket, removeTicket, totalAmount } = useTickets()
  
  return (
    <div>
      {tickets.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onAdd={addTicket}
          onRemove={removeTicket}
        />
      ))}
      <p>Total: ₹{totalAmount}</p>
    </div>
  )
}
```

## 🧪 Testing (To be implemented)

### Component Test Example
```typescript
import { render, screen } from '@testing-library/react'
import TicketCard from '@/components/TicketCard'

test('renders ticket card', () => {
  render(<TicketCard ticket={mockTicket} onAdd={jest.fn()} onRemove={jest.fn()} />)
  expect(screen.getByText('Miracle Miles')).toBeInTheDocument()
})
```

### Hook Test Example
```typescript
import { renderHook, act } from '@testing-library/react-hooks'
import { useTickets } from '@/hooks/useTickets'

test('adds ticket', () => {
  const { result } = renderHook(() => useTickets())
  
  act(() => {
    result.current.addTicket('1')
  })
  
  expect(result.current.tickets[0].quantity).toBe(1)
})
```

## 🚧 TODO - Next Steps

### Phase 1: Backend Integration
- [ ] Create API endpoints
  - [ ] `GET /api/tickets` - Fetch available tickets
  - [ ] `POST /api/cart` - Manage cart
  - [ ] `POST /api/discount/validate` - Validate discount codes
- [ ] Update hooks to use APIs
- [ ] Add error handling and loading states

### Phase 2: Checkout Flow
- [ ] Create checkout page
- [ ] Add payment integration
- [ ] Order confirmation page
- [ ] Email notifications

### Phase 3: User System
- [ ] User authentication
- [ ] User profile
- [ ] Order history
- [ ] Saved payment methods

### Phase 4: Admin Dashboard
- [ ] Manage events
- [ ] Manage tickets
- [ ] View orders
- [ ] Generate reports

## 📚 Documentation

- **Architecture**: See `docs/ARCHITECTURE.md`
- **Refactoring**: See `docs/REFACTORING_SUMMARY.md`

## 🔍 Important Notes

1. **Scrape Folder**: The `scrape/` folder is for reference only
   - Contains design reference from original HTML
   - Will be deleted before production
   - **Do NOT import from this folder**

2. **API Ready**: All code is structured for easy API integration
   - Look for `// TODO:` comments
   - Mock data is clearly marked
   - API endpoints are documented

3. **Type Safety**: Always use TypeScript
   - Define interfaces for all data structures
   - Avoid `any` type
   - Use proper type imports

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for all new files
3. Create components in `components/`
4. Create hooks in `hooks/`
5. Define types in `types/`
6. Update documentation when adding features

## 📞 Support

For questions about the codebase, refer to:
- `docs/ARCHITECTURE.md` - Overall architecture
- `docs/REFACTORING_SUMMARY.md` - Code organization details
- Component files - Each has inline comments

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Status**: UI Complete, API Integration Pending






