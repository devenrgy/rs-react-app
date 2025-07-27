import { Link } from 'react-router'

export const NotFound = () => {
	return (
		<div className='to-overlay flex min-h-dvh flex-col items-center justify-center bg-gradient-to-br from-neutral-950 px-4'>
			<div className='bg-highlight-low w-full max-w-md space-y-6 rounded-2xl p-8 shadow-xl'>
				<div className='space-y-3 text-center'>
					<div className='inline-flex rounded-full bg-rose-100 p-4'>
						<div className='rounded-full bg-rose-200 p-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-12 w-12 text-rose-600'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
								/>
							</svg>
						</div>
					</div>
					<h1 className='text-love text-5xl font-semibold'>404</h1>
					<h2 className='text-rose text-2xl font-semibold'>Page Not Found</h2>
					<p className='text-muted text-balance'>
						Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
					</p>
				</div>
				<Link
					to='/'
					className='bg-iris hover:bg-iris/90 focus:ring-iris/50 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-center text-base text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='mr-2 h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
						/>
					</svg>
					Return to Homepage
				</Link>
			</div>
		</div>
	)
}
