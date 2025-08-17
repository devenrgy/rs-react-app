import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const hasItems = <T>(items: T[] | null | undefined): items is T[] => !!items && items.length > 0
