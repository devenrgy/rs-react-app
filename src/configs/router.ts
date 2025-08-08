import { createElement } from 'react'
import { createBrowserRouter } from 'react-router'

import { ErrorFallback } from '@/components/error-fallback'
import { loader as photoDetailsLoader, PhotoDetails } from '@/components/photo-details'
import { Spinner } from '@/components/spinner'
import { HomeLayout } from '@/layouts/home-layout'
import { queryClient } from '@/lib/api/query-client'
import { About } from '@/pages/about'
import { loader as homeLoader } from '@/pages/home'
import { Root } from '@/pages/root'

export const router = createBrowserRouter([
	{
		Component: Root,
		errorElement: createElement(ErrorFallback),
		children: [
			{
				path: '/',
				Component: HomeLayout,
				loader: homeLoader(queryClient),
				id: 'home',
				errorElement: createElement(ErrorFallback),
				hydrateFallbackElement: createElement(Spinner),
				children: [
					{
						path: '/:id',
						loader: photoDetailsLoader(queryClient),
						Component: PhotoDetails
					}
				]
			},
			{
				path: '/about',
				Component: About,
				errorElement: createElement(ErrorFallback)
			}
		]
	}
])
