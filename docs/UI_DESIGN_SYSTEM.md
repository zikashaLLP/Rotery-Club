# UI Design System - Marathon Registration

This document outlines the UI/UX design system extracted from the scraped marathon booking page.

## Color Palette

### Primary Colors
- **Primary Purple**: `#683592` (Main brand color)
  - Light variant: `rgba(104, 53, 146, 0.6)`
  - Lightest variant: `rgba(104, 53, 146, 0.1)`
- **Primary Light**: `#e9d8fd`

### Secondary Colors
- **Secondary 1**: `#718096` (Text gray)
- **Secondary 2**: `#cbd5e0` (Border gray)
- **Secondary 3**: `#f1f1f1` (Background gray)

### Tertiary Colors
- **Tertiary 1**: `#b83280` (Accent pink)
- **Tertiary 2**: `#fff0f4` (Light pink background)

### Semantic Colors
- **Success**: `#009688` (Teal green)
- **Error**: `#f56565` (Red)
- **Warning**: `#ff5722` (Orange-red)
- **Link**: `#2f6db4` (Blue)

## Typography

### Font Family
- Primary: `Lato, sans-serif`
- Weight: 400 (normal), 500 (medium), 600 (semi-bold), 700 (bold)

### Font Sizes
- Base: `14px`
- H2: `2rem` (32px)
- H3: `1.75rem` (28px)
- H5: `1.25rem` (20px)
- Small/Caption: `12px`

### Line Height
- Body: `1.5rem` (21px for 14px base)
- Paragraphs: `1.5` ratio

### Letter Spacing
- Default: `0.1px`

## Layout Structure

### Container Widths
- Mobile (default): `margin: 0 1rem`
- Tablet (768px-991px): `margin: 0 2rem`
- Desktop (992px+): `margin: 0 4rem`
- Large Desktop (1280px+): `margin: 0 8rem`
- XL Desktop (1536px+): `margin: 0 14rem`

### Section Layout
- Left Section (Desktop): 60-62% width
- Right Section (Desktop): 30-35% width
- Mobile: Both 100% width, stacked

## Form Components

### Input Fields
- Border: `1px solid #ccc`
- Border Radius: `4px`
- Min Height: `36px`
- Padding: `10px`
- Focus Border: `#007eff`
- Focus Box Shadow: `inset 0 1px 1px rgba(0,0,0,0.075), 0 0 0 3px rgba(0,126,255,0.1)`
- Error Border: `#f56565`
- Disabled Background: `#f9f9f9`
- Disabled Text: `rgba(0,0,0,0.38)`

### Form Field Labels
- Color: `rgba(0,0,0,0.6)` or `rgba(0,0,0,0.54)`
- Focused: Primary color `#683592`
- Error: `#ff5722`

### Buttons

#### Primary Button
- Background: `#683592`
- Color: White
- Border Radius: `4px`
- Padding: `8px 16px` (typical)
- Font Weight: `500`
- Font Size: `14px`
- Disabled Opacity: `0.5`
- Hover: Slightly darker shade

#### Secondary/Outline Button
- Background: Transparent
- Border: `1px solid rgba(0,0,0,0.12)`
- Color: Inherit or primary color
- Hover Background: `rgba(0,0,0,0.04)`

#### Accent Button (Success)
- Background: `#009688`
- Color: White

#### Warning Button
- Background: `#ff5722`
- Color: White

### Cards
- Background: `#fff`
- Border Radius: `4px` to `10px`
- Box Shadow: Material Design elevation
  - z1: `0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)`
  - z2: `0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)`

### Badges/Tags
- Background: Primary color `#683592`
- Color: White
- Border Radius: `2px` or `9999px` (pill)
- Padding: `4px 8px`
- Font Size: `12px`
- Font Weight: `500`

## Spacing System

Material Design spacing units (8px base):
- Padding/Margin values: `0, 8px, 16px, 24px, 32px, 40px, 48px`

Common patterns:
- Card padding: `16px` to `32px`
- Section spacing: `32px` to `64px`
- Element spacing: `8px` to `16px`

## Interactive States

### Hover
- Background overlay: `rgba(0,0,0,0.04)` to `rgba(0,0,0,0.05)`
- Cursor: `pointer`

### Focus
- Outline: Primary color or blue
- Box shadow for depth

### Active/Selected
- Background: `rgba(0,0,0,0.12)` or primary color
- For primary items: `#683592` background with white text

### Disabled
- Opacity: `0.5` to `0.6`
- Color: `rgba(0,0,0,0.38)`
- Cursor: `not-allowed`

## Animations

### Transitions
- Default: `all 0.2s ease-in-out`
- Hover/Focus: `0.2s ease-in-out`
- Longer transitions: `0.5s` to `1s`

### Keyframes
- Fade In: Opacity 0 to 1
- Rotate: 0deg to 180deg/359deg
- Shimmer: Skeleton loading effect

## Icons
- Material Design Icons (MDI)
- Size: `24px` default, `18px`, `36px`, `48px` variants
- Line height: `inherit`

## Scrollbars
- Width/Height: `4px`
- Thumb: `#718096` with `opacity: 0.8`
- Track: `#f1f1f1`
- Border Radius: `2px`

## Best Practices

1. **Consistency**: Use the defined color palette consistently
2. **Accessibility**: 
   - Maintain color contrast ratios
   - Provide focus states
   - Mark required fields clearly
3. **Responsiveness**: Follow the container width patterns for different breakpoints
4. **Material Design**: Follow elevation/shadow patterns for depth
5. **Forms**:
   - Clear labels
   - Inline validation
   - Helpful error messages
   - Appropriate input types
6. **Loading States**: Use skeleton screens or spinners
7. **White Space**: Generous spacing for better readability

## Components to Implement

### Ticket Card
- White background card
- Border between items
- Clear ticket name and price
- Quantity controls (+/- buttons)
- Disabled state for sold out

### Summary Card
- Sticky positioning on scroll
- Clear pricing breakdown
- Prominent total
- CTA button at bottom

### Form Fields
- Floating/placeholder labels
- Inline validation
- Error messages below field
- Required field indicators (*)

### Progress Indicator
- Step-by-step visualization
- Current step highlighted
- Completed steps marked

### Navigation
- Clear back button
- Breadcrumb if needed
- Progress indicators

## Implementation Notes

The original site uses Angular with Material Design components. For React/Next.js implementation:
- Consider using Tailwind CSS with custom theme
- Or use Material-UI (MUI) for React
- Replicate the color scheme and spacing system
- Match the component styles closely
- Ensure responsive behavior matches





