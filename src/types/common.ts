// src/types/common.ts
import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

export interface LayoutProps {
  children: ReactNode
}

export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

// Navigation Types
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

// Theme Types
export type Theme = 'light' | 'dark' | 'system'

// API Types
export interface ApiError {
  status: number
  message: string
  code?: string
}

export interface ApiResponse<T> {
  data: T
  error?: ApiError
}

// Data Types
export interface MetricsData {
  growth: string
  users: string
  mrr: string
}

export interface StartupData {
  name: string
  funding: string
  raised: string
  industry: string[]
  description: string
  metrics: MetricsData
}

export interface InvestorData {
  name: string
  type: string
  focus: string[]
  portfolio: {
    companies: number
    deployed: string
    exits: number
    returns: string
  }
}