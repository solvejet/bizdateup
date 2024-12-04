// src/components/home/InvestmentGrowth/SuccessCalculator.tsx
import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, IndianRupee, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const SuccessCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000000); // 10 Lakhs
  const [investmentYear, setInvestmentYear] = useState<number>(2010);

  const calculatedReturns = useMemo(() => {
    // Zomato IPO details
    const ipoYear = 2021;
    const growthMultiple = 1100; // 1100x return for early investors
    
    const holdingPeriod = ipoYear - investmentYear;
    const estimatedValue = investmentAmount * growthMultiple;
    const annualReturn = Math.pow(growthMultiple, 1 / holdingPeriod) - 1;

    return {
      currentValue: estimatedValue,
      years: holdingPeriod,
      annualReturn: annualReturn * 100
    };
  }, [investmentAmount, investmentYear]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Investment Calculator
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Investment Amount Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Investment Amount (₹)
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className={cn(
                  "w-full pl-10 pr-4 py-2 rounded-lg",
                  "border border-gray-300 dark:border-gray-600",
                  "bg-white dark:bg-gray-900",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-primary focus:border-transparent"
                )}
                min="100000"
                max="10000000"
                step="100000"
              />
            </div>
          </div>

          {/* Investment Year Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Investment Year
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={investmentYear}
                onChange={(e) => setInvestmentYear(Number(e.target.value))}
                className={cn(
                  "w-full pl-10 pr-4 py-2 rounded-lg",
                  "border border-gray-300 dark:border-gray-600",
                  "bg-white dark:bg-gray-900",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-primary focus:border-transparent"
                )}
                min="2008"
                max="2020"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-3 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={calculatedReturns.currentValue}
            className="p-4 rounded-lg bg-primary/10 space-y-1"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Current Value
            </div>
            <div className="text-xl font-bold text-primary">
              ₹{(calculatedReturns.currentValue / 10000000).toFixed(1)}Cr
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={calculatedReturns.years}
            className="p-4 rounded-lg bg-green-500/10 space-y-1"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Holding Period
            </div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {calculatedReturns.years} Years
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={calculatedReturns.annualReturn}
            className="p-4 rounded-lg bg-blue-500/10 space-y-1"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Annual Return
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {calculatedReturns.annualReturn.toFixed(1)}%
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};