import { Component, createContext, type ReactNode } from 'react'

import { getPhotos, getPhotosByQuery } from '@/lib/api/requests'
import { ABORT_ERROR_NAME, SEARCH_PARAM_KEY, STORAGE_KEY } from '@/lib/constants'
import type { Photo } from '@/types'
import { getLocalStorage, setLocalStorage } from '@/utils/localstorage'
import { getPageUrlParams, setPageUrlParams } from '@/utils/url'

const DEFAULT_STATE: State = {
	items: null,
	isLoading: false,
	searchQuery: undefined,
	error: null
}

export interface ContextValue extends State {
	handleUpdateSearchQuery: (newQuery: string | undefined) => void
	handleResetError: () => void
	abortRequest: () => void
	fetchPhotos: () => void
}

export const Context = createContext<ContextValue>({
	...DEFAULT_STATE,
	isLoading: true,
	handleUpdateSearchQuery: () => null,
	handleResetError: () => null,
	abortRequest: () => null,
	fetchPhotos: () => null
})

interface Props {
	timeout?: boolean
	children: ReactNode
}

interface State {
	items: Photo[] | null
	isLoading: boolean
	searchQuery: string | undefined
	error: Error | null
}

export class Provider extends Component<Props> {
	state: State
	userAbortController: AbortController | null = null
	timeoutMS = 60000
	timeoutAbortController: AbortController | null = null
	timeoutId: NodeJS.Timeout | undefined = undefined
	activeRequestsCounter = 0

	constructor(props: Props) {
		super(props)

		this.state = {
			...DEFAULT_STATE,
			searchQuery: this.initializeSearchQuery()
		}
	}

	private initializeSearchQuery() {
		const urlQuery = getPageUrlParams(SEARCH_PARAM_KEY)
		const storageQuery = getLocalStorage(STORAGE_KEY, undefined)

		if (urlQuery) {
			setLocalStorage(STORAGE_KEY, urlQuery)
			return urlQuery
		}

		if (storageQuery) {
			setPageUrlParams(SEARCH_PARAM_KEY, storageQuery)
			return storageQuery
		}
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
		this.fetchPhotos()
	}

	abort = () => {
		clearTimeout(this?.timeoutId)
		this.userAbortController?.abort()
	}

	fetchPhotos = async () => {
		this.abort()

		this.userAbortController = new AbortController()
		this.timeoutAbortController = new AbortController()

		this.timeoutId = setTimeout(() => this.timeoutAbortController?.abort(), this.timeoutMS)

		this.activeRequestsCounter++
		this.setState({ items: null, isLoading: true })

		const signal = AbortSignal.any([this.timeoutAbortController.signal, this.userAbortController.signal])

		if (this.props.timeout) {
			clearTimeout(this.timeoutId)
			this.timeoutAbortController.abort()
		}

		try {
			const response = this.state.searchQuery
				? await getPhotosByQuery({ query: this.state.searchQuery, signal })
				: await getPhotos({ signal })

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const data = await response.json()

			const items = 'results' in data ? data.results : data

			this.setState({ items })
		} catch (error) {
			if (this.timeoutAbortController.signal.aborted) {
				console.error(`Operation timed out after ${this.timeoutMS} ms`)
				this.setState({ error: new Error('Operation timed out') })
			} else if (error instanceof Error && error.name === ABORT_ERROR_NAME) {
				console.error('Operation aborted by user')
			} else {
				this.setState({ error: error instanceof Error ? error : new Error('Unknown error') })
			}
		} finally {
			this.userAbortController = null
		}

		this.activeRequestsCounter--

		this.setState({ isLoading: this.activeRequestsCounter > 0 })
	}

	componentWillUnmount() {
		this.abort()
		clearTimeout(this?.timeoutId)
		this.timeoutAbortController?.abort()
	}

	render() {
		const { error, isLoading, searchQuery, items } = this.state

		return (
			<Context.Provider
				value={{
					items,
					error,
					isLoading,
					searchQuery,
					fetchPhotos: this.fetchPhotos,
					abortRequest: this.abort,
					handleResetError: this.handleResetError,
					handleUpdateSearchQuery: this.handleUpdateSearchQuery
				}}
			>
				{this.props.children}
			</Context.Provider>
		)
	}
}
