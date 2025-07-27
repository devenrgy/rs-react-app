import { renderHook, screen } from '@testing-library/react'
import { useOutletContext, useSearchParams } from 'react-router'
import { setupWithRouter } from 'tests/vitest.setup'
import { describe, expect, it, vi } from 'vitest'
import { b } from 'vitest/dist/chunks/suite.d.FvehnV49.js'

import { useLS } from '@/lib/hooks/use-ls'
import { Root, type RootContext, useRootContext } from '@/pages/root'

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router')
	return {
		...actual,
		useSearchParams: () => [{ get: vi.fn().mockReturnValue(null) }, vi.fn()]
	}
})

vi.mock('@/lib/hooks/use-ls', () => ({
	useLS: vi.fn()
}))

vi.mock('@/providers/theme-provider', () => ({
	ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid='theme-provider'>{children}</div>
}))

vi.mock('@/components/error-boundary', () => ({
	ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div data-testid='error-boundary'>{children}</div>
}))

vi.mock('@/components/header', () => ({
	Header: ({
		searchQueryLS,
		setSearchQueryLS
	}: {
		searchQueryLS: string
		setSearchQueryLS: (value: string) => void
	}) => (
		<div data-testid='header'>
			Header with {searchQueryLS} and {setSearchQueryLS.name}
		</div>
	)
}))

describe('Root', () => {
	beforeEach(() => {
		vi.mocked(useSearchParams()[0].get).mockReturnValue(null)
		vi.mocked(useLS).mockReturnValueOnce(['', vi.fn(), vi.fn()]).mockReturnValueOnce(['1', vi.fn(), vi.fn()])
	})

	it('renders ThemeProvider, ErrorBoundary, and Header', () => {
		setupWithRouter(<Root />)

		expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
		expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
		expect(screen.getByTestId('header')).toBeInTheDocument()
	})

	it('uses search params when available', () => {
		vi.mocked(useSearchParams()[0].get).mockImplementation(key => (key === 'search' ? 'param-query' : '3'))
		vi.mocked(useLS).mockReturnValueOnce(['', vi.fn(), vi.fn()]).mockReturnValueOnce(['1', vi.fn(), vi.fn()])

		setupWithRouter(<Root />)

		expect(screen.getByTestId('header')).toHaveTextContent('Header with')
	})

	it('matches snapshot', () => {
		const { container } = setupWithRouter(<Root />)
		expect(container).toMatchSnapshot()
	})
})
