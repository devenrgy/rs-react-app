import { screen } from '@testing-library/react'
import { setupWithRouter } from 'tests/vitest.setup'

import { Pagination } from '@/components/pagination'

describe('Pagination', () => {
	it('should render pagination component correctly', () => {
		const { container } = setupWithRouter(<Pagination currentPage={2} totalPages={[1, 2, 3]} />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('should disable Previous button on first page', () => {
		setupWithRouter(<Pagination currentPage={1} totalPages={[1, 2, 3]} />)

		const previousButtons = screen.getAllByRole('button', { name: /previous-page/i })

		for (const button of previousButtons) {
			expect(button).toBeDisabled()
		}
	})

	it('should disable Next button on last page', () => {
		setupWithRouter(<Pagination currentPage={3} totalPages={[1, 2, 3]} />)

		const nextButtons = screen.getAllByRole('button', { name: /next-page/i })

		for (const button of nextButtons) {
			expect(button).toBeDisabled()
		}
	})

	it('should generate correct URL params with existing query', () => {
		setupWithRouter(<Pagination currentPage={1} totalPages={[1, 2, 3]} />, { route: '/?sort=asc' })

		const page2Link = screen.getByRole('link', { name: '2' })

		expect(page2Link).toHaveAttribute('href', '/?sort=asc&page=2')
	})
})
