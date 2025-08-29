import { use } from 'react'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared'

import {
	type CountryData,
	createFilterBySearchCountry,
	createSortData,
	createTransformCountryData,
	type TableColumns
} from '..'
import { DataTableRow } from './data-table-row'

interface DataTableProps {
	dataPromise: Promise<Record<string, CountryData>>
	columns: TableColumns
	sort: string
	order: string
	year: number
	searchCountry: string
}

export const DataTable = ({ dataPromise, columns, sort, order, year, searchCountry }: DataTableProps) => {
	const data = use(dataPromise)

	console.log(data)

	const sortedData = Object.entries(data)
		.filter(createFilterBySearchCountry(searchCountry))
		.map(createTransformCountryData(year))
		.sort(createSortData(sort, order))

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{Object.entries(columns).map(
						([columnName, { className, name, isVisible }]) =>
							isVisible && (
								<TableHead key={columnName} className={className}>
									{name}
								</TableHead>
							)
					)}
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedData.map(([country, countryData]) => (
					<DataTableRow key={country} country={country} countryData={countryData} columns={columns} />
				))}
			</TableBody>
		</Table>
	)
}
