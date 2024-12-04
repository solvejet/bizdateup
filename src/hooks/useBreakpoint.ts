import { useState, useEffect, useCallback } from 'react'

// Define breakpoint sizes in pixels
export const BREAKPOINTS = {
  'xs': 320,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
  '3xl': 1920,
  '4xl': 2560,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

interface UseBreakpointReturn {
  breakpoint: Breakpoint
  width: number
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  is2xl: boolean
  is3xl: boolean
  is4xl: boolean
  isAtLeast: (size: Breakpoint) => boolean
  isAtMost: (size: Breakpoint) => boolean
}

/**
 * A hook that provides the current viewport breakpoint and related utilities.
 * @returns {UseBreakpointReturn} An object containing the current breakpoint, width, and utility functions.
 */
export function useBreakpoint(): UseBreakpointReturn {
  // Initialize with default values
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs')
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  /**
   * Determines the current breakpoint based on window width
   */
  const getBreakpoint = useCallback((width: number): Breakpoint => {
    if (width >= BREAKPOINTS['4xl']) return '4xl'
    if (width >= BREAKPOINTS['3xl']) return '3xl'
    if (width >= BREAKPOINTS['2xl']) return '2xl'
    if (width >= BREAKPOINTS.xl) return 'xl'
    if (width >= BREAKPOINTS.lg) return 'lg'
    if (width >= BREAKPOINTS.md) return 'md'
    if (width >= BREAKPOINTS.sm) return 'sm'
    return 'xs'
  }, [])

  /**
   * Handles window resize events and updates the breakpoint state
   */
  const handleResize = useCallback(() => {
    const newWidth = window.innerWidth
    setWidth(newWidth)
    setBreakpoint(getBreakpoint(newWidth))
  }, [getBreakpoint])

  useEffect(() => {
    // Set initial values
    handleResize()

    // Add event listener with passive flag for better performance
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  /**
   * Checks if the current width is greater than or equal to a given breakpoint
   */
  const isAtLeast = useCallback(
    (size: Breakpoint) => width >= BREAKPOINTS[size],
    [width]
  )

  /**
   * Checks if the current width is less than or equal to a given breakpoint
   */
  const isAtMost = useCallback(
    (size: Breakpoint) => width <= BREAKPOINTS[size],
    [width]
  )

  return {
    breakpoint,
    width,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2xl: breakpoint === '2xl',
    is3xl: breakpoint === '3xl',
    is4xl: breakpoint === '4xl',
    isAtLeast,
    isAtMost,
  }
}

// Example usage:
/*
const MyComponent = () => {
  const { 
    breakpoint, 
    width, 
    isLg,
    isAtLeast,
    isAtMost 
  } = useBreakpoint()

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      <p>Window width: {width}px</p>
      <p>Is large screen: {isLg ? 'Yes' : 'No'}</p>
      <p>Is at least medium: {isAtLeast('md') ? 'Yes' : 'No'}</p>
      <p>Is at most large: {isAtMost('lg') ? 'Yes' : 'No'}</p>
    </div>
  )
}
*/