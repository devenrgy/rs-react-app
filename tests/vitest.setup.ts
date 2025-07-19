import '@testing-library/jest-dom/vitest'

import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'

import { type ContextValue } from '@/provider'

import { server } from './mocks/api'
import { renderWithContextProvider } from './mocks/custom-renders'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export const setup = (ui: ReactNode) => ({
	user: userEvent.setup(),
	...render(ui)
})

interface CustomRenderOptions extends RenderOptions {
	props: ContextValue
}

export const setupWithContextProvider = (ui: ReactNode, props: CustomRenderOptions) => ({
	user: userEvent.setup(),
	...renderWithContextProvider(ui, props)
})
