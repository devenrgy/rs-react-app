export const sortByCountry = (countryA: string, countryB: string, order: string): number => {
	return order === 'asc' ? countryA.localeCompare(countryB) : countryB.localeCompare(countryA)
}
