// src/pages/HomePage.tsx
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/LoadingSkeleton'

// Lazy load hero section for better initial load performance
const HeroSection = lazy(() => 
  import('@/components/home/HeroSection').then(mod => ({ 
    default: mod.HeroSection 
  }))
)

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Skeleton className="h-[60vh] w-full max-w-6xl mx-auto" />
          </div>
        }
      >
        <HeroSection />
      </Suspense>

      {/* Other sections will be added here */}
    </motion.div>
  )
}