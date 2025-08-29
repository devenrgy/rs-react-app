export type ColumnValues = {
	name: string
	isVisible: boolean
	className: string
}

const tableColumns = {
	iso_code: { name: 'ISO', isVisible: true, className: 'w-15' },
	country: { name: 'Country', isVisible: true, className: 'text-center' },
	year: { name: 'Year', isVisible: true, className: 'w-15' },
	population: { name: 'Population', isVisible: true, className: 'w-40 text-center' },
	methane: { name: 'Methane', isVisible: false, className: 'w-20' },
	oil_co2: { name: 'Oil CO2', isVisible: false, className: 'w-20' },
	temperature_change_from_co2: { name: 'Temperature change from CO2', isVisible: false, className: 'w-20' },
	co2: { name: 'CO2', isVisible: true, className: 'w-20' },
	co2_per_capita: { name: 'CO2 per capita', isVisible: true, className: 'w-20 text-right' }
}

export type ColumnName = keyof typeof tableColumns
export type TableColumns = Record<ColumnName, ColumnValues>

export const tableState = {
	searchCountry: '',
	sort: 'country',
	order: 'asc',
	year: 2023,
	columns: tableColumns
}

type Actions =
	| { type: 'searchCountry'; payload: string }
	| { type: 'sort'; payload: string }
	| { type: 'order'; payload: string }
	| { type: 'year'; payload: number }
	| { type: 'columns'; payload: TableColumns }

export const tableReducer = (state: typeof tableState, action: Actions) => {
	switch (action.type) {
		case 'searchCountry':
			return { ...state, searchCountry: action.payload }
		case 'sort':
			return { ...state, sort: action.payload }
		case 'order':
			return { ...state, order: action.payload }
		case 'year':
			return { ...state, year: action.payload }
		case 'columns':
			return { ...state, columns: action.payload }
		default:
			return state
	}
}
