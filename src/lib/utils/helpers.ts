import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const hasItems = <T>(items: T[] | null | undefined): items is T[] => !!items && items.length > 0

export const delay = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const addUrlParams = (url: string, params: Record<string, unknown>) => {
	const newUrl = new URL(url)
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			newUrl.searchParams.set(key, encodeURIComponent(String(value)))
		}
	})
	return newUrl.toString()
}

export const range = (start: number, end: number) => {
	const length = end - start + 1
	return Array.from({ length }, (_, idx) => idx + start)
}
