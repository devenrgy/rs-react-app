import { Link } from 'react-router'

export const NotFound = () => {
	return (
		<div className='to-overlay flex min-h-dvh flex-col items-center justify-center px-4 dark:bg-gradient-to-br dark:from-neutral-950'>
			<div className='bg-pine dark:bg-highlight-low w-full max-w-md space-y-6 rounded-2xl p-8 shadow-xl'>
				<div className='space-y-3 text-center'>
					<div className='inline-flex rounded-full bg-black/20 p-4 dark:bg-rose-100'>
						<div className='rounded-full bg-black/40 p-4 dark:bg-rose-200'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-12 w-12 text-rose-500 dark:text-rose-600'
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
					<h1 className='dark:text-love text-5xl font-semibold text-black/50'>404</h1>
					<h2 className='dark:text-rose text-rose text-2xl font-semibold'>Page Not Found</h2>
					<p className='dark:text-muted text-balance text-white'>
						Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
					</p>
				</div>
				<Link
					to='/'
					className='dark:bg-iris dark:hover:bg-iris/90 dark:focus-visible:ring-iris/50 inline-flex w-full items-center justify-center rounded-full bg-black/20 px-6 py-3 text-center text-lg font-medium text-white transition-colors hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 dark:text-base'
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
