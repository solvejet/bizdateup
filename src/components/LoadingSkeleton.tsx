// src/components/LoadingSkeleton.tsx
import { memo } from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  count?: number
}

export const Skeleton = memo(({ className, count = 1 }: SkeletonProps) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
          className
        )}
      />
    ))}
  </>
))
Skeleton.displayName = 'Skeleton'