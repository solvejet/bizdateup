// src/components/home/InvestmentGrowth/TestimonialCard.tsx
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils'

export const TestimonialCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative p-8 rounded-2xl",
        "bg-white dark:bg-gray-800",
        "shadow-xl border border-gray-200 dark:border-gray-700"
      )}
    >
      <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/20" />
      <div className="space-y-4">
        <p className="text-lg text-gray-700 dark:text-gray-300 italic">
          "Investing in Zomato during its early stages was one of my best decisions. 
          The company's vision for transforming India's food delivery ecosystem was compelling, 
          and their execution has been remarkable. It's a testament to the potential of 
          Indian startups."
        </p>
        
        <div className="flex items-center gap-4">
          <img
            src="/api/placeholder/64/64"
            alt="Investor"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Sanjeev Bikhchandani
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Early Investor, Zomato
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
