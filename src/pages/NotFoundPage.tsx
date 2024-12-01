// src/pages/NotFoundPage.tsx
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Home, Search } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('404 Error: Page not found')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Error Code and Message */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Page not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Go back
          </motion.button>

          <Link 
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Home className="h-4 w-4" />
            Home page
          </Link>

          <Link 
            to="/help"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Search className="h-4 w-4" />
            Help center
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Popular pages
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-primary hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const popularLinks = [
  { label: 'For Investors', href: '/investor' },
  { label: 'For Startups', href: '/startup' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Events', href: '/events' },
  { label: 'Blog', href: '/blogs' },
]