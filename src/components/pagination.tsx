import { NavLink, useLocation } from 'react-router'
import { cn } from '@/lib/utils/helpers'

type Props = {
	currentPage: number
	className?: string
	totalPages: (number | string)[] | undefined
}

export const Pagination = ({ className, totalPages = [], currentPage = 1 }: Props) => {
	const { search } = useLocation()

	const updatePageParam = (newPage: number) => {
		const params = new URLSearchParams(search)
		params.set('page', newPage.toString())
		return `?${params.toString()}`
	}

	const hasPrevPage = currentPage - 1 > 0
	const hasNextPage = currentPage + 1 <= Number(totalPages.at(-1))

	return (
		<nav aria-label='Pagination' className={cn('inline-flex isolate -space-x-px shadow-xs rounded-full', className)}>
			{hasPrevPage
				? (
						<NavLink to={{ search: updatePageParam(currentPage - 1) }} className='inline-flex focus:z-20 relative items-center hover:bg-iris/20 p-1.5 sm:p-3 rounded-l-full focus:outline-offset-0 ring-[1.5px] ring-highlight-med ring-inset text-iris cursor-pointer'>
							<span className='sr-only'>Previous</span>
							<svg viewBox='0 0 20 20' fill='currentColor' data-slot='icon' aria-hidden='true' className='size-5'>
								<path d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z' clipRule='evenodd' fillRule='evenodd' />
							</svg>
						</NavLink>
					)
				: (
						<button className='inline-flex focus:z-20 relative items-center p-1.5 sm:p-3 rounded-l-full ring-[1.5px] ring-highlight-med ring-inset text-iris/50 pointer-events-none'>
							<span className='sr-only'>Previous</span>
							<svg viewBox='0 0 20 20' fill='currentColor' data-slot='icon' aria-hidden='true' className='size-5'>
								<path d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z' clipRule='evenodd' fillRule='evenodd' />
							</svg>
						</button>
					)}
			{totalPages.map((page, index) => (
				typeof page === 'number'
					? (
							<NavLink
								to={{ search: updatePageParam(page) }}
								key={page}
								className={cn('inline-flex z-10 focus:z-20 relative items-center p-2 sm:px-5 sm:py-3 font-semibold text-sm', {
									'bg-iris focus-visible:outline-2 focus-visible:outline-iris focus-visible:outline-offset-2 text-base': currentPage === page,
									'hover:bg-iris/20 focus:outline-offset-0 ring-[1.5px] ring-highlight-med ring-inset text-iris/50 cursor-pointer hover:text-iris': currentPage !== page,
								})}
							>
								{page}
							</NavLink>
						)
					: (
							<button
								className='inline-flex z-10 focus:z-20 relative items-center p-1 sm:px-5 sm:py-3 ring-[1.5px] ring-highlight-med ring-inset font-semibold text-iris/50 text-sm'
								key={`${page}-${index}`}
							>
								{page}
							</button>
						)
			))}
			{hasNextPage
				? (
						<NavLink to={{ search: updatePageParam(currentPage + 1) }} className='inline-flex focus:z-20 relative items-center hover:bg-iris/20 p-1.5 sm:p-3 rounded-r-full focus:outline-offset-0 ring-[1.5px] ring-highlight-med ring-inset text-iris cursor-pointer'>
							<span className='sr-only'>Next</span>
							<svg viewBox='0 0 20 20' fill='currentColor' data-slot='icon' aria-hidden='true' className='size-5'>
								<path d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z' clipRule='evenodd' fillRule='evenodd' />
							</svg>
						</NavLink>
					)
				: (
						<button className='inline-flex focus:z-20 relative items-center hover:bg-iris/20 p-1.5 sm:p-3 rounded-r-full focus:outline-offset-0 ring-[1.5px] ring-highlight-med ring-inset text-iris/50'>
							<span className='sr-only'>Next</span>
							<svg viewBox='0 0 20 20' fill='currentColor' data-slot='icon' aria-hidden='true' className='size-5'>
								<path d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z' clipRule='evenodd' fillRule='evenodd' />
							</svg>
						</button>
					)}
		</nav>
	)
}
