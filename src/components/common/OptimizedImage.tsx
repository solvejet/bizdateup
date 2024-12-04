// src/components/common/OptimizedImage.tsx
import { memo, useState } from 'react'
import { cn } from '@/lib/utils'
import { ImageOff } from 'lucide-react'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
}

export const OptimizedImage = memo(function OptimizedImage({ 
  src, 
  alt, 
  width = 48, 
  height = 48,
  className,
  ...props 
}: OptimizedImageProps) {
  const [error, setError] = useState(false)
  
  if (!error && src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setError(true)}
        {...props}
      />
    )
  }

  return (
    <div 
      style={{ width, height }}
      className={cn(
        'flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800',
        className
      )}
      {...props}
    >
      <ImageOff className="w-1/2 h-1/2 text-gray-400" />
    </div>
  )
})