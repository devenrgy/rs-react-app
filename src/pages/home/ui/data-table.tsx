import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared'

import type { TableColumns } from '..'
import data from '../config/data.json'
import { DataTableRow } from './data-table-row'

type CountryData = {
	iso_code: string
	data: Array<{
		year: number
		population?: number
	}>
}

type CountryEntry = [string, CountryData]

const createFilterBySearchCountry =
	(searchCountry: string) =>
	([country]: CountryEntry) =>
		country.toLowerCase().includes(searchCountry.toLowerCase())

const createTransformCountryData =
	(year: number) =>
	([countryName, countryData]: CountryEntry): CountryEntry => [
		countryName,
		{
			...countryData,
			data: countryData.data.filter(data => data.year === year)
		}
	]

const createSortData =
	(sort: string, order: string) =>
	([countryA, countryAData]: CountryEntry, [countryB, countryBData]: CountryEntry) => {
		switch (sort) {
			case 'country':
				return sortByCountry(countryA, countryB, order)

			case 'population':
				return sortByPopulation(countryAData, countryBData, order)

			default:
				return 0
		}
	}

const sortByCountry = (countryA: string, countryB: string, order: string): number => {
	return order === 'asc' ? countryA.localeCompare(countryB) : countryB.localeCompare(countryA)
}

const sortByPopulation = (countryAData: CountryData, countryBData: CountryData, order: string): number => {
	const popA = countryAData.data[0]?.population
	const popB = countryBData.data[0]?.population

	return comparePopulation(popA, popB, order)
}

const comparePopulation = (popA: number | undefined, popB: number | undefined, order: string): number => {
	if (popA == null && popB == null) return 0
	if (popA == null) return 1
	if (popB == null) return -1

	return order === 'asc' ? popA - popB : popB - popA
}

interface DataTableProps {
	columns: TableColumns
	sort: string
	order: string
	year: number
	searchCountry: string
}

export const DataTable = ({ columns, sort, order, year, searchCountry }: DataTableProps) => {
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
