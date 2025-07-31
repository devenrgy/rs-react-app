import { screen } from '@testing-library/react'
import * as reactRouter from 'react-router'
import { mockPhoto } from 'tests/mocks/api/data'
import { setupWithRouter } from 'tests/vitest.setup'

import { PhotoCard } from '@/components/photo-card'

describe('PhotoCard', () => {
	vi.spyOn(reactRouter, 'useLocation').mockImplementation(() => ({
		search: '?query=test',
		key: '',
		pathname: '',
		hash: '',
		state: ''
	}))

	it('should render image and caption with mockPhoto', () => {
		const { container } = setupWithRouter(<PhotoCard data={mockPhoto} />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('should navigate to photo detail on link click', async () => {
		const { user } = setupWithRouter(<PhotoCard data={mockPhoto} />)

		await user.click(screen.getByRole('link'))

		expect(window.location.pathname).toBe('/photo_789')
		expect(window.location.search).toBe('?query=test')
	})
})
