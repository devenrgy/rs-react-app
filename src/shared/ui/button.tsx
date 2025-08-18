interface ButtonProps<T extends string> extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
	data: T
	onClick?: (data: T) => void
}

export const Button = <T extends string>({ data, onClick, ...props }: ButtonProps<T>) => {
	return (
		<button onClick={() => onClick?.(data)} type='button' {...props}>
			{data}
		</button>
	)
}
