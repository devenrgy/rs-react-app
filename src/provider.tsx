import { Component, createContext } from 'react'

import { getPhotos, getPhotosByQuery } from '@/lib/api/requests'
import { ABORT_ERROR_NAME, SEARCH_PARAM_KEY, STORAGE_KEY } from '@/lib/constants'
import { getLocalStorage, getUrlParam, setLocalStorage, setUrlParam } from '@/lib/utils'
import type { Photo } from '@/types'

const DEFAULT_STATE: State = {
	items: null,
	isLoading: false,
	searchQuery: undefined,
	error: null
}

export interface ContextValue extends State {
	handleUpdateSearchQuery: (newQuery: string | undefined) => void
	handleResetError: () => void
}

export const Context = createContext<ContextValue>({
	...DEFAULT_STATE,
	isLoading: true,
	handleUpdateSearchQuery: () => null,
	handleResetError: () => null
})

interface Props {
	children: React.ReactNode
}

interface State {
	items: Photo[] | null
	isLoading: boolean
	searchQuery: string | undefined
	error: Error | null
}

export class Provider extends Component<Props> {
	state: State

	constructor(props: Props) {
		super(props)

		this.state = {
			...DEFAULT_STATE,
			searchQuery: this.initializeSearchQuery()
		}
	}

	private initializeSearchQuery() {
		const urlQuery = getUrlParam(SEARCH_PARAM_KEY)
		const storageQuery = getLocalStorage(STORAGE_KEY, undefined)

		if (urlQuery) {
			setLocalStorage(STORAGE_KEY, urlQuery)
			return urlQuery
		}

		return storageQuery && setUrlParam(SEARCH_PARAM_KEY, storageQuery)
	}

	async componentDidMount() {
		await this.fetchPhotos()
	}

	async componentDidUpdate(_: Props, prevState: State) {
		if (this.state.searchQuery !== prevState.searchQuery) {
			await this.fetchPhotos()
		}
	}

	handleUpdateSearchQuery = (newQuery: string | undefined) => {
		this.setState({ searchQuery: newQuery })
	}

	handleResetError = () => {
		this.setState({ error: null })
	}

	fetchPhotos = async () => {
		this.setState({ items: null, isLoading: true })

		try {
			const items = this.state.searchQuery
				? (await getPhotosByQuery({ query: this.state.searchQuery })).results
				: await getPhotos()

			this.setState({ items })
		} catch (error) {
			if (error instanceof Error && error.name === ABORT_ERROR_NAME) return
			this.setState({ error: error instanceof Error ? error : new Error('Unknown error') })
		} finally {
			this.setState({ isLoading: false })
		}
	}

	render() {
		const { error, isLoading, searchQuery, items } = this.state

		return (
			<Context.Provider
				value={{
					items,
					error,
					isLoading,
					searchQuery: searchQuery,
					handleResetError: this.handleResetError,
					handleUpdateSearchQuery: this.handleUpdateSearchQuery
				}}
			>
				{this.props.children}
			</Context.Provider>
		)
	}
}
