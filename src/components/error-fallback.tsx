import { isRouteErrorResponse, useRouteError } from 'react-router'

export const ErrorFallback = () => {
	const error = useRouteError()
	let errorMessage: string

	if (isRouteErrorResponse(error)) {
		errorMessage = error.statusText
	} else if (error instanceof Error) {
		errorMessage = error.message
	} else if (typeof error === 'string') {
		errorMessage = error
	} else {
		console.error(error)
		errorMessage = 'Unknown error'
	}

	return (
		<main id='error-page' className='container grid h-dvh place-items-center'>
			<section className='flex flex-col items-center gap-8 text-lg'>
				<h1 className='text-balance text-center text-6xl font-bold'>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>{errorMessage}</p>
			</section>
		</main>
	)
}
