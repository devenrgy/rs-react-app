import { render, within } from '@testing-library/react'

import { Header } from '@/components/header'
import { Provider } from '@/provider'

describe('Header', () => {
	it('should render header with search form, trigger error button, and match snapshot', () => {
		const { container } = render(
			<Provider>
				<Header />
			</Provider>
		)

		const searchForm = within(container).getByRole('form')
		const errorButton = within(container).getByRole('button', { name: /trigger error/i })

		expect(container.firstChild).toMatchSnapshot()
		expect(searchForm).toBeInTheDocument()
		expect(errorButton).toBeInTheDocument()
	})
})
