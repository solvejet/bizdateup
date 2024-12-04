import { motion } from 'framer-motion';
import { TrendingUp, Users, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';

const industries = [
  "FinTech",
  "HealthTech",
  "EdTech",
  "CleanTech",
  "AI/ML",
  "IoT",
  "E-commerce",
  "SaaS",
  "AgriTech",
  "Blockchain",
  "Robotics",
  "Cybersecurity",
  "BioTech",
  "SpaceTech",
  "RetailTech",
  "DeepTech",
  "Gaming",
  "MediaTech",
  "Logistics",
  "FoodTech"
];

function MarqueeGroup({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 gap-8 items-center">
      {items.map((item) => (
        <motion.span
          key={item}
          className={cn(
            "shrink-0",
            "px-4 py-2",
            "text-sm font-medium",
            "text-gray-600 dark:text-gray-400",
            "hover:text-primary dark:hover:text-primary",
            "transition-colors duration-300",
            "cursor-pointer"
          )}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

function IndustryMarquee() {
  return (
    <div className="relative flex flex-col gap-10 py-12">
      {/* First row - Moving left */}
      <div className="flex shrink-0">
        <div className="animate-[marquee-left_40s_linear_infinite] flex shrink-0 gap-4">
          <MarqueeGroup items={industries} />
          <MarqueeGroup items={industries} />
        </div>
      </div>

      {/* Second row - Moving right */}
      <div className="flex shrink-0">
        <div className="animate-[marquee-right_50s_linear_infinite] flex shrink-0 gap-4">
          <MarqueeGroup items={[...industries].reverse()} />
          <MarqueeGroup items={[...industries].reverse()} />
        </div>
      </div>
    </div>
  );
}

export function InvestorsSection() {
  const stats = [
    {
      value: "₹100 Cr",
      label: "Funds Raised",
      icon: TrendingUp,
      description: "Total capital deployed to promising startups"
    },
    {
      value: "1000+",
      label: "Active Investors",
      icon: Users,
      description: "Growing network of angel and institutional investors"
    },
    {
      value: "25+",
      label: "Funded Startups",
      icon: Workflow,
      description: "Successfully funded and growing startups"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <ResponsiveContainer>
        <div className="space-y-20">
          {/* Stats Section */}
          <div className="text-center space-y-16">
            {/* Heading */}
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                Growing Community
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl",
                  "font-bold tracking-tight",
                  "bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent",
                  "pb-2"
                )}
              >
                Join over 1000+ Investors
              </motion.h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "relative p-8 rounded-2xl",
                    "bg-white dark:bg-gray-800",
                    "border border-gray-200 dark:border-gray-700",
                    "shadow-xl hover:shadow-2xl",
                    "transition-all duration-300",
                    "group"
                  )}
                >
                  <div className="absolute -top-6 left-8">
                    <div className={cn(
                      "p-4 rounded-xl",
                      "bg-primary text-white",
                      "shadow-lg group-hover:shadow-xl",
                      "transition-all duration-300",
                      "group-hover:-translate-y-1"
                    )}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <span className="block text-4xl lg:text-5xl font-bold text-primary">
                      {stat.value}
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {stat.label}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Industry Marquee */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none z-10" />
            <IndustryMarquee />
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

export default InvestorsSection;