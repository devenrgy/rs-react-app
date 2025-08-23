import { cn } from '../lib'

interface CheckboxProps {
	label: string
	className?: string
}

export const Checkbox = ({ label, className }: CheckboxProps) => {
	return (
		<p>
			<label className='flex items-center gap-2 text-sm'>
				<input className={cn('h-4 w-4', className)} type='checkbox' />
				{label}
			</label>
		</p>
	)
}
