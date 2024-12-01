// src/App.tsx
import { Suspense, lazy, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { AnimatePresence } from 'framer-motion'
import { SkipLink } from '@/components/SkipLink'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorFallback } from '@/components/common/ErrorFallback'
import { Skeleton } from '@/components/LoadingSkeleton'
import { routes } from '@/routes/routes.config'

// Lazy load pages
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export default function App() {
  const location = useLocation()

  const routeElements = useMemo(() => 
    routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense 
              fallback={
                <div className="container mx-auto px-4 py-8">
                  <Skeleton className="h-[400px]" />
                </div>
              }
            >
              <route.component />
            </Suspense>
          </ErrorBoundary>
        }
      />
    )),
    []
  )

  return (
    <>
      <SkipLink />
      <div className="flex min-h-screen flex-col bg-background">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          <main id="main-content" className="flex-1">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {routeElements}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
    </>
  )
}
