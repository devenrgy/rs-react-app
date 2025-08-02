import { screen } from '@testing-library/react'
import type { useSearchParams } from 'react-router'
import * as reactRouter from 'react-router'
import { setupWithRouter } from 'tests/vitest.setup'
import type { Mocked } from 'vitest'

import * as ErrorFallback from '@/components/error-fallback'
import * as NotFound from '@/components/not-found'
import * as Pagination from '@/components/pagination'
import * as PhotoList from '@/components/photo-list'
import * as useDownloadFile from '@/lib/hooks/use-download-file'
import * as useFetch from '@/lib/hooks/use-fetch'
import * as favoritesStore from '@/lib/stores/favorites-store'
import { Home } from '@/pages/home'
import type { RootContext } from '@/pages/root'
import * as Root from '@/pages/root'

import { mockSearchPhotosResponse } from '../mocks/api/data.ts'

vi.spyOn(useDownloadFile, 'useDownloadFile').mockImplementation(() => ({
	downloadFile: vi.fn(),
	downloadLinkProps: {
		download: '',
		href: ''
	}
}))
vi.spyOn(favoritesStore, 'useFavoritePhotos').mockImplementation(() => [])
vi.spyOn(favoritesStore, 'useFavoritesActions').mockImplementation(() => ({
	clearAll: vi.fn(),
	toggleFavorite: vi.fn()
}))

describe('Home', () => {
	const mockedUseSearchParams: Mocked<ReturnType<typeof useSearchParams>> = [
		{
			...new URLSearchParams(),
			get: vi.fn().mockReturnValue(null)
		},
		vi.fn()
	]

	const mockedUseRootContext: Mocked<RootContext> = {
		searchQueryLS: 'Mountain',
		pageLS: '1',
		setSearchQueryLS: vi.fn()
	}

	vi.spyOn(reactRouter, 'useSearchParams').mockReturnValue(mockedUseSearchParams)
	vi.spyOn(Root, 'useRootContext').mockReturnValue(mockedUseRootContext)
	vi.spyOn(ErrorFallback, 'ErrorFallback').mockReturnValue(<div data-testid='error-fallback'>Error</div>)
	vi.spyOn(PhotoList, 'PhotoList').mockReturnValue(<div data-testid='photo-list'>Photo List</div>)
	vi.spyOn(Pagination, 'Pagination').mockReturnValue(<div data-testid='pagination'>Pagination</div>)
	vi.spyOn(NotFound, 'NotFound').mockReturnValue(<div data-testid='not-found'>Not Found</div>)

	it('should render title with query from context', () => {
		setupWithRouter(<Home />, { route: '/?query=Mountain' })

		expect(screen.getByRole('heading', { name: /Mountain/i, level: 1 })).toBeInTheDocument()
	})

	it('should render isLoading state', () => {
		vi.spyOn(useFetch, 'useFetch').mockReturnValueOnce({ data: null, error: null, isLoading: true })

		setupWithRouter(<Home />)

		expect(screen.getByLabelText('spinner')).toBeInTheDocument()
	})

	it('should render error state', () => {
		vi.spyOn(useFetch, 'useFetch').mockReturnValueOnce({
			data: null,
			error: new Error('Fetch error'),
			isLoading: false
		})

		setupWithRouter(<Home />)

		expect(screen.getByTestId('error-fallback')).toBeInTheDocument()
	})

	it('should render photo list when data is available', () => {
		vi.spyOn(useFetch, 'useFetch').mockReturnValueOnce({
			data: mockSearchPhotosResponse,
			error: null,
			isLoading: false
		})

		setupWithRouter(<Home />)

		expect(screen.getByTestId('photo-list')).toBeInTheDocument()
		expect(screen.getByTestId('pagination')).toBeInTheDocument()
	})

	it('should render not found when no results', () => {
		vi.spyOn(useFetch, 'useFetch').mockReturnValueOnce({
			data: { results: [], total_pages: 0 },
			error: null,
			isLoading: false
		})

		setupWithRouter(<Home />)

		expect(screen.getByTestId('not-found')).toBeInTheDocument()
	})
})
