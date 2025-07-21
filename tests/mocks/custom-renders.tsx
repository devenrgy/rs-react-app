import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'

import { type AppContext, Context } from '@/provider'

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
	props: AppContext
}

export const renderWithContextProvider = (ui: ReactNode, { props, ...renderOptions }: CustomRenderOptions) => {
	return render(<Context value={props}>{ui}</Context>, renderOptions)
}
