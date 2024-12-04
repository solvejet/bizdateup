// src/components/home/cards/StartupCard.tsx
import { memo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StartupData } from '@/types/common'

interface StartupCardProps {
  data: StartupData
}

export const StartupCard = memo(function StartupCard({ data }: StartupCardProps) {
  if (!data) return null;
  
  const { 
    name, 
    funding, 
    industry = [], // Provide default empty array
    description, 
    metrics 
  } = data;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-4 sm:p-6 rounded-xl",
        "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
        "border border-gray-100 dark:border-gray-700",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300"
      )}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">{funding}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {industry?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
        {description}
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">Growth</span>
          </div>
          <div className="text-sm font-semibold text-green-500">
            {metrics.growth}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">Users</span>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {metrics.users}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">MRR</span>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {metrics.mrr}
          </div>
        </div>
      </div>
    </motion.div>
  )
})