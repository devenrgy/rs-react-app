import { render, within } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'

import { ErrorButton } from '@/components/error-button'

describe('ErrorButton', () => {
	it('should render button', () => {
		const { container } = render(<ErrorButton />)

		const errorButton = within(container).getByRole('button', { name: /trigger error/i })

		expect(container.firstChild).toMatchSnapshot()
		expect(errorButton).toBeInTheDocument()
	})

	it('should click button throw Error', async () => {
		const { user, container } = setup(<ErrorButton />)

		const errorButton = within(container).getByRole('button', { name: /trigger error/i })

		await expect(() => user.click(errorButton)).rejects.toThrow()
	})
})
