// src/components/layout/Header/components/AuthButtons.tsx
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface ButtonProps {
  size?: 'default' | 'large'
}

const buttonClasses = {
  default: {
    login: "text-sm",
    signup: "px-3 py-2 text-sm"
  },
  large: {
    login: "text-base",
    signup: "px-4 py-2.5 text-base"
  }
} as const

export const AuthButtons = memo(function AuthButtons({ size = 'default' }: ButtonProps) {
  return (
    <div 
      className="flex items-center gap-4"
      role="navigation"
      aria-label="Authentication"
    >
      <Link
        to="/login"
        className={cn(
          buttonClasses[size].login,
          "font-semibold leading-6",
          "text-gray-900 dark:text-white",
          "hover:text-gray-600 dark:hover:text-gray-300",
          "transition-colors"
        )}
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className={cn(
          buttonClasses[size].signup,
          "rounded-lg bg-primary",
          "font-semibold text-white",
          "hover:bg-primary/90",
          "transition-colors"
        )}
      >
        Sign up
      </Link>
    </div>
  )
})