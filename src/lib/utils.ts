// src/lib/utils.ts
import { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { clsx } from "clsx"

/**
 * Merges multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Type-safe way to access breakpoint values
 */
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
  "4xl": 2560,
} as const

/**
 * Helper to check if we're on the client side
 */
export const isClient = typeof window !== 'undefined'

/**
 * Helper to get the current breakpoint
 */
export function getCurrentBreakpoint(): keyof typeof breakpoints | null {
  if (!isClient) return null
  
  const width = window.innerWidth
  
  if (width >= breakpoints["4xl"]) return "4xl"
  if (width >= breakpoints["3xl"]) return "3xl"
  if (width >= breakpoints["2xl"]) return "2xl"
  if (width >= breakpoints.xl) return "xl"
  if (width >= breakpoints.lg) return "lg"
  if (width >= breakpoints.md) return "md"
  if (width >= breakpoints.sm) return "sm"
  return "xs"
}

/**
 * Helper to check if the device is touch-enabled
 */
export function isTouchDevice(): boolean {
  if (!isClient) return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Helper to check if the device is in dark mode
 */
export function isDarkMode(): boolean {
  if (!isClient) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Format class names conditionally
 */
export function formatClassNames(
  baseClasses: string,
  conditionalClasses: Record<string, boolean>
): string {
  return cn(
    baseClasses,
    Object.entries(conditionalClasses)
      .filter(([, condition]) => condition)
      .map(([className]) => className)
      .join(' ')
  )
}

/**
 * Get safe area insets
 */
export function getSafeAreaInsets() {
  if (!isClient) return { top: 0, right: 0, bottom: 0, left: 0 }
  
  const computedStyle = getComputedStyle(document.documentElement)
  
  return {
    top: parseInt(computedStyle.getPropertyValue('--sat') || '0'),
    right: parseInt(computedStyle.getPropertyValue('--sar') || '0'),
    bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0'),
    left: parseInt(computedStyle.getPropertyValue('--sal') || '0'),
  }
}

/**
 * Helper for responsive font sizes
 */
export function getResponsiveFontSize(
  base: number,
  options: {
    min?: number
    max?: number
    scaleBy?: number
  } = {}
): string {
  const { min = base * 0.75, max = base * 1.5, scaleBy = 1 } = options
  
  return `clamp(${min}px, ${base}px + ${scaleBy}vw, ${max}px)`
}

/**
 * Helper for responsive spacing
 */
export function getResponsiveSpacing(
  base: number,
  options: {
    min?: number
    max?: number
    scaleBy?: number
  } = {}
): string {
  const { min = base * 0.5, max = base * 2, scaleBy = 1 } = options
  
  return `clamp(${min}px, ${base}px + ${scaleBy}vw, ${max}px)`
}

/**
 * Type-safe color variants
 */
export const colorVariants = {
  primary: {
    light: 'text-primary-50 bg-primary-900',
    dark: 'text-primary-900 bg-primary-50',
  },
  secondary: {
    light: 'text-secondary-50 bg-secondary-900',
    dark: 'text-secondary-900 bg-secondary-50',
  },
} as const

export type ColorVariant = keyof typeof colorVariants
export type ColorScheme = keyof (typeof colorVariants)[ColorVariant]

/**
 * Helper to apply color variants
 */
export function getColorVariant(
  variant: ColorVariant,
  scheme: ColorScheme
): string {
  return colorVariants[variant][scheme]
}

/**
 * Format number as currency
 */
export function formatCurrency(value: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format number with abbreviated suffix (K, M, B)
 */
export function formatNumber(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`
  }
  return value.toString()
}

/**
 * Format date relative to now
 */
export function formatRelativeDate(date: Date | string): string {
  const now = new Date()
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`
  
  return targetDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Debounce function with proper typing
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function with proper typing
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastFunc: NodeJS.Timeout
  let lastRan: number

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      lastRan = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args)
          lastRan = Date.now()
        }
      }, Math.max(limit - (Date.now() - lastRan), 0))
    }
  }
}