import { create, type StateCreator } from 'zustand'

type CountriesState = {
	countries: string[]
}

const store: StateCreator<CountriesState> = () => ({
	countries: ['Russia', 'USA', 'Japan']
})

const useCountriesStore = create(store)

export const useCountries = () => useCountriesStore(state => state.countries)
