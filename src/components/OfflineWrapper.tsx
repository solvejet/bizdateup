// src/components/OfflineWrapper.tsx
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { toast } from 'sonner'
import { useEffect, ReactNode } from 'react'

export function OfflineWrapper({ children }: { children: ReactNode }) {
  const { isOnline } = useOnlineStatus()

  useEffect(() => {
    if (!isOnline) {
      toast.error('You are offline. Some features may be limited.')
    }
  }, [isOnline])

  return <>{children}</>
}