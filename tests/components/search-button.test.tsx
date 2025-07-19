import { render, within } from '@testing-library/react'

import { SearchButton } from '@/components/search-button'

describe('SearchButton', () => {
	it('should render search button within paragraph and match snapshot', () => {
		const { container } = render(<SearchButton />)

		const searchSubmitButton = within(container).getByRole('button', { name: /search/i })

		expect(container.firstChild).toMatchSnapshot()
		expect(searchSubmitButton).toBeInTheDocument()
	})
})
