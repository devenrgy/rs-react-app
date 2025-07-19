import { getPhotosByQuery } from '@/lib/api/requests'

describe('get-photos-by-query', () => {
	it('should default response no parameters', async () => {
		const expectedQuery = ''
		const expectedPage = 1
		const expectedPerPage = 10

		const response = await getPhotosByQuery()
		const { page, per_page, query } = await response.json()

		expect(query).toBe(expectedQuery)
		expect(+page).toBe(expectedPage)
		expect(+per_page).toBe(expectedPerPage)
	})

	it('should response with parameters', async () => {
		const expectedQuery = 'Cat'
		const expectedPage = 2
		const expectedPerPage = 20

		const response = await getPhotosByQuery({ query: expectedQuery, page: expectedPage, per_page: expectedPerPage })
		const { page, per_page, query } = await response.json()

		expect(query).toBe(expectedQuery)
		expect(+page).toBe(expectedPage)
		expect(+per_page).toBe(expectedPerPage)
	})
})
