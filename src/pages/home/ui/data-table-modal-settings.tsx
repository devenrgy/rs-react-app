import { X } from 'lucide-react'
import { useRef } from 'react'

import { Button, Checkbox, Label } from '@/shared'

import type { TableColumns } from '..'

interface DataTableModalSettingsProps {
	data: TableColumns
	onSubmit: (data: string[]) => void
}

export const DataTableModalSettings = ({ data, onSubmit }: DataTableModalSettingsProps) => {
	const formRef = useRef<HTMLFormElement>(null)
	const dialogRef = useRef<HTMLDialogElement>(null)

	const handleClose = () => {
		formRef.current?.reset()
		dialogRef.current?.hidePopover()
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const data = Array.from(formData.keys())

		onSubmit(data)
		handleClose()
	}

	return (
		<dialog
			id='settings'
			popover='auto'
			ref={dialogRef}
			className='m-auto w-full max-w-md p-10 duration-500 backdrop:backdrop-blur-sm backdrop:duration-500 starting:scale-0 starting:opacity-0 starting:backdrop:opacity-0'
		>
			<form ref={formRef} onSubmit={handleSubmit} onReset={handleClose}>
				<fieldset className='grid gap-5'>
					<legend className='mb-5 font-semibold capitalize'>Customize table</legend>

					<ul className='flex flex-col gap-2'>
						{Object.entries(data).map(([columnName, columnValues]) => (
							<li key={columnName} className='flex items-center gap-2'>
								<Checkbox id={columnName} name={columnName} defaultChecked={columnValues.isVisible} />
								<Label htmlFor={columnName}>{columnName}</Label>
							</li>
						))}
					</ul>

					<p className='flex justify-end gap-2'>
						<Button type='reset' variant='outline'>
							Cancel
						</Button>
						<Button type='submit' className='btn'>
							Save changes
						</Button>
					</p>
				</fieldset>
			</form>

			<Button
				className='absolute top-5 right-5'
				onClick={handleClose}
				variant='ghost'
				size='icon'
				aria-label='Close dialog'
			>
				<X className='size-5' />
			</Button>
		</dialog>
	)
}
