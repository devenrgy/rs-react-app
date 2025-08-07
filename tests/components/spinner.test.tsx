import { render, screen } from '@testing-library/react'

import { Spinner } from '@/components/spinner'

describe('Spinner', () => {
	it('should render Spinner correctly', () => {
		render(<Spinner />)

		expect(screen.getByLabelText('spinner')).toBeInTheDocument()
	})
})
