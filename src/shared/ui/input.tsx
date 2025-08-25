import { cn } from '../lib'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string | React.ReactNode
	labelClassName?: string
}

export const Input = ({ label, labelClassName, className, ...props }: InputProps) => {
	return (
		<p className='w-full text-sm'>
			<label className={labelClassName}>
				{label}
				<input
					type='text'
					className={cn(
						'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 shadow-xs flex h-9 w-full min-w-0 rounded-md bg-neutral-800 px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]',
						'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
						className
					)}
					{...props}
				/>
			</label>
		</p>
	)
}
