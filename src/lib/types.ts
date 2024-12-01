// src/lib/types.ts
import { type ClassNameValue, twMerge as tailwindMerge } from 'tailwind-merge'

export function cn(...inputs: ClassNameValue[]) {
  return tailwindMerge(...inputs)
}