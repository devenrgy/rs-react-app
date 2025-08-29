import type { CountryEntry } from '..'
import { sortByCountry } from './sort-by-country'
import { sortByPopulation } from './sort-by-population'

export const createFilterBySearchCountry =
	(searchCountry: string) =>
	([country]: CountryEntry) =>
		country.toLowerCase().includes(searchCountry.toLowerCase())

export const createTransformCountryData =
	(year: number) =>
	([countryName, countryData]: CountryEntry): CountryEntry => [
		countryName,
		{
			...countryData,
			data: countryData.data.filter(data => data.year === year)
		}
	]

export const createSortData =
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
