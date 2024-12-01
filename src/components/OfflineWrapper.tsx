// src/components/OfflineWrapper.tsx
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { toast } from 'sonner'
import { useEffect, ReactNode } from 'react'

interface OfflineWrapperProps {
  children: ReactNode
}

export function OfflineWrapper({ children }: OfflineWrapperProps) {
  const { isOnline, hasOfflineCapability } = useOnlineStatus()

  useEffect(() => {
    if (!isOnline) {
      toast.error('You are offline. Some features may be limited.')
    }
    if (isOnline && hasOfflineCapability) {
      toast.success('Content synced and available offline')
    }
  }, [isOnline, hasOfflineCapability])

  return <>{children}</>
}