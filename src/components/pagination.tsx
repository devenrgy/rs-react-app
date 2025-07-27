import { Link, useLocation } from 'react-router'

import { cn } from '@/lib/utils/helpers'

interface Props {
	currentPage: number
	totalCount: (string | number)[]
}

export const Pagination = ({ totalCount, currentPage }: Props) => {
	const location = useLocation()

	const hasPreviousPage = currentPage - 1 > 0
	const hasNextPage = currentPage + 1 < Number(totalCount.at(-1))

	const addUrlParams = (page: number) => {
		const searchParams = new URLSearchParams(location.search)
		searchParams.set('page', page.toString())
		return `?${searchParams.toString()}`
	}

	return (
		<div className='mx-auto flex items-center justify-center px-4 py-3 sm:px-6'>
			<div className='flex flex-1 justify-between sm:hidden'>
				{hasPreviousPage ? (
					<Link
						to={{ search: addUrlParams(currentPage - 1) }}
						className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50'
					>
						Previous
					</Link>
				) : (
					<button className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
						Previous
					</button>
				)}

				{hasNextPage ? (
					<Link
						to={{ search: addUrlParams(currentPage + 1) }}
						className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
					>
						Next
					</Link>
				) : (
					<button className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700'>
						Next
					</button>
				)}
			</div>
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
				<div>
					<nav aria-label='Pagination' className='isolate inline-flex -space-x-px rounded-md shadow-xs'>
						{hasPreviousPage ? (
							<Link
								to={{ search: addUrlParams(currentPage - 1) }}
								className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
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
							<button className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0'>
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
										'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-gray-300 ring-inset focus:z-20',
										{
											'bg-indigo-600 focus:outline-offset-2 focus-visible:outline-2 focus-visible:outline-indigo-600':
												currentPage === page
										},
										{
											'hover:bg-gray-50 hover:text-base': currentPage !== page
										}
									)}
									key={page}
									to={{ search: addUrlParams(page) }}
								>
									{page}
								</Link>
							) : (
								<button
									className='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset focus:outline-offset-0'
									key={`${page}-${index}`}
								>
									{page}
								</button>
							)
						)}

						{hasNextPage ? (
							<Link
								to={{ search: addUrlParams(currentPage + 1) }}
								className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
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
							<button className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0'>
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
