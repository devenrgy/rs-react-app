import { mockPhoto } from 'tests/mocks/api/data'

import { getPhoto } from '@/lib/api/requests'

describe('getPhoto', () => {
	beforeEach(() => {
		vi.stubEnv('VITE_CLIENT_ID', 'test-client-id')
	})

	afterEach(() => {
		vi.unstubAllEnvs()
	})

	it('successfully fetches photo with valid id and parameters', async () => {
		const id = '123'
		const params = { id, page: 2, per_page: 20 }

		const response = await getPhoto(params)
		const data = await response.json()

		expect(response.status).toBe(200)
		expect(data).toEqual({ ...mockPhoto, id })
	})

	it('throws error when id is missing', async () => {
		await expect(getPhoto({})).rejects.toThrow('Incorrect ID')
	})
})
