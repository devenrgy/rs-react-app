import { render, screen, within } from '@testing-library/react'

import { SearchButton } from './search-button'

describe('SearchButton', () => {
	it('should render search button with accessible name and match snapshot', () => {
		render(<SearchButton />)

		const paragraph = screen.getByRole('paragraph')
		const button = within(paragraph).getByRole('button')

		expect(paragraph).toMatchSnapshot()
		expect(button).toHaveAccessibleName('Search')
	})
})
