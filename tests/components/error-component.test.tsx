import { render, within } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'

import { ErrorComponent } from '@/components/error-component'

describe('ErrorComponent', () => {
	it('should render title and button', () => {
		const { container } = render(
			<ErrorComponent title='Something Error' handleResetError={vi.fn()} buttonText='Try Again' />
		)

		const title = within(container).getByRole('heading', { name: /something error/i })
		const button = within(container).getByRole('button', { name: /try again/i })

		expect(container.firstChild).toMatchSnapshot()
		expect(title).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})

	it('should click button and function correctly run', async () => {
		const fn = vi.fn()
		const { user, container } = setup(
			<ErrorComponent title='Something Error' handleResetError={fn} buttonText='Try Again' />
		)

		const button = within(container).getByRole('button', { name: /try again/i })

		await user.click(button)

		expect(fn).toBeCalledTimes(1)
	})
})
