import { TriangleAlert } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router'

import { SearchForm } from '@/components/search-form'
import { SEARCH_PARAM_KEY } from '@/configs/constants'
import { navigation } from '@/configs/navigation'
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
		<header className='fixed inset-x-0 z-10 bg-neutral-950/80 backdrop-blur-3xl'>
			<div className='container flex min-h-[80px] flex-col items-center gap-10 py-5 sm:flex-row lg:py-0'>
				<Link className='font-brand text-3xl' to='/'>
					<span className='text-iris'>RS</span> Gallery
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
						<p className='hidden justify-center lg:flex'>
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
				<ul className='flex gap-5 justify-self-end text-xl lg:ml-auto'>
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
		</header>
	)
}
