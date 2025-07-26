import { Link } from 'react-router'

export const NotFound = () => {
	return (
		<main className='grid pt-40 pb-20 min-h-dvh'>
			<section className='flex flex-col justify-center items-center mx-auto px-4 h-full text-lg container'>
				<h1 className='mb-6 font-medium text-love text-7xl capitalize text-balance'>
					404
				</h1>
				<p className='mb-8 max-w-md text-muted text-center'>
					Sorry, we couldn't find the page you're looking for.
				</p>
				<Link
					to='/'
					className='inline-block bg-pine hover:bg-pine/80 px-5 py-2 rounded-full text-white transition-colors'
				>
					Return to Home
				</Link>
			</section>
		</main>
	)
}
