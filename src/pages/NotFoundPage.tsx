// src/components/NotFoundPage.tsx
import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ResponsiveContainer } from '../components/layout/ResponsiveContainer'
import { ChevronLeft, Home, Search } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  const popularLinks = useMemo(() => [
    { label: 'For Investors', href: '/investor' },
    { label: 'For Startups', href: '/startup' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blogs' },
  ], [])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('404 Error: Page not found')
    }
  }, [])

  return (
    <ResponsiveContainer>
    <div 
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      role="main"
      aria-labelledby="error-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <h1 
            id="error-title"
            className="text-9xl font-bold text-primary"
            aria-label="Error 404"
          >
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Page not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          role="navigation"
          aria-label="Error page navigation"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            aria-label="Go back to previous page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Go back
          </motion.button>

          <Link 
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Go to home page"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Home page
          </Link>

          <Link 
            to="/help"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Go to help center"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Help center
          </Link>
        </div>

        <nav 
          className="mt-12"
          aria-label="Popular pages"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Popular pages
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-primary hover:underline"
                aria-label={`Visit ${link.label} page`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </motion.div>
    </div>
    </ResponsiveContainer>
  )
}

