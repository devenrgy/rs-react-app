import { renderHook } from '@testing-library/react'

import { DOTS, usePagination } from '@/lib/hooks/use-pagination'

describe('usePagination', () => {
	it('should return undefined when totalCount is undefined', () => {
		const { result } = renderHook(() => usePagination({ totalCount: undefined }))
		expect(result.current).toBeUndefined()
	})

	it('should return full range when total pages <= max visible items', () => {
		const testCases = [
			{ total: 5, expected: [1, 2, 3, 4, 5] },
			{ total: 3, expected: [1, 2, 3] },
			{ total: 1, expected: [1] }
		]

		testCases.forEach(({ total, expected }) => {
			const { result } = renderHook(() => usePagination({ totalCount: total }))
			expect(result.current).toEqual(expected)
		})
	})

	it('should show right dots when current page is near start', () => {
		const { result } = renderHook(() => usePagination({ totalCount: 100, currentPage: 1, siblingCount: 1 }))
		expect(result.current).toEqual([1, 2, 3, 4, 5, DOTS, 100])
	})

	it('should show left dots when current page is near end', () => {
		const { result } = renderHook(() => usePagination({ totalCount: 100, currentPage: 98, siblingCount: 1 }))
		expect(result.current).toEqual([1, DOTS, 96, 97, 98, 99, 100])
	})

	it('should show both dots when current page is in middle', () => {
		const { result } = renderHook(() => usePagination({ totalCount: 100, currentPage: 50, siblingCount: 1 }))
		expect(result.current).toEqual([1, DOTS, 49, 50, 51, DOTS, 100])
	})

	it('should cap totalCount at 200', () => {
		const { result } = renderHook(() => usePagination({ totalCount: 300, currentPage: 198, siblingCount: 1 }))
		expect(result.current?.slice(-1)[0]).toBe(200)
	})

	it('should handle different siblingCount values', () => {
		const { result } = renderHook(() => usePagination({ totalCount: 100, currentPage: 50, siblingCount: 2 }))
		expect(result.current).toEqual([1, DOTS, 48, 49, 50, 51, 52, DOTS, 100])
	})
})
