import { Link } from 'react-router'

export const NotFound = () => {
	return (
		<div className='grid min-h-dvh place-content-center'>
			<p className='mb-5 text-center text-3xl text-balance'>Nothing found</p>
			<Link to='/' className='mt-4 rounded-full bg-iris px-4 py-2 text-center text-xl text-base'>
				Go back to Home
			</Link>
		</div>
	)
}
