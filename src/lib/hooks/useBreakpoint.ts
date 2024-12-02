// src/hooks/useBreakpoint.ts
import { useState, useEffect } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

const BREAKPOINTS: Record<Breakpoint, number> = {
  'xs': 320,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
  '3xl': 1920,
  '4xl': 2560,
} as const

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const width = window.innerWidth
      
      // Find the largest breakpoint that's smaller than the current width
      const currentBreakpoint = (Object.entries(BREAKPOINTS) as [Breakpoint, number][])
        .reverse()
        .find(([_, value]) => width >= value)?.[0] || 'xs'

      setBreakpoint(currentBreakpoint)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}