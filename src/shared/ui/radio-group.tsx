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

export const RadioGroupItem = ({ name, value, className }: React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<label className='flex items-center gap-2 text-sm capitalize'>
			<input className={cn('h-4 w-4', className)} type='radio' name={name} value={value} />
			{value}
		</label>
	)
}
