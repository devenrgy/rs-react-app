import { useIsFetching } from '@tanstack/react-query'
import { type FormEvent, useState } from 'react'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router'

import { SearchForm } from '@/components/search-form'
import { DEFAULT_QUERY, QUERY_PARAM_KEY, STORAGE_SEARCH_KEY } from '@/configs/constants'
import { navigation } from '@/configs/navigation'
import { routes } from '@/configs/routes'
import { queryClient } from '@/lib/api/query-client'
import { useLS } from '@/lib/hooks/use-ls'
import { cn } from '@/lib/utils/helpers'

import { ModeToggle } from './mode-toggle'
import { RefreshQueryButton } from './refresh-query-button'

export const Header = () => {
	const [searchParams] = useSearchParams()
	const [searchQueryLS, setSearchQueryLS] = useLS(
		STORAGE_SEARCH_KEY,
		searchParams.get(QUERY_PARAM_KEY) || DEFAULT_QUERY
	)
	const { pathname } = useLocation()
	const isLoadingSearchPhotos = useIsFetching({ queryKey: ['search', 'photos'] }) > 0
	const isAboutRoute = pathname === routes.about.path

	const [query, setQuery] = useState(searchQueryLS)

	const [, setSearchParams] = useSearchParams()

	const handleQueryChange = (value: string) => setQuery(value)
	const handleFormReset = () => {
		setQuery('')
		setSearchQueryLS('')
	}
	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!query) return

		const trimmedSearchQuery = query.trim()

		setSearchParams({ [QUERY_PARAM_KEY]: trimmedSearchQuery })
		setSearchQueryLS(trimmedSearchQuery)
	}

	const handleQueryRefresh = () => queryClient.resetQueries({ queryKey: ['search', 'photos'] })

	return (
		<header className='bg-pine/95 fixed inset-x-0 z-30 backdrop-blur-3xl dark:bg-neutral-950/80'>
			<div className='container flex min-h-[90px] flex-col items-center gap-5 py-5 sm:flex-row lg:py-0'>
				<Link className='font-brand dark:text-text text-3xl text-white' to={routes.home.path}>
					<span className='dark:text-iris text-rose'>RS</span> Gallery
				</Link>

				{!isAboutRoute && (
					<div className='flex grow items-center justify-center gap-5'>
						<SearchForm
							className='w-full max-w-lg'
							handleFormSubmit={handleFormSubmit}
							handleFormReset={handleFormReset}
							handleQueryChange={handleQueryChange}
							query={query}
						/>

						<RefreshQueryButton handleQueryRefresh={handleQueryRefresh} isLoading={isLoadingSearchPhotos} />
					</div>
				)}

				<div className='flex w-full items-center justify-between gap-5 md:ml-auto md:w-auto'>
					<ModeToggle />

					<ul className='dark:text-text flex gap-5 justify-self-end text-xl text-white lg:ml-auto'>
						{navigation.map(({ label, href }) => (
							<li key={href}>
								<NavLink
									className={({ isActive }) =>
										cn('hover:underline-offset-5 hover:text-rose duration-200 hover:underline', {
											'text-rose pointer-events-none': isActive
										})
									}
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
