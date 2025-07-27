interface Props {
	message?: string
	handleResetError?: () => void
	showButton?: boolean
}

export const ErrorFallback = ({ message, handleResetError, showButton = false }: Props) => {
	return (
		<main className='container grid h-dvh place-items-center'>
			<section className='flex flex-col items-center gap-10'>
				<h1 className='text-center text-4xl font-bold text-balance first-letter:capitalize'>Something went wrong!</h1>

				{message && <p>{message}</p>}

				{showButton && (
					<button
						type='button'
						onClick={handleResetError}
						className='w-full max-w-[200px] cursor-pointer rounded-3xl bg-pine px-5 py-3 text-xl capitalize transition-colors duration-200 hover:bg-pine/80'
					>
						Try again
					</button>
				)}
			</section>
		</main>
	)
}
