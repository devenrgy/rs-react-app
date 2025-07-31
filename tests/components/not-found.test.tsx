import { screen } from '@testing-library/react'
import { setupWithRouter } from 'tests/vitest.setup'

import { NotFound } from '@/components/not-found'

describe('NotFound', () => {
	it('should render not found message and home link', () => {
		const { container } = setupWithRouter(<NotFound />, { route: '/404' })

		expect(container.firstChild).toMatchSnapshot()
	})

	it('should navigate to home on link click', async () => {
		const { user } = setupWithRouter(<NotFound />, { route: '/404' })

		await user.click(screen.getByRole('link', { name: /return to homepage/i }))

		expect(window.location.pathname).toBe('/')
	})
})
