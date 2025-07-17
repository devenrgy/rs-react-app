import { Component, type ContextType, type FormEvent } from 'react'

import { SearchButton } from '@/components/search-button'
import { SearchInput } from '@/components/search-input'
import { SEARCH_PARAM_KEY, STORAGE_KEY } from '@/lib/constants'
import { Context } from '@/provider'
import { removeLocalStorage, setLocalStorage } from '@/utils/localstorage'
import { removePageUrlParams, setPageUrlParams } from '@/utils/url'

export class SearchForm extends Component {
	static contextType = Context
	declare context: ContextType<typeof Context>

	handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const newSearchQuery = formData.get('search')?.toString().trim()

		const { handleUpdateSearchQuery, searchQuery } = this.context

		if (!newSearchQuery) {
			return this.clearSearch()
		}

		if (newSearchQuery === searchQuery) return

		handleUpdateSearchQuery(newSearchQuery)
		setPageUrlParams(SEARCH_PARAM_KEY, newSearchQuery)
		setLocalStorage(STORAGE_KEY, newSearchQuery)
	}

	clearSearch = () => {
		const { handleUpdateSearchQuery } = this.context
		handleUpdateSearchQuery(undefined)
		removePageUrlParams(SEARCH_PARAM_KEY)
		removeLocalStorage(STORAGE_KEY)
	}

	render() {
		return (
			<form
				aria-label='Search Form'
				onReset={this.clearSearch}
				onSubmit={this.handleFormSubmit}
				className='order-2 flex h-full sm:order-1'
			>
				<SearchInput />
				<SearchButton />
			</form>
		)
	}
}
