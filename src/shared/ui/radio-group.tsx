import { cn } from '../lib'

export const RadioGroup = ({
	name,
	className,
	children
}: {
	name: string
	className?: string
	children: (name: string) => React.ReactNode
}) => {
	return <p className={cn('grid gap-3', className)}>{children(name)}</p>
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string | React.ReactNode
}

export const RadioGroupItem = ({ name, value, className, label, ...props }: RadioGroupItemProps) => {
	return (
		<label className='flex items-center gap-2 text-sm capitalize'>
			{label}
			<input className={cn('h-4 w-4', className)} type='radio' name={name} value={value} {...props} />
		</label>
	)
}
