import { RefreshCcw } from 'lucide-react'

import { cn } from '@/lib/utils/helpers'

interface Props {
	isLoading?: boolean
	handleQueryRefresh: () => void
	className?: string
	size?: number
}

export const RefreshQueryButton = ({ isLoading, handleQueryRefresh, className, size = 20 }: Props) => {
	return (
		<button
			aria-label='Refresh All Cache'
			onClick={handleQueryRefresh}
			type='button'
			className={cn(
				'dark:bg-pine bg-rose dark:text-text cursor-pointer rounded-full p-2 text-base text-sm hover:animate-spin',
				{
					'animate-spin delay-200': isLoading
				},
				className
			)}
		>
			<RefreshCcw size={size} />
		</button>
	)
}
