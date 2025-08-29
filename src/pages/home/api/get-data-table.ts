import type { CountryData } from '..'

export const getDataTable = async () => {
	return fetch('https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json').then(res =>
		res.json()
	) as Promise<Record<string, CountryData>>
}
