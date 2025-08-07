import { screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import { render } from 'tests/mocks/providers'

import { About } from '@/pages/about'

describe('About', () => {
	it('should render About page content correctly', async () => {
		const AboutStub = createRoutesStub([
			{
				path: '/about',
				Component: About
			}
		])

		render(<AboutStub initialEntries={['/about']} />)

		expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument()
	})
})
