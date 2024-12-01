// src/App.tsx
import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { AnimatePresence } from 'framer-motion'
import { OfflineWrapper } from '@/components/OfflineWrapper'
import { InstallPrompt } from '@/components/InstallPrompt'
import { SkipLink } from '@/components/SkipLink'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ErrorFallback } from '@/components/common/ErrorFallback'
import { Skeleton } from '@/components/LoadingSkeleton'
import NotFoundPage from '@/pages/NotFoundPage'
import { routes } from '@/routes/routes.config'

const OfflinePage = lazy(() => import('@/pages/OfflinePage'))

export default function App() {
  const location = useLocation()

  return (
    <OfflineWrapper>
      <SkipLink />
      <div className="flex min-h-screen flex-col bg-background">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          <main id="main-content" className="flex-1">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {routes.map((route) => (
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
                ))}
                <Route path="/offline" element={<OfflinePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
      <InstallPrompt />
    </OfflineWrapper>
  )
}