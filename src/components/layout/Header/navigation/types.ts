// src/components/layout/Header/navigation/types.ts
import { LucideIcon } from 'lucide-react'

export interface SubNavItem {
  name: string
  href: string
  description: string
  icon: LucideIcon
}

export interface NavItem {
  name: string
  href?: string
  items?: SubNavItem[]
}
