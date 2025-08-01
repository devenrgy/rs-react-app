import '@/styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from '@/configs/router'

import { ThemeProvider } from './providers/theme-provider'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>
)
