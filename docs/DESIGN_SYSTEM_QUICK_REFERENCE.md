# Design System Quick Reference

A quick reference guide for developers working with the Material Design-inspired system.

## Color Classes

### Primary Colors
```jsx
// Background
className="bg-primary"           // Purple #683592
className="bg-primary-light"     // Light purple with opacity
className="bg-primary-lightest"  // Very light purple
className="bg-primary-pale"      // Pale purple #e9d8fd

// Text
className="text-primary"
className="text-primary-light"
```

### Secondary Colors
```jsx
className="bg-secondary-1"       // Gray #718096
className="bg-secondary-2"       // Light gray #cbd5e0
className="bg-secondary-3"       // Background gray #f1f1f1
```

### Text Colors
```jsx
className="text-text-primary"    // rgba(0, 0, 0, 0.87)
className="text-text-secondary"  // rgba(0, 0, 0, 0.6)
className="text-text-disabled"   // rgba(0, 0, 0, 0.38)
```

### Semantic Colors
```jsx
className="bg-success text-white"  // Teal green #009688
className="bg-error text-white"    // Red #f56565
className="bg-warning text-white"  // Orange #ff5722
className="text-link"              // Blue #2f6db4
```

### Tertiary/Accent
```jsx
className="bg-tertiary-1"        // Pink #b83280
className="bg-tertiary-2"        // Light pink #fff0f4
```

## Material Design Components

### Buttons

```jsx
import Button from '@/components/ui/Button'

// Primary button (purple)
<Button variant="primary" onClick={handleClick}>
  Save
</Button>

// Outline button
<Button variant="outline" onClick={handleClick}>
  Cancel
</Button>

// Success button (green)
<Button variant="success" onClick={handleSubmit}>
  Complete
</Button>

// Error/destructive button (red)
<Button variant="error" onClick={handleDelete}>
  Delete
</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// With icons
<Button variant="primary">
  <Plus className="w-4 h-4" />
  Add Item
</Button>
```

### Input Fields

```jsx
import Input from '@/components/ui/Input'

// Basic input
<Input
  label="First Name"
  placeholder="Enter first name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Required field
<Input
  label="Email"
  type="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// With error
<Input
  label="Phone"
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  error={errors.phone}  // Displays error message
/>
```

### Select/Dropdown

```jsx
<div className="mat-form-field">
  <label className="required">Gender</label>
  <select className="mat-select" value={gender} onChange={handleChange}>
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
  {error && <span className="mat-error">{error}</span>}
</div>
```

### Textarea

```jsx
<div className="mat-form-field">
  <label>Comments</label>
  <textarea
    className="mat-input resize-none"
    rows={4}
    value={comments}
    onChange={(e) => setComments(e.target.value)}
    placeholder="Enter your comments"
  />
</div>
```

### Cards

```jsx
// Standard card
<div className="mat-card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>

// Elevated card (more shadow)
<div className="mat-card mat-card-elevated">
  <h3>Important Card</h3>
  <p>This card has more elevation</p>
</div>
```

### Badges/Tags

```jsx
// Primary badge
<span className="mat-badge mat-badge-primary">
  New
</span>

// Success badge
<span className="mat-badge mat-badge-success">
  Active
</span>

// Custom badge
<span className="mat-badge bg-tertiary-2 text-tertiary-1">
  50% OFF
</span>
```

### Checkbox

```jsx
<div className="mat-checkbox">
  <input
    type="checkbox"
    id="terms"
    checked={accepted}
    onChange={(e) => setAccepted(e.target.checked)}
  />
  <label htmlFor="terms">I accept the terms and conditions</label>
</div>
```

### Radio Button

```jsx
<div className="mat-radio">
  <input
    type="radio"
    id="option1"
    name="options"
    value="1"
    checked={selected === '1'}
    onChange={(e) => setSelected(e.target.value)}
  />
  <label htmlFor="option1">Option 1</label>
</div>
```

## Material Design Shadows

```jsx
className="shadow-z1"  // Subtle elevation
className="shadow-z2"  // Standard card elevation
className="shadow-z3"  // Medium elevation
className="shadow-z4"  // Higher elevation for important elements
```

## Layout Patterns

### Two Column Form
```jsx
<div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
  <Input label="First Name" {...props} />
  <Input label="Last Name" {...props} />
  <Input label="Email" {...props} />
  <Input label="Phone" {...props} />
</div>
```

### Page with Sidebar
```jsx
<div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
  <div className="md:flex md:gap-6 lg:gap-8">
    {/* Main content - 60% */}
    <div className="md:w-[60%] mb-6 md:mb-0">
      {/* Content */}
    </div>
    
    {/* Sidebar - 30% */}
    <div className="md:w-[30%]">
      {/* Sidebar content */}
    </div>
  </div>
</div>
```

### Card with Sections
```jsx
<div className="mat-card mat-card-elevated p-6 md:p-8">
  <div className="space-y-8">
    {/* Section 1 */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-text-primary border-b border-secondary-2 pb-2">
        Personal Information
      </h3>
      {/* Fields */}
    </div>
    
    {/* Section 2 */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-text-primary border-b border-secondary-2 pb-2">
        Contact Details
      </h3>
      {/* Fields */}
    </div>
  </div>
</div>
```

## Animations

```jsx
// Fade in
className="animate-fade-in"

// Custom transitions
className="transition-colors duration-200"
className="transition-all duration-200"
```

## Common Patterns

### Empty State
```jsx
<div className="py-20 flex flex-col items-center text-center">
  <Icon className="w-16 h-16 text-secondary-2 mb-4" />
  <span className="text-lg font-semibold text-text-secondary">
    No items found
  </span>
</div>
```

### Loading Skeleton
```jsx
<div className="skeleton h-10 w-full rounded"></div>
```

### Error Message
```jsx
<span className="mat-error">This field is required</span>
```

### Success Message
```jsx
<div className="bg-success/10 border border-success text-success p-4 rounded">
  Successfully saved!
</div>
```

### Form Navigation
```jsx
<div className="flex justify-between items-center mt-8 pt-6 border-t border-secondary-2">
  <Button variant="outline" onClick={handlePrevious}>
    <ArrowLeft className="w-4 h-4" />
    Previous
  </Button>
  
  <Button variant="primary" onClick={handleNext}>
    Next
    <ArrowRight className="w-4 h-4" />
  </Button>
</div>
```

## Spacing Guidelines

Use the 8px grid system:

```jsx
// Gaps in grids
gap-2    // 8px
gap-4    // 16px
gap-6    // 24px
gap-8    // 32px

// Padding
p-2      // 8px
p-4      // 16px
p-6      // 24px
p-8      // 32px

// Margins
mb-2     // margin-bottom: 8px
mb-4     // margin-bottom: 16px
mb-6     // margin-bottom: 24px
mb-8     // margin-bottom: 32px
```

## Responsive Breakpoints

```jsx
// Mobile first approach
className="block md:flex"           // Flex on tablet+
className="w-full md:w-1/2"        // Half width on tablet+
className="px-4 md:px-6 lg:px-8"   // Progressive padding

// Breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

## Typography

```jsx
// Headings
<h2 className="text-2xl md:text-4xl font-semibold text-text-primary">
<h3 className="text-xl md:text-3xl font-semibold text-text-primary">
<h5 className="text-lg md:text-xl font-medium text-text-primary">

// Body text
<p className="text-sm text-text-secondary">
<p className="text-base text-text-primary">

// Small text
<span className="text-xs text-text-secondary">
```

## Best Practices

1. **Always use the design system classes** instead of arbitrary colors
2. **Maintain consistent spacing** using the 8px grid
3. **Use semantic button variants** (primary, outline, success, error)
4. **Include error prop** in Input components for validation
5. **Mark required fields** with the `required` prop
6. **Use Material Design shadows** (`shadow-z1` to `shadow-z4`)
7. **Add transitions** for interactive elements
8. **Test responsive layouts** on mobile, tablet, and desktop
9. **Ensure accessibility** with proper labels and ARIA attributes
10. **Follow the color hierarchy**: primary action → secondary action → tertiary/links

## Common Mistakes to Avoid

❌ Don't use arbitrary colors:
```jsx
<button className="bg-[#683592]">  // Bad
```

✅ Use design tokens:
```jsx
<Button variant="primary">  // Good
```

❌ Don't mix styling approaches:
```jsx
<div className="bg-white rounded shadow-md">  // Bad (inconsistent)
```

✅ Use Material Design classes:
```jsx
<div className="mat-card">  // Good
```

❌ Don't forget required indicators:
```jsx
<Input label="Email" />  // Missing required indicator
```

✅ Mark required fields:
```jsx
<Input label="Email" required />  // Clear indication
```

## Need Help?

- **Design Tokens**: See `docs/UI_DESIGN_SYSTEM.md`
- **Implementation Guide**: See `docs/UI_UX_IMPLEMENTATION_SUMMARY.md`
- **Component Examples**: Check existing components in `/components`
- **Tailwind Config**: See `tailwind.config.ts` for all available classes





