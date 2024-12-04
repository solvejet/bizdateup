// src/components/home/FundedStartups/data.ts
export interface FundedStartup {
    id: string;
    name: string;
    banner: string;
    investedValuation: string;
    currentValuation: string;
    returns: string;
    description: string;
    industries: string[];
  }
  
  export const fundedStartups: FundedStartup[] = [
    {
      id: "1",
      name: "CloudSecure",
      banner: "/api/placeholder/800/400",
      investedValuation: "₹2Cr",
      currentValuation: "₹15Cr",
      returns: "+650%",
      description: "AI-powered cloud security and compliance automation platform",
      industries: ["Security", "Cloud", "AI"]
    },
    {
      id: "2",
      name: "GreenHarvest",
      banner: "/api/placeholder/800/400",
      investedValuation: "₹5Cr",
      currentValuation: "₹45Cr",
      returns: "+800%",
      description: "Smart farming solutions using IoT and data analytics",
      industries: ["AgriTech", "IoT", "Sustainability"]
    },
    {
      id: "3",
      name: "HealthAI",
      banner: "/api/placeholder/800/400",
      investedValuation: "₹3Cr",
      currentValuation: "₹20Cr",
      returns: "+567%",
      description: "AI-driven diagnostic assistance and patient care platform",
      industries: ["HealthTech", "AI", "SaaS"]
    },
    {
      id: "4",
      name: "FinLeap",
      banner: "/api/placeholder/800/400",
      investedValuation: "₹4Cr",
      currentValuation: "₹35Cr",
      returns: "+775%",
      description: "Next-generation payment and financial infrastructure",
      industries: ["FinTech", "Blockchain", "B2B"]
    },
    {
      id: "5",
      name: "EduVerse",
      banner: "/api/placeholder/800/400",
      investedValuation: "₹1.5Cr",
      currentValuation: "₹12Cr",
      returns: "+700%",
      description: "Immersive learning platform using AR/VR technology",
      industries: ["EdTech", "AR/VR", "B2C"]
    }
  ];