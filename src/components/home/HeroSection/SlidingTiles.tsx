import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { StartupCard } from './cards/StartupCard'
import { InvestorCard } from './cards/InvestorCard'
import { startupData, investorData } from '../cards/data'
import { cn } from '@/lib/utils'

interface ScrollColumnProps<T> {
  data: T[]
  renderItem: (item: T) => JSX.Element
  direction?: 'up' | 'down'
  speed?: number
  className?: string
}

function ScrollColumn<T>({ 
  data, 
  renderItem, 
  direction = 'up', 
  speed = 20,
  className 
}: ScrollColumnProps<T>) {
  const columnRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Create copies of data for seamless loop
  const items = useMemo(() => [...data, ...data, ...data, ...data], [data])

  useEffect(() => {
    if (!columnRef.current) return

    const container = columnRef.current
    const content = container.firstElementChild as HTMLElement
    
    if (!content) return

    setContentHeight(content.offsetHeight / 4) // Divide by 4 since we quadrupled the items
  }, [])

  useEffect(() => {
    let animationId: number
    let startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const delta = (speed * elapsed) / 1000

      let newScrollY = direction === 'up' 
        ? scrollY + delta 
        : scrollY - delta

      // Reset scroll position seamlessly
      if (newScrollY >= contentHeight) {
        newScrollY = 0
      } else if (newScrollY <= 0) {
        newScrollY = contentHeight
      }

      setScrollY(newScrollY)
      startTime = currentTime
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [scrollY, contentHeight, direction, speed])

  return (
    <div 
      ref={columnRef}
      className={cn(
        "relative h-full overflow-hidden",
        className
      )}
    >
      <motion.div
        style={{ 
          y: -scrollY,
          transition: 'none'
        }}
        className="space-y-4"
      >
        {items.map((item, index) => (
          <div key={index} className="px-4">
            {renderItem(item)}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function SlidingTiles() {
  const { isAtLeast } = useBreakpoint()
  const isMobile = !isAtLeast('lg')

  const renderStartup = useCallback((item: typeof startupData[0]) => (
    <StartupCard data={item} />
  ), [])

  const renderInvestor = useCallback((item: typeof investorData[0]) => (
    <InvestorCard data={item} />
  ), [])

  const combinedData = useMemo(() => 
    startupData.map((startup, index) => [
      { type: 'startup' as const, data: startup },
      { type: 'investor' as const, data: investorData[index]! }
    ]).flat()
  , [])

  // Add CSS to hide scrollbar
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  if (isMobile) {
    return (
      <div className="h-[600px] w-full hide-scrollbar">
        <ScrollColumn
          data={combinedData}
          renderItem={(item) => 
            item.type === 'startup' 
              ? renderStartup(item.data)
              : renderInvestor(item.data)
          }
          direction="up"
          speed={15}
          className="w-full hide-scrollbar"
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-8 h-[600px]">
      <ScrollColumn
        data={startupData}
        renderItem={renderStartup}
        direction="up"
        speed={20}
        className="w-full hide-scrollbar"
      />
      <ScrollColumn
        data={investorData}
        renderItem={renderInvestor}
        direction="down"
        speed={25}
        className="w-full hide-scrollbar"
      />
    </div>
  )
}

export default SlidingTiles;