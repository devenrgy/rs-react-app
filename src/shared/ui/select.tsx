import { cn } from '..'

interface SelectProps extends React.ComponentProps<'select'> {
	options: string[] | number[]
}

export const Select = ({ className, options, ...props }: SelectProps) => {
	return (
		<select className={cn('border bg-neutral-950 p-1 capitalize', className)} {...props}>
			{options.map(option => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	)
}
