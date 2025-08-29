import type { CountryData } from '..'

const comparePopulation = (popA: number | undefined, popB: number | undefined, order: string): number => {
	if (popA == null && popB == null) return 0
	if (popA == null) return 1
	if (popB == null) return -1

	return order === 'asc' ? popA - popB : popB - popA
}

export const sortByPopulation = (countryAData: CountryData, countryBData: CountryData, order: string): number => {
	const popA = countryAData.data[0]?.population
	const popB = countryBData.data[0]?.population

	return comparePopulation(popA, popB, order)
}
