import { render, screen } from '@testing-library/react'

import { SearchForm } from './search-form'

describe('SearchForm', () => {
	it('should render search form and match snapshot', () => {
		render(<SearchForm />)

		const form = screen.getByRole('form')

		expect(form).toMatchSnapshot()
	})
})
