import { render, screen } from '@testing-library/react'
import { setupWithRouter } from 'tests/vitest.setup'

import { SearchForm } from '@/components/search-form'

describe('SearchForm', () => {
	const mockHandleSearchQueryChange = vi.fn()
	const mockHandleFormReset = vi.fn()
	const mockHandleFormSubmit = vi.fn(e => e.preventDefault())

	const defaultProps = {
		searchQuery: '',
		handleSearchQueryChange: mockHandleSearchQueryChange,
		handleFormReset: mockHandleFormReset,
		handleFormSubmit: mockHandleFormSubmit
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should render the search form with all required elements', () => {
		render(<SearchForm {...defaultProps} />)

		expect(screen.getByRole('form', { name: /search form/i })).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Find awesome images...')).toBeInTheDocument()
		expect(screen.getByLabelText('Search')).toBeInTheDocument()
		expect(screen.getByLabelText('Reset')).toBeInTheDocument()
	})

	it('should call handleSearchQueryChange when input value changes', async () => {
		const { user } = setupWithRouter(<SearchForm {...defaultProps} />)
		const input = screen.getByPlaceholderText('Find awesome images...')

		await user.type(input, 'test')
		expect(mockHandleSearchQueryChange).toHaveBeenCalledTimes(4)
	})

	it('should show reset button when input has value', () => {
		render(<SearchForm {...defaultProps} searchQuery='test' />)
		const resetButton = screen.getByLabelText('Reset')
		expect(resetButton).toBeVisible()
	})

	it('should call handleFormReset when reset button is clicked', async () => {
		const { user } = setupWithRouter(<SearchForm {...defaultProps} searchQuery='test' />)
		const resetButton = screen.getByLabelText('Reset')

		await user.click(resetButton)
		expect(mockHandleFormReset).toHaveBeenCalledTimes(1)
	})

	it('should call handleFormSubmit when form is submitted', async () => {
		const { user } = setupWithRouter(<SearchForm {...defaultProps} searchQuery='test' />)

		await user.click(screen.getByLabelText('Search'))
		expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1)
	})

	it('should apply custom className when provided', () => {
		render(<SearchForm {...defaultProps} className='custom-class' />)
		const form = screen.getByRole('form', { name: /search form/i })
		expect(form).toHaveClass('custom-class')
	})

	it('should have proper accessibility attributes', () => {
		render(<SearchForm {...defaultProps} />)

		expect(screen.getByLabelText('Search Form')).toBeInTheDocument()
		expect(screen.getByLabelText('Search')).toHaveAttribute('type', 'submit')
		expect(screen.getByLabelText('Reset')).toHaveAttribute('type', 'reset')
		expect(screen.getByPlaceholderText('Find awesome images...')).toHaveAttribute('inputMode', 'search')
	})

	it('should hide reset button when input is empty', () => {
		render(<SearchForm {...defaultProps} searchQuery='' />)
		const resetButton = screen.getByRole('button', { name: /reset/i })
		expect(resetButton).toHaveClass('peer-placeholder-shown:invisible')
	})
})
