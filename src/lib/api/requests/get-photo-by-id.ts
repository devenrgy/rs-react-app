import { queryOptions } from '@tanstack/react-query'

import { API_PHOTO_URL } from '@/configs/constants'
import { addUrlParams } from '@/lib/utils/helpers'
import type { FailedResponse, Photo } from '@/types'

export const getPhotoByIdQuery = (id: string) =>
	queryOptions({
		queryKey: ['photo', 'detail', id],
		queryFn: async () => {
			const photo = await getPhotoById({ id })

			if ('errors' in photo) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found'
				})
			}

			return photo
		}
	})

export const getPhotoById = async (
	{
		id,
		page = 1,
		per_page = 10
	}: {
		id: string
		page?: number
		per_page?: number
	},
	{ signal }: { signal?: AbortSignal } = {}
): Promise<Photo | FailedResponse> => {
	const params = { page, per_page, client_id: import.meta.env.VITE_CLIENT_ID }

	const url = addUrlParams(`${API_PHOTO_URL}/${id}`, params)

	return fetch(url, { signal }).then(res => res.json() as Promise<Photo>)
}
