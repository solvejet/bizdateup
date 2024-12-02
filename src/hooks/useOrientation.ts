// src/hooks/useOrientation.ts
import { useState, useEffect } from 'react'

type Orientation = 'portrait' | 'landscape'

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>('portrait')

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setOrientation('portrait')
      } else {
        setOrientation('landscape')
      }
    }

    // Set initial orientation
    handleOrientationChange()

    // Add listeners
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)

    // Clean up
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
    }
  }, [])

  return orientation
}