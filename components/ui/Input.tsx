import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className={cn('mat-form-field', isFocused && 'focused')}>
        {label && (
          <div className="mb-2">
            <span className="text-sm text-text-primary">{label}</span>
            {required && (
              <span className="align-top text-error text-sm ml-1">*</span>
            )}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'mat-input',
            error && 'error',
            className
          )}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="mat-error">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

