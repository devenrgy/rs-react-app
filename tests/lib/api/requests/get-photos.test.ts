import { getPhotos } from '@/lib/api/requests'

describe('get-photos', () => {
	it('should default response no parameters', async () => {
		const expectedPage = 1
		const expectedPerPage = 10

		const response = await getPhotos()
		const { page, per_page } = await response.json()

		expect(+page).toBe(expectedPage)
		expect(+per_page).toBe(expectedPerPage)
	})

	it('should response with parameters', async () => {
		const expectedPage = 2
		const expectedPerPage = 20

		const response = await getPhotos({ page: expectedPage, per_page: expectedPerPage })
		const { page, per_page } = await response.json()

		expect(+page).toBe(expectedPage)
		expect(+per_page).toBe(expectedPerPage)
	})
})
