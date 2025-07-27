import { render } from '@testing-library/react'

import { Spinner } from '@/components/spinner'

describe('Spinner', () => {
	it('should render the spinner component with correct structure', () => {
		const { container } = render(<Spinner />)

		expect(container.firstChild).toBeInTheDocument()
		expect(container.firstChild).toHaveClass('fixed', 'inset-0', 'z-100', 'grid', 'place-content-center', 'bg-black/50')

		const spinner = container.querySelector('svg[aria-label="spinner"]')
		expect(spinner).toBeInTheDocument()
		expect(spinner).toHaveClass('animate-spin', 'text-text')
	})

	it('should have correct SVG element with animation classes', () => {
		const { container } = render(<Spinner />)

		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()
		expect(svg).toHaveClass('animate-spin', 'text-text')
		expect(svg).toHaveAttribute('aria-label', 'spinner')

		expect(svg).toHaveAttribute('width', '48')
		expect(svg).toHaveAttribute('height', '48')
	})

	it('should match snapshot', () => {
		const { container } = render(<Spinner />)
		expect(container.firstChild).toMatchSnapshot()
	})
})
