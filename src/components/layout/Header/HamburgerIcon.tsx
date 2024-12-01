// src/components/layout/Header/HamburgerIcon.tsx
import { motion } from 'framer-motion'

interface HamburgerIconProps {
  isOpen: boolean
  onClick: () => void
}

export default function HamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
  const transition = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  }

  const lineStyles = "h-0.5 absolute bg-gray-700 dark:bg-gray-200 transform origin-center rounded-full"
  
  const variants = {
    top: {
      closed: { 
        width: 20,
        translateY: -6,
        rotate: 0,
        left: '50%',
        x: -10
      },
      open: { 
        width: 24,
        translateY: 0,
        rotate: 45,
        left: '50%',
        x: -12
      }
    },
    middle: {
      closed: {
        width: 16,
        opacity: 1,
        left: '50%',
        x: -8,
        translateY: 0
      },
      open: {
        width: 0,
        opacity: 0,
        left: '50%',
        x: 0,
        translateY: 0
      }
    },
    bottom: {
      closed: { 
        width: 20,
        translateY: 6,
        rotate: 0,
        left: '50%',
        x: -10
      },
      open: { 
        width: 24,
        translateY: 0,
        rotate: -45,
        left: '50%',
        x: -12
      }
    }
  }

  return (
    <motion.button
      className="h-10 w-10 inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="relative w-6 h-6 flex items-center">
        <div className="absolute top-1/2 w-full -translate-y-1/2">
          <motion.span
            className={lineStyles}
            variants={variants.top}
            animate={isOpen ? "open" : "closed"}
            transition={transition}
          />
          <motion.span
            className={lineStyles}
            variants={variants.middle}
            animate={isOpen ? "open" : "closed"}
            transition={transition}
          />
          <motion.span
            className={lineStyles}
            variants={variants.bottom}
            animate={isOpen ? "open" : "closed"}
            transition={transition}
          />
        </div>
      </div>
    </motion.button>
  )
}