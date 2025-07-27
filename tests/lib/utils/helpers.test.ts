import { addUrlParams, cn, hasItems, range } from '@/lib/utils/helpers'

describe('helpers', () => {
	describe('cn', () => {
		it('merges class names correctly', () => {
			expect(cn('text-red', 'font-bold')).toBe('text-red font-bold')
			expect(cn('text-red', { 'font-bold': true, 'text-sm': false })).toBe('text-red font-bold')
			expect(cn('text-red', ['bg-blue', { 'p-4': true }])).toBe('text-red bg-blue p-4')
			expect(cn()).toBe('')
		})
	})

	describe('hasItems', () => {
		it('returns true for non-empty arrays', () => {
			expect(hasItems([1, 2, 3])).toBe(true)
			expect(hasItems(['a'])).toBe(true)
		})

		it('returns false for empty arrays, null, or undefined', () => {
			expect(hasItems([])).toBe(false)
			expect(hasItems(null)).toBe(false)
			expect(hasItems(undefined)).toBe(false)
		})

		it('correctly narrows type for non-empty arrays', () => {
			const items: number[] | null = [1, 2, 3]
			if (hasItems(items)) {
				expect(items).toEqual([1, 2, 3])
			}
		})
	})

	describe('addUrlParams', () => {
		it('adds valid parameters to URL', () => {
			const url = 'https://example.com'
			const params = { page: 1, sort: 'asc' }
			expect(addUrlParams(url, params)).toBe('https://example.com/?page=1&sort=asc')
		})

		it('ignores undefined parameters', () => {
			const url = 'https://example.com'
			const params = { page: 1, filter: undefined }
			expect(addUrlParams(url, params)).toBe('https://example.com/?page=1')
		})

		it('handles empty params object', () => {
			const url = 'https://example.com'
			expect(addUrlParams(url, {})).toBe('https://example.com/')
		})

		it('preserves existing URL parameters', () => {
			const url = 'https://example.com?existing=1'
			const params = { page: 2 }
			expect(addUrlParams(url, params)).toBe('https://example.com/?existing=1&page=2')
		})
	})

	describe('range', () => {
		it('generates correct range of numbers', () => {
			expect(range(1, 3)).toEqual([1, 2, 3])
			expect(range(0, 2)).toEqual([0, 1, 2])
			expect(range(5, 5)).toEqual([5])
		})

		it('returns empty array for invalid range', () => {
			expect(range(3, 2)).toEqual([])
		})
	})
})
