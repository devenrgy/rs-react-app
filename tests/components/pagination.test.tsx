import { screen } from '@testing-library/react'
import { setupWithRouter } from 'tests/vitest.setup'

import { Pagination } from '@/components/pagination'

vi.mock('@/lib/utils/helpers', () => ({
	cn: (...args: string[]) => args.filter(Boolean).join(' ')
}))

describe('Pagination', () => {
	it('renders Previous and Next buttons correctly on mobile', () => {
		setupWithRouter(<Pagination currentPage={2} totalCount={[1, 2, 3]} />, { route: '/?page=2' })

		expect(screen.getByLabelText('mobile-previous')).toHaveTextContent('Previous')
		expect(screen.getByLabelText('mobile-next')).toHaveTextContent('Next')

		expect(screen.getByLabelText('mobile-previous').closest('a')).toHaveAttribute('href', '/?page=1')
		expect(screen.getByLabelText('mobile-next').closest('a')).toHaveAttribute('href', '/?page=3')
	})

	it('disables Previous button on first page', () => {
		setupWithRouter(<Pagination currentPage={1} totalCount={[1, 2, 3]} />)

		const previousButton = screen.getByLabelText('mobile-previous')
		expect(previousButton).toHaveTextContent('Previous')
		expect(previousButton.closest('button')).toBeDisabled()
		expect(previousButton.closest('a')).toBeNull()
	})

	it('disables Next button on last page', () => {
		setupWithRouter(<Pagination currentPage={3} totalCount={[1, 2, 3]} />)

		const nextButton = screen.getByLabelText('mobile-next')
		expect(nextButton).toHaveTextContent('Next')
		expect(nextButton.closest('button')).toBeDisabled()
		expect(nextButton.closest('a')).toBeNull()
	})

	it('generates correct URL params with existing query', () => {
		setupWithRouter(<Pagination currentPage={1} totalCount={[1, 2, 3]} />, { route: '/?sort=asc' })

		const page2Link = screen.getByText('2').closest('a')
		expect(page2Link).toHaveAttribute('href', '/?sort=asc&page=2')
	})

	it('renders desktop layout with correct navigation', () => {
		setupWithRouter(<Pagination currentPage={1} totalCount={[1, 2, 3]} />)

		const nav = screen.getByLabelText('Pagination')
		expect(nav).toBeInTheDocument()

		expect(screen.getByLabelText('desktop-previous')).toBeInTheDocument()
		expect(screen.getByLabelText('desktop-next')).toBeInTheDocument()
		expect(nav.querySelectorAll('svg')).toHaveLength(2)
	})
})
