// src/components/layout/Footer/SocialLinks.tsx
import { motion } from 'framer-motion'
import { footerNavigation } from './navigation/constants'

export function SocialLinks() {
  return (
    <div className="flex space-x-6">
      {footerNavigation.social.map((item) => (
        <motion.a
          key={item.name}
          href={item.href}
          whileHover={{ scale: 1.2, rotate: 12 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-500 hover:text-primary dark:text-gray-400"
        >
          <span className="sr-only">{item.name}</span>
          <item.icon className="h-6 w-6" aria-hidden="true" />
        </motion.a>
      ))}
    </div>
  )
}
