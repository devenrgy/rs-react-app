'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { PAGE_PARAM_KEY } from '@/shared/config/constants'
import { Link } from '@/shared/i18n/navigation'
import { cn } from '@/shared/lib/cn'

type PaginationProps = {
	className?: string
	currentPage: number
	totalPages: (number | string)[] | undefined
}

const FeedPaginationArrowButton = ({
	direction,
	targetPage,
	disabled,
}: {
	direction: 'previous' | 'next'
	targetPage: number
	disabled?: boolean
}) => {
	const searchParams = useSearchParams()
	const currentParams = Object.fromEntries(searchParams.entries())

	const icon = direction === 'previous' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />

	return disabled
		? (
				<button
					type='button'
					disabled
					aria-label={`${direction}-page`}
					className={cn(
						'flex items-center rounded-md px-5 py-3 ring-2 ring-inset',
						'ring-secondary/50 bg-secondary/50',
					)}
				>
					<span className='sr-only'>{direction}</span>
					{icon}
				</button>
			)
		: (
				<Link
					href={{ pathname: '/', query: { ...currentParams, [PAGE_PARAM_KEY]: targetPage } }}
					aria-label={`${direction}-page`}
					className={cn(
						'flex items-center rounded-md px-5 py-3 ring-2 ring-inset',
						'ring-secondary hover:bg-secondary',
					)}
				>
					<span className='sr-only'>{direction}</span>
					{icon}
				</Link>
			)
}

const FeedPaginationPageItem = ({ page, currentPage }: { page: number | string, currentPage: number }) => {
	const searchParams = useSearchParams()
	const currentParams = Object.fromEntries(searchParams.entries())

	return typeof page === 'string'
		? (
				<li className='flex'>
					<span className='ring-secondary pointer-events-none flex items-center rounded-md px-5 py-3 ring-2 ring-inset'>
						{page}
					</span>
				</li>
			)
		: (
				<li className='flex'>
					<Link
						href={{ pathname: '/', query: { ...currentParams, [PAGE_PARAM_KEY]: page } }}
						className={cn(
							'rounded-md px-5 py-3 ring-2 ring-inset',
							'ring-secondary',
							currentPage === page
								? 'bg-secondary pointer-events-none'
								: 'hover:bg-secondary',
						)}
						aria-current={currentPage === page ? 'page' : undefined}
					>
						{page}
					</Link>
				</li>
			)
}

export const FeedPagination = ({ totalPages, currentPage, className }: PaginationProps) => {
	if (!totalPages) {
		return null
	}

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
							<FeedPaginationArrowButton direction='previous' targetPage={safeCurrentPage - 1} />
						</li>
					)}

					{totalPages.map((page, index) => (
						<FeedPaginationPageItem key={`page-${index}`} page={page} currentPage={safeCurrentPage} />
					))}

					{showNext && (
						<li className='flex'>
							<FeedPaginationArrowButton direction='next' targetPage={safeCurrentPage + 1} />
						</li>
					)}
				</ul>
			</div>

			<div className='grid grid-cols-2 gap-4 sm:hidden'>
				<FeedPaginationArrowButton direction='previous' targetPage={safeCurrentPage - 1} disabled={!showPrevious} />
				<FeedPaginationArrowButton direction='next' targetPage={safeCurrentPage + 1} disabled={!showNext} />
			</div>
		</nav>
	)
}
