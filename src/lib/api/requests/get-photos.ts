import { api } from '@/lib/api/instance'
import type { Photo } from '@/types'

type Params = {
	page?: number
	per_page?: number
}

export const getPhotos = async ({ page = 1, per_page = 10 }: Params = {}) => {
	return api.get<Photo[]>('/photos', {
		page,
		per_page,
		client_id: import.meta.env.VITE_CLIENT_ID
	})
}
