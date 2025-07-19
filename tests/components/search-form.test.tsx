import { render, within } from '@testing-library/react'

import { SearchForm } from '@/components/search-form'

import { mockContext } from '../mocks/custom-renders'
import { setup, setupWithContextProvider } from '../vitest.setup.ts'

describe('SearchForm', () => {
	it('should render search form and match snapshot', () => {
		const { container } = render(<SearchForm />)

		const searchInput = within(container).getByRole('textbox', { name: /search/i })
		const searchSubmitButton = within(container).getByRole('button', { name: /search/i })

		expect(container.firstChild).toMatchSnapshot()
		expect(searchSubmitButton).toBeInTheDocument()
		expect(searchInput).toBeInTheDocument()
	})

	it('should call handleUpdateSearchQuery with search term and update input value on form submission', async () => {
		const fn = vi.fn()

		const { container, user } = setupWithContextProvider(<SearchForm />, {
			props: {
				...mockContext,
				handleUpdateSearchQuery: fn
			}
		})

		const searchInput = within(container).getByRole('textbox', { name: /search/i })

		await user.type(searchInput, 'Cat')

		const searchSubmitButton = within(container).getByRole('button', { name: /search/i })

		await user.click(searchSubmitButton)

		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith('Cat')

		await user.clear(searchInput)
		await user.click(searchSubmitButton)

		expect(fn).toHaveBeenCalledTimes(2)
		expect(fn).toHaveBeenCalledWith(undefined)
	})

	it('should call handleUpdateSearchQuery with search term simmilar', async () => {
		const fn = vi.fn()

		const { container, user } = setupWithContextProvider(<SearchForm />, {
			props: {
				...mockContext,
				searchQuery: 'Cat',
				handleUpdateSearchQuery: fn
			}
		})

		const searchSubmitButton = within(container).getByRole('button', { name: /search/i })

		await user.click(searchSubmitButton)

		expect(fn).toHaveBeenCalledTimes(0)
	})

	it('should clear value in input form', async () => {
		const { container, user } = setup(<SearchForm />)

		const searchInput = within(container).getByRole('textbox', { name: /search/i })

		await user.type(searchInput, 'Cat')

		const searchResetButton = within(container).getByRole('button', { name: /reset/i })

		await user.click(searchResetButton)

		expect(searchInput).toHaveValue('')
	})
})
