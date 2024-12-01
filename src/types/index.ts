// src/types/index.ts
import { ComponentType, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

export interface LayoutProps {
  children: ReactNode
}

export interface RouteConfig {
  path: string
  component: ComponentType
}

export interface Theme {
  mode: 'light' | 'dark' | 'system'
}

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