// src/components/layout/Footer/ContactInfo.tsx
import { motion } from 'framer-motion'
import { footerNavigation } from './navigation/constants'

export function ContactInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        Contact Us
      </h3>
      <div className="space-y-3">
        {footerNavigation.contact.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
          >
            <item.icon className="mt-1 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="text-sm">{item.content}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}