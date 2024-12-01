// src/components/common/Logo.tsx
import { Link } from 'react-router-dom'
import { OptimizedImage } from '@/components/common/OptimizedImage'

export function Logo() {
  return (
    <Link 
      to="/" 
      className="-m-1.5 p-1.5 flex items-center gap-2"
      aria-label="BizDateup Home"
    >
      <OptimizedImage
        src="/logo.svg"
        alt="BizDateup"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-xl font-semibold text-gray-900 dark:text-white">
        BizDateup
      </span>
    </Link>
  )
}