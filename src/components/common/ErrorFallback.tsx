// src/components/common/ErrorFallback.tsx
import { memo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export const ErrorFallback = memo(({
  error,
  resetErrorBoundary
}: ErrorFallbackProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    // Log error to your error tracking service
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 text-center"
      >
        <div className="flex justify-center">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetErrorBoundary}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-2 font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <Home className="h-4 w-4" />
            Go home
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
})

ErrorFallback.displayName = 'ErrorFallback'