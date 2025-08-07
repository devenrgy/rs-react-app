import '@/styles/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from '@/configs/router'

import { queryClient } from './lib/api/query-client'
import { ThemeProvider } from './providers/theme-provider'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>

			{import.meta.env.MODE === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	</StrictMode>
)
