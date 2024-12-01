// src/lib/hooks/useKeyboard.ts
import { useEffect, useCallback } from 'react'

export function useKeyboard(
  handleEscape?: () => void,
  handleTab?: (event: KeyboardEvent) => void,
  handleArrow?: (direction: 'up' | 'down' | 'left' | 'right') => void
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handleEscape?.()
          break
        case 'Tab':
          handleTab?.(event)
          break
        case 'ArrowUp':
          event.preventDefault()
          handleArrow?.('up')
          break
        case 'ArrowDown':
          event.preventDefault()
          handleArrow?.('down')
          break
        case 'ArrowLeft':
          handleArrow?.('left')
          break
        case 'ArrowRight':
          handleArrow?.('right')
          break
      }
    },
    [handleEscape, handleTab, handleArrow]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}