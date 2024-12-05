// src/components/layout/Header/Header.tsx
import { memo, useState, useMemo, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { navigation } from './Header/navigation/constants'
import { cn } from '@/lib/utils'

// Update Logo import to use common component
import { Logo } from '@/components/common/Logo'
import { AuthButtons } from './Header/components/AuthButtons'
import { NavigationItem } from './Header/NavigationItem'
import { MegaMenu } from './Header/MegaMenu'
import { MobileMenu } from './Header/MobileMenu'
import { ThemeToggle } from './Header/ThemeToggle'
import { ResponsiveContainer } from './ResponsiveContainer'
import HamburgerIcon from './Header/HamburgerIcon'

interface HeaderProps {
  className?: string
}

const MemoizedNavigationItem = memo(NavigationItem)
const MemoizedAuthButtons = memo(AuthButtons)
const MemoizedThemeToggle = memo(ThemeToggle)
const MemoizedHamburgerIcon = memo(HamburgerIcon)

export const Header = memo(function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { width } = useBreakpoint()

  const isMobile = width < 640
  const isTablet = width >= 640 && width < 768
  const isDesktop = width >= 768 && width < 1280
  const isLargeScreen = width >= 1280

  const memoizedNavigation = useMemo(() => {
    return isMobile ? navigation.slice(0, 4) : navigation
  }, [isMobile])

  const headerHeight = useMemo(() => {
    if (isMobile) return 'h-16'
    if (isTablet) return 'h-16'
    if (isDesktop) return 'h-20'
    return 'h-24'
  }, [isMobile, isTablet, isDesktop])

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleActiveMenuChange = useCallback((menuName: string | null) => {
    setActiveMenu(menuName)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-white/80 dark:bg-gray-900/80",
        "backdrop-blur supports-[backdrop-filter]:bg-white/60",
        "dark:supports-[backdrop-filter]:bg-gray-900/60",
        "border-b border-gray-200 dark:border-gray-800",
        headerHeight,
        className
      )}
      role="banner"
    >
      <ResponsiveContainer
        as="nav"
        className="flex items-center justify-between h-full"
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Logo variant={isMobile ? 'mobile' : 'default'} />
        </div>

        {/* Main Navigation */}
        <nav className={cn(
          "hidden md:flex items-center",
          "mx-8 lg:mx-12 xl:mx-16",
          "gap-x-6 lg:gap-x-8 xl:gap-x-10",
          "flex-1 justify-center"
        )}>
          {memoizedNavigation.map((item) => (
            <MemoizedNavigationItem
              key={item.name}
              item={item}
              activeMenu={activeMenu}
              setActiveMenu={handleActiveMenuChange}
              size={isLargeScreen ? 'large' : 'default'}
            />
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <MemoizedThemeToggle />
          
          {!isMobile && (
            <>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <MemoizedAuthButtons size={isLargeScreen ? 'large' : 'default'} />
            </>
          )}
          
          {isMobile && (
            <MemoizedHamburgerIcon 
              isOpen={mobileMenuOpen} 
              onClick={handleMobileMenuToggle}
            />
          )}
        </div>
      </ResponsiveContainer>

      {/* Mega Menu */}
      <AnimatePresence>
        {activeMenu && !isMobile && (
          <MegaMenu
            activeMenu={activeMenu}
            items={memoizedNavigation}
            onMouseLeave={() => handleActiveMenuChange(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <MobileMenu
            items={memoizedNavigation}
            isOpen={mobileMenuOpen}
            onClose={handleMenuClose}
          />
        )}
      </AnimatePresence>
    </header>
  )
})