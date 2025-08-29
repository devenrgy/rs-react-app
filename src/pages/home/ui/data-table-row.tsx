import { cn, Highlight, TableCell, TableRow } from '@/shared'

import type { CountryData, TableColumns } from '..'

export const DataTableRow = ({
	country,
	countryData,
	columns
}: {
	country: string
	countryData: CountryData
	columns: TableColumns
}) => {
	const getCellValue = (columnName: string) => {
		if (columnName === 'country') return country
		if (columnName === 'iso_code') return countryData.iso_code
		return countryData.data[0]?.[columnName as keyof CountryData['data'][0]]
	}

	return (
		<TableRow key={country}>
			{Object.entries(columns).map(
				([columnName, { isVisible, className }]) =>
					isVisible && (
						<Highlight value={getCellValue(columnName)} key={`${country}-${columnName}`}>
							{(value, isHighlight) => (
								<TableCell className={cn(className, 'duration-500', { 'bg-green-500': isHighlight })}>
									{value ?? 'N/A'}
								</TableCell>
							)}
						</Highlight>
					)
			)}
		</TableRow>
	)
}
