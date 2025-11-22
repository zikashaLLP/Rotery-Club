# Project Architecture

This document outlines the coding structure and best practices followed in this project.

## Directory Structure

```
├── app/                      # Next.js App Router pages
│   ├── register/            # Marathon ticket registration page
│   └── ...
├── components/              # Reusable React components
│   ├── ui/                  # Base UI components (Button, Input, etc.)
│   ├── EventHeader.tsx      # Event header with navigation
│   ├── TicketCard.tsx       # Individual ticket card component
│   ├── TicketSummaryCard.tsx # Cart summary component
│   └── DiscountCodeSection.tsx # Discount code input
├── hooks/                   # Custom React hooks
│   ├── useTickets.ts        # Ticket management logic
│   └── useDiscountCode.ts   # Discount code logic
├── types/                   # TypeScript type definitions
│   └── ticket.ts            # Ticket related types
├── lib/                     # Utility functions
│   └── utils.ts             # Helper functions
└── docs/                    # Documentation
    └── ARCHITECTURE.md      # This file
```

## Design Patterns

### 1. Separation of Concerns
- **Components**: Pure presentational components that receive props
- **Hooks**: Business logic and state management
- **Types**: Centralized type definitions
- **Pages**: Orchestrate components and hooks

### 2. Component Structure
Each component follows this pattern:
```typescript
interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ props }) => {
  // Component logic
  return (
    // JSX
  )
}

export default Component
```

### 3. Custom Hooks
Custom hooks encapsulate reusable logic:
- `useTickets`: Manages ticket state and operations
- `useDiscountCode`: Handles discount code validation

### 4. API-Ready Architecture
All data fetching logic is centralized in hooks with clear TODO markers:
```typescript
// TODO: Replace with API call
const fetchTickets = async () => {
  // const response = await fetch('/api/tickets')
  // For now, use mock data
}
```

## Current Features

### Register Page (`/register`)
- **Ticket Selection**: Browse and select marathon tickets
- **Quantity Management**: Add/remove tickets
- **Discount Codes**: Apply promotional codes
- **Cart Summary**: View selected items and total
- **Responsive Design**: Mobile and desktop optimized

## Future API Integration Points

### 1. Ticket Management
```typescript
// hooks/useTickets.ts
GET /api/tickets              // Fetch available tickets
POST /api/cart/add            // Add ticket to cart
DELETE /api/cart/remove       // Remove ticket from cart
```

### 2. Discount Validation
```typescript
// hooks/useDiscountCode.ts
POST /api/discount/validate   // Validate discount code
```

### 3. Checkout Process
```typescript
POST /api/checkout            // Process payment
GET /api/order/:id            // Get order details
```

## Coding Standards

### TypeScript
- Always define interfaces for props and data structures
- Use explicit return types for functions
- Avoid `any` type

### Component Guidelines
- One component per file
- Use functional components with TypeScript
- Keep components small and focused
- Use meaningful prop names

### State Management
- Use custom hooks for complex state logic
- Keep component state minimal
- Use callbacks for event handlers

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use consistent color scheme:
  - Primary: `#683592` (Purple)
  - Secondary: `#b83280` (Pink)
  - Background: `#f1f1f1`, `#cbd5e0`

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Types: `camelCase.ts`
- Pages: Next.js convention

## Development Workflow

1. **UI First**: Build components with mock data
2. **Type Safety**: Define TypeScript interfaces
3. **Logic Separation**: Extract business logic to hooks
4. **API Integration**: Replace mock data with API calls
5. **Testing**: Add tests for components and hooks

## Notes

- The `scrape/` folder contains reference designs only
- Will be removed before production deployment
- Do not import or reference scrape files in main codebase






