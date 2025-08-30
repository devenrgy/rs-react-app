export type CountryData = {
	iso_code: string
	data: Array<{
		year: number
		co2?: number
		co2_per_capita?: number
		methane?: number
		oil_co2?: number
		temperature_change_from_co2?: number
		population?: number
	}>
}

export type CountryEntry = [countryName: string, countryData: CountryData]
