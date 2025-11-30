import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Cross-platform compatible redirect function
 * Handles iOS Safari redirection issues
 */
export function safeRedirect(url: string): void {
  // Detect iOS Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  
  if (isIOS && isSafari) {
    // iOS Safari-specific handling
    try {
      // Method 1: Create a temporary form and submit it
      const form = document.createElement('form')
      form.method = 'GET'
      form.action = url
      form.target = '_self'
      form.style.display = 'none'
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
      return
    } catch (error) {
      console.warn('Form submission method failed:', error)
    }
    
    try {
      // Method 2: Create a link and click it
      const link = document.createElement('a')
      link.href = url
      link.target = '_self'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    } catch (error) {
      console.warn('Link click method failed:', error)
    }
  }
  
  // Fallback methods for other browsers or if iOS methods fail
  try {
    window.location.replace(url)
  } catch (error) {
    console.warn('window.location.replace failed:', error)
    try {
      window.location.href = url
    } catch (finalError) {
      console.error('All redirect methods failed:', finalError)
      // Last resort: show user a message
      alert(`Please navigate to: ${url}`)
    }
  }
}

