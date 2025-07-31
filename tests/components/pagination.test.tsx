import { screen } from '@testing-library/react'
import { setupWithRouter } from 'tests/vitest.setup'

import { Pagination } from '@/components/pagination'

describe('Pagination', () => {
	it('should render pagination component correctly', () => {
		const { container } = setupWithRouter(<Pagination currentPage={2} totalCount={[1, 2, 3]} />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('should disable Previous button on first page', () => {
		setupWithRouter(<Pagination currentPage={1} totalCount={[1, 2, 3]} />)

		const desktopPreviousButton = screen.getByRole('button', { name: /desktop-previous/i })
		const mobilePreviousButton = screen.getByRole('button', { name: /mobile-previous/i })

		expect(desktopPreviousButton).toBeDisabled()
		expect(mobilePreviousButton).toBeDisabled()
	})

	it('should disable Next button on last page', () => {
		setupWithRouter(<Pagination currentPage={3} totalCount={[1, 2, 3]} />)

		const desktopNextButton = screen.getByRole('button', { name: /desktop-next/i })
		const mobileNextButton = screen.getByRole('button', { name: /mobile-next/i })

		expect(desktopNextButton).toBeDisabled()
		expect(mobileNextButton).toBeDisabled()
	})

	it('should generate correct URL params with existing query', () => {
		setupWithRouter(<Pagination currentPage={1} totalCount={[1, 2, 3]} />, { route: '/?sort=asc' })

		const page2Link = screen.getByRole('link', { name: '2' })

		expect(page2Link).toHaveAttribute('href', '/?sort=asc&page=2')
	})
})
