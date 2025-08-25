import { render } from '@testing-library/react'

import { HomePage } from './home-page'

describe('HomePage', () => {
	it('should render successfully', () => {
		const { container } = render(<HomePage />)
		expect(container.firstChild).toMatchSnapshot()
	})
})
