import { Outlet, useOutletContext, useSearchParams } from 'react-router'

import { ErrorBoundary } from '@/components/error-boundary'
import { Header } from '@/components/header'
import { PAGE_PARAM_KEY, SEARCH_PARAM_KEY, STORAGE_PAGE_KEY, STORAGE_SEARCH_KEY } from '@/configs/constants'
import { useLS } from '@/lib/hooks/use-ls'
import { ThemeProvider } from '@/providers/theme-provider'

export type RootContext = {
	searchQueryLS: string
	pageLS: string
	setSearchQueryLS: (value: string) => void
}

export const Root = () => {
	const [searchParams] = useSearchParams()
	const [searchQueryLS, setSearchQueryLS] = useLS(STORAGE_SEARCH_KEY, searchParams.get(SEARCH_PARAM_KEY) ?? '')
	const [pageLS] = useLS(STORAGE_PAGE_KEY, searchParams.get(PAGE_PARAM_KEY) ?? '1')

	return (
		<ThemeProvider>
			<ErrorBoundary>
				<Header searchQueryLS={searchQueryLS} setSearchQueryLS={setSearchQueryLS} />
				<Outlet context={{ searchQueryLS, pageLS, setSearchQueryLS } satisfies RootContext} />
			</ErrorBoundary>
		</ThemeProvider>
	)
}

export const useRootContext = () => useOutletContext<RootContext>()
