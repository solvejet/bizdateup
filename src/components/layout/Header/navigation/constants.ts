// src/components/layout/Header/navigation/constants.ts
import { 
    Briefcase, 
    Rocket, 
    Users, 
    Info, 
    Newspaper, 
    Phone, 
    FileText, 
    Calendar, 
    MessageSquare, 
    Building2, 
    GraduationCap, 
    Handshake, 
    Globe, 
    UserPlus,
    Target,
    BarChart
  } from 'lucide-react'
  import type { NavItem } from './types'
  
  export const navigation: NavItem[] = [
    { name: 'Home', href: '/' },
    {
      name: 'For You',
      items: [
        {
          name: 'Investor',
          href: '/investor',
          description: 'Discover promising startups and investment opportunities',
          icon: Briefcase
        },
        {
          name: 'Startup',
          href: '/startup',
          description: 'Get funding and resources for your startup',
          icon: Rocket
        },
        {
          name: 'Syndicate',
          href: '/syndicate',
          description: 'Join investment syndicates and pool resources',
          icon: Users
        },
        {
          name: 'Corporate',
          href: '/corporate',
          description: 'Explore corporate innovation and partnerships',
          icon: Building2
        },
        {
          name: 'Mentorship',
          href: '/mentorship',
          description: 'Connect with experienced mentors in your industry',
          icon: GraduationCap
        },
        {
          name: 'Partnerships',
          href: '/partnerships',
          description: 'Find strategic partners for your business',
          icon: Handshake
        }
      ]
    },
    {
      name: 'About',
      items: [
        {
          name: 'About BizDateUp',
          href: '/about',
          description: 'Learn about our mission and vision',
          icon: Info
        },
        {
          name: 'Media Features',
          href: '/media',
          description: 'See where we have been featured',
          icon: Newspaper
        },
        {
          name: 'Contact',
          href: '/contact',
          description: 'Get in touch with us',
          icon: Phone
        },
        {
          name: 'Global Presence',
          href: '/global',
          description: 'Explore our worldwide network and impact',
          icon: Globe
        },
        {
          name: 'Join Our Team',
          href: '/careers',
          description: 'Explore career opportunities with us',
          icon: UserPlus
        },
        {
          name: 'Our Impact',
          href: '/impact',
          description: 'See how we are making a difference',
          icon: Target
        }
      ]
    },
    {
      name: 'Resources',
      items: [
        {
          name: 'Blogs',
          href: '/blogs',
          description: 'Insights and updates from the startup world',
          icon: FileText
        },
        {
          name: 'Events',
          href: '/events',
          description: 'Join our upcoming events and webinars',
          icon: Calendar
        },
        {
          name: 'Community',
          href: '/community',
          description: 'Connect with fellow entrepreneurs and investors',
          icon: MessageSquare
        },
        {
          name: 'Market Research',
          href: '/research',
          description: 'Access in-depth market analysis and reports',
          icon: BarChart
        }
      ]
    }
  ]