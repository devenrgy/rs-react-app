import { TriangleAlert } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { NavLink, useLocation, useSearchParams } from 'react-router'

import { SearchForm } from '@/components/search-form'
import { SEARCH_PARAM_KEY } from '@/configs/constants'
import { cn } from '@/lib/utils/helpers'

interface Props {
	searchQueryLS: string
	setSearchQueryLS: (value: string) => void
}

export const Header = ({ searchQueryLS, setSearchQueryLS }: Props) => {
	const { pathname } = useLocation()
	const isAboutRoute = pathname === '/about'

	const [, setSearchParams] = useSearchParams()
	const [searchQuery, setSearchQuery] = useState(searchQueryLS)
	const [hasError, setHasError] = useState<boolean>(false)

	const handleTriggerError = () => setHasError(true)

	const handleFormReset = () => {
		setSearchQuery('')
	}

	const handleSearchQueryChange = (value: string) => {
		setSearchQuery(value)
	}

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!searchQuery) {
			return
		}

		setSearchParams({ [SEARCH_PARAM_KEY]: searchQuery.trim() })
		setSearchQueryLS(searchQuery.trim())
	}

	if (hasError) {
		throw new Error('Something went wrong!')
	}

	return (
		<header className='fixed inset-x-0 z-10 bg-base/80 backdrop-blur-3xl'>
			<div className='container flex h-[80px] items-center gap-10'>
				{!isAboutRoute && (
					<div className='flex grow items-center justify-end gap-5'>
						<SearchForm
							className='max-w-lg grow'
							searchQuery={searchQuery}
							handleFormReset={handleFormReset}
							handleSearchQueryChange={handleSearchQueryChange}
							handleFormSubmit={handleFormSubmit}
						/>
						<p className='flex justify-center'>
							<button
								className='flex aspect-square h-full cursor-pointer items-center justify-center rounded-full'
								onClick={handleTriggerError}
								aria-label='Trigger error'
								type='button'
							>
								<TriangleAlert size='32' className='text-love' />
							</button>
						</p>
					</div>
				)}
				<ul className='ml-auto flex gap-5 justify-self-end'>
					<li>
						<NavLink
							className={({ isActive }) => cn({ 'pointer-events-none text-rose duration-200': isActive })}
							to={{ pathname: '/' }}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => cn({ 'pointer-events-none text-rose duration-200': isActive })}
							to={{ pathname: '/about' }}
						>
							About
						</NavLink>
					</li>
				</ul>
			</div>
		</header>
	)
}
