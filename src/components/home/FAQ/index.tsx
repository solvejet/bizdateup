import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, onToggle, index }: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "border-b border-gray-200 dark:border-gray-700",
        "last:border-none"
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between",
          "py-6 text-left",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-300">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQs = [
  {
    question: "What is the minimum investment amount?",
    answer: "The minimum investment amount varies by startup but typically starts from ₹1 lakh. This ensures accessibility while maintaining meaningful stake sizes. Some opportunities may have higher minimums based on the startup's valuation and round size."
  },
  {
    question: "How do I get started with investing?",
    answer: "Getting started is simple: 1) Create an account and complete your investor verification, 2) Browse available startup opportunities, 3) Express interest and connect with founders, 4) Complete due diligence and documentation, 5) Transfer funds and receive your equity stake."
  },
  {
    question: "What types of startups can I invest in?",
    answer: "We feature startups across various sectors including Technology, Healthcare, E-commerce, FinTech, EdTech, and more. All startups undergo thorough vetting for growth potential, team capability, market opportunity, and financial health before being listed."
  },
  {
    question: "How is my investment protected?",
    answer: "We implement multiple safeguards: 1) Comprehensive legal documentation and shareholder agreements, 2) Escrow accounts for secure fund transfers, 3) Regular startup performance updates, 4) Professional due diligence reports, and 5) Dedicated investor relations support."
  },
  {
    question: "When and how can I exit my investment?",
    answer: "Exit opportunities typically arise through events like IPOs, acquisitions, or secondary sales. While startup investments are generally illiquid, we're developing a secondary market platform to provide potential interim liquidity options for investors."
  },
  {
    question: "What fees do you charge?",
    answer: "We maintain a transparent fee structure: a one-time 2% processing fee on successful investments, and a small carry percentage on profitable exits. There are no hidden charges or annual maintenance fees."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <ResponsiveContainer>
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className={cn(
                "text-sm font-medium",
                "text-primary"
              )}>
                Got Questions?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "text-4xl md:text-5xl font-bold",
                "text-gray-900 dark:text-white"
              )}
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          {/* FAQ List */}
          <div className={cn(
            "max-w-3xl mx-auto",
            "divide-y divide-gray-200 dark:divide-gray-700",
            "rounded-2xl",
            "bg-white/80 dark:bg-gray-800/80",
            "shadow-xl",
            "border border-gray-200 dark:border-gray-700",
            "backdrop-blur-sm",
            "p-8"
          )}>
            {FAQs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            ))}
          </div>

          {/* Support Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-300">
              Still have questions?{' '}
              <a 
                href="/contact" 
                className="text-primary hover:underline font-medium"
              >
                Contact our support team
              </a>
            </p>
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}