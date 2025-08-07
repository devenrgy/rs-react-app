import { queryOptions } from '@tanstack/react-query'

import { API_SEARCH_URL } from '@/configs/constants'
import { addUrlParams } from '@/lib/utils/helpers'
import type { PaginatedResults, Photo } from '@/types'

export const searchPhotosQuery = (query: string, page: number) => {
	return queryOptions({
		queryKey: ['search', 'photos', query, page],
		queryFn: ctx => getSearchPhotos({ query, page }, ctx)
	})
}

export const getSearchPhotos = async (
	{
		query,
		page = 1,
		per_page = 10
	}: {
		query: string
		page?: number
		per_page?: number
	},
	{ signal }: { signal?: AbortSignal } = {}
) => {
	const params = { query, page, per_page, client_id: import.meta.env.VITE_CLIENT_ID }

	const url = addUrlParams(API_SEARCH_URL, params)

	return fetch(url, { signal }).then(res => res.json() as Promise<PaginatedResults<Photo[]>>)
}
