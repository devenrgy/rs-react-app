import { screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { setupWithRouter } from 'tests/vitest.setup'

import { NotFound } from '@/components/not-found'

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router')
	return {
		...actual,
		Link: ({ to, children, className }: { to: string; children: ReactNode; className?: string }) => (
			<a href={to} className={className} data-testid='link'>
				{children}
			</a>
		)
	}
})

describe('NotFound', () => {
	it('should render not found message and home link', () => {
		const { container } = setupWithRouter(<NotFound />, { route: '/404' })

		expect(screen.getByText(/page not found/i)).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /return to homepage/i })).toBeInTheDocument()
		expect(screen.getByTestId('link')).toHaveAttribute('href', '/')
		expect(container).toMatchSnapshot()
	})

	it('should navigate to home on link click', async () => {
		const { user } = setupWithRouter(<NotFound />, { route: '/404' })

		await user.click(screen.getByRole('link', { name: /return to homepage/i }))

		expect(window.location.pathname).toBe('/')
	})
})
