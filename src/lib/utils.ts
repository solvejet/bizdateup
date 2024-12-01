// src/lib/utils.ts
import { type ClassValue, twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(inputs)
}