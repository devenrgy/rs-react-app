import { Suspense, useReducer } from 'react'

import { Skeleton } from '@/shared'

import { type ColumnValues, tableReducer, tableState } from '..'
import { DataTable } from './data-table'
import { DataTableControls } from './data-table-controls'
import { DataTableModalSettings } from './data-table-modal-settings'

export const HomePage = () => {
	const [state, dispatch] = useReducer(tableReducer, tableState)

	const handleChangeOrder = (value: string) => dispatch({ type: 'order', payload: value })
	const handleChangeSort = (value: string) => dispatch({ type: 'sort', payload: value })
	const handleChangeYear = (value: number) => dispatch({ type: 'year', payload: value })
	const handleChangeSearchCountry = (value: string) => dispatch({ type: 'searchCountry', payload: value })
	const handleChangeColumnVisibility = (name: string, values: ColumnValues) =>
		dispatch({ type: 'columns', payload: { ...state.columns, [name]: { ...values, isVisible: !values.isVisible } } })

	return (
		<main className='container'>
			<section className='relative'>
				<DataTableControls
					className='sticky top-0 z-10'
					handleSearch={handleChangeSearchCountry}
					handleSort={handleChangeSort}
					handleOrder={handleChangeOrder}
					handleYear={handleChangeYear}
				/>

				<Suspense fallback={<Skeleton className='h-12' />}>
					<DataTable
						columns={state.columns}
						sort={state.sort}
						order={state.order}
						year={state.year}
						searchCountry={state.searchCountry}
					/>
				</Suspense>

				<DataTableModalSettings data={state.columns} onChange={handleChangeColumnVisibility} />
			</section>
		</main>
	)
}
