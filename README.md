# Marathon Event Website

A modern Next.js website for marathon event registration, inspired by the Ahmedabad Marathon design.

## Features

- **Home Page**: Hero banner with video carousel, Run4OurSoldiers section, sponsor carousels, and highlights
- **Registration Page**: Complete registration form with OTP verification sidebar
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Fully typed for better development experience
- **Form Templates**: Ready for backend integration

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Embla Carousel

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
marathon-website/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── register/
│   │   └── page.tsx        # Registration page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx         # Footer with contact form
│   ├── HeroBanner.tsx      # Hero video carousel
│   ├── Run4OurSoldiers.tsx # Run4OurSoldiers section
│   ├── SponsorCarousel.tsx # Sponsor carousel component
│   ├── RegistrationSidebar.tsx # OTP verification sidebar
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── OTPInput.tsx
│       └── Carousel.tsx
└── lib/
    └── utils.ts            # Utility functions
```

## Backend Integration

The forms are currently set up with placeholder handlers. To connect to your backend:

1. **Registration Form** (`app/register/page.tsx`):
   - Update the `handleSubmit` function to call your API endpoint
   - Add form validation as needed

2. **OTP Verification** (`components/RegistrationSidebar.tsx`):
   - Update `handleRequestOTP` to call your OTP API
   - Update `handleVerifyOTP` to verify OTP with your backend

3. **Contact Form** (`components/Footer.tsx`):
   - Update the `handleSubmit` function to send data to your API

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    DEFAULT: '#1a1a1a',
    light: '#333333',
  },
  accent: {
    DEFAULT: '#ff6b35',
    dark: '#e55a2b',
  },
}
```

### Content

- Update sponsor images in `app/page.tsx`
- Modify navigation items in `components/Header.tsx`
- Customize form fields in `app/register/page.tsx`

## Build for Production

```bash
npm run build
npm start
```

## License

This project is created for educational purposes.

