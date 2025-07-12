import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SearchInput } from './search-input'

describe('SearchInput', () => {
	it('search input visibility', () => {
		render(<SearchInput />)

		const searchInput = screen.getByLabelText(/search/i)

		expect(searchInput).not.toHaveClass('hidden')
		expect(searchInput).toBeInTheDocument()
	})
})
