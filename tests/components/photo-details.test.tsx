import * as reactRouter from 'react-router'
import { mockPhoto } from 'tests/mocks/api/data'
import { setupWithRouter } from 'tests/vitest.setup'

import { PhotoDetails } from '@/components/photo-details'

describe('PhotoDetails', () => {
	vi.spyOn(reactRouter, 'useLocation').mockImplementation(() => ({
		search: '?page=1',
		key: '',
		pathname: '',
		hash: '',
		state: ''
	}))

	vi.spyOn(reactRouter, 'useLoaderData').mockImplementation(() => mockPhoto)

	it('should render photo image and details correctly', () => {
		const { container } = setupWithRouter(<PhotoDetails />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
