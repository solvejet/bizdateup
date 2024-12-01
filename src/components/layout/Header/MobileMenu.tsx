// src/components/layout/Header/MobileMenu.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronLeft,
  Home,
  Search,
  Bell,
  UserCircle,
  Settings,
  HelpCircle
} from 'lucide-react'
import { useFocusTrap } from '@/lib/hooks/useFocus'
import type { NavItem } from '@/types'

interface MobileMenuProps {
  items: NavItem[]
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
  const containerRef = useFocusTrap(isOpen)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const activeItems = items.find(item => item.name === activeSubmenu)?.items

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      x: '100%',
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  }

  const quickLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Profile', href: '/profile', icon: UserCircle },
  ]

  const bottomLinks = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help & Support', href: '/help', icon: HelpCircle },
  ]

  return (
    <motion.aside
      ref={containerRef}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-y-0 right-0 top-16 w-screen z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg overflow-hidden flex flex-col"
    >
      <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
        {/* Quick Links Section */}
        <div className="px-4 py-4 flex-shrink-0">
          <div className="grid grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex flex-col items-center justify-center p-2 rounded-lg text-center transition-colors hover:text-primary"
                onClick={onClose}
              >
                <link.icon className="h-6 w-6 mb-1 text-gray-600 dark:text-gray-300" />
                <span className="text-xs text-gray-600 dark:text-gray-300">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-4 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                bg-transparent transition-all duration-200
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Main Navigation - Scrollable Area */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          <div className="space-y-1">
            {items.map((item) => (
              <div key={item.name} className="mb-2">
                {item.items ? (
                  <button
                    onClick={() => setActiveSubmenu(item.name)}
                    className="flex w-full items-center justify-between p-3 rounded-lg text-gray-900 dark:text-white transition-colors hover:text-primary"
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                ) : (
                  <Link
                    to={item.href || '#'}
                    className="flex w-full items-center justify-between p-3 rounded-lg text-gray-900 dark:text-white transition-colors hover:text-primary"
                    onClick={onClose}
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Bottom Fixed Section */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200/50 dark:border-gray-700/50">
          {/* Help and Settings */}
          <div className="space-y-3 mb-4">
            {bottomLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-3 p-3 rounded-lg text-gray-600 dark:text-gray-300 transition-colors hover:text-primary"
                onClick={onClose}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="space-y-3 pb-safe">
            <Link
              to="/login"
              className="flex w-full items-center justify-center px-4 py-2.5 rounded-lg 
                border border-gray-300 dark:border-gray-600 
                text-gray-900 dark:text-white 
                transition-colors hover:text-primary hover:border-primary"
              onClick={onClose}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="flex w-full items-center justify-center px-4 py-2.5 rounded-lg 
                bg-primary text-white 
                transition-colors hover:bg-primary/90"
              onClick={onClose}
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>

      {/* Submenu */}
      {activeSubmenu && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-70"
        >
          <div className="sticky top-0 z-10 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={() => setActiveSubmenu(null)}
              className="flex items-center gap-2 w-full p-4 hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">{activeSubmenu}</span>
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto h-[calc(100vh-8rem)]">
            {activeItems?.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-4 p-4 rounded-lg transition-colors hover:text-primary mb-2"
                onClick={onClose}
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.aside>
  )
}