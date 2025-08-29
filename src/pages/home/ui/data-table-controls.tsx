import { Settings } from 'lucide-react'
import { Suspense } from 'react'

import { Button, cn, Input, Label, Select, Skeleton } from '@/shared'

import type { CountryData } from '..'
import { DataTableYear } from './data-table-year'

interface DataTableControlsProps {
	dataPromise: Promise<Record<string, CountryData>>
	className?: string
	handleSearch: (value: string) => void
	handleSort: (value: string) => void
	handleOrder: (value: string) => void
	handleYear: (value: number) => void
}

const DEFAULT_SORT_OPTIONS = ['country', 'population']
const DEFAULT_ORDER_OPTIONS = ['asc', 'desc']

export const DataTableControls = ({
	dataPromise,
	className,
	handleSearch,
	handleSort,
	handleOrder,
	handleYear
}: DataTableControlsProps) => {
	return (
		<header className={cn('flex items-center gap-10 bg-background py-5 text-sm', className)}>
			<Input
				onChange={e => handleSearch(e.currentTarget.value)}
				className='flex-1'
				placeholder='Search by country...'
			/>

			<p className='flex items-center gap-2'>
				<Label htmlFor='sort'>Sort by:</Label>
				<Select
					onChange={e => handleSort(e.currentTarget.value)}
					id='sort'
					name='sort'
					options={DEFAULT_SORT_OPTIONS}
				/>
				<Select onChange={e => handleOrder(e.currentTarget.value)} name='order' options={DEFAULT_ORDER_OPTIONS} />
			</p>

			<p className='flex items-center gap-2'>
				<Suspense fallback={<Skeleton className='h-8 w-40' />}>
					<DataTableYear dataPromise={dataPromise} handleYear={handleYear} />
				</Suspense>
			</p>

			<Button popoverTarget='settings' size='icon' aria-label='Settings'>
				<Settings />
			</Button>
		</header>
	)
}
