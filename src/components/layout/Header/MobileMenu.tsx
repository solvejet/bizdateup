// src/components/layout/Header/MobileMenu.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveContainer } from '../ResponsiveContainer'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight,
  ChevronLeft, 
  Home,
  Search,
  Bell,
  UserCircle,
  Settings,
  HelpCircle,
  LogIn,
  UserPlus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

interface MobileMenuProps {
  items: NavItem[]
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
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
    hidden: { 
      opacity: 0,
      y: -10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
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
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className={cn(
        "fixed inset-x-0 top-16",
        "h-[calc(100vh-4rem)]",
        "z-50 overflow-hidden",
        "bg-white/80 dark:bg-gray-900/80",
        "backdrop-blur-md"
      )}
    >
      <ResponsiveContainer className="h-full">
        <div className="flex flex-col h-full">
          {/* Quick Links */}
          <div className="py-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="grid grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex flex-col items-center justify-center p-2 rounded-lg text-center text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
                  onClick={onClose}
                >
                  <link.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="py-3 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto py-2">
            {items.map((item) => (
              <div key={item.name}>
                {item.items ? (
                  <button
                    onClick={() => setActiveSubmenu(item.name)}
                    className="flex w-full items-center justify-between p-4 text-gray-900 dark:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg"
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                ) : (
                  <Link
                    to={item.href || '#'}
                    className="flex w-full items-center justify-between p-4 text-gray-900 dark:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg"
                    onClick={onClose}
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Links */}
          <div className="flex-shrink-0 border-t border-gray-200/50 dark:border-gray-700/50">
            {/* Help and Settings */}
            <div className="py-2 space-y-1">
              {bottomLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center gap-3 p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
                  onClick={onClose}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="p-4 space-y-2">
              <Link
                to="/login"
                className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-white/50 dark:hover:bg-gray-800/50"
                onClick={onClose}
              >
                <LogIn className="h-4 w-4" />
                Log in
              </Link>
              <Link
                to="/signup"
                className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90"
                onClick={onClose}
              >
                <UserPlus className="h-4 w-4" />
                Sign up for free
              </Link>
            </div>
          </div>
        </div>

        {/* Submenu */}
        <AnimatePresence>
          {activeSubmenu && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
            >
              <div className="border-b border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="flex items-center gap-2 p-4 text-gray-900 dark:text-white"
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
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 mb-2"
                    onClick={onClose}
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
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
        </AnimatePresence>
      </ResponsiveContainer>
    </motion.div>
  )
}