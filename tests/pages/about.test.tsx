import { screen } from '@testing-library/react'
import { setupWithRouter } from 'tests/vitest.setup'

import { About } from '@/pages/about'

describe('About', () => {
	it('renders About page content correctly', () => {
		setupWithRouter(<About />, { route: '/about' })

		expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument()
		expect(screen.getByText(/Hi! My name is Alex/i)).toBeInTheDocument()
		expect(screen.getByText(/Rolling Scopes School/i)).toBeInTheDocument()
		expect(screen.getByText(/RS School React course/i)).toBeInTheDocument()
		expect(screen.getByText(/My Github/i)).toBeInTheDocument()
	})

	it('renders external links with correct attributes', () => {
		setupWithRouter(<About />, { route: '/about' })

		const rsSchoolLink = screen.getByText(/RS School React course/i)
		expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs')
		expect(rsSchoolLink).toHaveAttribute('target', '_blank')
		expect(rsSchoolLink).toHaveAttribute('rel', 'noopener noreferrer')

		const githubLink = screen.getByText(/My Github/i)
		expect(githubLink).toHaveAttribute('href', 'https://github.com/devenrgy')
		expect(githubLink).toHaveAttribute('target', '_blank')
		expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
	})

	it('matches snapshot', () => {
		const { container } = setupWithRouter(<About />, { route: '/about' })
		expect(container).toMatchSnapshot()
	})
})
