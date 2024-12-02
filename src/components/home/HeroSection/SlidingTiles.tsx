import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Building2, DollarSign, Rocket, Target, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const startupData = [
  {
    name: "TechVision AI",
    funding: "Series A",
    raised: "₹10Cr",
    industry: ["AI/ML", "Enterprise"],
    description: "AI-powered analytics platform",
    metrics: {
      growth: "+127%",
      users: "50K+",
      mrr: "₹82L"
    }
  },
  {
    name: "GreenEnergy",
    funding: "Series B",
    raised: "₹25Cr",
    industry: ["CleanTech"],
    description: "Renewable energy solutions",
    metrics: {
      growth: "+85%",
      users: "200+",
      mrr: "₹1.2Cr"
    }
  },
  {
    name: "FinLeap",
    funding: "Seed Plus",
    raised: "₹5Cr",
    industry: ["FinTech", "B2B"],
    description: "Next-gen payment infrastructure",
    metrics: {
      growth: "+156%",
      users: "10K+",
      mrr: "₹45L"
    }
  },
  {
    name: "HealthTech Plus",
    funding: "Series A",
    raised: "₹15Cr",
    industry: ["HealthTech", "IoT"],
    description: "IoT healthcare monitoring",
    metrics: {
      growth: "+92%",
      users: "25K+",
      mrr: "₹65L"
    }
  }
];

const investorData = [
  {
    name: "Growth Capital",
    type: "Venture Capital",
    focus: ["Tech", "SaaS"],
    portfolio: {
      companies: 25,
      deployed: "₹180Cr",
      exits: 4,
      returns: "+280%"
    }
  },
  {
    name: "Impact Ventures",
    type: "Impact Fund",
    focus: ["CleanTech", "HealthTech"],
    portfolio: {
      companies: 18,
      deployed: "₹120Cr",
      exits: 2,
      returns: "+180%"
    }
  },
  {
    name: "Digital Spark",
    type: "Early Stage VC",
    focus: ["Digital", "Consumer"],
    portfolio: {
      companies: 32,
      deployed: "₹250Cr",
      exits: 6,
      returns: "+420%"
    }
  },
  {
    name: "B2B Partners",
    type: "Sector Fund",
    focus: ["B2B", "Enterprise"],
    portfolio: {
      companies: 15,
      deployed: "₹90Cr",
      exits: 3,
      returns: "+190%"
    }
  }
];

const ScrollColumn = ({ data, direction = 1, children }) => {
  const [duplicatedData, setDuplicatedData] = useState([]);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Duplicate data to ensure seamless loop
    setDuplicatedData([...data, ...data, ...data, ...data]);
  }, [data]);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    let animationFrameId;
    let scrollPos = 0;

    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollPos += direction * 0.5;
        
        // Reset scroll position for seamless loop
        if (scrollPos >= scrollContainer.scrollHeight / 2) {
          scrollPos = 0;
        } else if (scrollPos <= 0) {
          scrollPos = scrollContainer.scrollHeight / 2;
        }

        scrollContainer.scrollTop = scrollPos;
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [direction, isHovered]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative h-full overflow-hidden",
        "no-scrollbar" // Add this class to your global CSS
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={scrollRef} className="space-y-4">
        {duplicatedData.map((item, index) => (
          <div key={`${item.name}-${index}`} className="px-2">
            {children(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

const StartupCard = ({ data }) => {
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
            {data.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">{data.funding}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.industry.map((tag) => (
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
        {data.description}
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">Growth</span>
          </div>
          <div className="text-sm font-semibold text-green-500">
            {data.metrics.growth}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">Users</span>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {data.metrics.users}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">MRR</span>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {data.metrics.mrr}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InvestorCard = ({ data }) => {
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
  );
};

function SingleColumnScroll({ children }) {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Combine and alternate between startup and investor data
    const combinedData = startupData.reduce((acc, startup, i) => {
      acc.push(
        { type: 'startup', data: startup },
        { type: 'investor', data: investorData[i] }
      );
      return acc;
    }, []);
    
    const duplicatedData = [...combinedData, ...combinedData, ...combinedData];
  
    useEffect(() => {
      const scrollContainer = containerRef.current;
      let animationFrameId;
      let scrollPos = 0;
  
      const scroll = () => {
        if (!isHovered && scrollContainer) {
          scrollPos += 0.5;
          
          if (scrollPos >= scrollContainer.scrollHeight / 2) {
            scrollPos = 0;
          }
  
          scrollContainer.scrollTop = scrollPos;
          animationFrameId = requestAnimationFrame(scroll);
        }
      };
  
      animationFrameId = requestAnimationFrame(scroll);
  
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, [isHovered]);
  
    return (
      <div 
        ref={containerRef}
        className="relative h-full overflow-hidden no-scrollbar"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="space-y-4 px-4">
          {duplicatedData.map((item, index) => (
            <div key={`${item.type}-${index}`}>
              {item.type === 'startup' ? (
                <StartupCard data={item.data} />
              ) : (
                <InvestorCard data={item.data} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  export function SlidingTiles() {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1024); // Switch to single column under 1024px
      };
  
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    if (isMobile) {
      return (
        <div className="h-[600px]">
          <SingleColumnScroll />
        </div>
      );
    }
  
    return (
      <div className="grid grid-cols-2 gap-8 h-[600px]">
        <ScrollColumn data={startupData} direction={1}>
          {(item) => <StartupCard data={item} />}
        </ScrollColumn>
        <ScrollColumn data={investorData} direction={-1}>
          {(item) => <InvestorCard data={item} />}
        </ScrollColumn>
      </div>
    );
  }
  
  export default SlidingTiles;