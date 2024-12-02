// src/components/layout/Header/ThemeToggle.tsx
import { memo, useCallback } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  const effectiveTheme = theme === 'system' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={`
        flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium
        ${effectiveTheme === 'dark'
          ? 'bg-primary/90 text-white'
          : 'bg-primary/10 text-primary'
        }
        hover:bg-opacity-90 transition-all duration-200
      `}
      aria-label={`Switch to ${effectiveTheme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={effectiveTheme === 'dark'}
    >
      {effectiveTheme === 'dark' ? (
        <>
          <Sun className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Light mode</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Dark mode</span>
        </>
      )}
    </motion.button>
  )
})