import { BASE_API_URL } from '@/lib/constants'
import { addUrlParams } from '@/lib/utils'

type Params = {
	page?: number
	per_page?: number
	signal?: AbortSignal
}

const endpoint = '/photos'

export const getPhotos = async ({ page = 1, per_page = 10, signal }: Params = {}) => {
	const params = { page, per_page, client_id: import.meta.env.VITE_CLIENT_ID }

	const url = addUrlParams(`${BASE_API_URL}${endpoint}`, params)

	return fetch(url, { signal })
}
