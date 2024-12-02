// src/hooks/useBreakpoint.ts
import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@/lib/constants/breakpoints'

type Breakpoint = keyof typeof BREAKPOINTS

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs')
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWidth(width)

      if (width >= parseInt(BREAKPOINTS['4xl'])) {
        setBreakpoint('4xl')
      } else if (width >= parseInt(BREAKPOINTS['3xl'])) {
        setBreakpoint('3xl')
      } else if (width >= parseInt(BREAKPOINTS['2xl'])) {
        setBreakpoint('2xl')
      } else if (width >= parseInt(BREAKPOINTS['xl'])) {
        setBreakpoint('xl')
      } else if (width >= parseInt(BREAKPOINTS['lg'])) {
        setBreakpoint('lg')
      } else if (width >= parseInt(BREAKPOINTS['md'])) {
        setBreakpoint('md')
      } else if (width >= parseInt(BREAKPOINTS['sm'])) {
        setBreakpoint('sm')
      } else {
        setBreakpoint('xs')
      }
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { breakpoint, width }
}