import { CheckIcon } from 'lucide-react'

import { cn } from '..'

const Checkbox = ({ className, ...props }: React.ComponentProps<'input'>) => {
	return (
		<label
			className={cn(
				'relative flex size-5 cursor-pointer items-center justify-center border border-input shadow-xs transition-shadow disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
				className
			)}
		>
			<input
				className='peer absolute -z-10 size-5 appearance-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
				type='checkbox'
				{...props}
			/>
			<CheckIcon className='opacity-0 duration-200 peer-checked:opacity-100' />
		</label>
	)
}

export { Checkbox }
