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
    <>
      {/* Backdrop - only handles visual effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 top-16 z-40 backdrop-blur-sm"
      />

      {/* Menu Container */}
      <motion.aside
        ref={containerRef}
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-y-0 right-0 top-16 w-full max-w-sm z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
      >
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          {/* Quick Links Section */}
          <div className="px-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 text-center"
                >
                  <link.icon className="h-6 w-6 mb-1 text-gray-600 dark:text-gray-300" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-2 overflow-y-auto">
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.name} className="mb-2">
                  {item.items ? (
                    <button
                      onClick={() => setActiveSubmenu(item.name)}
                      className="flex w-full items-center justify-between p-3 rounded-lg text-gray-900 dark:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ) : (
                    <Link
                      to={item.href || '#'}
                      className="flex w-full items-center justify-between p-3 rounded-lg text-gray-900 dark:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom Links */}
          <div className="px-4 py-2 border-t border-gray-200/50 dark:border-gray-700/50">
            {bottomLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-3 p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="px-4 py-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="space-y-3">
              <Link
                to="/login"
                className="flex w-full items-center justify-center px-4 py-2.5 rounded-lg border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="flex w-full items-center justify-center px-4 py-2.5 rounded-lg bg-primary/90 text-white hover:bg-primary transition-colors"
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
            className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-70"
          >
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => setActiveSubmenu(null)}
                className="flex items-center gap-2 w-full p-4"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium">{activeSubmenu}</span>
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto">
              {activeItems?.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 mb-2 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
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
    </>
  )
}