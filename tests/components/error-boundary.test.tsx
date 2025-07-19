import { within } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'

import { ErrorBoundary } from '@/components/error-boundary'
import { Header } from '@/components/header'

describe('ErrorBoundary', () => {
	it('should click error button to show error component', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})

		const { user, container } = setup(
			<ErrorBoundary>
				<Header />
			</ErrorBoundary>
		)

		const errorButton = within(container).getByRole('button', { name: /trigger error/i })

		await user.click(errorButton)

		const title = within(container).getByRole('heading', { name: /something went wrong/i })
		const button = within(container).getByRole('button', { name: /try again/i })

		expect(title).toBeInTheDocument()
		expect(button).toBeInTheDocument()

		await user.click(button)

		expect(title).not.toBeInTheDocument()
		expect(button).not.toBeInTheDocument()
	})
})
