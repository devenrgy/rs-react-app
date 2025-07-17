import { render, screen, within } from '@testing-library/react'

import { mockContext, renderWithContextProvider } from '@/test-utils'

import { SearchInput } from '../search-input'

describe('SearchInput', () => {
	it('should display the default placeholder when searchQuery is undefined', () => {
		renderWithContextProvider(<SearchInput />, { props: { ...mockContext, searchQuery: undefined } })

		const paragraph = screen.getByRole('paragraph')
		const searchInput = within(paragraph).getByRole('textbox', { name: /search/i })

		expect(paragraph).toMatchSnapshot()
		expect(searchInput).toHaveValue('')
	})

	it('should display the searchQuery value from context in the input', () => {
		const expectedValue = 'Cat'

		renderWithContextProvider(<SearchInput />, {
			props: {
				...mockContext,
				searchQuery: expectedValue
			}
		})

		const searchInput = screen.getByRole('textbox', { name: /search/i })

		expect(searchInput).toHaveValue(expectedValue)
	})

	it('should render reset button', async () => {
		render(<SearchInput />)

		const searchResetButton = screen.getByRole('button', { name: /reset/i })

		expect(searchResetButton).toBeInTheDocument()
	})
})
