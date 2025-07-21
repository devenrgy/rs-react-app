import { type FormEvent } from 'react'

import { SearchButton } from '@/components/search-button'
import { SearchInput } from '@/components/search-input'
import { SEARCH_PARAM_KEY, STORAGE_KEY } from '@/lib/constants'
import { useAppContext } from '@/provider'
import { removeLocalStorage, setLocalStorage } from '@/utils/localstorage'
import { removePageUrlParams, setPageUrlParams } from '@/utils/url'

export const SearchForm = () => {
	const { handleUpdateSearchQuery, searchQuery } = useAppContext()

	const clearSearch = () => {
		handleUpdateSearchQuery(null)
		removePageUrlParams(SEARCH_PARAM_KEY)
		removeLocalStorage(STORAGE_KEY)
	}

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const newSearchQuery = formData.get('search')?.toString().trim()

		if (!newSearchQuery) {
			return clearSearch()
		}

		if (newSearchQuery === searchQuery) return

		handleUpdateSearchQuery(newSearchQuery)
		setPageUrlParams(SEARCH_PARAM_KEY, newSearchQuery)
		setLocalStorage(STORAGE_KEY, newSearchQuery)
	}

	return (
		<form
			aria-label='Search Form'
			onReset={clearSearch}
			onSubmit={handleFormSubmit}
			className='order-2 flex h-full sm:order-1'
		>
			<SearchInput />
			<SearchButton />
		</form>
	)
}
