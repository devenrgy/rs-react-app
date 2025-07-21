import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

import { getPhotos, getPhotosByQuery } from '@/lib/api/requests'
import { ABORT_ERROR_NAME, SEARCH_PARAM_KEY, STORAGE_KEY } from '@/lib/constants'
import type { Photo } from '@/types'
import { getLocalStorage, setLocalStorage } from '@/utils/localstorage'
import { getPageUrlParams, setPageUrlParams } from '@/utils/url'

export interface AppContext {
	isLoading: boolean
	items: null | Photo[]
	searchQuery: null | string
	error: null | Error
	handleUpdateSearchQuery: (newQuery: null | string) => void
	handleResetError: () => void
	abortRequest: () => void
	fetchPhotos: () => void
}

const initializeSearchQuery = () => {
	const urlQuery = getPageUrlParams(SEARCH_PARAM_KEY)
	const storageQuery = getLocalStorage(STORAGE_KEY, null)

	if (urlQuery) {
		setLocalStorage(STORAGE_KEY, urlQuery)
		return urlQuery
	}

	if (storageQuery) {
		setPageUrlParams(SEARCH_PARAM_KEY, storageQuery)
		return storageQuery
	}

	return null
}

export const Context = createContext<AppContext | null>(null)

interface Props {
	timeout?: boolean
	children: ReactNode
}

export const Provider = ({ children, timeout }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [items, setItems] = useState<null | Photo[]>(null)
	const [searchQuery, setSearchQuery] = useState<null | string>(initializeSearchQuery)
	const [error, setError] = useState<null | Error>(null)

	let userAbortController: AbortController | null = null
	const timeoutMS = 60000
	let timeoutAbortController: AbortController | null = null
	let timeoutId: NodeJS.Timeout | undefined = undefined
	let activeRequestsCounter = 0

	const abortRequest = () => {
		clearTimeout(timeoutId)
		userAbortController?.abort()
	}

	const fetchPhotos = async () => {
		abortRequest()

		userAbortController = new AbortController()
		timeoutAbortController = new AbortController()
		timeoutId = setTimeout(() => timeoutAbortController?.abort(), timeoutMS)

		activeRequestsCounter++
		setIsLoading(true)

		const signal = AbortSignal.any([timeoutAbortController.signal, userAbortController.signal])

		if (timeout) {
			clearTimeout(timeoutId)
			timeoutAbortController.abort()
		}

		try {
			const response = searchQuery
				? await getPhotosByQuery({ query: searchQuery, signal })
				: await getPhotos({ signal })

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const data = await response.json()

			const items = 'results' in data ? data.results : data

			setItems(items)
		} catch (error) {
			if (timeoutAbortController.signal.aborted) {
				console.error(`Operation timed out after ${timeoutMS} ms`)
				setError(new Error('Operation timed out'))
			} else if (error instanceof Error && error.name === ABORT_ERROR_NAME) {
				console.error('Operation aborted by user')
			} else {
				setError(error instanceof Error ? error : new Error('Unknown error'))
			}
		} finally {
			userAbortController = null
		}

		activeRequestsCounter--

		setIsLoading(activeRequestsCounter > 0)
	}

	useEffect(() => {
		fetchPhotos()

		return () => {
			abortRequest()
			clearTimeout(timeoutId)
			timeoutAbortController?.abort()
		}
	}, [searchQuery])

	const handleUpdateSearchQuery = (newQuery: null | string) => {
		setSearchQuery(newQuery)
	}

	const handleResetError = () => {
		setError(null)
		fetchPhotos()
	}

	return (
		<Context
			value={{
				items,
				error,
				isLoading,
				searchQuery,
				fetchPhotos,
				abortRequest,
				handleResetError,
				handleUpdateSearchQuery
			}}
		>
			{children}
		</Context>
	)
}

export const useAppContext = () => {
	const appContext = useContext(Context)

	if (!appContext) {
		throw new Error('appContext has to be used within <Context.Provider>')
	}

	return appContext
}
