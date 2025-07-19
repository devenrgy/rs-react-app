import { hasItems } from '@/lib/utils/helpers'

describe('helpers', () => {
	describe('hasItems', () => {
		it('should check if no items', () => {
			expect(hasItems([])).toBeFalsy()
			expect(hasItems(null)).toBeFalsy()
			expect(hasItems(undefined)).toBeFalsy()
		})

		it('should check if has items', () => {
			expect(hasItems(['Test'])).toBeTruthy()
			expect(hasItems([{ id: '1' }])).toBeTruthy()
			expect(hasItems([1, 2, 3])).toBeTruthy()
		})
	})
})
