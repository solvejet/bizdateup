// src/components/layout/Header/Header.tsx
import { useState, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { NavigationItem } from './Header/NavigationItem'
import { MegaMenu } from './Header/MegaMenu'
import { MobileMenu } from './Header/MobileMenu'
import { ThemeToggle } from './Header/ThemeToggle'
import HamburgerIcon from './Header/HamburgerIcon'
import { navigation } from './Header/navigation/constants'

const Logo = memo(() => (
  <Link 
    to="/" 
    className="flex h-10 items-center gap-2" // Updated height to match other elements
    aria-label="BizDateup Home"
  >
    <img
      className="h-8 w-auto"
      src="/logo.svg"
      alt=""
    />
    <span className="text-xl font-semibold text-gray-900 dark:text-white">
      BizDateup
    </span>
  </Link>
))
Logo.displayName = 'Logo'

const AuthButtons = memo(() => (
  <div className="flex items-center gap-4">
    <Link
      to="/login"
      className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
    >
      Log in
    </Link>
    <Link
      to="/signup"
      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
    >
      Sign up
    </Link>
  </div>
))
AuthButtons.displayName = 'AuthButtons'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleMenuChange = useCallback((menuName: string | null) => {
    setActiveMenu(menuName)
  }, [])

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleHamburgerClick = useCallback(() => {
    setActiveMenu(null)
    setMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Global"
        >
          {/* Left section - Logo */}
          <div className="flex lg:flex-1">
            <Logo />
          </div>
          
          {/* Mobile menu button and theme toggle */}
          <div className="flex h-10 items-center gap-4 lg:hidden"> {/* Added fixed height */}
            <ThemeToggle />
            <HamburgerIcon 
              isOpen={mobileMenuOpen} 
              onClick={handleHamburgerClick}
            />
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <NavigationItem
                key={item.name}
                item={item}
                activeMenu={activeMenu}
                setActiveMenu={handleMenuChange}
              />
            ))}
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
            <ThemeToggle />
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
            <AuthButtons />
          </div>
        </nav>

        {/* Mega menu */}
        <AnimatePresence>
          {activeMenu && (
            <MegaMenu
              activeMenu={activeMenu}
              items={navigation}
              onMouseLeave={() => handleMenuChange(null)}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            items={navigation}
            isOpen={mobileMenuOpen}
            onClose={handleMobileMenuClose}
          />
        )}
      </AnimatePresence>
    </>
  )
}