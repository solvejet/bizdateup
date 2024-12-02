// src/components/layout/Header/components/Logo.tsx
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  isMobile: boolean
  logoSize: string
}

export const Logo = memo(function Logo({ isMobile, logoSize }: LogoProps) {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2"
      aria-label="BizDateup Home"
    >
      {/* Debug elements */}
      <div className={cn(
        "flex items-center justify-center",
        logoSize,
        "bg-primary text-white rounded",
        "transition-all duration-300"
      )}>
        {/* Temporary text logo for testing */}
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