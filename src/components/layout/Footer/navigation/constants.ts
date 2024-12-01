// src/components/layout/Footer/navigation/constant.ts
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Youtube,
    MapPin,
    Phone,
    Mail
  } from 'lucide-react'
  
  export const footerNavigation = {
    solutions: [
      { name: 'For Investors', href: '/investor' },
      { name: 'For Startups', href: '/startup' },
      { name: 'For Corporates', href: '/corporate' },
      { name: 'Syndicate', href: '/syndicate' },
      { name: 'Mentorship', href: '/mentorship' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Press', href: '/press' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Partners', href: '/partners' }
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Events', href: '/events' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Help Center', href: '/help' },
      { name: 'Research', href: '/research' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Data Protection', href: '/data-protection' }
    ],
    social: [
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Instagram', href: '#', icon: Instagram },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
      { name: 'YouTube', href: '#', icon: Youtube }
    ],
    contact: [
      { 
        icon: MapPin,
        content: '123 Innovation Street, Startup Hub, New Delhi, India 110001'
      },
      { 
        icon: Phone,
        content: '+91 (123) 456-7890'
      },
      { 
        icon: Mail,
        content: 'hello@bizdateup.com'
      }
    ]
  }
  