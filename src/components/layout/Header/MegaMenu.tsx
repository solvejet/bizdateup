// src/components/layout/Header/MegaMenu.tsx
import { memo, useRef, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ResponsiveContainer } from '../ResponsiveContainer'
import { useEventListener } from '@/hooks/useEventListener'
import type { NavItem, SubNavItem } from '@/types'

interface MegaMenuProps {
  activeMenu: string | null
  items: NavItem[]
  onMouseLeave: () => void
}

interface MenuGridItemProps {
  item: SubNavItem
  onClose: () => void
}

const MenuGridItem = memo(({ item, onClose }: MenuGridItemProps) => (
  <Link
    to={item.href}
    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    role="menuitem"
    onClick={onClose}
  >
    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-800 dark:group-hover:bg-gray-700 transition-colors">
      <item.icon
        className="h-6 w-6 text-gray-600 group-hover:text-primary dark:text-gray-400"
        aria-hidden="true"
      />
    </div>
    <div>
      <div className="font-semibold text-gray-900 dark:text-gray-100">
        {item.name}
        <span className="absolute inset-0" />
      </div>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {item.description}
      </p>
    </div>
  </Link>
))
MenuGridItem.displayName = 'MenuGridItem'

export const MegaMenu = memo(function MegaMenu({
  activeMenu,
  items,
  onMouseLeave
}: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const activeItems = useMemo(() => 
    items.find(item => item.name === activeMenu)?.items,
    [items, activeMenu]
  )
  
  // Handle escape key
  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      onMouseLeave()
    }
  })

  // Focus trap implementation
  useEffect(() => {
    if (!menuRef.current || !activeMenu) return

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
    
      const focusableElements = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      ) || [])
      
      if (focusableElements.length === 0) return
      
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
    
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    // Focus first element after menu opens
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [activeMenu])

  // Handle arrow key navigation
  useEffect(() => {
    if (!menuRef.current || !activeMenu) return

    const handleArrowKeys = (e: KeyboardEvent) => {
      const focusableElements = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('a[href]') || []
      )
      const currentIndex = focusableElements.findIndex(
        el => el === document.activeElement
      )
      
      let nextIndex = currentIndex
      const columns = 3 // Number of columns in the grid

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          nextIndex = Math.max(0, currentIndex - columns)
          break
        case 'ArrowDown':
          e.preventDefault()
          nextIndex = Math.min(
            focusableElements.length - 1,
            currentIndex + columns
          )
          break
        case 'ArrowLeft':
          e.preventDefault()
          nextIndex = Math.max(0, currentIndex - 1)
          break
        case 'ArrowRight':
          e.preventDefault()
          nextIndex = Math.min(
            focusableElements.length - 1,
            currentIndex + 1
          )
          break
        default:
          return
      }

      focusableElements[nextIndex]?.focus()
    }

    document.addEventListener('keydown', handleArrowKeys)
    return () => document.removeEventListener('keydown', handleArrowKeys)
  }, [activeMenu])

  if (!activeItems) return null

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 z-50 bg-white shadow-lg dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      onMouseLeave={onMouseLeave}
      role="menu"
      aria-orientation="horizontal"
      aria-labelledby={`${activeMenu?.toLowerCase()}-button`}
    >
      <ResponsiveContainer>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeItems.map((item) => (
            <MenuGridItem 
              key={item.name} 
              item={item} 
              onClose={onMouseLeave} 
            />
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-50 shadow-lg pointer-events-none"
        aria-hidden="true"
      />
      </ResponsiveContainer>
    </motion.div>
  )
})

MegaMenu.displayName = 'MegaMenu'