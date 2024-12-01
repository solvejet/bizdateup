// src/components/layout/Header/ThemeToggle.tsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Added stopPropagation
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={`
        flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium
        ${theme === 'dark'
          ? 'bg-primary/90 text-white'
          : 'bg-primary/10 text-primary'
        }
        hover:bg-opacity-90 transition-all duration-200
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Light mode</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Dark mode</span>
        </>
      )}
    </motion.button>
  )
}