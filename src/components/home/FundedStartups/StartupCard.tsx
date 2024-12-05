// src/components/home/FundedStartups/StartupCard.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FundedStartup } from './data';

interface StartupCardProps {
  startup: FundedStartup;
}

export const StartupCard = memo(function StartupCard({ startup }: StartupCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "w-[300px] rounded-xl overflow-hidden",
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "my-8" // Add vertical margin
      )}
    >
      {/* Rest of the card content remains the same */}
      <div className="aspect-[2/1] relative overflow-hidden">
        <img
          src={startup.banner}
          alt={startup.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-semibold text-white">
            {startup.name}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Invested At
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {startup.investedValuation}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Current Value
            </div>
            <div className="font-semibold text-primary">
              {startup.currentValuation}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-500">
            {startup.returns} Unrealized Returns
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
          {startup.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {startup.industries.map((industry) => (
            <span
              key={industry}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});