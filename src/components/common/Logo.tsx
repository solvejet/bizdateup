// src/components/common/Logo.tsx
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { OptimizedImage } from './OptimizedImage'

interface LogoProps {
  variant?: 'default' | 'mobile'
  className?: string
}

export const Logo = memo(function Logo({ 
  variant = 'default',
  className 
}: LogoProps) {
  const isMobile = variant === 'mobile'
  const logoSize = isMobile ? 'h-8' : 'h-10'

  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2",
        className
      )}
      aria-label="BizDateup Home"
    >
      <div className={cn(
        "flex items-center justify-center",
        logoSize,
        "bg-primary text-white rounded",
        "transition-all duration-300"
      )}>
        <span className="font-bold px-2">BD</span>
      </div>
      {!isMobile && (
        <span className={cn(
          "font-semibold text-gray-900 dark:text-white",
          "text-lg md:text-xl lg:text-2xl",
          "transition-all duration-300"
        )}>
          BizDateup
        </span>
      )}
    </Link>
  )
})

Logo.displayName = 'Logo'