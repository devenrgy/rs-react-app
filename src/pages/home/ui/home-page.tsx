import { Suspense, useCallback, useDeferredValue, useReducer } from 'react'

import { Skeleton } from '@/shared'

import { type ColumnName, getDataTable, type TableColumns, tableReducer, tableState } from '..'
import { DataTable } from './data-table'
import { DataTableControls } from './data-table-controls'
import { DataTableModalSettings } from './data-table-modal-settings'

const initialDataPromise = getDataTable()

export const HomePage = () => {
	const [state, dispatch] = useReducer(tableReducer, tableState)
	const deferredSearchCountry = useDeferredValue(state.searchCountry)

	const handleChangeOrder = useCallback((value: string) => dispatch({ type: 'order', payload: value }), [])
	const handleChangeSort = useCallback((value: string) => dispatch({ type: 'sort', payload: value }), [])
	const handleChangeYear = useCallback((value: number) => dispatch({ type: 'year', payload: value }), [])
	const handleChangeSearchCountry = useCallback(
		(value: string) => dispatch({ type: 'searchCountry', payload: value }),
		[]
	)
	const handleChangeColumnVisibility = useCallback(
		(data: string[]) =>
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
			}),
		[]
	)

	return (
		<main className='container'>
			<section className='relative'>
				<DataTableControls
					className='sticky top-0 z-10'
					dataPromise={initialDataPromise}
					handleSearch={handleChangeSearchCountry}
					handleSort={handleChangeSort}
					handleOrder={handleChangeOrder}
					handleYear={handleChangeYear}
				/>

				<Suspense fallback={<Skeleton className='h-210' />}>
					<DataTable
						dataPromise={initialDataPromise}
						columns={state.columns}
						sort={state.sort}
						order={state.order}
						year={state.year}
						searchCountry={deferredSearchCountry}
					/>
				</Suspense>

				<DataTableModalSettings data={state.columns} onSubmit={handleChangeColumnVisibility} />
			</section>
		</main>
	)
}
