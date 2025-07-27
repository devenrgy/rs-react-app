import '@testing-library/jest-dom/vitest'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'

import { server } from './mocks/api'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export const setup = (ui: ReactNode) => ({
	user: userEvent.setup(),
	...render(ui)
})

export const setupWithRouter = (ui: ReactNode, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route)

	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: BrowserRouter })
	}
}
