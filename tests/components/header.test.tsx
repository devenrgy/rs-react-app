import { render, within } from '@testing-library/react'

import { Header } from '@/components/header'

describe('Header', () => {
	it('should render header with search form, trigger error button, and match snapshot', () => {
		const { container } = render(<Header />)

		const searchForm = within(container).getByRole('form')
		const errorButton = within(container).getByRole('button', { name: /trigger error/i })

		expect(container.firstChild).toMatchSnapshot()
		expect(searchForm).toBeInTheDocument()
		expect(errorButton).toBeInTheDocument()
	})
})
