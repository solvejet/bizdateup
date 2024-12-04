// src/components/layout/Header/NavigationItem.tsx
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

interface NavigationItemProps {
  item: NavItem
  activeMenu: string | null
  setActiveMenu: (menu: string | null) => void
  size?: 'default' | 'large'
}

export const NavigationItem = memo(function NavigationItem({ 
  item, 
  activeMenu, 
  setActiveMenu,
  size = 'default'
}: NavigationItemProps) {
  const textSize = size === 'large' ? 'text-lg' : 'text-base'

  if (!item.items) {
    return (
      <Link
        to={item.href || '#'}
        className={cn(
          textSize,
          "font-semibold leading-6",
          "text-gray-900 hover:text-primary transition-colors",
          "dark:text-gray-100"
        )}
      >
        {item.name}
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveMenu(item.name)}
      role="button"
      tabIndex={0}
      id={`${item.name}-button`}
      aria-expanded={activeMenu === item.name}
      aria-haspopup="true"
    >
      <button
        className={cn(
          "inline-flex items-center gap-x-2",
          textSize,
          "font-semibold leading-6",
          "text-gray-900 hover:text-primary transition-colors",
          "dark:text-gray-100"
        )}
        aria-expanded={activeMenu === item.name}
      >
        {item.name}
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            activeMenu === item.name && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  )
})