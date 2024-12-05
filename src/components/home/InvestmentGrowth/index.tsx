// src/components/home/InvestmentGrowth/index.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { TestimonialCard } from './TestimonialCard';
import { SuccessCalculator } from './SuccessCalculator';
import { cn } from '@/lib/utils'

export const InvestmentGrowthSection = memo(function InvestmentGrowthSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <ResponsiveContainer className="space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
        <motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className={cn(
    "text-4xl md:text-5xl font-bold",
    "text-gray-900 dark:text-white/90",
    "pb-2"
  )}
>
  Growing Your ₹10 Lakhs to ₹10 Crores
</motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Don't Miss Out on the Next Zomato! Invest in Tomorrow's Game-Changers Today
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <TestimonialCard />
          <SuccessCalculator />
        </div>
      </ResponsiveContainer>
    </section>
  );
});

export default InvestmentGrowthSection;