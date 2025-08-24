import { cn } from '../lib'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	className?: string
}

export const Checkbox = ({ label, className, ...props }: CheckboxProps) => {
	return (
		<p>
			<label className='flex items-center gap-2 text-sm'>
				<input className={cn('h-4 w-4', className)} type='checkbox' {...props} />
				{label}
			</label>
		</p>
	)
}
