export function convertToCSV<T extends Record<string, unknown>>(
	data: T[],
	options?: {
		headers?: Array<keyof T | string>
		formatValue?: (value: unknown, key: keyof T) => string
	},
): string {
	if (data.length === 0) {
		return ''
	}

	const {
		headers = Object.keys(data[0]) as Array<keyof T>,
		formatValue = (value: unknown) => (value === null || value === undefined ? '' : String(value)),
	} = options || {}

	const headerRow = `${headers.join(',')}\n`

	const dataRows = data
		.map(item =>
			headers
				.map((header) => {
					const key = header as keyof T
					const value = item[key]
					const formattedValue = formatValue(value, key)
					return `"${formattedValue.replace(/"/g, '""')}"`
				})
				.join(','),
		)
		.join('\n')

	return headerRow + dataRows
}
