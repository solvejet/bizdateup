import { motion } from 'framer-motion';
import { TrendingUp, FileCheck, PieChart } from 'lucide-react';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { cn } from '@/lib/utils';

interface StepCardProps {
  icon: typeof TrendingUp;
  title: string;
  description: string;
  index: number;
}

function StepCard({ icon: Icon, title, description, index }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={cn(
        "relative p-6 lg:p-8",
        "rounded-2xl",
        "bg-white/50 dark:bg-gray-800/50",
        "backdrop-blur-sm",
        "border border-gray-200 dark:border-gray-700",
        "group hover:border-primary/20 dark:hover:border-primary/20",
        "transition-all duration-300"
      )}
    >
      {/* Step Number */}
      <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
        {index + 1}
      </div>

      {/* Icon */}
      <div className={cn(
        "w-12 h-12 mb-6",
        "rounded-xl",
        "bg-primary/10 dark:bg-primary/20",
        "flex items-center justify-center",
        "group-hover:scale-110 group-hover:bg-primary group-hover:text-white",
        "transition-all duration-300"
      )}>
        <Icon className="w-6 h-6 text-primary group-hover:text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const steps = [
    {
      icon: TrendingUp,
      title: "Access Top Deals",
      description: "Partner with aligned investors and fund managers, gaining access to high-potential startup opportunities and premium deal flow."
    },
    {
      icon: FileCheck,
      title: "Streamlined Investing",
      description: "BizDateUp takes care of compliance, KYC verification, and taxes, so you can focus on making impactful investments."
    },
    {
      icon: PieChart,
      title: "Diversify Your Portfolio",
      description: "Invest across a wide range of industries and syndicates, joining forces with like-minded investors to grow your startup portfolio."
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
              className={cn(
                "inline-block px-4 py-1.5 rounded-full",
                "bg-primary/10 dark:bg-primary/20",
                "text-primary dark:text-primary-foreground",
                "text-sm font-medium"
              )}
            >
              New to Investments
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "text-4xl md:text-5xl font-bold",
                "text-gray-900 dark:text-white",
                "max-w-2xl mx-auto"
              )}
            >
              Here's how it works on BizDateUp
            </motion.h2>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <StepCard
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}