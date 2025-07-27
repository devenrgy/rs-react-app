import { screen } from '@testing-library/react'
import { useNavigation } from 'react-router'
import { setupWithRouter } from 'tests/vitest.setup'
import { describe, expect, it, vi } from 'vitest'

import { HomeLayout } from '@/layouts/home-layout'

vi.mock('@/pages/home', () => ({
	Home: () => <div data-testid='home-page'>Home Page</div>
}))

vi.mock('@/components/spinner', () => ({
	Spinner: () => <div data-testid='spinner'>Spinner</div>
}))

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router')
	return {
		...actual,
		useNavigation: vi.fn()
	}
})

describe('HomeLayout', () => {
	it('renders Home and Outlet when not navigating', () => {
		vi.mocked(useNavigation).mockReturnValue({
			state: 'idle',
			location: undefined,
			formMethod: undefined,
			formAction: undefined,
			formEncType: undefined,
			formData: undefined,
			json: undefined,
			text: undefined
		})

		setupWithRouter(<HomeLayout />)

		expect(screen.getByTestId('home-page')).toBeInTheDocument()
		expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
	})

	it('renders Spinner, Home, and Outlet when navigating', () => {
		vi.mocked(useNavigation).mockReturnValue({
			state: 'loading',
			location: { pathname: '/test', search: '', hash: '', state: null, key: 'test' },
			formMethod: undefined,
			formAction: undefined,
			formEncType: undefined,
			formData: undefined,
			json: undefined,
			text: undefined
		})

		setupWithRouter(<HomeLayout />)

		expect(screen.getByTestId('spinner')).toBeInTheDocument()
		expect(screen.getByTestId('home-page')).toBeInTheDocument()
	})
})
