// src/components/layout/Header/Header.tsx
import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { navigation } from './Header/navigation/constants'
import { cn } from '@/lib/utils'

// Components
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer'
import { Logo } from './Header/components/Logo'
import { AuthButtons } from './Header/components/AuthButtons'
import { NavigationItem } from './Header/NavigationItem'
import { MegaMenu } from './Header/MegaMenu'
import { MobileMenu } from './Header/MobileMenu'
import { ThemeToggle } from './Header/ThemeToggle'
import HamburgerIcon from './Header/HamburgerIcon'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { breakpoint, width } = useBreakpoint()

  const isMobile = width < 640 // sm breakpoint
  const isTablet = width >= 640 && width < 768 // md breakpoint
  const isDesktop = width >= 768 && width < 1280 // lg and xl breakpoint
  const isLargeScreen = width >= 1280 // 2xl and above

  const memoizedNavigation = useMemo(() => {
    if (isMobile) return navigation.slice(0, 4)
    return navigation
  }, [isMobile])

  const headerHeight = useMemo(() => {
    if (isMobile) return 'h-16' // Increased from h-14
    if (isTablet) return 'h-16'
    if (isDesktop) return 'h-20'
    return 'h-24'
  }, [isMobile, isTablet, isDesktop])

  const logoSize = useMemo(() => {
    if (isMobile) return 'h-8' // Increased from h-6
    if (isTablet) return 'h-8'
    return 'h-10'
  }, [isMobile, isTablet])

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-white/80 dark:bg-gray-900/80",
        "backdrop-blur supports-[backdrop-filter]:bg-white/60",
        "dark:supports-[backdrop-filter]:bg-gray-900/60",
        "border-b border-gray-200 dark:border-gray-800",
        headerHeight
      )}
      role="banner"
    >
      <ResponsiveContainer
        as="nav"
        className={cn(
          "flex items-center justify-between",
          "h-full"
        )}
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Logo isMobile={isMobile} logoSize={logoSize} />
        </div>

        {/* Main Navigation */}
        <nav 
          className={cn(
            "hidden md:flex items-center",
            "mx-8 lg:mx-12 xl:mx-16",
            "gap-x-6 lg:gap-x-8 xl:gap-x-10",
            "flex-1 justify-center"
          )}
        >
          {memoizedNavigation.map((item) => (
            <NavigationItem
              key={item.name}
              item={item}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              size={isLargeScreen ? 'large' : 'default'}
            />
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <ThemeToggle size={isLargeScreen ? 'large' : 'default'} />
          
          {/* Auth Buttons - Only shown on non-mobile */}
          {!isMobile && (
            <>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <AuthButtons size={isLargeScreen ? 'large' : 'default'} />
            </>
          )}
          
          {/* Hamburger - Only shown on mobile */}
          {isMobile && (
            <HamburgerIcon 
              isOpen={mobileMenuOpen} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
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
            onMouseLeave={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <MobileMenu
            items={memoizedNavigation}
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  )
}