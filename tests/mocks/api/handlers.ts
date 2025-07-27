import { http, HttpResponse } from 'msw'

import { BASE_API_URL } from '@/configs/constants'

export const handlers = [
	http.get(`${BASE_API_URL}/photos`, ({ request }) => {
		const url = new URL(request.url)

		const page = url.searchParams.get('page')
		const per_page = url.searchParams.get('per_page')

		return HttpResponse.json({ page, per_page })
	}),

	http.get(`${BASE_API_URL}/search/photos`, ({ request }) => {
		const url = new URL(request.url)

		const page = url.searchParams.get('page')
		const per_page = url.searchParams.get('per_page')
		const query = url.searchParams.get('query')

		return HttpResponse.json({ query, per_page, page })
	})
]

// http.get('/resource', () => {
//   return new HttpResponse(null, { status: 404 })
// })
//
//
// server.use(
//     http.get('/user', () => {
//       return new HttpResponse(null, { status: 500 })
//     })
//   )
//
