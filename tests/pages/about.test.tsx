import { setupWithRouter } from 'tests/vitest.setup'

import { About } from '@/pages/about'

describe('About', () => {
	it('should render About page content correctly', () => {
		const { container } = setupWithRouter(<About />, { route: '/about' })

		expect(container.firstChild).toMatchSnapshot()
	})
})
