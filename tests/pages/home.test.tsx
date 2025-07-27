import { screen } from '@testing-library/react'
import { useSearchParams } from 'react-router'
import { setupWithRouter } from 'tests/vitest.setup'
import { describe, expect, it, vi } from 'vitest'

import { useFetch } from '@/lib/hooks/use-fetch'
import { usePagination } from '@/lib/hooks/use-pagination'
import { hasItems } from '@/lib/utils/helpers'
import { Home } from '@/pages/home'

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router')
	return {
		...actual,
		useSearchParams: () => [{ get: vi.fn().mockReturnValue(null) }, vi.fn()]
	}
})

vi.mock('@/lib/hooks/use-fetch', () => ({
	useFetch: vi.fn()
}))

vi.mock('@/lib/hooks/use-pagination', () => ({
	usePagination: vi.fn()
}))

vi.mock('@/pages/root', () => ({
	useRootContext: vi.fn().mockReturnValue({ searchQueryLS: 'Mountain', pageLS: '1' })
}))

vi.mock('@/utils/helpers', () => ({
	addUrlParams: vi.fn().mockReturnValue('mocked-url'),
	hasItems: vi.fn()
}))

vi.mock('@/components/error-fallback', () => ({
	ErrorFallback: () => <div data-testid='error-fallback'>Error</div>
}))

vi.mock('@/components/not-found', () => ({
	NotFound: () => <div data-testid='not-found'>Not Found</div>
}))

vi.mock('@/components/photo-list', () => ({
	PhotoList: () => <div data-testid='photo-list'>Photo List</div>
}))

vi.mock('@/components/pagination', () => ({
	Pagination: () => <div data-testid='pagination'>Pagination</div>
}))

describe('Home', () => {
	beforeEach(() => {
		vi.mocked(useSearchParams()[0].get).mockReturnValue(null)
		vi.mocked(useFetch).mockReturnValue({ data: null, error: null, loading: false })
		vi.mocked(usePagination).mockReturnValue([1, 2, 3])
		vi.mocked(hasItems).mockReturnValue(true)
	})

	it('renders title with query from context', () => {
		vi.mocked(useFetch).mockReturnValue({ data: [], error: null, loading: false })

		setupWithRouter(<Home />, { route: '/?query=Mountain' })

		expect(screen.getByRole('heading', { name: /Mountain/i, level: 1 })).toBeInTheDocument()
	})

	it('renders loading state', () => {
		vi.mocked(useFetch).mockReturnValue({ data: null, error: null, loading: true })

		setupWithRouter(<Home />)

		expect(screen.getByLabelText('spinner')).toBeInTheDocument()
		expect(screen.queryByTestId('error-fallback')).not.toBeInTheDocument()
		expect(screen.queryByTestId('photo-list')).not.toBeInTheDocument()
		expect(screen.queryByTestId('not-found')).not.toBeInTheDocument()
	})

	it('renders error state', () => {
		vi.mocked(useFetch).mockReturnValue({ data: null, error: new Error('Fetch error'), loading: false })

		setupWithRouter(<Home />)

		expect(screen.getByTestId('error-fallback')).toBeInTheDocument()
		expect(screen.queryByTestId('photo-list')).not.toBeInTheDocument()
		expect(screen.queryByTestId('not-found')).not.toBeInTheDocument()
		expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
	})

	it('renders photo list when data is available', () => {
		vi.mocked(useFetch).mockReturnValue({
			data: { results: [{ id: '1' }], total_pages: 3 },
			error: null,
			loading: false
		})

		setupWithRouter(<Home />)

		expect(screen.getByTestId('photo-list')).toBeInTheDocument()
		expect(screen.getByTestId('pagination')).toBeInTheDocument()
		expect(screen.queryByTestId('not-found')).not.toBeInTheDocument()
		expect(screen.queryByTestId('error-fallback')).not.toBeInTheDocument()
	})

	it('renders not found when no results', () => {
		vi.mocked(hasItems).mockReturnValue(false)
		vi.mocked(useFetch).mockReturnValue({
			data: { results: [], total_pages: 0 },
			error: null,
			loading: false
		})

		setupWithRouter(<Home />)

		expect(screen.getByTestId('not-found')).toBeInTheDocument()
		expect(screen.queryByTestId('photo-list')).not.toBeInTheDocument()
		expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
		expect(screen.queryByTestId('error-fallback')).not.toBeInTheDocument()
	})

	it('matches snapshot', () => {
		vi.mocked(useFetch).mockReturnValue({
			data: { results: [{ id: '1' }], total_pages: 3 },
			error: null,
			loading: false
		})

		const { container } = setupWithRouter(<Home />)
		expect(container).toMatchSnapshot()
	})
})
