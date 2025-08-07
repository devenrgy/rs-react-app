import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const hasItems = <T>(items: T[] | null | undefined): items is T[] => !!items && items.length > 0

export const toNumber = (value: string | number, radix = 10) => {
	if (typeof value === 'number') return value

	return Number.parseInt(value, radix)
}

export const safeJsonParse = <T>(value: string) => {
	try {
		return JSON.parse(value) as T
	} catch (error) {
		console.error('Error parsing JSON:', error)
		return null
	}
}

export const safeJsonParseThrow = <T>(value: string | null) => {
	if (!value) {
		throw new Error('JSON value is null or undefined')
	}

	try {
		return JSON.parse(value) as T
	} catch (error) {
		throw new Error('Error parsing JSON', { cause: error })
	}
}

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

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
