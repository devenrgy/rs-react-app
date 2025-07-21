import { within } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'

import { ErrorBoundary } from '@/components/error-boundary'
import { Header } from '@/components/header'
import { Provider } from '@/provider'

describe('ErrorBoundary', () => {
	it('should click error button to show error component and console error', async () => {
		const fn = vi.spyOn(console, 'error').mockImplementation(() => {})

		const { user, container } = setup(
			<Provider>
				<ErrorBoundary>
					<Header />
				</ErrorBoundary>
			</Provider>
		)

		const errorButton = within(container).getByRole('button', { name: /trigger error/i })

		await user.click(errorButton)

		const title = within(container).getByRole('heading', { name: /something went wrong/i })
		const button = within(container).getByRole('button', { name: /try again/i })

		expect(title).toBeInTheDocument()
		expect(button).toBeInTheDocument()

		await user.click(button)

		expect(fn).toHaveBeenCalledTimes(2)
		expect(title).not.toBeInTheDocument()
		expect(button).not.toBeInTheDocument()
	})
})
