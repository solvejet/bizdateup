import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, LineChart, ChevronRight, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SlidingTiles } from './SlidingTiles';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';

export function HeroSection() {
  const stats = [
    { 
      label: 'Total Investment', 
      value: '₹500Cr+',
      icon: Target,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    { 
      label: 'Active Startups', 
      value: '200+',
      icon: TrendingUp,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    { 
      label: 'Success Rate', 
      value: '85%',
      icon: LineChart,
      color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400'
    },
    { 
      label: 'Investor Network', 
      value: '1000+',
      icon: Users,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900 dark:to-gray-800/50 overflow-hidden py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50" />

      {/* Main Content */}
      <ResponsiveContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">
                Reliable Investments
              </span>
              <ChevronRight className="w-4 h-4 text-primary" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Powering the Future of{' '}
              <span className="text-primary">
                Startups and Investment
              </span>
            </motion.h1>

            {/* Feature Cards */}
            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg p-3 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Financial Growth
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Empowering startups and investors for exponential financial growth together.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg p-3 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <LineChart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Investor Dashboard
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Streamlined insights, manage investments, track startups, maximize ROI effortlessly.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={cn(
                    "p-4 rounded-xl",
                    "bg-white/80 dark:bg-gray-800/80",
                    "backdrop-blur-sm",
                    "border border-gray-200/50 dark:border-gray-700/50",
                    "flex items-center gap-4"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg",
                    "flex items-center justify-center",
                    stat.color
                  )}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex gap-4"
            >
              <Link
                to="/get-started"
                className={cn(
                  "px-6 py-3 rounded-lg",
                  "bg-primary text-white",
                  "text-base font-semibold",
                  "shadow-lg shadow-primary/20",
                  "hover:shadow-xl hover:shadow-primary/30",
                  "hover:-translate-y-0.5",
                  "transition-all duration-200"
                )}
              >
                Get Started Now
                <ArrowRight className="ml-2 -mr-1 w-5 h-5 inline" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Sliding Tiles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "relative min-h-[700px] overflow-hidden",
              "rounded-2xl",
              "border border-gray-200 dark:border-gray-700/50",
              "bg-white/50 dark:bg-gray-800/50",
              "backdrop-blur-sm",
              "shadow-2xl",
              "p-4"
            )}
          >
            <SlidingTiles />
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

export default HeroSection;