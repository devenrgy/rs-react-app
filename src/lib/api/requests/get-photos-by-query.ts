import { api } from '@/lib/api/instance'
import type { SearchPhotosResponse } from '@/types'

type Params = {
	query?: string
	page?: number
	per_page?: number
}

export const getPhotosByQuery = async ({ query = '', page = 1, per_page = 10 }: Params = {}) => {
	return api.get<SearchPhotosResponse>('/search/photos', {
		query,
		page,
		per_page,
		client_id: import.meta.env.VITE_CLIENT_ID
	})
}
