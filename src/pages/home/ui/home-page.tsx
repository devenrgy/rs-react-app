import { Suspense, useReducer } from 'react'

import { Skeleton } from '@/shared'

import { type ColumnName, type TableColumns, tableReducer, tableState } from '..'
import { DataTable } from './data-table'
import { DataTableControls } from './data-table-controls'
import { DataTableModalSettings } from './data-table-modal-settings'

export const HomePage = () => {
	const [state, dispatch] = useReducer(tableReducer, tableState)

	const handleChangeOrder = (value: string) => dispatch({ type: 'order', payload: value })
	const handleChangeSort = (value: string) => dispatch({ type: 'sort', payload: value })
	const handleChangeYear = (value: number) => dispatch({ type: 'year', payload: value })
	const handleChangeSearchCountry = (value: string) => dispatch({ type: 'searchCountry', payload: value })
	const handleChangeColumnVisibility = (data: string[]) =>
		dispatch({
			type: 'columns',
			payload: Object.keys(state.columns).reduce<TableColumns>(
				(acc, key) => ({
					...acc,
					[key]: {
						...state.columns[key as ColumnName],
						isVisible: data.includes(key as ColumnName)
					}
				}),
				{} as TableColumns
			)
		})

	return (
		<main className='container'>
			<section className='relative'>
				<DataTableControls
					className='sticky top-0 z-10'
					handleSearch={handleChangeSearchCountry}
					handleSort={handleChangeSort}
					handleOrder={handleChangeOrder}
					handleYear={handleChangeYear}
					currentYear={state.year}
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

				<DataTableModalSettings data={state.columns} onSubmit={handleChangeColumnVisibility} />
			</section>
		</main>
	)
}
