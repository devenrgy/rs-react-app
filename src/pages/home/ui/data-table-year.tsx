import { memo, use, useMemo } from 'react'

import { Label, Select } from '@/shared'

import { type CountryData, getAllYearsByDesc } from '..'

interface DataTableYearProps {
	dataPromise: Promise<Record<string, CountryData>>
	handleYear: (value: number) => void
}

export const DataTableYear = memo(({ dataPromise, handleYear }: DataTableYearProps) => {
	const data = use(dataPromise)
	const allYearsByDesc = useMemo(() => getAllYearsByDesc(data), [data])
	const lastYear = useMemo(() => allYearsByDesc[0], [allYearsByDesc])

	return (
		<>
			<Label htmlFor='year'>Filter by year:</Label>
			<Select
				onChange={e => handleYear(Number(e.currentTarget.value))}
				id='year'
				name='year'
				defaultValue={lastYear}
				options={allYearsByDesc}
			/>
		</>
	)
})
