// src/hooks/useEventListener.ts
import { useEffect, useRef } from 'react'

type EventHandler<T> = (event: T) => void

export function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  handler: EventHandler<WindowEventMap[K]>,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventType: K,
  handler: EventHandler<HTMLElementEventMap[K]>,
  element: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener<K extends keyof WindowEventMap | keyof HTMLElementEventMap>(
  eventType: K,
  handler: EventHandler<any>,
  element?: React.RefObject<HTMLElement>,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = element?.current || window
    const isSupported = targetElement && targetElement.addEventListener

    if (!isSupported) return

    const eventListener: typeof handler = (event) => savedHandler.current(event)
    targetElement.addEventListener(eventType, eventListener, options)

    return () => {
      targetElement.removeEventListener(eventType, eventListener, options)
    }
  }, [eventType, element, options])
}
