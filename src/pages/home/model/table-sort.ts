export const tableSort = ([countryA, countryAData], [countryB, countryBData], sort: string, order: string) => {
	switch (sort) {
		case 'country':
			return order === 'asc' ? countryA.localeCompare(countryB) : countryB.localeCompare(countryA)
		case 'population': {
			const popA = countryAData.data[0].population
			const popB = countryBData.data[0].population

			if ((popA === undefined || popA === null) && (popB === undefined || popB === null)) {
				return 0
			}

			if (popA === undefined || popA === null) {
				return 1
			}

			if (popB === undefined || popB === null) {
				return -1
			}

			return order === 'asc' ? popA - popB : popB - popA
		}
		default:
			return 0
	}
}
