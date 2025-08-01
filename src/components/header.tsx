import { TriangleAlert } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router'

import { SearchForm } from '@/components/search-form'
import { SEARCH_PARAM_KEY } from '@/configs/constants'
import { navigation } from '@/configs/navigation'
import { cn } from '@/lib/utils/helpers'

import { ModeToggle } from './mode-toggle'

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
		<header className='bg-pine/95 fixed inset-x-0 z-30 backdrop-blur-3xl dark:bg-neutral-950/80'>
			<div className='container flex min-h-[80px] flex-col items-center gap-5 py-5 sm:flex-row lg:py-0'>
				<Link className='font-brand dark:text-text text-3xl text-white' to='/'>
					<span className='dark:text-iris text-rose'>RS</span> Gallery
				</Link>

				{!isAboutRoute && (
					<div className='flex grow items-center justify-center gap-5'>
						<SearchForm
							className='w-full max-w-lg'
							searchQuery={searchQuery}
							handleFormReset={handleFormReset}
							handleSearchQueryChange={handleSearchQueryChange}
							handleFormSubmit={handleFormSubmit}
						/>
						<p className='hidden justify-center'>
							<button
								className='dark:text-love flex aspect-square h-full cursor-pointer items-center justify-center rounded-full text-rose-500'
								onClick={handleTriggerError}
								aria-label='Trigger error'
								type='button'
							>
								<TriangleAlert size='32' />
							</button>
						</p>
					</div>
				)}

				<div className='ml-auto flex items-center gap-5'>
					<ModeToggle />

					<ul className='dark:text-text flex gap-5 justify-self-end text-xl text-white lg:ml-auto'>
						{navigation.map(({ label, href }) => (
							<li key={href}>
								<NavLink
									className={({ isActive }) => cn({ 'text-rose pointer-events-none duration-200': isActive })}
									to={{ pathname: href }}
								>
									{label}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	)
}
