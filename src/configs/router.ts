import { createBrowserRouter, redirect } from 'react-router'

import { NotFound } from '@/components/not-found'
import { PhotoDetails } from '@/components/photo-details'
import { HomeLayout } from '@/layouts/home-layout'
import { getPhoto } from '@/lib/api/requests/get-photo'
import { About } from '@/pages/about'
import { Root } from '@/pages/root'

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
							const response = await getPhoto({ id: params?.id })
							const data = await response.json()

							if (data.errors) {
								return redirect('/404')
							}

							return data
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
