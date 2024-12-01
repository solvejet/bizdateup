// src/pages/OfflinePage.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WifiOff, RefreshCcw } from 'lucide-react'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <WifiOff className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          You're offline
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {isOnline
            ? "You're back online! Click refresh to reload the app."
            : "Please check your internet connection and try again."}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}