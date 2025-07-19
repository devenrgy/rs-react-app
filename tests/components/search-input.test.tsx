import { render, screen, within } from '@testing-library/react'

import { SearchInput } from '@/components/search-input'

import { mockContext, renderWithContextProvider } from '../mocks/custom-renders'

describe('SearchInput', () => {
	it('should display the default placeholder when searchQuery is undefined', () => {
		const { container } = renderWithContextProvider(<SearchInput />, {
			props: { ...mockContext, searchQuery: undefined }
		})

		const searchInput = within(container).getByRole('textbox', { name: /search/i })

		expect(container.firstChild).toMatchSnapshot()
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
