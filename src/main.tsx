import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from '@/components/error-boundary'

import { Providers } from './providers'
import '@/styles/global.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Root element not found')
}

createRoot(rootElement).render(
	<StrictMode>
		<ErrorBoundary>
			<Providers />
		</ErrorBoundary>
	</StrictMode>,
)
