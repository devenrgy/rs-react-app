import { addUrlParams, getPageUrlParams } from '@/lib/utils/url'

describe('url', () => {
	const url = 'https://www.my-site.com'
	const params = { page: 1, per_page: 10, query: 'Cat' }
	const expected = 'https://www.my-site.com/?page=1&per_page=10&query=Cat'

	describe('addUrlParams', () => {
		it('should with parameters', () => {
			expect(addUrlParams(url, params).toString()).toBe(expected)
		})
	})

	describe('getPageUrlParams', () => {
		const originalLocation = window.location

		beforeEach(() => {
			Object.defineProperty(window, 'location', {
				configurable: true,
				writable: true,
				value: { ...originalLocation }
			})
		})

		afterEach(() => {
			Object.defineProperty(window, 'location', {
				configurable: true,
				writable: true,
				value: originalLocation
			})
		})

		it('should with parameters', () => {
			window.location.search = '?query=Cat'

			expect(getPageUrlParams('query')).toBe('Cat')
		})

		it('should without parameters', () => {
			expect(getPageUrlParams('query')).toBeUndefined()
		})
	})
})
