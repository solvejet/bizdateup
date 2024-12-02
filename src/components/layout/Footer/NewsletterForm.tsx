// src/components/layout/Footer/NewsletterForm.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "w-full rounded-lg",
              "px-3.5 py-2.5",
              "text-gray-600 dark:text-gray-300",
              "bg-white dark:bg-gray-800",
              "border border-gray-300 dark:border-gray-700",
              "focus:ring-2 focus:ring-primary focus:border-transparent",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "transition-colors"
            )}
            placeholder="Enter your email"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "rounded-lg bg-primary px-4 py-2.5",
            "text-sm font-semibold text-white",
            "hover:bg-primary/90",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors"
          )}
        >
          {status === 'loading' ? (
            'Subscribing...'
          ) : status === 'success' ? (
            'Subscribed!'
          ) : (
            <>
              Subscribe <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </motion.button>
      </div>
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-green-500"
        >
          Thank you for subscribing to our newsletter!
        </motion.p>
      )}
    </form>
  )
}