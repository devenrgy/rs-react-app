import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { API_SEARCH_URL } from '@/configs/constants.ts'
import { useFetch } from '@/lib/hooks/use-fetch'
import { addUrlParams } from '@/utils/helpers.ts'

import { server } from '../../mocks/api'
import { mockSearchPhotosResponse } from '../../mocks/api/data.ts'

describe('useFetch', () => {
	it('should return initial isLoading state', () => {
		const { result } = renderHook(() =>
			useFetch(
				addUrlParams(API_SEARCH_URL, {
					search: 'Cat',
					page: 1,
					per_page: 10
				})
			)
		)

		expect(result.current).toEqual({
			data: null,
			isLoading: true,
			error: null
		})
	})

	it('should fetch data successfully', async () => {
		const { result } = renderHook(() =>
			useFetch(
				addUrlParams(API_SEARCH_URL, {
					search: 'Cat',
					page: 1,
					per_page: 10,
					client_id: import.meta.env.VITE_CLIENT_ID
				})
			)
		)

		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current).toEqual({
			data: mockSearchPhotosResponse,
			isLoading: false,
			error: null
		})
	})

	it('should handle fetch error correctly', async () => {
		server.use(
			http.get(
				API_SEARCH_URL,
				() => {
					return new HttpResponse(null, { status: 404 })
				},
				{ once: true }
			)
		)

		const { result } = renderHook(() =>
			useFetch(
				addUrlParams(API_SEARCH_URL, {
					search: 'Cat',
					page: 1,
					per_page: 10,
					client_id: import.meta.env.VITE_CLIENT_ID
				})
			)
		)

		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current).toEqual({
			data: null,
			isLoading: false,
			error: new Error('Error: Not Found')
		})
	})
})
