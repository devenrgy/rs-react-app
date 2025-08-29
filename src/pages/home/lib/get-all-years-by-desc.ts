import type { CountryData } from '../model'

export const getAllYearsByDesc = (data: Record<string, CountryData>) => {
	return [...new Set(Object.values(data).flatMap(country => country.data.map(data => data.year)))].sort((a, b) => b - a)
}
