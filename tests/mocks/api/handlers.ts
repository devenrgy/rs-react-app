import { http, HttpResponse } from 'msw'

import { API_PHOTO_URL, API_SEARCH_URL } from '@/configs/constants'

import { mockPhoto, mockSearchPhotosResponse } from './data'

export const handlers = [
	http.get(`${API_PHOTO_URL}/:id`, ({ params }) => {
		const { id } = params

		return HttpResponse.json({ ...mockPhoto, id })
	}),

	http.get(API_SEARCH_URL, () => {
		return HttpResponse.json(mockSearchPhotosResponse)
	})
]
