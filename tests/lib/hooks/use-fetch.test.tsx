import { renderHook, waitFor } from '@testing-library/react'
import type { Mock } from 'vitest'

import { useFetch } from '@/lib/hooks/use-fetch'

describe('useFetch', () => {
	const mockData = { id: 1, name: 'Test Data' }

	beforeEach(() => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData)
			})
		) as Mock
	})

	it('should return initial isLoading state', () => {
		const { result } = renderHook(() => useFetch('https://api.example.com/data'))

		expect(result.current).toEqual({
			data: null,
			isLoading: true,
			error: null
		})
	})

	it('should fetch data successfully', async () => {
		const { result } = renderHook(() => useFetch('https://api.example.com/data'))

		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current).toEqual({
			data: mockData,
			isLoading: false,
			error: null
		})
		expect(fetch).toHaveBeenCalledWith('https://api.example.com/data', undefined)
	})

	it('should handle fetch error', async () => {
		const errorMessage = 'Network Error'
		global.fetch = vi.fn(() => Promise.reject(new Error(errorMessage))) as Mock

		const { result } = renderHook(() => useFetch('https://api.example.com/error'))

		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current).toEqual({
			data: null,
			isLoading: false,
			error: new Error(errorMessage)
		})
	})

	it('should handle non-ok responses with status text', async () => {
		const errorStatusText = 'Not Found'
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
				statusText: errorStatusText,
				json: () => Promise.resolve({})
			})
		) as Mock

		const { result } = renderHook(() => useFetch('https://api.example.com/not-found'))

		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current).toEqual({
			data: null,
			isLoading: false,
			error: new Error(`Error: ${errorStatusText}`)
		})
	})
})
