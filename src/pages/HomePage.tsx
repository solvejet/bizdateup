// src/pages/HomePage.tsx
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/LoadingSkeleton'

const HeroSection = lazy(() => 
  import('@/components/home/HeroSection').then(mod => ({ 
    default: mod.HeroSection 
  }))
)

const FundedStartupsSection = lazy(() => 
  import('@/components/home/FundedStartups').then(mod => ({ 
    default: mod.FundedStartupsSection 
  }))
)

const InvestmentGrowthSection = lazy(() => 
  import('@/components/home/InvestmentGrowth').then(mod => ({ 
    default: mod.InvestmentGrowthSection 
  }))
)

const InvestorsSection = lazy(() => 
  import('@/components/home/InvestorsSection').then(mod => ({ 
    default: mod.InvestorsSection 
  }))
)

const WhyInvestSection = lazy(() => 
  import('@/components/home/WhyInvest').then(mod => ({ 
    default: mod.WhyInvestSection 
  }))
)

const HowItWorksSection = lazy(() => 
  import('@/components/home/HowItWorksSection')
)

const SuccessStoriesSection = lazy(() => 
  import('@/components/home/SuccessStories')
)

const FAQSection = lazy(() => 
  import('@/components/home/FAQ').then(mod => ({ 
    default: mod.default 
  }))
)

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Skeleton className="h-[60vh] w-full max-w-6xl mx-auto" />
          </div>
        }
      >
        <HeroSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-6xl mx-auto px-4">
              <Skeleton className="h-[40vh]" />
            </div>
          </div>
        }
      >
        <FundedStartupsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-6xl mx-auto px-4">
              <Skeleton className="h-[40vh]" />
            </div>
          </div>
        }
      >
        <InvestorsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-6xl mx-auto px-4">
              <Skeleton className="h-[40vh]" />
            </div>
          </div>
        }
      >
        <InvestmentGrowthSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-6xl mx-auto px-4">
              <Skeleton className="h-[40vh]" />
            </div>
          </div>
        }
      >
        <WhyInvestSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-6xl mx-auto px-4">
              <Skeleton className="h-[40vh]" />
            </div>
          </div>
        }
      >
        <HowItWorksSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-6xl mx-auto px-4">
              <Skeleton className="h-[40vh]" />
            </div>
          </div>
        }
      >
        <SuccessStoriesSection  />
      </Suspense>

      <Suspense
  fallback={
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Skeleton className="h-[40vh]" />
      </div>
    </div>
  }
>
  <FAQSection />
</Suspense>
      
    </motion.div>
  )
}