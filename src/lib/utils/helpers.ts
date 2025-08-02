import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const hasItems = <T>(items: T[] | null | undefined): items is T[] => !!items && items.length > 0

export const generateAndDownloadCSV = <T extends Record<string, unknown>>(
	event: React.MouseEvent<HTMLAnchorElement>,
	items: T[]
) => {
	if (items.length === 0) return

	const headers = Object.keys(items[0])

	const headerRow = headers.join(',') + '\n'

	const dataRows = items
		.map(item =>
			headers
				.map(header => {
					const value = item[header]
					if (value === null || value === undefined) return ''
					const stringValue = String(value).replace(/"/g, '""')
					return `"${stringValue}"`
				})
				.join(',')
		)
		.join('\n')

	const csvContent = headerRow + dataRows

	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

	const url = URL.createObjectURL(blob)

	const anchor = event.currentTarget
	anchor.href = url
	anchor.download = 'react-gallery-favorites.csv'

	anchor.onclick = () => {
		setTimeout(() => URL.revokeObjectURL(url), 100)
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
