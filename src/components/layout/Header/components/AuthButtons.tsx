// src/components/layout/Header/components/AuthButtons.tsx
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AuthButtonsProps {
  size?: 'default' | 'large'
}

export const AuthButtons = memo(function AuthButtons({ size = 'default' }: AuthButtonsProps) {
  const textSize = size === 'large' ? 'text-base' : 'text-sm'
  const buttonPadding = size === 'large' ? 'px-4 py-2.5' : 'px-3 py-2'

  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className={cn(
          textSize,
          "font-semibold text-gray-900 dark:text-white",
          "hover:text-gray-600 dark:hover:text-gray-300",
          "transition-colors"
        )}
      >
        Log in
      </Link>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/signup"
          className={cn(
            textSize,
            buttonPadding,
            "rounded-lg bg-primary",
            "font-semibold text-white",
            "hover:bg-primary/90",
            "transition-colors"
          )}
        >
          Sign up
        </Link>
      </motion.div>
    </div>
  )
})