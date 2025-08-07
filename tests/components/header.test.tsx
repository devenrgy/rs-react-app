import { screen } from '@testing-library/react'
import * as reactRouter from 'react-router'
import { setupWithRouter } from 'tests/vitest.setup'

import { Header } from '@/components/header'

describe('Header', () => {
	const setSearchParams = vi.fn()
	vi.spyOn(reactRouter, 'useSearchParams').mockImplementation(() => [new URLSearchParams(), setSearchParams])

	const mockSetSearchQueryLS = vi.fn()
	const defaultProps = {
		initialQuery: '',
		setSearchQueryLS: mockSetSearchQueryLS
	}

	it('should render header on home route', () => {
		const { container } = setupWithRouter(<Header {...defaultProps} />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('should render header on about route', () => {
		const { container } = setupWithRouter(<Header {...defaultProps} />, { route: '/about' })

		expect(container.firstChild).toMatchSnapshot()
	})

	it('should update search query', async () => {
		const { user } = setupWithRouter(<Header {...defaultProps} />)

		const searchInput = screen.getByRole('textbox', { name: /search/i })

		await user.type(searchInput, 'test query')

		expect(searchInput).toHaveValue('test query')
	})

	it('should reset search query', async () => {
		const { user } = setupWithRouter(<Header {...defaultProps} />)

		const searchInput = screen.getByRole('textbox', { name: /search/i })

		await user.type(searchInput, 'test query')
		await user.click(screen.getByRole('button', { name: /reset/i }))

		expect(searchInput).toHaveValue('')
	})

	it('should handle form submission', async () => {
		const { user } = setupWithRouter(<Header {...defaultProps} />)

		await user.type(screen.getByRole('textbox', { name: /search/i }), ' test query ')
		await user.keyboard('{Enter}')

		expect(setSearchParams).toHaveBeenCalledWith({ search: 'test query' })
		expect(mockSetSearchQueryLS).toHaveBeenCalledWith('test query')
	})

	it('should not call setSearchParams when searchQuery is empty on form submission', async () => {
		const { user } = setupWithRouter(<Header {...defaultProps} />)

		await user.click(screen.getByRole('button', { name: /search/i }))

		expect(setSearchParams).not.toHaveBeenCalled()
	})
})
