import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'success' | 'error' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'mat-button',
          {
            'mat-button-primary': variant === 'primary',
            'mat-button-outline': variant === 'outline',
            'mat-button-success': variant === 'success',
            'mat-button-error': variant === 'error',
            'hover:bg-gray-100': variant === 'ghost',
            'h-8 px-3 text-xs': size === 'sm',
            'px-6 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

