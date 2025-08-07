import '@testing-library/jest-dom/vitest'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'

import { server } from './mocks/api'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export const setup = (ui: ReactNode) => ({
	user: userEvent.setup(),
	...render(ui)
})
