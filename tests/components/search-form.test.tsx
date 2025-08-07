import { render, screen } from '@testing-library/react'
import { setupWithRouter } from 'tests/vitest.setup'

import { SearchForm } from '@/components/search-form'

describe('SearchForm', () => {
	const mockHandleSearchQueryChange = vi.fn()
	const mockHandleFormReset = vi.fn()
	const mockHandleFormSubmit = vi.fn(e => e.preventDefault())

	const defaultProps = {
		query: '',
		handleQueryChange: mockHandleSearchQueryChange,
		handleFormReset: mockHandleFormReset,
		handleFormSubmit: mockHandleFormSubmit
	}

	it('should render the search form with all required elements', () => {
		const { container } = render(<SearchForm {...defaultProps} />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('should call handleSearchQueryChange when input value changes', async () => {
		const { user } = setupWithRouter(<SearchForm {...defaultProps} />)

		const searchInput = screen.getByRole('textbox', { name: /search/i })

		await user.type(searchInput, 'test')

		expect(mockHandleSearchQueryChange).toHaveBeenCalledTimes(4)
	})

	it('should call handleFormReset when reset button is clicked', async () => {
		const { user } = setupWithRouter(<SearchForm {...defaultProps} query='test' />)

		const resetButton = screen.getByRole('button', { name: /reset/i })

		await user.click(resetButton)

		expect(mockHandleFormReset).toHaveBeenCalledTimes(1)
	})

	it('should call handleFormSubmit when form is submitted', async () => {
		const { user } = setupWithRouter(<SearchForm {...defaultProps} query='test' />)

		await user.click(screen.getByRole('button', { name: /search/i }))

		expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1)
	})

	it('should apply custom className when provided', () => {
		render(<SearchForm {...defaultProps} className='custom-class' />)

		const form = screen.getByRole('form', { name: /search form/i })

		expect(form).toHaveClass('custom-class')
	})
})
