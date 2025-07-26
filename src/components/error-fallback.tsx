import { cn } from '@/lib/utils/helpers'

type Props = {
	message?: string
	showButton?: boolean
	handleResetError?: () => void
	className?: string
}

export const ErrorFallback = ({ message, showButton, handleResetError, className }: Props) => {
	return (
		<main className={cn('place-items-center grid h-dvh container', className)}>
			<section className='flex flex-col items-center gap-10'>
				<h1 className='font-bold text-4xl text-center first-letter:capitalize text-balance'>Something went wrong</h1>

				{message && <p>{message}</p>}

				{showButton && (
					<button
						type='button'
						onClick={handleResetError}
						className='bg-pine hover:bg-pine/80 px-5 py-3 rounded-3xl w-full max-w-[200px] text-xl capitalize transition-colors duration-200 cursor-pointer'
					>
						Try again
					</button>
				)}
			</section>
		</main>
	)
}
