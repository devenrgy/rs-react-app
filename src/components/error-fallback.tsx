interface Props {
	message?: string
	handleResetError?: () => void
	showRetryButton?: boolean
}

export const ErrorFallback = ({ message, handleResetError, showRetryButton = false }: Props) => {
	return (
		<main className='container grid h-dvh place-items-center'>
			<section className='flex flex-col items-center gap-10'>
				<h1 className='text-balance text-center text-4xl font-bold first-letter:capitalize'>Something went wrong!</h1>

				{message && <p>{message}</p>}

				{showRetryButton && (
					<button
						type='button'
						onClick={handleResetError}
						className='bg-pine hover:bg-pine/80 w-full max-w-[200px] cursor-pointer rounded-3xl px-5 py-3 text-xl capitalize text-white transition-colors duration-200'
					>
						Try again
					</button>
				)}
			</section>
		</main>
	)
}
