// src/components/layout/Footer.tsx
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NewsletterForm } from './Footer/NewsletterForm'
import { SocialLinks } from './Footer/SocialLinks'
import { ContactInfo } from './Footer/ContactInfo'
import { footerNavigation } from './Footer/navigation/constants'
import { cn } from '@/lib/utils'

const FooterSection = memo(({ 
  title, 
  items 
}: { 
  title: string
  items: { name: string; href: string }[] 
}) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
      {title}
    </h3>
    <ul role="list" className="space-y-3">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            className={cn(
              "text-sm text-gray-600 dark:text-gray-400",
              "hover:text-primary dark:hover:text-primary",
              "transition-colors"
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))
FooterSection.displayName = 'FooterSection'

const FooterTop = memo(() => (
  <div className="xl:grid xl:grid-cols-3 xl:gap-8">
    <div className="space-y-8">
      <Link to="/">
        <img
          className="h-12 w-auto"
          src="/logo.svg"
          alt="BizDateup"
        />
      </Link>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        Empowering startups and investors to create the future of innovation together.
      </motion.p>
      <SocialLinks />
    </div>
    
    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <FooterSection title="Solutions" items={footerNavigation.solutions} />
        <FooterSection title="Company" items={footerNavigation.company} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <FooterSection title="Resources" items={footerNavigation.resources} />
        <FooterSection title="Legal" items={footerNavigation.legal} />
      </div>
    </div>
  </div>
))
FooterTop.displayName = 'FooterTop'

const FooterBottom = memo(() => (
  <div className="mt-16 border-t border-gray-900/10 dark:border-gray-100/10 pt-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-8">
        <NewsletterForm />
      </div>
      <ContactInfo />
    </div>

    <div className="mt-8 border-t border-gray-900/10 dark:border-gray-100/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} BizDateup. All rights reserved.
      </p>
      <div className="flex gap-4">
        <Link 
          to="/sitemap"
          className="text-xs text-gray-500 hover:text-primary dark:text-gray-400"
        >
          Sitemap
        </Link>
        <Link 
          to="/accessibility"
          className="text-xs text-gray-500 hover:text-primary dark:text-gray-400"
        >
          Accessibility
        </Link>
      </div>
    </div>
  </div>
))
FooterBottom.displayName = 'FooterBottom'

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <FooterTop />
        <FooterBottom />
      </div>
    </footer>
  )
}