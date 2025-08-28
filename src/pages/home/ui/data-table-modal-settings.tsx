import { X } from 'lucide-react'

import { Button, Checkbox, Label } from '@/shared'

import type { ColumnValues, TableColumns } from '..'

interface DataTableModalSettingsProps {
	data: TableColumns
	onChange: (name: string, values: ColumnValues) => void
}

export const DataTableModalSettings = ({ data, onChange }: DataTableModalSettingsProps) => {
	return (
		<dialog
			id='settings'
			popover='auto'
			className='m-auto w-full max-w-md p-10 duration-500 backdrop:backdrop-blur-sm backdrop:duration-500 starting:scale-0 starting:opacity-0 starting:backdrop:opacity-0'
		>
			<form>
				<fieldset className='grid gap-5'>
					<legend className='mb-5 font-semibold capitalize'>Customize table</legend>

					<ul className='flex flex-col gap-2'>
						{Object.entries(data).map(([columnName, columnValues]) => (
							<li key={columnName} className='flex items-center gap-2'>
								<Checkbox
									onChange={() => onChange(columnName, columnValues)}
									id={columnName}
									name={columnName}
									value={columnName}
									defaultChecked={columnValues.isVisible}
								/>
								<Label htmlFor={columnName}>{columnName}</Label>
							</li>
						))}
					</ul>

					<p className='flex justify-end gap-2'>
						<Button popoverTarget='settings' variant='outline'>
							Cancel
						</Button>
						<Button className='btn'>Save changes</Button>
					</p>
				</fieldset>
			</form>

			<Button
				className='absolute top-5 right-5'
				popoverTarget='settings'
				variant='ghost'
				size='icon'
				aria-label='Close dialog'
			>
				<X className='size-5' />
			</Button>
		</dialog>
	)
}
