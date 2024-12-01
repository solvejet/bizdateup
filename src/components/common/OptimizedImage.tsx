// src/components/common/OptimizedImage.tsx
import { memo } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  className
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = `/api/placeholder/${width}/${height}`;
      }}
    />
  )
})

OptimizedImage.displayName = 'OptimizedImage'