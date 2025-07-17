import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

import { Context, type ContextValue } from './provider'

export const mockContext = {
	handleUpdateSearchQuery: () => null,
	abortRequest: () => null,
	fetchPhotos: () => null,
	items: [],
	error: null,
	isLoading: false,
	handleResetError: () => null,
	searchQuery: ''
}

interface CustomRenderOptions extends RenderOptions {
	props: ContextValue
}

export const renderWithContextProvider = (ui: ReactElement, { props, ...renderOptions }: CustomRenderOptions) => {
	return render(<Context.Provider value={props}>{ui}</Context.Provider>, renderOptions)
}
