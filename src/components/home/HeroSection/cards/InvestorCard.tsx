// src/components/home/cards/InvestorCard.tsx
import { memo } from 'react'
import { motion } from 'framer-motion'
import { Building2, Target, Award, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { InvestorData } from '@/types/common'

interface InvestorCardProps {
  data: InvestorData
}

export const InvestorCard = memo(function InvestorCard({ data }: InvestorCardProps) {
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
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {data.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">{data.type}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {data.focus.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">Portfolio</span>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {data.portfolio.companies}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">Deployed</span>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {data.portfolio.deployed}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">Exits</span>
          </div>
          <div className="text-sm font-semibold text-green-500">
            {data.portfolio.exits}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">Returns</span>
          </div>
          <div className="text-sm font-semibold text-green-500">
            {data.portfolio.returns}
          </div>
        </div>
      </div>
    </motion.div>
  )
})