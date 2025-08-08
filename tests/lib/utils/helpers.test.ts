import {
	addUrlParams,
	cn,
	delay,
	hasItems,
	range,
	safeJsonParse,
	safeJsonParseThrow,
	toNumber
} from '@/lib/utils/helpers'

describe('helpers', () => {
	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	describe('cn', () => {
		it('should merge class names correctly', () => {
			expect(cn('text-red', 'font-bold')).toBe('text-red font-bold')
			expect(cn('text-red', { 'font-bold': true, 'text-sm': false })).toBe('text-red font-bold')
			expect(cn('text-red', ['bg-blue', { 'p-4': true }])).toBe('text-red bg-blue p-4')
			expect(cn()).toBe('')
		})
	})

	describe('hasItems', () => {
		it('should return true for non-empty arrays', () => {
			expect(hasItems([1, 2, 3])).toBe(true)
			expect(hasItems(['a'])).toBe(true)
		})

		it('should return false for empty arrays, null, or undefined', () => {
			expect(hasItems([])).toBe(false)
			expect(hasItems(null)).toBe(false)
			expect(hasItems(undefined)).toBe(false)
		})

		it('should correctly narrow type for non-empty arrays', () => {
			const items: number[] | null = [1, 2, 3]
			if (hasItems(items)) {
				expect(items).toEqual([1, 2, 3])
			}
		})
	})

	describe('addUrlParams', () => {
		it('should add valid parameters to URL', () => {
			const url = 'https://example.com'
			const params = { page: 1, sort: 'asc' }
			expect(addUrlParams(url, params)).toBe('https://example.com/?page=1&sort=asc')
		})

		it('should ignore undefined parameters', () => {
			const url = 'https://example.com'
			const params = { page: 1, filter: undefined }
			expect(addUrlParams(url, params)).toBe('https://example.com/?page=1')
		})

		it('should handle empty params object', () => {
			const url = 'https://example.com'
			expect(addUrlParams(url, {})).toBe('https://example.com/')
		})

		it('should preserve existing URL parameters', () => {
			const url = 'https://example.com?existing=1'
			const params = { page: 2 }
			expect(addUrlParams(url, params)).toBe('https://example.com/?existing=1&page=2')
		})
	})

	describe('toNumber', () => {
		it('should convert string to number', () => {
			expect(toNumber('123')).toBe(123)
			expect(toNumber('456')).toBe(456)
		})

		it('should not convert non-string values', () => {
			const parseIntMock = vi.spyOn(Number, 'parseInt')

			toNumber(223)

			expect(parseIntMock).not.toBeCalled()
		})
	})

	describe('safeJsonParse', () => {
		it('should parse valid JSON', () => {
			const validJson = '{"name": "John", "age": 30}'
			expect(safeJsonParse(validJson)).toEqual({ name: 'John', age: 30 })
		})

		it('should return null for invalid JSON', () => {
			const invalidJson = 'invalid json'
			expect(safeJsonParse(invalidJson)).toBe(null)
		})
	})

	describe('safeJsonParseThrow', () => {
		it('should return error for null value', () => {
			expect(() => safeJsonParseThrow(null)).toThrow('JSON value is null or undefined')
		})

		it('should parse valid JSON', () => {
			const validJson = '{"name": "John", "age": 30}'
			expect(safeJsonParseThrow(validJson)).toEqual({ name: 'John', age: 30 })
		})

		it('should throw error for invalid JSON', () => {
			const invalidJson = 'invalid json'
			expect(() => safeJsonParseThrow(invalidJson)).toThrow('Error parsing JSON')
		})
	})

	describe('delay', () => {
		it('should resolve after the specified delay', async () => {
			const start = Date.now()
			await delay(100)
			const end = Date.now()
			expect(end - start).toBeGreaterThanOrEqual(100)
		})
	})

	describe('range', () => {
		it('should generate correct range of numbers', () => {
			expect(range(1, 3)).toEqual([1, 2, 3])
			expect(range(0, 2)).toEqual([0, 1, 2])
			expect(range(5, 5)).toEqual([5])
		})

		it('should return empty array for invalid range', () => {
			expect(range(3, 2)).toEqual([])
		})
	})
})
