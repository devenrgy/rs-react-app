import '@/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/app'
import { ErrorBoundary } from '@/components/error-boundary'
import { Provider } from '@/provider'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
	<StrictMode>
		<ErrorBoundary>
			<Provider>
				<App />
			</Provider>
		</ErrorBoundary>
	</StrictMode>
)
