export type CountryData = {
	iso_code: string
	data: Array<{
		year: number
		population?: number
	}>
}

export type CountryEntry = [countryName: string, countryData: CountryData]
