// src/components/InstallPrompt.tsx
import { useEffect, useState } from 'react'
import { X, Download, Smartphone, Laptop } from 'lucide-react'
import { toast } from 'sonner'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    // Check if user has already seen or dismissed the prompt
    const hasSeenPrompt = localStorage.getItem('pwaPromptSeen')
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt only if user hasn't seen it before
      if (!hasSeenPrompt) {
        setShowInstallBanner(true)
        localStorage.setItem('pwaPromptSeen', 'true')
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        toast.success('Thanks for installing our app!')
      }
      
      setDeferredPrompt(null)
      setShowInstallBanner(false)
    } catch (error) {
      console.error('Error installing PWA:', error)
    }
  }

  if (!showInstallBanner) return null

  return (
    <div className="fixed bottom-0 inset-x-0 pb-safe z-50">
      <div className="mx-auto max-w-md p-4 m-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? (
            <Smartphone className="h-6 w-6 text-primary flex-shrink-0" />
          ) : (
            <Laptop className="h-6 w-6 text-primary flex-shrink-0" />
          )}
          
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Install BizDateup
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get quick access to BizDateup from your home screen
            </p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={handleInstallClick}
                className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Install
              </button>
            </div>
          </div>
          
          <button
            onClick={() => setShowInstallBanner(false)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}