import { mockPhoto } from 'tests/mocks/api/data'

import { getPhotoById } from '@/lib/api/requests'

describe('getPhotoById', () => {
	it('should successfully fetch photo with valid id and parameters', async () => {
		const id = '123'
		const params = { id, page: 2, per_page: 20 }

		const data = await getPhotoById(params, {})

		expect(data).toEqual({ ...mockPhoto, id })
	})
})
