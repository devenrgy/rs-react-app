import { addUrlParams, getPageUrlParams, removePageUrlParams, setPageUrlParams } from '@/lib/utils/url'

describe('url', () => {
	const url = 'https://www.my-site.com'
	const params = { page: 1, per_page: 10, query: 'Cat' }
	const expected = 'https://www.my-site.com/?page=1&per_page=10&query=Cat'

	describe('addUrlParams', () => {
		it('should add parameters to URL', () => {
			expect(addUrlParams(url, params).toString()).toBe(expected)
		})

		it('should ignore undefined parameters', () => {
			const testParams = { ...params, undefinedParam: undefined }
			expect(addUrlParams(url, testParams).toString()).toBe(expected)
		})

		it('should handle empty params object', () => {
			expect(addUrlParams(url, {}).toString()).toBe('https://www.my-site.com/')
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

		it('should return parameter value when it exists', () => {
			window.location.search = '?query=Cat'
			expect(getPageUrlParams('query')).toBe('Cat')
		})

		it('should return undefined when parameter does not exist', () => {
			expect(getPageUrlParams('query')).toBeUndefined()
		})

		it('should return undefined for empty search', () => {
			window.location.search = ''
			expect(getPageUrlParams('query')).toBeUndefined()
		})
	})

	describe('setPageUrlParams', () => {
		const originalLocation = window.location

		beforeEach(() => {
			Object.defineProperty(window, 'location', {
				configurable: true,
				writable: true,
				value: { ...originalLocation, pathname: '/test' }
			})

			window.history.pushState = vi.fn()
		})

		afterEach(() => {
			Object.defineProperty(window, 'location', {
				configurable: true,
				writable: true,
				value: originalLocation
			})
		})

		it('should add new parameter to URL', () => {
			window.location.search = ''
			setPageUrlParams('page', '1')
			expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/test?page=1')
		})

		it('should update existing parameter', () => {
			window.location.search = '?page=1'
			setPageUrlParams('page', '2')
			expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/test?page=2')
		})

		it('should preserve other parameters', () => {
			window.location.search = '?filter=active'
			setPageUrlParams('page', '1')
			expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/test?filter=active&page=1')
		})
	})

	describe('removePageUrlParams', () => {
		const originalLocation = window.location

		beforeEach(() => {
			Object.defineProperty(window, 'location', {
				configurable: true,
				writable: true,
				value: { ...originalLocation, pathname: '/test' }
			})

			window.history.pushState = vi.fn()
		})

		afterEach(() => {
			Object.defineProperty(window, 'location', {
				configurable: true,
				writable: true,
				value: originalLocation
			})
		})

		it('should remove specified parameter', () => {
			window.location.search = '?page=1&filter=active'
			removePageUrlParams('page')
			expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/test?filter=active')
		})

		it('should not modify URL if parameter does not exist', () => {
			window.location.search = '?filter=active'
			removePageUrlParams('page')
			expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/test?filter=active')
		})

		it('should remove query string when last parameter is removed', () => {
			window.location.search = '?page=1'
			removePageUrlParams('page')
			expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/test')
		})

		it('should handle empty search', () => {
			window.location.search = ''
			removePageUrlParams('page')
			expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/test')
		})
	})
})
