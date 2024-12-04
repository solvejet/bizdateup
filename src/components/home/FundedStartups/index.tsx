// src/components/home/FundedStartups/index.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { StartupCard } from './StartupCard';
import { fundedStartups } from './data';

function MarqueeGroup() {
  return (
    <div className="flex gap-6 animate-[marquee-left_60s_linear_infinite] py-4"> {/* Add vertical padding */}
      {fundedStartups.concat(fundedStartups).map((startup, index) => (
        <StartupCard key={`${startup.id}-${index}`} startup={startup} />
      ))}
    </div>
  );
}

export const FundedStartupsSection = memo(function FundedStartupsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
      <ResponsiveContainer>
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              Success Stories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Our Funded Startups
            </motion.h2>
          </div>
        </div>
      </ResponsiveContainer>

      <div className="mt-12 overflow-hidden">
        <div className="flex py-4">
          <MarqueeGroup />
        </div>
      </div>
    </section>
  );
});