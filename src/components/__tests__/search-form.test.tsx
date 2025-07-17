import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockContext, renderWithContextProvider } from '@/test-utils'

import { SearchForm } from '../search-form'

describe('SearchForm', () => {
	it('should render search form and match snapshot', () => {
		render(<SearchForm />)

		const form = screen.getByRole('form')
		const searchInput = within(form).getByRole('textbox', { name: /search/i })
		const searchSubmitButton = within(form).getByRole('button', { name: /search/i })

		expect(form).toMatchSnapshot()
		expect(searchSubmitButton).toBeInTheDocument()
		expect(searchInput).toBeInTheDocument()
	})

	it('should call handleUpdateSearchQuery with search term and update input value on form submission', async () => {
		const user = userEvent.setup()
		const fn = vi.fn()

		renderWithContextProvider(<SearchForm />, {
			props: {
				...mockContext,
				handleUpdateSearchQuery: fn
			}
		})

		const form = screen.getByRole('form')
		const searchInput = within(form).getByRole('textbox', { name: /search/i })

		await user.type(searchInput, 'Cat')

		const searchSubmitButton = within(form).getByRole('button', { name: /search/i })

		await user.click(searchSubmitButton)

		expect(searchInput).toHaveValue('Cat')
		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith('Cat')
	})

	it('should clear value in input form', async () => {
		const user = userEvent.setup()

		render(<SearchForm />)

		const form = screen.getByRole('form')
		const searchInput = within(form).getByRole('textbox', { name: /search/i })

		await user.type(searchInput, 'Cat')

		const searchResetButton = within(form).getByRole('button', { name: /reset/i })

		await user.click(searchResetButton)

		expect(searchInput).toHaveValue('')
	})
})
