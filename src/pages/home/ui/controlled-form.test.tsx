import { render } from '@testing-library/react'

import { ControlledForm } from './controlled-form'

describe('ControlledForm', () => {
	it('should render successfully', () => {
		const { container } = render(<ControlledForm onClose={vi.fn()} onSubmit={vi.fn()} sendFormAction={vi.fn()} />)
		expect(container.firstChild).toMatchSnapshot()
	})
})
