import { screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { mockPhoto, mockPhoto2 } from 'tests/mocks/api/data'
import { setupWithRouter } from 'tests/vitest.setup'

import { PhotoCard } from '@/components/photo-card'

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router')
	return {
		...actual,
		useLocation: () => ({ search: '?query=test' }),
		Link: ({
			to,
			children,
			className
		}: {
			to: { pathname: string; search: string }
			children: ReactNode
			className?: string
		}) => (
			<a href={`${to.pathname}${to.search}`} className={className} data-testid='link'>
				{children}
			</a>
		)
	}
})

describe('PhotoCard', () => {
	it('should render image and caption with mockPhoto', () => {
		const { container } = setupWithRouter(<PhotoCard data={mockPhoto} />, { route: '/' })

		const image = screen.getByRole('img', { name: /mountain landscape at sunset/i })
		expect(image).toHaveAttribute('src', 'https://example.com/photos/photo_789/regular')
		expect(image).toHaveAttribute('width', '1920')
		expect(image).toHaveAttribute('height', '1080')
		expect(screen.getByText('mountain landscape at sunset')).toBeInTheDocument()
		expect(screen.getByTestId('link')).toHaveAttribute('href', '/photo_789?query=test')
		expect(container).toMatchSnapshot()
	})

	it('should render image and caption with mockPhoto2', () => {
		const { container } = setupWithRouter(<PhotoCard data={mockPhoto2} />, { route: '/' })

		const image = screen.getByRole('img', { name: /ocean waves on rocky shore/i })
		expect(image).toHaveAttribute('src', 'https://example.com/photos/photo_456/regular')
		expect(image).toHaveAttribute('width', '2560')
		expect(image).toHaveAttribute('height', '1440')
		expect(screen.getByText('ocean waves on rocky shore')).toBeInTheDocument()
		expect(screen.getByTestId('link')).toHaveAttribute('href', '/photo_456?query=test')
		expect(container).toMatchSnapshot()
	})

	it('should navigate to photo detail on link click', async () => {
		const { user } = setupWithRouter(<PhotoCard data={mockPhoto} />, { route: '/' })

		await user.click(screen.getByTestId('link'))

		expect(window.location.pathname).toBe('/photo_789')
		expect(window.location.search).toBe('?query=test')
	})
})
