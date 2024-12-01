// src/lib/utils.ts
import type { ClassValue } from './types'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(inputs)
}