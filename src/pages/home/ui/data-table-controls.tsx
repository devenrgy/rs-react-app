import { Settings } from 'lucide-react'

import { Button, cn, Input, Label, Select } from '@/shared'

interface DataTableControlsProps {
	className?: string
	handleSearch: (value: string) => void
	handleSort: (value: string) => void
	handleOrder: (value: string) => void
	handleYear: (value: number) => void
}

export const DataTableControls = ({
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
					options={['country', 'population']}
				/>
				<Select onChange={e => handleOrder(e.currentTarget.value)} name='order' options={['asc', 'desc']} />
			</p>

			<p className='flex items-center gap-2'>
				<Label htmlFor='year'>Filter by year:</Label>
				<Select
					onChange={e => handleYear(Number(e.currentTarget.value))}
					id='year'
					name='year'
					options={['2023', '2022', '2021']}
				/>
			</p>

			<Button popoverTarget='settings' size='icon' aria-label='Settings'>
				<Settings />
			</Button>
		</header>
	)
}
