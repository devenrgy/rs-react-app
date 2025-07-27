import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const hasItems = <T>(items: T[] | null | undefined): items is T[] => !!items && items.length > 0

export const addUrlParams = (url: string, params: Record<string, unknown>) => {
	const newUrl = new URL(url)

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			newUrl.searchParams.append(key, String(value))
		}
	})

	return newUrl.toString()
}

export const range = (start: number, end: number) => {
	const length = end - start + 1
	return Array.from({ length }, (_, idx) => idx + start)
}
