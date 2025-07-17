import { render, screen, within } from '@testing-library/react'

import { SearchButton } from '../search-button'

describe('SearchButton', () => {
	it('should render search button within paragraph and match snapshot', () => {
		render(<SearchButton />)

		const paragraph = screen.getByRole('paragraph')
		const searchSubmitButton = within(paragraph).getByRole('button', { name: /search/i })

		expect(paragraph).toMatchSnapshot()
		expect(searchSubmitButton).toBeInTheDocument()
	})
})
