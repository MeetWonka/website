import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Same `cn` helper WonkaChat's `~/utils` exports — clsx + tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
