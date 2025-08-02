import { Home, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router'

import { routes } from '@/configs/routes'

export const NotFound = () => {
	return (
		<div className='to-overlay flex min-h-dvh flex-col items-center justify-center px-4 dark:bg-gradient-to-br dark:from-neutral-950'>
			<div className='bg-pine dark:bg-highlight-low w-full max-w-md space-y-6 rounded-2xl p-8 shadow-xl'>
				<div className='space-y-3 text-center'>
					<div className='inline-flex rounded-full bg-black/20 p-4 dark:bg-rose-100'>
						<div className='rounded-full bg-black/40 p-4 dark:bg-rose-200'>
							<TriangleAlert className='h-12 w-12 text-rose-500 dark:text-rose-600' />
						</div>
					</div>
					<h1 className='dark:text-love text-5xl font-semibold text-black/50'>404</h1>
					<h2 className='dark:text-rose text-rose text-2xl font-semibold'>Page Not Found</h2>
					<p className='dark:text-muted text-balance text-white'>
						Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
					</p>
				</div>
				<Link
					to={routes.home.path}
					className='dark:bg-iris dark:hover:bg-iris/90 dark:focus-visible:ring-iris/50 inline-flex w-full items-center justify-center rounded-full bg-black/20 px-6 py-3 text-center text-lg font-medium text-white transition-colors hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 dark:text-base'
				>
					<Home className='mr-2' />
					Return to Homepage
				</Link>
			</div>
		</div>
	)
}
