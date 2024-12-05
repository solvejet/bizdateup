// src/components/common/Logo.tsx
import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'default' | 'mobile'
  className?: string
}

export const Logo = memo(function Logo({ 
  variant = 'default',
  className 
}: LogoProps) {
  const [imageError, setImageError] = useState(false)
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
      {!imageError ? (
        <img
          src="/logo.svg" 
          alt="BizDateup"
          className={cn(
            "w-auto object-contain",
            logoSize,
            "transition-all duration-300"
          )}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={cn(
          "flex items-center justify-center",
          logoSize,
          "bg-primary text-white rounded",
          "transition-all duration-300"
        )}>
          <span className={cn(
            "font-semibold",
            isMobile ? "text-sm px-2" : "text-lg px-3"
          )}>
            BizDateup
          </span>
        </div>
      )}
    </Link>
  )
})

Logo.displayName = 'Logo'