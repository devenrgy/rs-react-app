import { Link, useLocation } from 'react-router'

import { cn } from '@/lib/utils/helpers'

interface Props {
	className?: string
	currentPage: number
	totalCount: (string | number)[]
}

export const Pagination = ({ totalCount, currentPage, className }: Props) => {
	const location = useLocation()

	const hasPreviousPage = currentPage - 1 > 0
	const hasNextPage = currentPage + 1 <= Number(totalCount.at(-1))

	const addUrlParams = (page: number) => {
		const searchParams = new URLSearchParams(location.search)
		searchParams.set('page', page.toString())
		return `?${searchParams.toString()}`
	}

	return (
		<div className={cn('mx-auto flex items-center justify-center px-5 py-3 sm:px-6', className)}>
			<div className='grid grid-cols-2 justify-between gap-10 sm:hidden'>
				{hasPreviousPage ? (
					<Link
						aria-label='mobile-previous'
						to={{ search: addUrlParams(currentPage - 1) }}
						className='bg-pine dark:bg-iris disabled:bg-iris/70 hover:bg-iris/80 relative inline-flex items-center rounded-md border px-5 py-3 text-lg font-medium text-white dark:text-base'
					>
						Previous
					</Link>
				) : (
					<button
						type='button'
						aria-label='mobile-previous'
						disabled
						className='bg-pine dark:bg-iris disabled:bg-iris/70 relative inline-flex items-center rounded-md px-5 py-3 text-lg font-medium text-white disabled:text-black/50'
					>
						Previous
					</button>
				)}

				{hasNextPage ? (
					<Link
						aria-label='mobile-next'
						to={{ search: addUrlParams(currentPage + 1) }}
						className='bg-pine dark:bg-iris disabled:bg-iris/70 hover:bg-iris/80 relative grid place-content-center rounded-md px-5 py-3 text-lg font-medium text-white dark:text-base'
					>
						Next
					</Link>
				) : (
					<button
						type='button'
						aria-label='mobile-next'
						disabled
						className='bg-pine dark:bg-iris disabled:bg-iris-70 relative grid place-content-center rounded-md px-5 py-3 text-center text-lg font-medium text-white disabled:text-black/50'
					>
						Next
					</button>
				)}
			</div>
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
				<div>
					<nav aria-label='Pagination' className='shadow-xs isolate inline-flex -space-x-px rounded-md'>
						{hasPreviousPage ? (
							<Link
								aria-label='desktop-previous'
								to={{ search: addUrlParams(currentPage - 1) }}
								className='ring-pine dark:ring-iris hover:bg-pine dark:hover:bg-iris/80 text-pine relative inline-flex items-center rounded-l-full px-5 py-3 ring-2 ring-inset hover:text-white focus:z-20 focus:outline-offset-0 dark:text-white dark:hover:text-base'
							>
								<span className='sr-only'>Previous</span>
								<svg viewBox='0 0 20 20' fill='currentColor' data-slot='icon' aria-hidden='true' className='size-5'>
									<path
										d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
										clipRule='evenodd'
										fillRule='evenodd'
									/>
								</svg>
							</Link>
						) : (
							<button
								type='button'
								disabled
								aria-label='desktop-previous'
								className='ring-pine dark:ring-iris text-pine/50 relative inline-flex items-center rounded-l-full px-5 py-3 ring-2 ring-inset focus:z-20 focus:outline-offset-0 dark:text-white/50'
							>
								<span className='sr-only'>Previous</span>
								<svg viewBox='0 0 20 20' fill='currentColor' data-slot='icon' aria-hidden='true' className='size-5'>
									<path
										d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
										clipRule='evenodd'
										fillRule='evenodd'
									/>
								</svg>
							</button>
						)}

						{totalCount.map((page, index) =>
							typeof page === 'number' ? (
								<Link
									className={cn(
										'ring-pine dark:ring-iris text-pine relative inline-flex items-center px-5 py-3 text-sm font-medium ring-2 ring-inset focus:z-20',
										{
											'bg-pine dark:bg-iris focus-visible:outline-pine text-white focus:outline-offset-2 focus-visible:outline-2 dark:text-base':
												currentPage === page
										},
										{
											'hover:bg-pine dark:hover:bg-iris/80 hover:text-white dark:text-white dark:hover:text-base':
												currentPage !== page
										}
									)}
									key={page}
									to={{ search: addUrlParams(page) }}
								>
									{page}
								</Link>
							) : (
								<button
									type='button'
									className='ring-pine text-pine dark:ring-iris relative inline-flex items-center px-5 py-3 text-sm font-medium ring-2 ring-inset focus:outline-offset-0 dark:text-white'
									key={`${page}-${index}`}
								>
									{page}
								</button>
							)
						)}

						{hasNextPage ? (
							<Link
								aria-label='desktop-next'
								to={{ search: addUrlParams(currentPage + 1) }}
								className='ring-pine dark:ring-iris text-pine hover:bg-pine dark:hover:bg-iris/80 relative inline-flex items-center rounded-r-full px-5 py-3 ring-2 ring-inset hover:text-white focus:z-20 focus:outline-offset-0 dark:text-white dark:hover:text-base'
							>
								<span className='sr-only'>Next</span>
								<svg viewBox='0 0 20 20' fill='currentColor' data-slot='icon' aria-hidden='true' className='size-5'>
									<path
										d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
										clipRule='evenodd'
										fillRule='evenodd'
									/>
								</svg>
							</Link>
						) : (
							<button
								type='button'
								disabled
								aria-label='desktop-next'
								className='ring-pine text-pine/50 dark:ring-iris relative inline-flex items-center rounded-r-full px-5 py-3 ring-2 ring-inset focus:z-20 focus:outline-offset-0 dark:text-white/50'
							>
								<span className='sr-only'>Next</span>
								<svg viewBox='0 0 20 20' fill='currentColor' data-slot='icon' aria-hidden='true' className='size-5'>
									<path
										d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
										clipRule='evenodd'
										fillRule='evenodd'
									/>
								</svg>
							</button>
						)}
					</nav>
				</div>
			</div>
		</div>
	)
}
