import { createBrowserRouter, redirect } from 'react-router'

import { NotFound } from '@/components/not-found'
import { PhotoDetails } from '@/components/photo-details'
import { HomeLayout } from '@/layouts/home-layout'
import { getPhoto } from '@/lib/api/requests/get-photo'
import { About } from '@/pages/about'
import { Root } from '@/pages/root'
import type { PhotoApiResponse } from '@/types'

export const router = createBrowserRouter([
	{
		Component: Root,
		children: [
			{
				path: '/',
				Component: HomeLayout,
				children: [
					{
						path: '/:id',
						loader: async ({ params }) => {
							try {
								const res = await getPhoto({ id: params?.id })

								if (!res.ok) {
									throw new Error('Failed to fetch photo')
								}

								const data = (await res.json()) as PhotoApiResponse

								if ('errors' in data) {
									throw new Error('Photo not found')
								}

								return data
							} catch (error) {
								console.error(error)
								return redirect('/404')
							}
						},
						Component: PhotoDetails
					}
				]
			},
			{
				path: '/about',
				Component: About
			}
		]
	},
	{
		path: '*',
		Component: NotFound
	},
	{
		path: '404',
		Component: NotFound
	}
])
