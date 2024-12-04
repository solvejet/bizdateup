import { type ElementType } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveContainerProps<T extends ElementType> {
  as?: T
  children: React.ReactNode
  className?: string
}

export function ResponsiveContainer<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: ResponsiveContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ResponsiveContainerProps<T>>) {
  const Component = as || 'div'

  return (
    <Component
      className={cn(
        // Base styles
        "w-full mx-auto",
        // Increased responsive padding
        "px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-40",
        // Container constraints
        "max-w-[320px] xs:max-w-none",
        "sm:max-w-[640px]",
        "md:max-w-[768px]",
        "lg:max-w-[1024px]",
        "xl:max-w-[1280px]",
        "2xl:max-w-[1536px]",
        "3xl:max-w-[1920px]",
        "4xl:max-w-[2560px]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}