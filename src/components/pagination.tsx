import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { PAGE_PARAM_KEY } from '@/configs/constants'
import { cn } from '@/lib/utils/helpers'

interface PaginationProps {
	className?: string
	currentPage: number
	totalPages: (number | string)[]
}

const addUrlPaginationParams = (page: number, search: string) => {
	const searchParams = new URLSearchParams(search)
	searchParams.set(PAGE_PARAM_KEY, page.toString())
	return `?${searchParams.toString()}`
}

const PaginationArrowButton = ({
	direction,
	targetPage,
	disabled
}: {
	direction: 'previous' | 'next'
	targetPage: number
	disabled?: boolean
}) => {
	const location = useLocation()

	const icon = direction === 'previous' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />

	return disabled ? (
		<button
			type='button'
			disabled
			aria-label={`${direction}-page`}
			className={cn(
				'flex items-center rounded-md px-5 py-3 ring-2 ring-inset',
				'ring-pine/50 text-pine/50 dark:ring-iris/50 dark:text-iris/50'
			)}
		>
			<span className='sr-only'>{direction}</span>
			{icon}
		</button>
	) : (
		<Link
			to={{ search: addUrlPaginationParams(targetPage, location.search) }}
			aria-label={`${direction}-page`}
			className={cn(
				'flex items-center rounded-md px-5 py-3 ring-2 ring-inset',
				'ring-pine text-pine hover:bg-pine hover:text-white',
				'dark:ring-iris dark:hover:bg-iris dark:text-iris dark:hover:text-base'
			)}
		>
			<span className='sr-only'>{direction}</span>
			{icon}
		</Link>
	)
}

const PaginationPageItem = ({ page, currentPage }: { page: number | string; currentPage: number }) => {
	const location = useLocation()

	return typeof page === 'string' ? (
		<li className='flex'>
			<span className='ring-pine text-pine dark:text-iris dark:ring-iris pointer-events-none flex items-center rounded-md px-5 py-3 ring-2 ring-inset'>
				{page}
			</span>
		</li>
	) : (
		<li className='flex'>
			<Link
				to={{ search: addUrlPaginationParams(page, location.search) }}
				className={cn(
					'rounded-md px-5 py-3 ring-2 ring-inset',
					'ring-pine dark:ring-iris',
					currentPage === page
						? 'bg-pine dark:bg-iris pointer-events-none text-white dark:text-base'
						: 'hover:bg-pine text-pine dark:text-iris dark:hover:bg-iris hover:text-white dark:hover:text-base'
				)}
				aria-current={currentPage === page ? 'page' : undefined}
			>
				{page}
			</Link>
		</li>
	)
}

export const Pagination = ({ totalPages, currentPage, className }: PaginationProps) => {
	const totalPagesCount = Number(totalPages.at(-1))
	const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPagesCount))
	const showPrevious = safeCurrentPage > 1
	const showNext = safeCurrentPage < totalPagesCount

	return (
		<nav className={cn('mx-auto flex justify-center px-5 py-3 sm:px-6', className)} aria-label='Pagination'>
			<div className='hidden sm:block'>
				<ul className='flex gap-2'>
					{showPrevious && (
						<li className='flex'>
							<PaginationArrowButton direction='previous' targetPage={safeCurrentPage - 1} />
						</li>
					)}

					{totalPages.map((page, index) => (
						<PaginationPageItem key={`page-${index}`} page={page} currentPage={safeCurrentPage} />
					))}

					{showNext && (
						<li className='flex'>
							<PaginationArrowButton direction='next' targetPage={safeCurrentPage + 1} />
						</li>
					)}
				</ul>
			</div>

			<div className='grid grid-cols-2 gap-4 sm:hidden'>
				<PaginationArrowButton direction='previous' targetPage={safeCurrentPage - 1} disabled={!showPrevious} />
				<PaginationArrowButton direction='next' targetPage={safeCurrentPage + 1} disabled={!showNext} />
			</div>
		</nav>
	)
}
