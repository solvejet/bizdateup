// src/lib/utils.ts
import { type ClassNameValue, twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"

/**
 * Merges multiple class names using clsx and tailwind-merge
 * More powerful version of the original cn function
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
      .filter(([_, condition]) => condition)
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