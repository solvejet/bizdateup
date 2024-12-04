import { memo, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

interface ThemeIconProps {
  icon: typeof Sun | typeof Moon | typeof Monitor
  label: string
}

const ThemeIcon = memo(function ThemeIcon({ icon: Icon, label }: ThemeIconProps) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </motion.span>
  )
})

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = useCallback(() => {
    setTheme(theme === 'system' 
      ? 'light' 
      : theme === 'light' 
        ? 'dark' 
        : 'system'
    )
  }, [theme, setTheme])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')
    } else if (e.key === 'ArrowLeft') {
      setTheme(theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system')
    }
  }, [theme, setTheme])

  useEffect(() => {
    const button = buttonRef.current
    if (button) {
      button.addEventListener('keydown', handleKeyDown)
      return () => button.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={cn(
        "relative flex items-center justify-center",
        "h-10 w-10 rounded-lg",
        "bg-gray-100 dark:bg-gray-800",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "dark:focus:ring-offset-gray-900"
      )}
      aria-label={`Current theme: ${theme}. Click to cycle themes.`}
      title="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' && <ThemeIcon key="light" icon={Sun} label="Light mode" />}
        {theme === 'dark' && <ThemeIcon key="dark" icon={Moon} label="Dark mode" />}
        {theme === 'system' && <ThemeIcon key="system" icon={Monitor} label="System theme" />}
      </AnimatePresence>
    </motion.button>
  )
})