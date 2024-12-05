import { memo } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  date: string;
  title: string;
  content: string;
}

const TestimonialCard = memo(function TestimonialCard({
  name,
  date,
  title,
  content
}: TestimonialCardProps) {
  return (
    <div 
      className={cn(
        "shrink-0 w-[400px]",
        "p-8 mx-4 my-8",
        "bg-white dark:bg-gray-800",
        "rounded-2xl",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "relative"
      )}
    >
      <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100 dark:text-gray-700" />

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className="w-5 h-5 fill-primary text-primary" 
          />
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-4">
        {content}
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
          <span className="text-xl font-semibold text-primary">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {date}
          </div>
        </div>
      </div>
    </div>
  );
});

function MarqueeGroup({ testimonials }: { testimonials: typeof TESTIMONIALS }) {
  return (
    <div className="flex shrink-0">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.name}
          {...testimonial}
        />
      ))}
    </div>
  );
}

const TESTIMONIALS = [
  {
    name: "Tanishq Chandaliya",
    date: "1 Jan 2023",
    title: "Investment In BizDateUp",
    content: "As an investor, I can confidently say that BizDateUp has been a game-changer in my journey toward financial success. it provided me with a unique opportunity to invest in PDRL, an incredible drone tech startup, and the results have surpassed my expectations. BizDateUp's user-friendly interface, thorough vetting process, and comprehensive market analysis gave me the confidence to make an informed investment decision."
  },
  {
    name: "Karan Singh",
    date: "1 Jan 2023",
    title: "Investment In Revamp Moto",
    content: "Investing in Revamp Moto through BizDateUp has been a great experience. The platform's user-friendly interface and comprehensive information on the EV startup allowed me to make an informed investment decision. Thanks to BizDateUp's regular updates and analysis, I have witnessed substantial growth in my investment. Revamp Moto's dedication to revolutionizing the electric vehicle industry and BizDateUp's support have made this investment experience truly rewarding."
  },
  {
    name: "Sanket Gaokar",
    date: "1 Jan 2023",
    title: "Investment In TWYN",
    content: "Investing in TWYN, a remarkable SAAS platform through BizDateUp, has truly been a game-changer for me as an investor. BizDateUp's support and guidance throughout this journey have been invaluable, enabling me to make informed decisions and witness substantial growth in my investment. BizDateUp has made it a seamless experience to explore and understand the potential of TWYN. It's incredibly exciting to be part of a company that is revolutionizing the industry."
  }
];

export default function SuccessStoriesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900 overflow-hidden">
      <ResponsiveContainer className="mb-16">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Success Stories
              <span className="block text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mt-2">
                real Investors, real Returns
              </span>
            </motion.h2>
          </div>
        </div>
      </ResponsiveContainer>

      <div className="relative mt-8">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-50/90 dark:from-gray-900/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-50/90 dark:from-gray-900/90 to-transparent z-10" />
        
        {/* First Row - Moving Left */}
        <div className="flex overflow-hidden py-4">
          <div className="animate-[marquee-left_40s_linear_infinite] flex">
            <MarqueeGroup testimonials={TESTIMONIALS} />
            <MarqueeGroup testimonials={TESTIMONIALS} />
          </div>
        </div>

        {/* Second Row - Moving Right */}
        <div className="flex overflow-hidden py-4">
          <div className="animate-[marquee-right_40s_linear_infinite] flex">
            <MarqueeGroup testimonials={[...TESTIMONIALS].reverse()} />
            <MarqueeGroup testimonials={[...TESTIMONIALS].reverse()} />
          </div>
        </div>
      </div>
    </section>
  );
}