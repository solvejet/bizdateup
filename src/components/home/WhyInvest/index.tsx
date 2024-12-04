// src/components/home/WhyInvest/index.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Coins, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';

interface FeatureCardProps {
  icon: typeof PieChart;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = memo(function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={cn(
        "group relative p-8 lg:p-10",
        "rounded-2xl",
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300"
      )}
    >
      {/* Background Gradient Overlay */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
        "bg-gradient-to-br from-primary/5 via-transparent to-transparent",
        "transition-opacity duration-500"
      )} />

      {/* Content */}
      <div className="relative space-y-6">
        {/* Icon */}
        <div className={cn(
          "w-14 h-14 rounded-xl",
          "bg-primary/10 text-primary",
          "flex items-center justify-center",
          "group-hover:scale-110 group-hover:bg-primary group-hover:text-white",
          "transition-all duration-300"
        )}>
          <Icon className="w-7 h-7" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
});

export const WhyInvestSection = memo(function WhyInvestSection() {
  const features = [
    {
      icon: PieChart,
      title: "Invest and Own a Piece of the Future",
      description: "Unlike crowdfunding platforms where you pledge for rewards, on BizDateUp, your investment translates to real equity in high-potential startups."
    },
    {
      icon: Coins,
      title: "Grow Your Wealth with Time",
      description: "Build a diverse investment portfolio by tapping into emerging startups across sectors. Leverage your expertise, insights, and the collective wisdom of fellow investors for long-term growth."
    },
    {
      icon: Users,
      title: "Stay Connected and Involved",
      description: "As an investor on BizDateUp, you'll receive exclusive updates, attend events, watch founder videos, and directly engage with startup teams to help shape their journey to success."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
      <ResponsiveContainer>
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              Support founders, build your portfolio
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl",
                "font-bold tracking-tight",
                "bg-gradient-to-r from-primary via-primary/80 to-primary",
                "bg-clip-text text-transparent",
                "pb-2"
              )}
            >
              Why Invest on BizDateUp
            </motion.h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
});

export default WhyInvestSection;