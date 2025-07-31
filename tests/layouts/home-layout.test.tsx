import { screen } from '@testing-library/react'
import type { useNavigation } from 'react-router'
import * as reactRouter from 'react-router'
import { setupWithRouter } from 'tests/vitest.setup'
import type { Mocked } from 'vitest'

import * as Spinner from '@/components/spinner'
import { HomeLayout } from '@/layouts/home-layout'
import * as Home from '@/pages/home'

describe('HomeLayout', () => {
	vi.spyOn(Home, 'Home').mockImplementation(() => <div data-testid='home-page'>Home Page</div>)
	vi.spyOn(Spinner, 'Spinner').mockImplementation(() => <div data-testid='spinner'>Spinner</div>)

	const mockUseNavigation: Mocked<ReturnType<typeof useNavigation>> = {
		state: 'idle',
		location: undefined,
		formMethod: undefined,
		formAction: undefined,
		formEncType: undefined,
		formData: undefined,
		json: undefined,
		text: undefined
	}

	it('should render Home and Outlet when not navigating', () => {
		vi.spyOn(reactRouter, 'useNavigation').mockReturnValueOnce(mockUseNavigation)

		setupWithRouter(<HomeLayout />)

		expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
	})

	it('should render Spinner, Home, and Outlet when navigating', () => {
		vi.spyOn(reactRouter, 'useNavigation').mockReturnValueOnce({
			...mockUseNavigation,
			state: 'loading',
			location: { pathname: '/test', search: '', hash: '', state: null, key: 'test' }
		})

		setupWithRouter(<HomeLayout />)

		expect(screen.getByTestId('spinner')).toBeInTheDocument()
	})
})
