import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'

const AllTheProviders = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false
			}
		}
	})

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export const customRender = (ui: ReactNode, options: Omit<RenderOptions, 'queries'> = {}) => {
	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: AllTheProviders, ...options })
	}
}

export * from '@testing-library/react'
export { customRender as render }
