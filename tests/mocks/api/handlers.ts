import { http, HttpResponse } from 'msw'

import { API_PHOTO_URL, API_SEARCH_URL } from '@/configs/constants'

import { mockPhoto, mockSearchPhotosResponse } from './data'

export const handlers = [
	http.get(`${API_PHOTO_URL}/:id`, ({ request, params }) => {
		const url = new URL(request.url)
		const { id } = params
		const client_id = url.searchParams.get('client_id')

		if (!client_id) {
			return new HttpResponse(null, { status: 401, statusText: 'Missing client_id' })
		}

		if (!id) {
			return new HttpResponse(null, { status: 400, statusText: 'Invalid ID' })
		}

		return HttpResponse.json({ ...mockPhoto, id })
	}),

	http.get(`${API_SEARCH_URL}`, ({ request }) => {
		const url = new URL(request.url)
		const query = url.searchParams.get('query')
		const client_id = url.searchParams.get('client_id')

		if (!client_id) {
			return new HttpResponse(null, { status: 401, statusText: 'Missing client_id' })
		}

		if (!query) {
			return new HttpResponse(null, { status: 400, statusText: 'Missing query' })
		}

		return HttpResponse.json(mockSearchPhotosResponse)
	})
]
