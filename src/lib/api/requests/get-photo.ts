import { API_PHOTO_URL } from '@/configs/constants'
import { addUrlParams } from '@/lib/utils/helpers'

type Params = {
	id?: number | string | undefined
	page?: number
	per_page?: number
	signal?: AbortSignal
}

export const getPhoto = async ({ id, page = 1, per_page = 10, signal }: Params = {}) => {
	const params = { page, per_page, client_id: import.meta.env.VITE_CLIENT_ID }

	if (!id) {
		throw new Error('Incorrect ID')
	}

	const url = addUrlParams(`${API_PHOTO_URL}/${id}`, params)

	return fetch(url, { signal })
}
