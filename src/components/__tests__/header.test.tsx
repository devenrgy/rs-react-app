import { render, screen } from '@testing-library/react'

import { Header } from '../header'

describe('Header', () => {
	it('should render header with search form, trigger error button, and match snapshot', () => {
		render(<Header />)

		const header = screen.getByRole('banner')
		const searchForm = screen.getByRole('form')
		const errorButton = screen.getByRole('button', { name: /trigger error/i })

		expect(header).toMatchSnapshot()
		expect(searchForm).toBeInTheDocument()
		expect(errorButton).toBeInTheDocument()
	})
})
