import { render } from '@testing-library/react'

import { Spinner } from '@/components/spinner'

describe('Spinner', () => {
	it('should render the spinner component with correct structure', () => {
		const { container } = render(<Spinner />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
