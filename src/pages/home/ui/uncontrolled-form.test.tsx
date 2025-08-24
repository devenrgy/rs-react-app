import { render } from '@testing-library/react'

import { UncontrolledForm } from './uncontrolled-form'

describe('UncontrolledForm', () => {
	it('should render successfully', () => {
		const { container } = render(<UncontrolledForm onClose={vi.fn()} onSubmit={vi.fn()} sendFormAction={vi.fn()} />)
		expect(container.firstChild).toMatchSnapshot()
	})
})
