import { screen } from '@testing-library/react'
import { setupWithRouter } from 'tests/vitest.setup'
import { describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from '@/components/error-boundary'
import { Header } from '@/components/header'

const setSearchParams = vi.fn()

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router')
	return {
		...actual,
		useSearchParams: () => [{}, setSearchParams]
	}
})

describe('Header', () => {
	const mockSetSearchQueryLS = vi.fn()
	const defaultProps = {
		searchQueryLS: '',
		setSearchQueryLS: mockSetSearchQueryLS
	}

	it('should render header on home route', () => {
		const { container } = setupWithRouter(<Header {...defaultProps} />, { route: '/' })

		expect(container).toMatchSnapshot()
	})

	it('should render header on about route', () => {
		const { container } = setupWithRouter(<Header {...defaultProps} />, { route: '/about' })

		expect(screen.getByRole('banner')).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
		expect(screen.queryByTestId('search-form')).not.toBeInTheDocument()
		expect(screen.queryByTestId('triangle-alert')).not.toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should update search query', async () => {
		const { user } = setupWithRouter(<Header {...defaultProps} />, { route: '/' })

		await user.type(screen.getByRole('textbox', { name: /search/i }), 'test query')

		expect(screen.getByRole('textbox', { name: /search/i })).toHaveValue('test query')
	})

	it('should reset search query', async () => {
		const { user } = setupWithRouter(<Header {...defaultProps} />, { route: '/' })

		await user.type(screen.getByRole('textbox', { name: /search/i }), 'test query')
		await user.click(screen.getByRole('button', { name: /reset/i }))

		expect(screen.getByRole('textbox', { name: /search/i })).toHaveValue('')
	})

	it('should handle form submission', async () => {
		const { user } = setupWithRouter(<Header {...defaultProps} />, { route: '/' })

		await user.type(screen.getByRole('textbox', { name: /search/i }), ' test query ')
		await user.keyboard('{Enter}')

		expect(setSearchParams).toHaveBeenCalledWith({ search: 'test query' })
		expect(mockSetSearchQueryLS).toHaveBeenCalledWith('test query')
	})

	it('should throw error on button click', async () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
		const { user } = setupWithRouter(
			<ErrorBoundary>
				<Header {...defaultProps} />,
			</ErrorBoundary>,
			{ route: '/' }
		)

		await user.click(screen.getByRole('button', { name: /trigger error/i }))

		expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String), expect.any(Error))
		consoleErrorSpy.mockRestore()
	})
})
