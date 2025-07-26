import type { FormEvent } from 'react'
import { TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router'
import { SearchForm } from '@/components/search-form'
import { SEARCH_QUERY_PARAM } from '@/config/constants'
import { cn } from '@/lib/utils/helpers'

type Props = {
	searchQueryLS: string
	setSearchQueryLS: (query: string) => void
}

export const Header = ({ searchQueryLS, setSearchQueryLS }: Props) => {
	const [searchQuery, setSearchQuery] = useState(searchQueryLS)
	const [, setSearchParams] = useSearchParams()
	const [hasError, setHasError] = useState(false)
	const location = useLocation().pathname
	const isHomeRoute = location === '/'

	const handleTriggerError = () => setHasError(true)

	const handleSearchReset = () => {
		setSearchQuery('')
	}

	const handleSearchQueryChange = (value: string) => {
		setSearchQuery(value)
	}

	const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!searchQuery) {
			return
		}

		setSearchParams({ [SEARCH_QUERY_PARAM]: searchQuery.trim() })
		setSearchQueryLS(searchQuery.trim())
	}

	if (hasError) {
		throw new Error('Error triggered by button click')
	}

	return (
		<header className='z-30 fixed inset-x-0 flex items-center bg-neutral-950/80 backdrop-blur-2xl py-5 lg:py-0 border-b border-base min-h-[80px]'>
			<div className='flex sm:flex-row flex-col justify-between items-center gap-10 container'>
				<p>
					<Link to={{ pathname: '/' }} onClick={handleSearchReset} className='font-brand text-3xl'>
						<span className='text-gold'>RS</span>
						{' '}
						Gallery
					</Link>
				</p>

				{isHomeRoute && (
					<div className='flex sm:flex-row flex-col gap-10 w-full max-w-xl'>
						<SearchForm className='grow' handleSubmit={handleSearchSubmit} handleChange={handleSearchQueryChange} handleReset={handleSearchReset} searchQuery={searchQuery} />

						<button
							className='hidden lg:flex justify-center items-center order-1 rounded-full cursor-pointer'
							onClick={handleTriggerError}
							aria-label='Trigger error'
							type='button'
						>
							<TriangleAlert size='32' className='text-love' />
						</button>
					</div>
				)}

				<nav className=''>
					<ul className='flex gap-5 text-lg'>
						<li>
							<NavLink to='/' className={({ isActive }) => cn('duration-200', { 'text-rose pointer-events-none': isActive })}>Home</NavLink>
						</li>
						<li>
							<NavLink to='/about' className={({ isActive }) => cn('duration-200', { 'text-rose pointer-events-none': isActive })}>About</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
