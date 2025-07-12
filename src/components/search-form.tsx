import { type FormEvent, PureComponent } from 'react'

import { SearchButton } from '@/components/search-button'
import { SearchInput } from '@/components/search-input'
import { SEARCH_PARAM_KEY, STORAGE_KEY } from '@/lib/constants'
import { removeLocalStorage, removeUrlParam, setLocalStorage, setUrlParam } from '@/lib/utils'
import { Context } from '@/provider'

export class SearchForm extends PureComponent {
	static contextType = Context
	declare context: React.ContextType<typeof Context>

	handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const newSearchQuery = formData.get('search')?.toString().trim()

		const { handleUpdateSearchQuery, searchQuery } = this.context

		if (!newSearchQuery) {
			this.clearSearch()
			return
		}

		if (newSearchQuery === searchQuery) return

		handleUpdateSearchQuery(newSearchQuery)
		setUrlParam(SEARCH_PARAM_KEY, newSearchQuery)
		setLocalStorage(STORAGE_KEY, newSearchQuery)
	}

	clearSearch = () => {
		const { handleUpdateSearchQuery } = this.context
		handleUpdateSearchQuery(undefined)
		removeUrlParam(SEARCH_PARAM_KEY)
		removeLocalStorage(STORAGE_KEY)
	}

	render() {
		return (
			<form
				aria-label='Search Form'
				onReset={this.clearSearch}
				onSubmit={this.handleFormSubmit}
				className='flex h-full order-2 sm:order-1'
			>
				<SearchInput />
				<SearchButton />
			</form>
		)
	}
}
