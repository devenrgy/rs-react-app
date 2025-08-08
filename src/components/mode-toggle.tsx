import { Moon, Sun } from 'lucide-react'

import { cn } from '@/lib/utils/helpers'
import { useTheme } from '@/providers/theme-provider'

export const ModeToggle = ({ className }: { className?: string }) => {
	const { handleUpdateTheme } = useTheme()

	return (
		<button
			className={cn(
				'bg-rose dark:bg-iris dark:hover:bg-rose hover:bg-iris group flex cursor-pointer rounded-full p-2 duration-200 dark:text-base',
				className
			)}
			type='button'
			onClick={handleUpdateTheme}
		>
			<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all group-hover:scale-0 dark:-rotate-90 dark:scale-0 dark:group-hover:scale-100' />
			<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all group-hover:rotate-0 group-hover:scale-100 dark:rotate-0 dark:scale-100 dark:group-hover:scale-0' />
			<span className='sr-only'>Toggle theme</span>
		</button>
	)
}
