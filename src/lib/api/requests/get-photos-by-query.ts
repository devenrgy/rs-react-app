import { BASE_API_URL } from '@/lib/constants'
import { addUrlParams } from '@/lib/utils'

type Params = {
	query?: string
	page?: number
	per_page?: number
	signal?: AbortSignal
}

const endpoint = '/search/photos'

export const getPhotosByQuery = async ({ query = '', page = 1, per_page = 10, signal }: Params = {}) => {
	const params = { query, page, per_page, client_id: import.meta.env.VITE_CLIENT_ID }

	const url = addUrlParams(`${BASE_API_URL}${endpoint}`, params)

	return fetch(url, { signal })
}
